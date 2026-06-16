# Salesforce Decode — Architecture & Documentation

**Owner:** [Avijit Patra](https://www.linkedin.com/in/iamavijitpatra/)  
**Site:** Salesforce Decode — Decode Salesforce Like a Solution Architect

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS 4, ShadCN-style UI |
| Backend | Next.js API Routes + Express (`apps/salesforce-decode-api`) |
| Database | PostgreSQL + Prisma |
| Auth | Clerk |
| Hosting | Vercel |

## Folder Structure

```
apps/salesforce-decode/
├── prisma/
│   ├── schema.prisma      # Full database schema
│   └── seed.ts            # 570 questions + articles
├── public/
│   ├── logo.png           # Brand logo (uploaded)
│   └── logo-icon.svg      # Favicon icon
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Home
│   │   ├── about/page.tsx              # About Avijit
│   │   ├── interview/
│   │   │   ├── page.tsx                # Question bank + filters
│   │   │   └── [slug]/page.tsx         # Question detail
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── admin/                      # Admin panel
│   │   ├── dashboard/                  # User progress
│   │   ├── api/                        # REST endpoints
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Hero, Career, Skills, etc.
│   │   ├── interview/     # Filters, QuestionDetail
│   │   └── ui/            # Button, Card, Badge, Input
│   ├── data/
│   │   ├── categories.ts
│   │   ├── career.ts
│   │   ├── articles.ts
│   │   └── questions/     # 570 questions across 9 categories
│   └── lib/               # db, seo, utils, constants
└── vercel.json
```

## Database Schema

| Model | Purpose |
|-------|---------|
| User | Clerk-synced users with roles (USER, ADMIN) |
| Category | 9 interview categories |
| Question | Interview Q&A with difficulty, tags, architect perspective |
| Tag | Cross-cutting tags for search |
| Article | Blog posts with SEO fields |
| Bookmark | User saved questions |
| UserProgress | Completion tracking |
| Comment | Q&A and article comments |
| NewsletterSubscriber | Email subscriptions |

## UI Wireframes

### Home Page
```
┌─────────────────────────────────────────────┐
│ [Logo] Salesforce decode    Nav    Sign In  │
├─────────────────────────────────────────────┤
│         Decode Salesforce Like a            │
│           Solution Architect                │
│   Real Interview Questions, Real Scenarios   │
│     [Start Learning]  [Interview Questions]   │
├─────────────────────────────────────────────┤
│ Featured Interview Questions (3-col cards)  │
├─────────────────────────────────────────────┤
│ Popular Topics (Agentforce, Data Cloud...)  │
├─────────────────────────────────────────────┤
│ Latest Articles                             │
├─────────────────────────────────────────────┤
│ Skills Grid (Apex, LWC, Agentforce...)      │
├─────────────────────────────────────────────┤
│ Career Timeline (Education + Experience)      │
├─────────────────────────────────────────────┤
│ About Me + Stats                            │
├─────────────────────────────────────────────┤
│ Newsletter Subscribe                        │
└─────────────────────────────────────────────┘
```

### Interview Module
```
┌─────────────────────────────────────────────┐
│ Interview Questions (570+)                  │
├─────────────────────────────────────────────┤
│ [Search] [Category ▼] [Difficulty ▼] [Tag ▼]│
│ Showing 50 of 570 questions                 │
├─────────────────────────────────────────────┤
│ ┌─ Card ─────────────────────────────────┐  │
│ │ [Agentforce] [Architect] [tag] [tag]   │  │
│ │ Question title...                      │  │
│ │ Scenario preview...                    │  │
│ └────────────────────────────────────────┘  │
├─────────────────────────────────────────────┤
│ Question Detail:                            │
│ • Real World Scenario                       │
│ • Expected Answer                           │
│ • Follow-Up Questions                       │
│ • Architect Perspective                     │
│ [Bookmark] [Mark Complete]                  │
└─────────────────────────────────────────────┘
```

## SEO Strategy

- **Per-page metadata** via `buildMetadata()` with title, description, canonical URLs
- **JSON-LD schema:** WebSite, Person, Question, Article
- **Open Graph + Twitter cards** on all pages
- **Sitemap:** 570+ question URLs + blog + static pages
- **robots.txt:** Allow public, disallow `/admin/` and `/api/`
- **Target keywords:** Salesforce interview questions, Agentforce architecture, Data Cloud interview

## API Design

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/questions` | Public | List with filters |
| GET | `/api/questions/:slug` | Public | Single question |
| GET | `/api/articles` | Public | List articles |
| POST | `/api/articles` | Admin | Create article |
| GET | `/api/bookmarks` | User | List bookmarks |
| POST | `/api/bookmarks` | User | Add bookmark |
| GET | `/api/progress` | User | Get progress |
| POST | `/api/progress` | User | Update progress |
| POST | `/api/newsletter` | Public | Subscribe |

## Question Bank

| Category | Count |
|----------|-------|
| Agentforce | 50 |
| Data Cloud | 50 |
| Headless 360 | 40 |
| Apex | 100 |
| LWC | 75 |
| Integration | 100 |
| Architecture | 75 |
| OmniStudio | 40 |
| FSC | 40 |
| **Total** | **570** |

## Future Roadmap (1000+ Questions)

1. **Phase 1 (Current):** 570 static questions, file-based content, Clerk auth
2. **Phase 2:** Full Prisma persistence, admin CRUD, user bookmarks/progress in DB
3. **Phase 3:** Community contributions, question voting, difficulty ratings
4. **Phase 4:** Spaced repetition study mode, mock interview timer (LeetCode-style)
5. **Phase 5:** AI-powered answer evaluation, personalized study paths
6. **Phase 6:** 1000+ questions via CMS import, multi-author support

## Getting Started

```bash
# Install dependencies (from repo root)
npm install

# Copy env and configure Clerk + PostgreSQL
cp apps/salesforce-decode/.env.example apps/salesforce-decode/.env

# Run dev server
npm run dev:decode

# Seed database (requires PostgreSQL)
cd apps/salesforce-decode && npm run db:push && npm run db:seed
```

- **Web:** http://localhost:3002
- **Express API:** http://localhost:4001 (optional)

## Deploy to Vercel

1. Set root directory to `apps/salesforce-decode`
2. Add env vars: `DATABASE_URL`, Clerk keys, `NEXT_PUBLIC_SITE_URL`
3. Connect PostgreSQL (Neon, Supabase, or Railway)
4. Run `prisma migrate deploy` in build step
