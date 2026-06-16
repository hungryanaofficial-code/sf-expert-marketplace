import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT ?? 4001;

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN ?? 'http://localhost:3002' }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'salesforce-decode-api' });
});

/**
 * API Design — mirrors Next.js API routes for standalone Express deployment
 *
 * GET    /api/v1/questions          — list with filters (category, difficulty, q, tag)
 * GET    /api/v1/questions/:slug    — single question
 * POST   /api/v1/questions          — create (admin)
 * PUT    /api/v1/questions/:slug    — update (admin)
 *
 * GET    /api/v1/articles           — list articles
 * POST   /api/v1/articles           — create (admin)
 *
 * GET    /api/v1/categories         — list categories
 *
 * GET    /api/v1/bookmarks          — user bookmarks (auth)
 * POST   /api/v1/bookmarks          — add bookmark (auth)
 *
 * GET    /api/v1/progress           — user progress (auth)
 * POST   /api/v1/progress           — update progress (auth)
 *
 * POST   /api/v1/newsletter         — subscribe
 */

app.get('/api/v1/questions', async (req, res) => {
  res.json({
    message: 'Connect Prisma client from salesforce-decode schema',
    filters: req.query,
  });
});

app.listen(PORT, () => {
  console.log(`Salesforce Decode API running on http://localhost:${PORT}`);
});
