import Link from 'next/link';
import { Bookmark, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ALL_QUESTIONS } from '@/data/questions';

export default async function DashboardPage() {
  let userId: string | null = null;

  const clerkKey = process.env.CLERK_SECRET_KEY ?? '';
  if (clerkKey && clerkKey !== 'sk_test_placeholder' && !clerkKey.includes('...')) {
    try {
      const { auth } = await import('@clerk/nextjs/server');
      const session = await auth();
      userId = session.userId;
    } catch {
      userId = null;
    }
  }

  return (
    <div className="bg-white">
      <section className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-bold text-secondary">Your Dashboard</h1>
          <p className="mt-2 text-muted">Track progress, bookmarks, and practice history</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted">of {ALL_QUESTIONS.length} completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Bookmark className="h-5 w-5 text-primary" />
                  Bookmarks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted">saved questions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/interview">
                    Practice Questions <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {!userId && (
            <p className="mt-8 text-center text-sm text-muted">
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>{' '}
              to sync bookmarks and progress across devices.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
