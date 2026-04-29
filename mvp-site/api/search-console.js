const { google } = require("googleapis");
const { getDateRange, getGoogleAuth, readRequiredEnv, requireDashboardAuth, sendError, sendJson } = require("./_google");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    if (!requireDashboardAuth(req)) {
      return sendError(res, 401, "Unauthorized");
    }

    const siteUrl = readRequiredEnv("SEARCH_CONSOLE_SITE_URL");
    const auth = getGoogleAuth(["https://www.googleapis.com/auth/webmasters.readonly"]);
    const searchConsole = google.searchconsole({
      version: "v1",
      auth,
    });
    const dateRange = getDateRange(28);

    const response = await searchConsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        dimensions: ["query"],
        rowLimit: 10,
        startRow: 0,
      },
    });

    const rows = response.data.rows || [];
    const totals = rows.reduce(
      (acc, row) => {
        acc.clicks += Number(row.clicks || 0);
        acc.impressions += Number(row.impressions || 0);
        return acc;
      },
      { clicks: 0, impressions: 0 }
    );

    const avgCtr = totals.impressions > 0 ? totals.clicks / totals.impressions : 0;
    const avgPosition =
      rows.length > 0
        ? rows.reduce((sum, row) => sum + Number(row.position || 0), 0) / rows.length
        : 0;

    return sendJson(res, 200, {
      ok: true,
      range: dateRange,
      clicks: totals.clicks,
      impressions: totals.impressions,
      ctr: avgCtr,
      averagePosition: avgPosition,
      queries: rows.map((row) => ({
        query: row.keys?.[0] || "",
        clicks: Number(row.clicks || 0),
        impressions: Number(row.impressions || 0),
        ctr: Number(row.ctr || 0),
        position: Number(row.position || 0),
      })),
    });
  } catch (error) {
    console.error("Search Console API error:", error);
    return sendError(res, 500, "Failed to load Search Console data");
  }
};
