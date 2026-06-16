import { NextResponse } from 'next/server';
import { ALL_QUESTIONS } from '@/data/questions';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const question = ALL_QUESTIONS.find((q) => q.slug === slug);

  if (!question) {
    return NextResponse.json({ error: 'Question not found' }, { status: 404 });
  }

  return NextResponse.json({ data: question });
}
