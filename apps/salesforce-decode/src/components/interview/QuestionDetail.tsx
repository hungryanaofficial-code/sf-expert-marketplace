'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Bookmark, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/data/categories';
import { DIFFICULTY_LABELS } from '@/lib/constants';
import type { FollowUpDetail, QuestionSeed } from '@/types';

function FollowUpItem({ item, index }: { item: FollowUpDetail; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-lg border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 p-4 text-left"
      >
        <div className="flex gap-3">
          <span className="mt-0.5 shrink-0 font-semibold text-primary">{index + 1}.</span>
          <span className="font-medium text-secondary">{item.question}</span>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-muted" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-muted" />
        )}
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <p className="pl-7 text-sm leading-relaxed text-muted">{item.answer}</p>
        </div>
      )}
    </div>
  );
}

interface QuestionDetailProps {
  question: QuestionSeed;
}

export function QuestionDetail({ question }: QuestionDetailProps) {
  const category = CATEGORIES.find((c) => c.slug === question.categorySlug);
  const difficultyLabel = DIFFICULTY_LABELS[question.difficulty] ?? question.difficulty;

  return (
    <article className="mx-auto max-w-4xl">
      <Link
        href="/interview"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to questions
      </Link>

      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="category">{category?.name ?? question.categorySlug}</Badge>
        <Badge variant="difficulty" difficulty={question.difficulty}>
          {question.difficulty === 'ARCHITECT' ? `${difficultyLabel} (Hardest)` : difficultyLabel}
        </Badge>
        {question.tags.map((tag) => (
          <Badge key={tag} variant="tag">
            {tag}
          </Badge>
        ))}
      </div>

      <h1 className="font-display text-3xl font-bold text-secondary sm:text-4xl">
        {question.title}
      </h1>

      <div className="mt-6 flex gap-3">
        <Button variant="outline" size="sm">
          <Bookmark className="h-4 w-4" />
          Bookmark
        </Button>
        <Button variant="outline" size="sm">
          Mark Complete
        </Button>
      </div>

      <Card className="mt-8 border-l-4 border-l-sf-blue">
        <CardHeader>
          <CardTitle className="text-base text-sf-accent">Real World Scenario</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary leading-relaxed">{question.realWorldScenario}</p>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base text-primary">Expected Answer</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none whitespace-pre-line text-secondary leading-relaxed">
            {question.expectedAnswer}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base text-primary">Follow-Up Questions & Answers</CardTitle>
          <p className="text-sm text-muted">
            Click to expand — each follow-up includes a direct, interview-ready answer
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.followUpDetails.map((item, i) => (
            <FollowUpItem key={item.question} item={item} index={i} />
          ))}
        </CardContent>
      </Card>

      <Card className="mt-6 border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="text-base text-primary">Architect Perspective</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-secondary leading-relaxed">{question.architectPerspective}</p>
        </CardContent>
      </Card>
    </article>
  );
}
