import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { TopicQuestionBank } from '@/components/interview/TopicQuestionBank';
import { CATEGORIES } from '@/data/categories';
import { ALL_QUESTIONS } from '@/data/questions';
import { buildMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ difficulty?: string; tag?: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};

  return buildMetadata({
    title: `${cat.name} Interview Questions | Salesforce Decode`,
    description: `Practice ${cat.name} interview questions with expected answers, follow-ups, and architect perspectives.`,
    path: `/interview/topics/${slug}`,
  });
}

export default async function InterviewTopicPage({ params, searchParams }: PageProps) {
  const { category: slug } = await params;
  const query = await searchParams;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) notFound();

  const count = ALL_QUESTIONS.filter((q) => q.categorySlug === slug).length;

  return (
    <div>
      <section
        className="border-b border-primary/10 py-12"
        style={{
          background: `linear-gradient(135deg, ${cat.color}10 0%, #f8faff 50%, ${cat.color}06 100%)`,
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/interview"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All interview topics
          </Link>
          <h1 className="font-display text-3xl font-bold text-secondary sm:text-4xl">
            {cat.name} Interview Questions
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{cat.description}</p>
          <p className="mt-2 text-sm font-medium text-primary">{count} unique questions in this topic</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <TopicQuestionBank
            categorySlug={slug}
            mode="interview"
            initialDifficulty={query.difficulty ?? ''}
            initialTag={query.tag ?? ''}
          />
        </div>
      </section>
    </div>
  );
}
