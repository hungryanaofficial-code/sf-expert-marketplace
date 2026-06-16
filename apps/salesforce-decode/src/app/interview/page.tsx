import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { TopicGrid } from '@/components/interview/TopicGrid';
import { buildMetadata } from '@/lib/seo';
import { ALL_QUESTIONS, DIFFICULTY_STATS } from '@/data/questions';

export const metadata: Metadata = buildMetadata({
  title: 'Salesforce Interview Questions | Topic-Wise Practice',
  description:
    '734+ scenario-based Salesforce interview questions organized by topic — Agentforce, Apex, LWC, Integration, and more.',
  path: '/interview',
});

export default function InterviewPage() {
  return (
    <div>
      <section className="border-b border-primary/10 bg-gradient-hero py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-brand text-white shadow-lg shadow-primary/20">
              <MessageSquare className="h-7 w-7" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-secondary">Interview Questions</h1>
              <p className="mt-3 max-w-2xl text-muted">
                Practice by topic with difficulty triggers — from <strong>Beginner</strong> to{' '}
                <strong>Architect (Hardest)</strong>. Each topic has unique scenario-based questions.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                  Beginner: {DIFFICULTY_STATS.BEGINNER}
                </span>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-800">
                  Intermediate: {DIFFICULTY_STATS.INTERMEDIATE}
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                  Advanced: {DIFFICULTY_STATS.ADVANCED}
                </span>
                <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-800">
                  Architect: {DIFFICULTY_STATS.ARCHITECT}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gradient-section">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-2 font-display text-2xl font-bold text-secondary">Select Interview Topic</h2>
          <p className="mb-8 text-muted">
            {ALL_QUESTIONS.length}+ questions across 9 topics — each with its own difficulty filters and focus areas
          </p>
          <TopicGrid mode="interview" basePath="/interview/topics" />
        </div>
      </section>

      <section className="border-t border-border bg-white py-10 text-center">
        <p className="text-muted">
          New to Salesforce?{' '}
          <Link href="/learn" className="font-medium text-primary hover:underline">
            Start Learning first →
          </Link>
        </p>
      </section>
    </div>
  );
}
