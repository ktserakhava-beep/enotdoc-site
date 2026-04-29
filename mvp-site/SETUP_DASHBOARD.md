# Honest Dashboard Setup

## 1. Required Vercel Environment Variables

Add these variables in Vercel:

- `DASHBOARD_TOKEN`
- `GOOGLE_CREDENTIALS`
- `GA4_PROPERTY_ID`
- `SEARCH_CONSOLE_SITE_URL`
- `FORM_ENDPOINT`
- `YANDEX_METRIKA_TOKEN` (optional, recommended)
- `YANDEX_METRIKA_COUNTER_ID` (optional, recommended)

### `DASHBOARD_TOKEN`

Shared secret token for internal dashboard/API access.

Example:

```text
replace-with-long-random-token
```

### `GOOGLE_CREDENTIALS`

Paste the full contents of your Google service account JSON as one JSON string.

Example:

```json
{"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...","client_id":"..."}
```

### `GA4_PROPERTY_ID`

Use the numeric GA4 Property ID, not the Measurement ID.

Example:

```text
123456789
```

### `SEARCH_CONSOLE_SITE_URL`

Use the exact Search Console property URL.

Example:

```text
https://enotdoc.vercel.app/
```

### `FORM_ENDPOINT`

Google Apps Script endpoint used for form submit and lead read mode.

Example:

```text
https://script.google.com/macros/s/...../exec
```

## 2. Google-side access

Before the dashboard can read data:

1. Enable these APIs in Google Cloud:
   - `Google Analytics Data API`
   - `Google Search Console API`
2. Add the service account email to GA4 property access.
3. Add the same service account email as a user in Google Search Console for the site property.

## 3. Local development

Install dependencies:

```bash
npm install
```

Run local Vercel dev server:

```bash
vercel dev
```

Open:

```text
http://localhost:3000/dashboard.html
```

## 4. Deploy to Vercel

Deploy:

```bash
vercel deploy --prod
```

## 5. How to verify

Check these URLs:

- `/api/ga4`
- `/api/search-console`
- `/api/leads`
- `/api/metrica`
- `/dashboard.html`

Expected behavior:

- without token, protected endpoints return `401 Unauthorized`
- with valid `x-dashboard-token`, API endpoints return JSON with `ok: true`
- if data is unavailable, dashboard shows `нет данных`
- dashboard must not show fake `100%`

## 6. Metrica notes

Yandex Metrica API is optional in code, but recommended for behavior metrics:

- visit quality metrics
- source breakdown
- goal reach metrics
