const { requireDashboardAuth, sendError, sendJson } = require("./_google");

const METRICA_API_URL = "https://api-metrika.yandex.net/stat/v1/data";

function getDateRange(days = 28) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days + 1);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

async function fetchMetricaReport({ counterId, token, metrics, dimensions, limit = 10 }) {
  const dateRange = getDateRange(28);
  const url = new URL(METRICA_API_URL);

  url.searchParams.set("ids", counterId);
  url.searchParams.set("date1", dateRange.startDate);
  url.searchParams.set("date2", dateRange.endDate);
  url.searchParams.set("metrics", metrics.join(","));
  url.searchParams.set("accuracy", "full");
  url.searchParams.set("limit", String(limit));

  if (dimensions?.length) {
    url.searchParams.set("dimensions", dimensions.join(","));
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `OAuth ${token}`,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || data?.errors?.[0]?.message || "Yandex Metrica request failed";
    throw new Error(message);
  }

  return {
    range: dateRange,
    data,
  };
}

function metricValue(report, index) {
  return Number(report?.data?.totals?.[index] || 0);
}

function cleanToken(value = "") {
  return String(value).trim().replace(/^OAuth\s+/i, "");
}

function cleanCounterId(value = "") {
  const match = String(value).match(/\d+/);
  return match ? match[0] : "";
}

function mapRows(report, dimensions = [], metrics = []) {
  return (report?.data?.data || []).map((row) => {
    const item = {};

    dimensions.forEach((name, index) => {
      item[name] = row.dimensions?.[index]?.name || "";
    });

    metrics.forEach((name, index) => {
      item[name] = Number(row.metrics?.[index] || 0);
    });

    return item;
  });
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    if (!requireDashboardAuth(req)) {
      return sendError(res, 401, "Unauthorized");
    }

    const token = cleanToken(process.env.YANDEX_METRIKA_TOKEN);
    const counterId = cleanCounterId(process.env.YANDEX_METRIKA_COUNTER_ID);

    if (!token || !counterId) {
      return sendJson(res, 200, {
        ok: true,
        connected: false,
        reason: "Yandex Metrica API env is not configured",
      });
    }

    const summaryMetrics = [
      "ym:s:visits",
      "ym:s:users",
      "ym:s:pageviews",
      "ym:s:bounceRate",
      "ym:s:pageDepth",
      "ym:s:avgVisitDurationSeconds",
      "ym:s:sumGoalReachesAny",
      "ym:s:anyGoalConversionRate",
    ];

    const summary = await fetchMetricaReport({
      counterId,
      token,
      metrics: summaryMetrics,
    });

    const [sourcesResult, pagesResult, goalsResult] = await Promise.allSettled([
      fetchMetricaReport({
        counterId,
        token,
        dimensions: ["ym:s:lastTrafficSource"],
        metrics: ["ym:s:visits", "ym:s:users", "ym:s:bounceRate"],
        limit: 5,
      }),
      fetchMetricaReport({
        counterId,
        token,
        dimensions: ["ym:s:startURLPath"],
        metrics: ["ym:s:visits", "ym:s:pageviews"],
        limit: 5,
      }),
      fetchMetricaReport({
        counterId,
        token,
        dimensions: ["ym:s:goal"],
        metrics: ["ym:s:visits", "ym:s:users", "ym:s:sumGoalReachesAny"],
        limit: 10,
      }),
    ]);

    const sources = sourcesResult.status === "fulfilled" ? sourcesResult.value : null;
    const pages = pagesResult.status === "fulfilled" ? pagesResult.value : null;
    const goals = goalsResult.status === "fulfilled" ? goalsResult.value : null;

    return sendJson(res, 200, {
      ok: true,
      connected: true,
      counterId,
      range: summary.range,
      visits: metricValue(summary, 0),
      users: metricValue(summary, 1),
      pageViews: metricValue(summary, 2),
      bounceRate: metricValue(summary, 3),
      pageDepth: metricValue(summary, 4),
      avgVisitDurationSeconds: metricValue(summary, 5),
      goalReaches: metricValue(summary, 6),
      goalConversionRate: metricValue(summary, 7),
      sources: mapRows(sources, ["source"], ["visits", "users", "bounceRate"]),
      pages: mapRows(pages, ["pagePath"], ["visits", "pageViews"]),
      goals: mapRows(goals, ["goal"], ["visits", "users", "goalReaches"]),
      partialErrors: {
        sources: sourcesResult.status === "rejected" ? sourcesResult.reason.message : "",
        pages: pagesResult.status === "rejected" ? pagesResult.reason.message : "",
        goals: goalsResult.status === "rejected" ? goalsResult.reason.message : "",
      },
    });
  } catch (error) {
    console.error("Yandex Metrica API error:", error);
    return sendJson(res, 200, {
      ok: true,
      connected: false,
      reason: error.message || "Failed to load Yandex Metrica data",
    });
  }
};
