# Honest Dashboard Setup

## 1. Required Vercel Environment Variables

Add these variables in Vercel:

- `GOOGLE_CREDENTIALS`
- `GA4_PROPERTY_ID`
- `SEARCH_CONSOLE_SITE_URL`

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
- `/dashboard.html`

Expected behavior:

- if API access works, endpoints return JSON with `ok: true`
- if data is unavailable, dashboard shows `нет данных`
- dashboard must not show fake `100%`

## 6. What is still missing for full honesty

This version gives real Google data, but full behavior analytics still needs:

- `Yandex Metrica API`

That is needed for:

- click maps
- scroll depth from Metrica
- Webvisor-style behavioral reporting
