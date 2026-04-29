const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');

const execFileAsync = promisify(execFile);

const TARGET_URL = 'https://enotdoc.vercel.app';
const PAGESPEED_API_KEY = process.env.PAGESPEED_API_KEY || '';
const PAGESPEED_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(TARGET_URL)}${PAGESPEED_API_KEY ? `&key=${encodeURIComponent(PAGESPEED_API_KEY)}` : ''}`;
const INDEX_PATH = path.join(__dirname, 'index.html');
const REPORT_PATH = path.join(__dirname, 'audit-report.json');

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

function stripTags(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function extractTextBlocks(html) {
  const blockPattern = /<(p|li|blockquote|figcaption|td)[^>]*>([\s\S]*?)<\/\1>/gi;
  const blocks = [];
  let match;

  while ((match = blockPattern.exec(html))) {
    const text = stripTags(match[2]);
    if (!text) {
      continue;
    }

    blocks.push({
      tag: match[1].toLowerCase(),
      characters: text.length,
      words: text.split(/\s+/).filter(Boolean).length,
      sample: text.slice(0, 140),
    });
  }

  return blocks;
}

function countMatches(html, pattern) {
  const matches = html.match(pattern);
  return matches ? matches.length : 0;
}

function analyzeHtml(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descriptionMatch = html.match(
    /<meta\s+[^>]*name=(["'])description\1[^>]*content=(["'])([\s\S]*?)\2[^>]*>/i,
  ) || html.match(
    /<meta\s+[^>]*content=(["'])([\s\S]*?)\1[^>]*name=(["'])description\3[^>]*>/i,
  );

  const h1Count = countMatches(html, /<h1\b[^>]*>/gi);
  const h2Count = countMatches(html, /<h2\b[^>]*>/gi);
  const textBlocks = extractTextBlocks(html);

  const totalTextCharacters = textBlocks.reduce((sum, block) => sum + block.characters, 0);
  const averageTextBlockLength = textBlocks.length
    ? Math.round(totalTextCharacters / textBlocks.length)
    : 0;

  return {
    title: {
      exists: Boolean(titleMatch && stripTags(titleMatch[1])),
      text: titleMatch ? stripTags(titleMatch[1]) : '',
      length: titleMatch ? stripTags(titleMatch[1]).length : 0,
    },
    metaDescription: {
      exists: Boolean(descriptionMatch),
      text: descriptionMatch ? stripTags(descriptionMatch[descriptionMatch.length - 1]) : '',
      length: descriptionMatch ? stripTags(descriptionMatch[descriptionMatch.length - 1]).length : 0,
    },
    headings: {
      h1Count,
      h2Count,
    },
    textBlocks: {
      count: textBlocks.length,
      totalCharacters: totalTextCharacters,
      averageCharacters: averageTextBlockLength,
      shortestCharacters: textBlocks.length ? Math.min(...textBlocks.map((block) => block.characters)) : 0,
      longestCharacters: textBlocks.length ? Math.max(...textBlocks.map((block) => block.characters)) : 0,
      items: textBlocks,
    },
  };
}

function normalizeLighthouseCategory(value) {
  if (typeof value !== 'number') {
    return null;
  }
  return Math.round(value * 100);
}

async function runLighthouse() {
  const tempOutputPath = path.join(__dirname, '.lighthouse-report.json');
  const localLighthouseCli = path.join(__dirname, 'node_modules', 'lighthouse', 'cli', 'index.js');
  const commands = [
    { command: process.execPath, args: [localLighthouseCli, TARGET_URL] },
    { command: 'lighthouse', args: [TARGET_URL] },
    { command: 'npx.cmd', args: ['--yes', 'lighthouse', TARGET_URL] },
    { command: 'npx', args: ['--yes', 'lighthouse', TARGET_URL] },
  ];
  const errors = [];

  for (const entry of commands) {
    try {
      const args = [
        ...entry.args,
        '--output=json',
        `--output-path=${tempOutputPath}`,
        '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
        '--quiet',
        '--only-categories=performance,accessibility,seo',
      ];

      await execFileAsync(entry.command, args, {
        cwd: __dirname,
        windowsHide: true,
        maxBuffer: 1024 * 1024 * 20,
      });

      const rawReport = await fs.readFile(tempOutputPath, 'utf8');
      const parsed = JSON.parse(rawReport);

      return {
        ok: true,
        source: entry.command,
        scores: {
          seo: normalizeLighthouseCategory(parsed.categories?.seo?.score),
          accessibility: normalizeLighthouseCategory(parsed.categories?.accessibility?.score),
          performance: normalizeLighthouseCategory(parsed.categories?.performance?.score),
        },
        fetchTime: parsed.fetchTime || null,
      };
    } catch (error) {
      errors.push(`${entry.command}: ${error.message}`);
      continue;
    } finally {
      if (await fileExists(tempOutputPath)) {
        await fs.unlink(tempOutputPath).catch(() => {});
      }
    }
  }

  return {
    ok: false,
    error: `Lighthouse CLI is unavailable or failed to run. ${errors.join(' | ')}`.trim(),
  };
}

function readNumericAudit(apiData, key) {
  const numericValue = apiData?.lighthouseResult?.audits?.[key]?.numericValue;
  return typeof numericValue === 'number' ? numericValue : null;
}

function readPerformanceScore(apiData) {
  const score = apiData?.lighthouseResult?.categories?.performance?.score;
  return typeof score === 'number' ? Math.round(score * 100) : null;
}

async function runPageSpeed() {
  let lastError = null;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(PAGESPEED_URL, {
        headers: {
          'User-Agent': 'node-audit-script',
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`PageSpeed API returned ${response.status}: ${responseText.slice(0, 300)}`);
      }

      const data = await response.json();

      return {
        ok: true,
        performance: readPerformanceScore(data),
        lcpMs: readNumericAudit(data, 'largest-contentful-paint'),
        cls: readNumericAudit(data, 'cumulative-layout-shift'),
        analysisUtc: data?.analysisUTCTimestamp || null,
      };
    } catch (error) {
      lastError = error;

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }

  throw lastError;
}

function addProblem(problems, severity, area, message) {
  problems.push({ severity, area, message });
}

function buildProblems(report) {
  const problems = [];
  const html = report.htmlAnalysis;
  const lighthouse = report.lighthouse;
  const pagespeed = report.pagespeed;

  if (!html.title.exists) {
    addProblem(problems, 'HIGH', 'SEO', 'Missing <title> in local index.html.');
  } else if (html.title.length < 20 || html.title.length > 70) {
    addProblem(problems, 'MEDIUM', 'SEO', `Title length looks suboptimal: ${html.title.length} chars.`);
  }

  if (!html.metaDescription.exists) {
    addProblem(problems, 'HIGH', 'SEO', 'Missing meta description in local index.html.');
  } else if (html.metaDescription.length < 70 || html.metaDescription.length > 180) {
    addProblem(
      problems,
      'MEDIUM',
      'SEO',
      `Meta description length looks suboptimal: ${html.metaDescription.length} chars.`,
    );
  }

  if (html.headings.h1Count === 0) {
    addProblem(problems, 'HIGH', 'SEO', 'Page has no H1 heading.');
  } else if (html.headings.h1Count > 1) {
    addProblem(problems, 'MEDIUM', 'SEO', `Page has multiple H1 headings: ${html.headings.h1Count}.`);
  }

  if (html.headings.h2Count === 0) {
    addProblem(problems, 'MEDIUM', 'SEO', 'Page has no H2 headings.');
  }

  if (html.textBlocks.averageCharacters < 90) {
    addProblem(
      problems,
      'LOW',
      'SEO',
      `Average text block is short: ${html.textBlocks.averageCharacters} chars.`,
    );
  }

  if (lighthouse.ok) {
    if (typeof lighthouse.scores.seo === 'number' && lighthouse.scores.seo < 90) {
      addProblem(problems, 'MEDIUM', 'SEO', `Lighthouse SEO score is ${lighthouse.scores.seo}.`);
    }

    if (typeof lighthouse.scores.accessibility === 'number' && lighthouse.scores.accessibility < 90) {
      addProblem(
        problems,
        'HIGH',
        'UX',
        `Lighthouse accessibility score is ${lighthouse.scores.accessibility}.`,
      );
    }

    if (typeof lighthouse.scores.performance === 'number' && lighthouse.scores.performance < 70) {
      addProblem(
        problems,
        'HIGH',
        'TECH',
        `Lighthouse performance score is ${lighthouse.scores.performance}.`,
      );
    } else if (typeof lighthouse.scores.performance === 'number' && lighthouse.scores.performance < 90) {
      addProblem(
        problems,
        'MEDIUM',
        'TECH',
        `Lighthouse performance score is ${lighthouse.scores.performance}.`,
      );
    }
  } else {
    addProblem(problems, 'MEDIUM', 'TECH', lighthouse.error);
  }

  if (pagespeed.ok) {
    if (typeof pagespeed.performance === 'number' && pagespeed.performance < 70) {
      addProblem(problems, 'HIGH', 'TECH', `PageSpeed performance score is ${pagespeed.performance}.`);
    } else if (typeof pagespeed.performance === 'number' && pagespeed.performance < 90) {
      addProblem(problems, 'MEDIUM', 'TECH', `PageSpeed performance score is ${pagespeed.performance}.`);
    }

    if (typeof pagespeed.lcpMs === 'number' && pagespeed.lcpMs > 4000) {
      addProblem(problems, 'HIGH', 'UX', `LCP is ${Math.round(pagespeed.lcpMs)} ms.`);
    } else if (typeof pagespeed.lcpMs === 'number' && pagespeed.lcpMs > 2500) {
      addProblem(problems, 'MEDIUM', 'UX', `LCP is ${Math.round(pagespeed.lcpMs)} ms.`);
    }

    if (typeof pagespeed.cls === 'number' && pagespeed.cls > 0.25) {
      addProblem(problems, 'HIGH', 'UX', `CLS is ${pagespeed.cls.toFixed(3)}.`);
    } else if (typeof pagespeed.cls === 'number' && pagespeed.cls > 0.1) {
      addProblem(problems, 'MEDIUM', 'UX', `CLS is ${pagespeed.cls.toFixed(3)}.`);
    }
  } else {
    addProblem(problems, 'MEDIUM', 'TECH', pagespeed.error);
  }

  if (!PAGESPEED_API_KEY) {
    addProblem(
      problems,
      'LOW',
      'TECH',
      'PAGESPEED_API_KEY is not set. Public quota may be exhausted and PageSpeed can return 429.',
    );
  }

  return {
    all: problems,
    high: problems.filter((item) => item.severity === 'HIGH'),
    medium: problems.filter((item) => item.severity === 'MEDIUM'),
    low: problems.filter((item) => item.severity === 'LOW'),
  };
}

function printSection(title, rows) {
  console.log(`=== ${title} ===`);
  for (const row of rows) {
    console.log(row);
  }
  console.log('');
}

async function main() {
  const htmlContent = await fs.readFile(INDEX_PATH, 'utf8');
  const htmlAnalysis = analyzeHtml(htmlContent);

  let lighthouse;
  try {
    lighthouse = await runLighthouse();
  } catch (error) {
    lighthouse = {
      ok: false,
      error: error.message,
    };
  }

  let pagespeed;
  try {
    pagespeed = await runPageSpeed();
  } catch (error) {
    pagespeed = {
      ok: false,
      error: error.message,
    };
  }

  const report = {
    generatedAt: new Date().toISOString(),
    targetUrl: TARGET_URL,
    lighthouse,
    pagespeed,
    htmlAnalysis,
  };

  report.problems = buildProblems(report);

  printSection('SEO', [
    `Lighthouse SEO score: ${report.lighthouse.scores?.seo ?? 'n/a'}`,
    `Title present: ${report.htmlAnalysis.title.exists ? 'yes' : 'no'}`,
    `Meta description present: ${report.htmlAnalysis.metaDescription.exists ? 'yes' : 'no'}`,
    `H1 count: ${report.htmlAnalysis.headings.h1Count}`,
    `H2 count: ${report.htmlAnalysis.headings.h2Count}`,
  ]);

  printSection('UX', [
    `Lighthouse accessibility: ${report.lighthouse.scores?.accessibility ?? 'n/a'}`,
    `PageSpeed LCP: ${report.pagespeed.lcpMs != null ? `${Math.round(report.pagespeed.lcpMs)} ms` : 'n/a'}`,
    `PageSpeed CLS: ${report.pagespeed.cls != null ? report.pagespeed.cls.toFixed(3) : 'n/a'}`,
    `Text blocks: ${report.htmlAnalysis.textBlocks.count}`,
    `Avg text block length: ${report.htmlAnalysis.textBlocks.averageCharacters} chars`,
  ]);

  printSection('TECH', [
    `Lighthouse performance: ${report.lighthouse.scores?.performance ?? 'n/a'}`,
    `PageSpeed performance: ${report.pagespeed.performance ?? 'n/a'}`,
    `Lighthouse source: ${report.lighthouse.source ?? 'unavailable'}`,
    `PageSpeed API key: ${PAGESPEED_API_KEY ? 'configured' : 'not set'}`,
    `Report file: ${REPORT_PATH}`,
  ]);

  console.log('Список проблем:');
  console.log(`HIGH: ${report.problems.high.length}`);
  report.problems.high.forEach((item) => console.log(`- ${item.area}: ${item.message}`));
  console.log(`MEDIUM: ${report.problems.medium.length}`);
  report.problems.medium.forEach((item) => console.log(`- ${item.area}: ${item.message}`));
  console.log(`LOW: ${report.problems.low.length}`);
  report.problems.low.forEach((item) => console.log(`- ${item.area}: ${item.message}`));

  await fs.writeFile(REPORT_PATH, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
}

main().catch(async (error) => {
  const failedReport = {
    generatedAt: new Date().toISOString(),
    targetUrl: TARGET_URL,
    error: error.message,
  };

  try {
    await fs.writeFile(REPORT_PATH, `${JSON.stringify(failedReport, null, 2)}\n`, 'utf8');
  } catch {}

  console.error('Audit failed:', error.message);
  process.exitCode = 1;
});
