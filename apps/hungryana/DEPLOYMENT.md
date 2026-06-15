# Hungryana — Production Deployment Guide

Complete guide from local development → GitHub → live site at **https://hungryana.com**

---

## Quick status (after latest production prep)

| Item | Status |
|------|--------|
| Framework | Next.js 15 App Router + React 19 + Tailwind 4 |
| Production build | Run `npm run build` in this folder |
| SEO | sitemap.xml, robots.txt, JSON-LD, OG/Twitter tags |
| WhatsApp button | Floating green button (bottom-right) |
| Contact form | Opens email app via `mailto:` to hungryana.official@gmail.com |
| Favicon | Generated via `app/icon.tsx` |
| Deploy target | **Vercel** (recommended) |

---

# PHASE 1 — Codebase Audit Summary

### Framework
- **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**

### Routes
| URL | Purpose |
|-----|---------|
| `/` | Full restaurant homepage |
| `/menu` | Standalone digital menu (QR code target) |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots |

### Issues found & fixed
- Missing sitemap / robots → **Added** `sitemap.ts`, `robots.ts`
- Missing favicon → **Added** `app/icon.tsx`
- Missing WhatsApp → **Added** floating WhatsApp button
- Contact form fake success → **Fixed** with real `mailto:` handoff
- No lazy loading → **Added** `next/dynamic` for below-fold sections
- SEO incomplete → **Added** `metadataBase`, canonical, OG images
- QR/logo PNG missing → **Fallback** to SVG if PNG absent
- Accessibility → skip link, tab IDs, reduced-motion support

### Before launch — YOU must update
1. **Real phone number** in `src/lib/constants.ts` (WhatsApp + tel links)
2. **Real social URLs** in `src/lib/constants.ts`
3. Add **`public/logo.png`** and **`public/qr-menu.png`** (production QR → `https://hungryana.com/menu`)
4. Set **`NEXT_PUBLIC_SITE_URL=https://hungryana.com`** on hosting

---

# PHASE 2 — Production Readiness

### Run locally
```powershell
cd C:\Users\iamav\Projects\sf-expert-marketplace\apps\hungryana
npm run build
npm run start
```
Open http://localhost:3001

### Lighthouse (run in Chrome DevTools)
1. Open site in Chrome → F12 → **Lighthouse**
2. Mode: Mobile + Desktop
3. Target: 90+ on Performance, SEO, Accessibility, Best Practices

### If cache causes white screen
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

---

# PHASE 3 — GitHub Migration

### Option A — Standalone repo (recommended): `hungryana-website`

Copy the app to its own folder, then push:

```powershell
# 1. Copy project to new folder
xcopy /E /I "C:\Users\iamav\Projects\sf-expert-marketplace\apps\hungryana" "C:\Users\iamav\Projects\hungryana-website"

cd C:\Users\iamav\Projects\hungryana-website

# 2. Initialize Git
git init
git status

# 3. Stage & commit
git add .
git commit -m "Initial Hungryana Website"

# 4. Create repo on GitHub: https://github.com/new → name: hungryana-website

# 5. Push (replace YOUR_USERNAME)
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hungryana-website.git
git push -u origin main
```

### Option B — Keep inside monorepo
Deploy from `sf-expert-marketplace` with Vercel **Root Directory** = `apps/hungryana`

---

# PHASE 4 — Domain Purchase

### Recommended order
1. **hungryana.com** ← best for brand
2. hungryana.in
3. hungryana.co.in
4. hungryanafoods.com
5. hungryanarestaurant.com

### Registrar comparison (approximate, 2025–2026)

| Registrar | .com 1st year | Renewal | Privacy | Best for |
|-----------|---------------|---------|---------|----------|
| **Cloudflare** | At-cost ~$10–11 | ~$10 | Free | Cheapest long-term |
| **Namecheap** | ~$10–13 promo | ~$14–16 | Free 1st year | Easy UI |
| **GoDaddy** | ~$1–12 promo | ~$18–22 | Paid extra | Avoid high renewals |
| **Hostinger** | ~$9 promo | ~$16 | Often included | Bundled hosting |

**Recommendation:** Buy **hungryana.com** on **Cloudflare Registrar** (if available) or **Namecheap**.

### Steps
1. Search domain at registrar
2. Add to cart → enable **WHOIS privacy**
3. Complete purchase
4. Keep login credentials safe

---

# PHASE 5 — Hosting Recommendation

