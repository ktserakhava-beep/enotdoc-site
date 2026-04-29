const { google } = require("googleapis");
const { getDateRange, getGoogleAuth, readRequiredEnv, requireDashboardAuth, sendError, sendJson } = require("./_google");

const TRACKED_EVENTS = [
  "form_start",
  "form_submit",
  "lead",
  "click_submit",
  "scroll_to_form",
  "click_email",
  "copy_email",
  "engaged_30s",
  "scroll_70",
  "form_abandon",
  "qualified_lead",
  "form_error",
  "validation_error",
  "return_visit",
];

function mapRows(rows = [], dimensions = [], metrics = []) {
  return rows.map((row) => {
    const item = {};

    dimensions.forEach((name, index) => {
      item[name] = row.dimensionValues?.[index]?.value || "";
    });

    metrics.forEach((name, index) => {
      item[name] = Number(row.metricValues?.[index]?.value || 0);
    });

    return item;
  });
}

async function runReport(analyticsData, propertyId, body) {
  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: body,
  });

  return response.data;
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    if (!requireDashboardAuth(req)) {
      return sendError(res, 401, "Unauthorized");
    }

    const propertyId = readRequiredEnv("GA4_PROPERTY_ID");
    const auth = getGoogleAuth(["https://www.googleapis.com/auth/analytics.readonly"]);
    const analyticsData = google.analyticsdata({
      version: "v1beta",
      auth,
    });
    const dateRange = getDateRange(28);

    const [summary, topPages, events, sources] = await Promise.all([
      runReport(analyticsData, propertyId, {
        dateRanges: [dateRange],
        metrics: [
          { name: "totalUsers" },
          { name: "sessions" },
          { name: "screenPageViews" },
        ],
      }),
      runReport(analyticsData, propertyId, {
        dateRanges: [dateRange],
        dimensions: [{ name: "pagePath" }],
        metrics: [{ name: "screenPageViews" }, { name: "sessions" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: 5,
      }),
      runReport(analyticsData, propertyId, {
        dateRanges: [dateRange],
        dimensions: [{ name: "eventName" }],
        metrics: [{ name: "eventCount" }],
        dimensionFilter: {
          filter: {
            fieldName: "eventName",
            inListFilter: {
              values: TRACKED_EVENTS,
            },
          },
        },
        orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      }),
      runReport(analyticsData, propertyId, {
        dateRanges: [dateRange],
        dimensions: [{ name: "sessionSourceMedium" }],
        metrics: [{ name: "sessions" }],
        orderBys: [{ metric: { metricName: "sessions" }, desc: true }],
        limit: 5,
      }),
    ]);

    const summaryMetrics = summary.rows?.[0]?.metricValues || [];
    const eventRows = mapRows(events.rows, ["eventName"], ["eventCount"]);
    const eventCounts = TRACKED_EVENTS.reduce((acc, eventName) => {
      const row = eventRows.find((item) => item.eventName === eventName);
      acc[eventName] = row?.eventCount || 0;
      return acc;
    }, {});

    return sendJson(res, 200, {
      ok: true,
      range: dateRange,
      users: Number(summaryMetrics[0]?.value || 0),
      sessions: Number(summaryMetrics[1]?.value || 0),
      pageViews: Number(summaryMetrics[2]?.value || 0),
      topPages: mapRows(topPages.rows, ["pagePath"], ["screenPageViews", "sessions"]),
      events: eventRows,
      eventCounts,
      sources: mapRows(sources.rows, ["sessionSourceMedium"], ["sessions"]),
    });
  } catch (error) {
    console.error("GA4 API error:", error);
    return sendError(res, 500, "Failed to load GA4 data");
  }
};
