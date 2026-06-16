export type Difficulty = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'ARCHITECT';

export interface FollowUpDetail {
  question: string;
  answer: string;
}

export interface QuestionSeed {
  slug: string;
  title: string;
  difficulty: Difficulty;
  categorySlug: string;
  expectedAnswer: string;
  followUpQuestions: string[];
  followUpDetails: FollowUpDetail[];
  realWorldScenario: string;
  architectPerspective: string;
  tags: string[];
}

export interface CategorySeed {
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  sortOrder: number;
  targetCount: number;
}

export interface ArticleSeed {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  categorySlug: string;
  seoTitle: string;
  seoDescription: string;
  readTimeMinutes: number;
  tags: string[];
}

export interface CareerMilestone {
  company: string;
  role: string;
  period: string;
  description: string;
  learnings: string[];
}

export interface SkillCard {
  name: string;
  icon: string;
  level: string;
}
