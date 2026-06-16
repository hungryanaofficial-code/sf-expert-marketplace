import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SignUpPage() {
  const hasClerk = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY?.startsWith('pk_');

  if (!hasClerk) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 bg-surface py-16">
        <p className="text-muted">Authentication is not configured yet.</p>
        <Button asChild>
          <Link href="/interview">Continue to Interview Questions</Link>
        </Button>
      </div>
    );
  }

  const { SignUp } = require('@clerk/nextjs');
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-surface py-16">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
