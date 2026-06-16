import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { ARTICLES } from '@/data/articles';

export async function GET() {
  return NextResponse.json({ data: ARTICLES });
}

export async function POST(req: Request) {
  const { userId } = await auth();
  const adminIds = (process.env.ADMIN_USER_IDS ?? '').split(',').filter(Boolean);

  if (!userId || (adminIds.length > 0 && !adminIds.includes(userId))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  return NextResponse.json({ data: body, message: 'Article created (persist via Prisma in production)' });
}
