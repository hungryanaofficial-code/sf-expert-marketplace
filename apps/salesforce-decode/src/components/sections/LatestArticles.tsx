import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ARTICLES } from '@/data/articles';

export function LatestArticles() {
  return (
    <section className="section-padding bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <h2 className="font-display text-3xl font-bold text-secondary">Latest Articles</h2>
          <p className="mt-2 text-muted">Deep dives into Salesforce architecture and implementation</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ARTICLES.slice(0, 3).map((article) => (
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

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            View all articles →
          </Link>
        </div>
      </div>
    </section>
  );
}
