'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ALL_QUESTIONS } from '@/data/questions';
import { CATEGORIES } from '@/data/categories';
import { TOPIC_TRIGGERS, DIFFICULTY_ORDER } from '@/data/topic-triggers';
import { DIFFICULTY_LABELS } from '@/lib/constants';

interface TopicQuestionBankProps {
  categorySlug: string;
  mode: 'learn' | 'interview';
  initialDifficulty?: string;
  initialTag?: string;
}

export function TopicQuestionBank({
  categorySlug,
  mode,
  initialDifficulty = '',
  initialTag = '',
}: TopicQuestionBankProps) {
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const triggers = TOPIC_TRIGGERS[categorySlug] ?? [{ label: 'All', tag: '' }];

  const defaultDifficulty =
    initialDifficulty ||
    (mode === 'learn' ? 'BEGINNER' : '');

  const [difficulty, setDifficulty] = useState(defaultDifficulty);
  const [tag, setTag] = useState(initialTag);
  const [query, setQuery] = useState('');

  const categoryQuestions = useMemo(
    () => ALL_QUESTIONS.filter((q) => q.categorySlug === categorySlug),
    [categorySlug]
  );

  const difficultyCounts = useMemo(() => {
    const counts: Record<string, number> = { '': categoryQuestions.length };
    for (const d of DIFFICULTY_ORDER) {
      counts[d] = categoryQuestions.filter((q) => q.difficulty === d).length;
    }
    return counts;
  }, [categoryQuestions]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return categoryQuestions.filter((question) => {
      if (difficulty && question.difficulty !== difficulty) return false;
      if (tag && !question.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))
        return false;
      if (q) {
        const haystack = [question.title, question.realWorldScenario, ...question.tags]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [categoryQuestions, difficulty, tag, query]);

  return (
    <div>
      {/* Difficulty triggers */}
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-secondary">Difficulty Level</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDifficulty('')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              difficulty === ''
                ? 'bg-gradient-brand text-white shadow-md'
                : 'bg-white text-muted border border-border hover:border-primary/40'
            }`}
          >
            All ({difficultyCounts['']})
          </button>
          {DIFFICULTY_ORDER.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDifficulty(d)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                difficulty === d
                  ? 'bg-gradient-brand text-white shadow-md'
                  : 'bg-white text-muted border border-border hover:border-primary/40'
              }`}
            >
              {DIFFICULTY_LABELS[d]}
              {d === 'ARCHITECT' ? ' ★' : ''} ({difficultyCounts[d] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {/* Sub-topic triggers */}
      {triggers.length > 1 && (
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-secondary">
            {categorySlug === 'apex' ? 'Focus Area (Triggers, Async, etc.)' : 'Topic Focus'}
          </p>
          <div className="flex flex-wrap gap-2">
            {triggers.map((t) => (
              <button
                key={t.label}
                type="button"
                onClick={() => setTag(t.tag)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  tag === t.tag
                    ? 'bg-primary/15 text-primary border border-primary/30'
                    : 'bg-surface text-muted border border-border hover:bg-primary/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="search"
          placeholder={`Search ${category?.name ?? 'topic'} questions...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex h-11 w-full rounded-xl border border-border bg-white pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <p className="mb-4 text-sm text-muted">
        Showing <strong className="text-secondary">{filtered.length}</strong> of{' '}
        {categoryQuestions.length} {category?.name} questions
      </p>

      <div className="space-y-4">
        {filtered.map((question) => (
          <Link key={question.slug} href={`/interview/${question.slug}`}>
            <Card hover>
              <CardHeader className="mb-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap gap-2">
                      <Badge variant="difficulty" difficulty={question.difficulty} />
                      {question.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="tag">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-base">{question.title}</CardTitle>
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
          <div className="rounded-xl border border-dashed border-border bg-surface py-16 text-center">
            <p className="text-muted">No questions match these filters. Try another difficulty or topic.</p>
          </div>
        )}
      </div>
    </div>
  );
}