| Platform | Cost | Speed | Next.js | Verdict |
|----------|------|-------|---------|---------|
| **Vercel** | Free tier | Excellent | Native | **✅ Best choice** |
| Netlify | Free tier | Good | Good | Alternative |
| Cloudflare Pages | Free | Excellent | Good | Good if domain on CF |
| Hostinger | Paid | Average | Manual | Not ideal for Next.js |

**Recommendation: Vercel** — built for Next.js, free SSL, auto deploy from GitHub.

---

# PHASE 6 — Deploy to Vercel

### Step-by-step

1. Go to https://vercel.com → Sign up with **GitHub**
2. Click **Add New → Project**
3. Import `hungryana-website` repository
4. Configure:
   - **Framework Preset:** Next.js
   - **Root Directory:** `.` (if standalone repo) OR `apps/hungryana` (if monorepo)
   - **Build Command:** `npm run build`
   - **Output:** default
5. **Environment Variables:**
   ```
   NEXT_PUBLIC_SITE_URL = https://hungryana.com
   ```
   (Use your `.vercel.app` URL first, update after domain connects)
6. Click **Deploy**
7. Wait ~2 minutes → visit `https://hungryana-website.vercel.app`

### Verify deployment
- [ ] Homepage loads with styling
- [ ] `/menu` works
- [ ] WhatsApp button opens chat
- [ ] Contact form opens email
- [ ] Maps shows Kirnahar

---

# PHASE 7 — Custom Domain Setup

### On Vercel
1. Project → **Settings → Domains**
2. Add `hungryana.com` and `www.hungryana.com`
3. Vercel shows DNS records to add

### On your registrar (example)

**Root domain (hungryana.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**WWW subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Redirect (pick one)
- **Recommended:** `hungryana.com` → `www.hungryana.com` (or vice versa)
- Vercel → Domains → set one as primary, redirect other

### SSL
- Vercel auto-provisions **Let's Encrypt** HTTPS (free)
- Wait 5–60 minutes after DNS propagates
- Verify: padlock icon on https://hungryana.com

### DNS propagation check
https://dnschecker.org → search `hungryana.com`

---

# PHASE 8 — Restaurant Features Checklist

| Feature | Status |
|---------|--------|
| Hero section | ✅ |
| About section | ✅ |
| Food categories | ✅ |
| Full menu with prices | ✅ |
| Gallery + lightbox | ✅ |
| Testimonials carousel | ✅ |
| Contact form | ✅ (mailto) |
| QR Menu section | ✅ (add production PNG) |
| Email display | ✅ hungryana.official@gmail.com |
| Google Maps | ✅ Kirnahar embed |
| Mobile navigation | ✅ |
| Footer | ✅ |
| Reserve Table CTA | ✅ |
| WhatsApp ordering | ✅ **NEW** |
| Social icons | ⚠️ Update real URLs |

---

# PHASE 9 — Google Indexing & SEO

### Google Search Console
1. https://search.google.com/search-console
2. Add property → **URL prefix:** `https://hungryana.com`
3. Verify via DNS TXT record (Vercel/registrar)
4. Submit sitemap: `https://hungryana.com/sitemap.xml`

### Google Analytics 4
1. https://analytics.google.com → Create property
2. Copy Measurement ID (`G-XXXXXXXX`)
3. Add to site (optional — ask to wire `NEXT_PUBLIC_GA_ID`)

### Local SEO tips
- Add Google Business Profile for Kirnahar location
- Use keywords: "restaurant Kirnahar", "biryani Birbhum"
- Encourage Google reviews

### Validate
- Rich Results: https://search.google.com/test/rich-results
- OG tags: https://www.opengraph.xyz/

---

# PHASE 10 — Final Launch Checklist

```
[ ] npm run build succeeds
[ ] GitHub repo pushed (hungryana-website)
[ ] Vercel deployment live
[ ] Domain purchased (hungryana.com)
[ ] DNS connected
[ ] HTTPS / SSL active
[ ] NEXT_PUBLIC_SITE_URL set
[ ] Real phone number updated
[ ] Production QR code (points to /menu)
[ ] logo.png uploaded
[ ] Social links updated
[ ] Search Console sitemap submitted
[ ] Test on mobile (Android + iPhone)
[ ] WhatsApp order flow tested
[ ] Contact email tested
```

---

## What I need from you next

Reply with:

1. **GitHub username** — to finalize push commands
2. **Real WhatsApp/phone number** — to update constants
3. **Domain choice** — confirm hungryana.com or alternative
4. **Screenshot** after Vercel deploy — if you want help verifying DNS

I can update the phone number and social links immediately once you provide them.
