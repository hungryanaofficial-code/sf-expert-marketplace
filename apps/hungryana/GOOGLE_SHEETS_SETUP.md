# Contact Form → Google Sheets Setup

Contact form messages are saved to a Google Sheet via a small Apps Script webhook.

---

## Step 1 — Create the Google Sheet

1. Sign in with **hungryana.official@gmail.com** (or your business Google account).
2. Go to [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**.
3. Name it **Hungryana Contact Messages**.
4. In **row 1**, add these headers:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Name | Email | Phone | Message |

---

## Step 2 — Add the Apps Script

1. In the sheet: **Extensions** → **Apps Script**.
2. Delete any default code and paste the contents of `scripts/google-sheets-webhook.gs`.
3. Click **Save** (name the project `Hungryana Contact Webhook`).

---

## Step 3 — Deploy as web app

1. Click **Deploy** → **New deployment**.
2. Type: **Web app**.
3. Settings:
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy** → authorize when prompted.
5. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`).

---

## Step 4 — Add to Vercel

1. [Vercel Dashboard](https://vercel.com) → **hungryana-website** → **Settings** → **Environment Variables**.
2. Add:

   | Name | Value |
   |------|-------|
   | `GOOGLE_SHEETS_WEBHOOK_URL` | *(paste Web app URL from Step 3)* |
   | `NEXT_PUBLIC_SITE_URL` | `https://hungryana.com` |

3. Apply to **Production** (and Preview if you want).

---

## Step 5 — Redeploy and test

```powershell
cd C:\Users\iamav\Projects\hungryana-website
npx vercel --prod
```

1. Open [https://hungryana.com](https://hungryana.com) → **Contact**.
2. Submit a test message.
3. Refresh your Google Sheet — a new row should appear.

---

## View messages

Open your Google Sheet anytime. Each submission adds one row with timestamp, name, email, phone, and message.

You can also open the sheet on your phone via the Google Sheets app.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Form returns 500 | `GOOGLE_SHEETS_WEBHOOK_URL` missing or wrong on Vercel |
| Nothing in sheet | Redeploy after adding env var; check Apps Script **Executions** log |
| Authorization error | Redeploy Apps Script; set access to **Anyone** |
| Old messages missing | Only new submissions after setup are stored |
