import { NextResponse, type NextRequest } from 'next/server';

const hasClerk = () => {
  const key = process.env.CLERK_SECRET_KEY ?? '';
  return key.startsWith('sk_test_') || key.startsWith('sk_live_');
};

export default async function middleware(req: NextRequest) {
  if (!hasClerk() || process.env.CLERK_SECRET_KEY === 'sk_test_placeholder') {
    return NextResponse.next();
  }

  const { clerkMiddleware, createRouteMatcher } = await import('@clerk/nextjs/server');
  const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', '/admin(.*)']);
  const isAdminRoute = createRouteMatcher(['/admin(.*)']);

  return clerkMiddleware(async (auth, request) => {
    if (isProtectedRoute(request)) {
      await auth.protect();
    }

    if (isAdminRoute(request)) {
      const { userId } = await auth();
      const adminIds = (process.env.ADMIN_USER_IDS ?? '').split(',').filter(Boolean);
      if (adminIds.length > 0 && userId && !adminIds.includes(userId)) {
        return Response.redirect(new URL('/dashboard', request.url));
      }
    }
  })(req, {} as never);
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
