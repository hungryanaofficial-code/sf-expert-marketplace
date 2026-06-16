import type { Difficulty, FollowUpDetail, QuestionSeed } from '@/types';

export interface FollowUpItem {
  question: string;
  answer: string;
}

export interface TopicTemplate {
  title: string;
  difficulty: Difficulty;
  tags: string[];
  scenario: string;
  answerPoints: string[];
  /** Legacy: questions only — answers auto-generated at build time if followUpDetails omitted */
  followUps?: string[];
  /** Preferred: question + direct answer pairs */
  followUpDetails?: FollowUpItem[];
  architectNote: string;
}

export function buildQuestion(
  categorySlug: string,
  index: number,
  template: TopicTemplate
): QuestionSeed {
  const slug = `${categorySlug}-${slugify(template.title).slice(0, 60)}-${index}`;

  const followUpDetails: FollowUpDetail[] = template.followUpDetails?.length
    ? template.followUpDetails
    : (template.followUps ?? []).map((question) => ({
        question,
        answer: '', // filled by enrichFollowUps in index.ts
      }));

  return {
    slug,
    title: template.title,
    difficulty: template.difficulty,
    categorySlug,
    expectedAnswer: template.answerPoints.map((p) => `• ${p}`).join('\n'),
    followUpQuestions: followUpDetails.map((f) => f.question),
    followUpDetails,
    realWorldScenario: template.scenario,
    architectPerspective: template.architectNote,
    tags: template.tags,
  };
}

export function buildQuestionBank(
  categorySlug: string,
  templates: TopicTemplate[]
): QuestionSeed[] {
  return templates.map((template, index) => buildQuestion(categorySlug, index + 1, template));
}

/** @deprecated Prefer buildQuestionBank */
export function expandQuestionBank(
  categorySlug: string,
  detailed: TopicTemplate[],
  extras: TopicTemplate[],
  targetCount: number
): QuestionSeed[] {
  return buildQuestionBank(categorySlug, [...detailed, ...extras].slice(0, targetCount));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
