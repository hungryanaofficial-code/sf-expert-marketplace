import type { Metadata } from 'next';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ARTICLES } from '@/data/articles';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Salesforce Blog | Architecture & Interview Guides',
  description:
    'In-depth articles on Agentforce, Data Cloud, Apex, LWC, Integration, and Salesforce enterprise architecture.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <div className="bg-white">
      <section className="border-b border-border bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-secondary">Blog</h1>
          <p className="mt-3 text-muted">
            Architecture guides, implementation patterns, and career insights
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card hover className="h-full">
                  <CardHeader>
                    <Badge variant="category">{article.categorySlug.replace(/-/g, ' ')}</Badge>
                    <CardTitle className="mt-2 line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                    <div className="mt-4 flex items-center gap-1 text-xs text-muted">
                      <Clock className="h-3.5 w-3.5" />
                      {article.readTimeMinutes} min read
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
