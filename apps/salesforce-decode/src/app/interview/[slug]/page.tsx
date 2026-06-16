import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { QuestionDetail } from '@/components/interview/QuestionDetail';
import { ALL_QUESTIONS } from '@/data/questions';
import { buildMetadata, buildQuestionSchema } from '@/lib/seo';
import { CATEGORIES } from '@/data/categories';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_QUESTIONS.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const question = ALL_QUESTIONS.find((q) => q.slug === slug);
  if (!question) return {};

  const category = CATEGORIES.find((c) => c.slug === question.categorySlug);
  return buildMetadata({
    title: question.title,
    description: question.realWorldScenario.slice(0, 160),
    path: `/interview/${slug}`,
    type: 'article',
  });
}

export default async function QuestionPage({ params }: PageProps) {
  const { slug } = await params;
  const question = ALL_QUESTIONS.find((q) => q.slug === slug);
  if (!question) notFound();

  const category = CATEGORIES.find((c) => c.slug === question.categorySlug);
  const schema = buildQuestionSchema({
    title: question.title,
    slug: question.slug,
    expectedAnswer: question.expectedAnswer,
    difficulty: question.difficulty,
    category: { name: category?.name ?? question.categorySlug },
  });

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="section-padding">
        <QuestionDetail question={question} />
      </section>
    </div>
  );
}
