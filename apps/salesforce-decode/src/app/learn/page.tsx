import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { TopicGrid } from '@/components/interview/TopicGrid';
import { buildMetadata } from '@/lib/seo';
import { ALL_QUESTIONS } from '@/data/questions';

export const metadata: Metadata = buildMetadata({
  title: 'Start Learning Salesforce | Topic-Wise Guides',
  description:
    'Learn Salesforce topic by topic — Agentforce, Data Cloud, Apex, LWC, and more. Beginner-friendly paths with real scenarios.',
  path: '/learn',
});

export default function LearnPage() {
  const beginnerCount = ALL_QUESTIONS.filter((q) => q.difficulty === 'BEGINNER').length;

  return (
    <div>
      <section className="border-b border-primary/10 bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/20">
              <GraduationCap className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-secondary">Start Learning</h1>
              <p className="mt-3 max-w-2xl text-muted">
                Pick a topic and learn step by step — from <strong>Beginner</strong> fundamentals to
                advanced patterns. {beginnerCount}+ beginner questions to get you started.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-section">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 font-display text-2xl font-bold text-secondary">Choose Your Topic</h2>
          <p className="mb-8 text-muted">Each topic has its own learning path with focused questions</p>
          <TopicGrid mode="learn" basePath="/learn" />
        </div>
      </section>

      <section className="border-t border-border bg-white py-10 text-center">
        <p className="text-muted">
          Ready for interview prep?{' '}
          <Link href="/interview" className="font-medium text-primary hover:underline">
            Go to Interview Questions →
          </Link>
        </p>
      </section>
    </div>
  );
}
