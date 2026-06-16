import Link from 'next/link';
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SITE } from '@/lib/constants';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sf-blue/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="section-padding relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-sm">
            <BookOpen className="h-4 w-4" />
            734+ Interview Questions · 9 Topics
          </div>

          <h1 className="font-display text-4xl font-bold tracking-tight text-secondary sm:text-5xl lg:text-6xl">
            Decode Salesforce Like a{' '}
            <span className="text-gradient">Solution Architect</span>
          </h1>

          <p className="mt-6 text-lg text-muted sm:text-xl">{SITE.subtitle}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="bg-gradient-brand shadow-lg shadow-primary/20" asChild>
              <Link href="/learn">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 bg-white/80" asChild>
              <Link href="/interview">
                <MessageSquare className="h-4 w-4" />
                Interview Questions
              </Link>
            </Button>
          </div>

          <p className="mt-4 text-xs text-muted">
            <strong className="text-secondary">Start Learning</strong> → topic-wise guided paths &nbsp;|&nbsp;
            <strong className="text-secondary">Interview Questions</strong> → scenario-based interview prep
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Agentforce', slug: 'agentforce' },
              { label: 'Data Cloud', slug: 'data-cloud' },
              { label: 'Apex', slug: 'apex' },
              { label: 'LWC', slug: 'lwc' },
              { label: 'Integration', slug: 'integration' },
            ].map((t) => (
              <Link
                key={t.slug}
                href={`/learn/${t.slug}`}
                className="rounded-full border border-primary/15 bg-white/80 px-4 py-1.5 text-sm text-muted shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/10 hover:text-primary"
              >
                {t.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
