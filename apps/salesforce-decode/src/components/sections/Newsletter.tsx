'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed');
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section-padding bg-primary">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-3xl font-bold text-white">Stay Updated</h2>
        <p className="mt-3 text-primary-light/90">
          Get new interview questions, architecture guides, and Salesforce career tips in your inbox.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-white/60"
          />
          <Button
            type="submit"
            variant="secondary"
            disabled={status === 'loading'}
            className="shrink-0"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>

        {status === 'success' && (
          <p className="mt-4 text-sm text-white/90">Thanks for subscribing!</p>
        )}
        {status === 'error' && (
          <p className="mt-4 text-sm text-red-200">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  );
}
