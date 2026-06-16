'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Bookmark, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { DIFFICULTY_LABELS } from '@/lib/constants';

interface InterviewFiltersProps {
  initialCategory?: string;
  initialDifficulty?: string;
  initialQuery?: string;
}

export function InterviewFilters({
  initialCategory = '',
  initialDifficulty = '',
  initialQuery = '',
}: InterviewFiltersProps) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [tag, setTag] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_QUESTIONS.forEach((q) => q.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return ALL_QUESTIONS.filter((question) => {
      if (category && question.categorySlug !== category) return false;
      if (difficulty && question.difficulty !== difficulty) return false;
      if (tag && !question.tags.includes(tag)) return false;
      if (q) {
        const haystack = [
          question.title,
          question.realWorldScenario,
          ...question.tags,
          question.categorySlug,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [query, category, difficulty, tag]);

  return (
    <div>
      <div className="mb-8 rounded-xl border border-border bg-surface p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-secondary">
          <Filter className="h-4 w-4" />
          Search & Filter
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative md:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search questions..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex h-11 w-full rounded-lg border border-border bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: '', label: 'All Categories' },
              ...CATEGORIES.map((c) => ({ value: c.slug, label: c.name })),
            ]}
          />
          <Select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            options={[
              { value: '', label: 'All Levels' },
              ...Object.entries(DIFFICULTY_LABELS).map(([v, l]) => ({ value: v, label: l })),
            ]}
          />
          <Select
            label="Tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            options={[
              { value: '', label: 'All Tags' },
              ...allTags.slice(0, 30).map((t) => ({ value: t, label: t })),
            ]}
          />
        </div>
        <p className="mt-4 text-sm text-muted">
          Showing {filtered.length} of {ALL_QUESTIONS.length} questions
        </p>
      </div>

      <div className="space-y-4">
        {filtered.map((question) => (
          <Link key={question.slug} href={`/interview/${question.slug}`}>
            <Card hover>
              <CardHeader className="mb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant="category">
                        {CATEGORIES.find((c) => c.slug === question.categorySlug)?.name ??
                          question.categorySlug}
                      </Badge>
                      <Badge variant="difficulty" difficulty={question.difficulty} />
                      {question.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="tag">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle>{question.title}</CardTitle>
                  </div>
                  <Bookmark className="h-5 w-5 shrink-0 text-muted" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="line-clamp-2">
                  {question.realWorldScenario}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}

        {filtered.length === 0 && (
          <div className="rounded-xl border border-dashed border-border py-16 text-center">
            <p className="text-muted">No questions match your filters. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
