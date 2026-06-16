'use client';

import { ClerkProvider } from '@clerk/nextjs';

function hasClerkKeys() {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ?? '';
  if (!key || key === 'pk_test_placeholder' || key.includes('...')) return false;
  return key.startsWith('pk_test_') || key.startsWith('pk_live_');
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (!hasClerkKeys()) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
