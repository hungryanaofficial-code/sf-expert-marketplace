import Link from 'next/link';
import {
  Bot,
  Building2,
  Code2,
  Component,
  Database,
  GitBranch,
  Landmark,
  Layers,
  Workflow,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { CATEGORIES } from '@/data/categories';
import { ALL_QUESTIONS } from '@/data/questions';
import { cn } from '@/lib/utils';

const ICONS: Record<string, LucideIcon> = {
  Bot,
  Database,
  Layers,
  Code2,
  Component,
  GitBranch,
  Building2,
  Workflow,
  Landmark,
};

interface TopicGridProps {
  mode: 'learn' | 'interview';
  basePath: string;
}

export function TopicGrid({ mode, basePath }: TopicGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.icon] ?? Code2;
        const count = ALL_QUESTIONS.filter((q) => q.categorySlug === cat.slug).length;
        const beginnerCount = ALL_QUESTIONS.filter(
          (q) => q.categorySlug === cat.slug && q.difficulty === 'BEGINNER'
        ).length;
        const architectCount = ALL_QUESTIONS.filter(
          (q) => q.categorySlug === cat.slug && q.difficulty === 'ARCHITECT'
        ).length;

        return (
          <Link key={cat.slug} href={`${basePath}/${cat.slug}`}>
            <article
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-border bg-white p-6 card-hover',
                'before:absolute before:inset-0 before:bg-gradient-card before:opacity-0 before:transition-opacity hover:before:opacity-100'
              )}
            >
              <div className="relative">
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-secondary group-hover:text-primary">
                  {cat.name}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{cat.description}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-surface px-2.5 py-1 text-muted">
                    {count} questions
                  </span>
                  {mode === 'learn' && beginnerCount > 0 && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                      {beginnerCount} beginner
                    </span>
                  )}
                  {mode === 'interview' && architectCount > 0 && (
                    <span className="rounded-full bg-purple-50 px-2.5 py-1 text-purple-700">
                      {architectCount} architect
                    </span>
                  )}
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {mode === 'learn' ? 'Start topic' : 'Practice topic'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
