const { google } = require("googleapis");

function readRequiredEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function parseGoogleCredentials() {
  const raw = readRequiredEnv("GOOGLE_CREDENTIALS");

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error("GOOGLE_CREDENTIALS must be a valid JSON string");
  }
}

function getGoogleAuth(scopes) {
  const credentials = parseGoogleCredentials();
  return new google.auth.GoogleAuth({
    credentials,
    scopes,
  });
}

function getDateRange(days = 28) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days + 1);

  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };
}

function getHeader(req, name) {
  const value = req.headers?.[name.toLowerCase()];
  return Array.isArray(value) ? value[0] : value;
}

function requireDashboardAuth(req) {
  const expectedToken = process.env.DASHBOARD_TOKEN;
  if (!expectedToken) {
    console.error("Dashboard auth is not configured: missing DASHBOARD_TOKEN");
    return false;
  }

  const headerToken = getHeader(req, "x-dashboard-token");
  const authHeader = getHeader(req, "authorization") || "";
  const bearerToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  const providedToken = headerToken || bearerToken || req.query?.token;

  return String(providedToken || "").trim() === String(expectedToken || "").trim();
}

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  res.end(JSON.stringify(data));
}

function sendError(res, statusCode, message, extra = {}) {
  sendJson(res, statusCode, {
    ok: false,
    error: message,
    ...extra,
  });
}

module.exports = {
  getDateRange,
  getGoogleAuth,
  readRequiredEnv,
  requireDashboardAuth,
  sendError,
  sendJson,
};
