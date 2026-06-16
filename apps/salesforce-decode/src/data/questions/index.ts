import type { QuestionSeed } from '@/types';
import { enrichAllQuestions } from '@/lib/enrich-followups';
import { agentforceQuestions } from './agentforce';
import { dataCloudQuestions } from './data-cloud';
import { headless360Questions } from './headless-360';
import { apexQuestions } from './apex';
import { lwcQuestions } from './lwc';
import { integrationQuestions } from './integration';
import { architectureQuestions } from './architecture';
import { omnistudioQuestions } from './omnistudio';
import { fscQuestions } from './fsc';
import { BEGINNER_QUESTIONS } from './beginner-questions';

const RAW_QUESTIONS: QuestionSeed[] = [
  ...BEGINNER_QUESTIONS,
  ...agentforceQuestions,
  ...dataCloudQuestions,
  ...headless360Questions,
  ...apexQuestions,
  ...lwcQuestions,
  ...integrationQuestions,
  ...architectureQuestions,
  ...omnistudioQuestions,
  ...fscQuestions,
];

/** All questions with auto-enriched follow-up answers where missing */
export const ALL_QUESTIONS: QuestionSeed[] = enrichAllQuestions(RAW_QUESTIONS);

export function getQuestionsByCategory(slug: string): QuestionSeed[] {
  return ALL_QUESTIONS.filter((q) => q.categorySlug === slug);
}

export function getQuestionsByDifficulty(difficulty: string): QuestionSeed[] {
  return ALL_QUESTIONS.filter((q) => q.difficulty === difficulty);
}

export function getFeaturedQuestions(limit = 12): QuestionSeed[] {
  const tiers: QuestionSeed['difficulty'][] = [
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'ARCHITECT',
  ];
  const featured: QuestionSeed[] = [];
  const seen = new Set<string>();

  for (const tier of tiers) {
    for (const q of ALL_QUESTIONS.filter((x) => x.difficulty === tier)) {
      const key = `${q.categorySlug}-${tier}`;
      if (seen.has(key)) continue;
      featured.push(q);
      seen.add(key);
      if (featured.length >= limit) return featured;
    }
  }

  for (const q of ALL_QUESTIONS) {
    if (featured.length >= limit) break;
    if (!featured.includes(q)) featured.push(q);
  }

  return featured.slice(0, limit);
}

export const DIFFICULTY_STATS = {
  BEGINNER: ALL_QUESTIONS.filter((q) => q.difficulty === 'BEGINNER').length,
  INTERMEDIATE: ALL_QUESTIONS.filter((q) => q.difficulty === 'INTERMEDIATE').length,
  ADVANCED: ALL_QUESTIONS.filter((q) => q.difficulty === 'ADVANCED').length,
  ARCHITECT: ALL_QUESTIONS.filter((q) => q.difficulty === 'ARCHITECT').length,
};
