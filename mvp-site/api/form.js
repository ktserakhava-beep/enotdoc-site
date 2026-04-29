function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function parseBody(body) {
  if (!body) {
    throw new Error("Empty request body");
  }

  if (typeof body === "string") {
    return JSON.parse(body);
  }

  if (typeof body === "object") {
    return body;
  }

  throw new Error("Unsupported request body");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return sendJson(res, 405, {
      ok: false,
      error: "Method not allowed",
    });
  }

  try {
    const payload = parseBody(req.body);
    const endpoint = process.env.FORM_ENDPOINT?.trim();

    if (!endpoint) {
      throw new Error("Missing environment variable: FORM_ENDPOINT");
    }

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    console.log("GAS RESPONSE:", text);

    if (!response.ok) {
      return sendJson(res, 502, {
        ok: false,
        error: "Upstream form endpoint rejected request",
        status: response.status,
      });
    }

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Form API error:", error);
    return sendJson(res, 500, {
      ok: false,
      error: "Failed to submit form",
    });
  }
};
