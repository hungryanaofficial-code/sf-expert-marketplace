import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getFeaturedQuestions } from '@/data/questions';

export function FeaturedQuestions() {
  const questions = getFeaturedQuestions(6);

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-secondary">
              Featured Interview Questions
            </h2>
            <p className="mt-2 text-muted">
              Scenario-based questions with expected answers and architect perspectives
            </p>
          </div>
          <Link
            href="/interview"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {questions.map((q) => (
            <Link key={q.slug} href={`/interview/${q.slug}`}>
              <Card hover className="h-full">
                <CardHeader>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <Badge variant="category">{q.categorySlug.replace(/-/g, ' ')}</Badge>
                    <Badge variant="difficulty" difficulty={q.difficulty} />
                  </div>
                  <CardTitle className="line-clamp-2">{q.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-3">{q.realWorldScenario}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
