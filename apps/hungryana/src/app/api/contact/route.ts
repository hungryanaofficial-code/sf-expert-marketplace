import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
};

function parseContactPayload(body: ContactPayload) {
  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  const message = String(body.message ?? '').trim();

  if (name.length < 2) {
    return { error: 'Please enter your name.' as const };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: 'Please enter a valid email address.' as const };
  }

  if (message.length < 10) {
    return { error: 'Message must be at least 10 characters.' as const };
  }

  return {
    data: {
      name,
      email,
      phone: phone || null,
      message,
    },
  };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const parsed = parseContactPayload(body);

    if ('error' in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    await prisma.contactMessage.create({ data: parsed.data });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact form save failed:', error);
    return NextResponse.json(
      { error: 'Unable to save your message right now. Please call us or try again.' },
      { status: 500 }
    );
  }
}
