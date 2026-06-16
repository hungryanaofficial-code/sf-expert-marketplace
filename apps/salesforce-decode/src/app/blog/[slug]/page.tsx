import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ARTICLES } from '@/data/articles';
import { buildMetadata, buildArticleSchema } from '@/lib/seo';
import { SITE } from '@/lib/constants';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};

  return buildMetadata({
    title: article.seoTitle,
    description: article.seoDescription,
    path: `/blog/${slug}`,
    type: 'article',
  });
}

function renderMarkdown(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h2 key={i} className="mt-8 mb-4 font-display text-2xl font-bold text-secondary">
          {line.slice(3)}
        </h2>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <h3 key={i} className="mt-6 mb-3 font-display text-xl font-semibold text-secondary">
          {line.slice(4)}
        </h3>
      );
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="ml-4 list-disc text-muted">
          {line.slice(2)}
        </li>
      );
    }
    if (line.startsWith('|')) return null;
    if (line.trim() === '') return <br key={i} />;
    return (
      <p key={i} className="text-muted leading-relaxed">
        {line}
      </p>
    );
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const schema = buildArticleSchema({
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishedAt: new Date('2025-06-01'),
    authorName: SITE.owner,
  });

  return (
    <article className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="section-padding">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blog
          </Link>

          <Badge variant="category">{article.categorySlug.replace(/-/g, ' ')}</Badge>
          <h1 className="mt-4 font-display text-4xl font-bold text-secondary">{article.title}</h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-muted">
            <span>By {SITE.owner}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTimeMinutes} min read
            </span>
          </div>
          <p className="mt-6 text-lg text-muted">{article.excerpt}</p>

          <div className="prose-custom mt-10">{renderMarkdown(article.content)}</div>

          <div className="mt-10 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="tag">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
