import { NextResponse } from 'next/server';
import { ALL_QUESTIONS } from '@/data/questions';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');
  const q = searchParams.get('q')?.toLowerCase();
  const tag = searchParams.get('tag');
  const limit = parseInt(searchParams.get('limit') ?? '50', 10);
  const offset = parseInt(searchParams.get('offset') ?? '0', 10);

  let results = ALL_QUESTIONS;

  if (category) results = results.filter((question) => question.categorySlug === category);
  if (difficulty) results = results.filter((question) => question.difficulty === difficulty);
  if (tag) results = results.filter((question) => question.tags.includes(tag));
  if (q) {
    results = results.filter((question) =>
      [question.title, question.realWorldScenario, ...question.tags]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }

  const total = results.length;
  const data = results.slice(offset, offset + limit);

  return NextResponse.json({ data, total, limit, offset });
}
