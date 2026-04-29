const { requireDashboardAuth, sendError, sendJson } = require("./_google");

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return sendError(res, 405, "Method not allowed");
  }

  try {
    if (!requireDashboardAuth(req)) {
      return sendError(res, 401, "Unauthorized");
    }

    const endpoint = process.env.FORM_ENDPOINT?.trim();
    if (!endpoint) {
      throw new Error("Missing environment variable: FORM_ENDPOINT");
    }

    const url = new URL(endpoint);
    url.searchParams.set("mode", "leads");

    const response = await fetch(url.toString(), { cache: "no-store" });
    const data = await response.json();

    if (!response.ok || !data.ok) {
      return sendError(res, 502, "Lead endpoint rejected request");
    }

    return sendJson(res, 200, data);
  } catch (error) {
    console.error("Leads API error:", error);
    return sendError(res, 500, "Failed to load lead data");
  }
};
