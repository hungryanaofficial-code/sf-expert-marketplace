# Contact Form Database Setup (Neon + Vercel)

The contact form saves messages to PostgreSQL via Prisma. Until `DATABASE_URL` is set on Vercel, submissions return a 500 error.

---

## Step 1 — Create a free Neon database

1. Go to [https://neon.tech](https://neon.tech) and sign up (GitHub login works).
2. **New Project** → name it `hungryana` → region closest to your users (e.g. AWS Mumbai / Singapore).
3. Open the project → **Connection Details** → copy the **pooled** connection string.
4. It looks like:
   ```
   postgresql://user:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## Step 2 — Add environment variable on Vercel

1. Open [Vercel Dashboard](https://vercel.com) → project **hungryana-website**.
2. **Settings** → **Environment Variables**.
3. Add:

   | Name | Value | Environments |
   |------|-------|--------------|
   | `DATABASE_URL` | *(paste Neon connection string)* | Production, Preview, Development |
   | `NEXT_PUBLIC_SITE_URL` | `https://hungryana.com` | Production |

4. Save.

---

## Step 3 — Redeploy

Migrations run automatically during the Vercel build (`prisma migrate deploy` in `vercel.json`).

From your machine:

```powershell
cd C:\Users\iamav\Projects\hungryana-website
npx vercel --prod
```

Or push to GitHub if auto-deploy is connected.

---

## Step 4 — Test the contact form

1. Open [https://hungryana.com](https://hungryana.com) → scroll to **Contact**.
2. Submit a test message.
3. You should see **“Thank you! We'll get back to you soon.”**

---

## View saved messages (Neon SQL Editor)

In Neon → **SQL Editor**:

```sql
SELECT id, name, email, phone, message, "createdAt"
FROM "ContactMessage"
ORDER BY "createdAt" DESC;
```

---

## Local development (optional)

```powershell
cd C:\Users\iamav\Projects\sf-expert-marketplace\apps\hungryana
copy .env.example .env
# Edit .env and set DATABASE_URL=...
npm run db:migrate
npm run dev
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Contact form 500 error | `DATABASE_URL` missing or wrong on Vercel |
| Build fails on Vercel | Check Neon connection string includes `?sslmode=require` |
| Table does not exist | Redeploy after setting `DATABASE_URL` (migration runs on build) |
| Works locally, not live | Redeploy **Production** after adding env vars |
