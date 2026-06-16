import type { Difficulty, FollowUpDetail, QuestionSeed } from '@/types';

const PATTERNS: { match: RegExp; build: (ctx: EnrichCtx) => string }[] = [
  {
    match: /how (?:would|do) you (?:prevent|avoid|stop|reduce)/i,
    build: ({ points, note }) =>
      `Prevent it by design, not after the fact. ${pick(points, 0)} ${pick(points, 2)} Add monitoring and alerts so you catch issues before users do. ${short(note)}`,
  },
  {
    match: /how (?:would|do) you (?:handle|manage|deal)/i,
    build: ({ points, followUp, note }) =>
      `Handle it in layers. First: ${pick(points, 0)} If that fails: ${pick(points, 1)} For edge cases in "${truncate(followUp, 50)}", ${pick(points, 2) || pick(points, 0)} ${short(note)}`,
  },
  {
    match: /how (?:would|do) you (?:design|architect|build|implement)/i,
    build: ({ points, note }) =>
      `Design approach: ${pick(points, 0)} Then ${pick(points, 1)} Keep it modular so each piece can change independently. ${short(note)}`,
  },
  {
    match: /how (?:would|do) you (?:test|validate|verify)/i,
    build: ({ points, note }) =>
      `Test at three levels: unit (isolated logic), integration (end-to-end flow), and UAT (real user scenarios). ${pick(points, 0)} Use sandbox data that mirrors production volume. ${short(note)}`,
  },
  {
    match: /when (?:would|should) you/i,
    build: ({ points, note }) =>
      `Use this approach when volume, complexity, or compliance demands it. ${pick(points, 0)} Avoid it when a simpler declarative solution works. ${short(note)}`,
  },
  {
    match: /what (?:is|are) (?:the|your)/i,
    build: ({ points, note }) =>
      `${pick(points, 0)} Key factors: ${pick(points, 1)} ${pick(points, 2) || ''} ${short(note)}`.trim(),
  },
  {
    match: /what (?:happens|would happen)/i,
    build: ({ points, note }) =>
      `If not handled: governor limits hit, data inconsistency, or failed transactions. ${pick(points, 0)} Always plan rollback and error notification. ${short(note)}`,
  },
  {
    match: /why (?:not|would|should|use)/i,
    build: ({ points, note }) =>
      `Because ${pick(points, 0).toLowerCase()} The trade-off is maintenance cost vs flexibility. ${short(note)}`,
  },
  {
    match: /which (?:is better|approach|option)/i,
    build: ({ points, note }) =>
      `No one-size answer — it depends on volume, team skills, and timeline. ${pick(points, 0)} For enterprise scale: ${pick(points, 1)} ${short(note)}`,
  },
  {
    match: /can you|could you/i,
    build: ({ points, note }) =>
      `Yes, but with constraints. ${pick(points, 0)} Watch governor limits and test at production data volumes. ${short(note)}`,
  },
  {
    match: /difference between|vs\.?|versus/i,
    build: ({ points, note }) =>
      `Main difference: use case and scale. ${pick(points, 0)} ${pick(points, 1)} Pick based on your integration pattern and team capability. ${short(note)}`,
  },
  {
    match: /trade.?off|pros and cons/i,
    build: ({ points, note }) =>
      `Pros: ${pick(points, 0)} Cons: added complexity and ops overhead. ${pick(points, 1)} ${short(note)}`,
  },
  {
    match: /governor|limit|performance|scale/i,
    build: ({ points, note }) =>
      `Stay within limits by: ${pick(points, 0)} Bulkify everything — never query or DML in loops. ${pick(points, 2) || pick(points, 1)} ${short(note)}`,
  },
  {
    match: /security|compliance|gdpr|pii|fls|crud/i,
    build: ({ points, note }) =>
      `Security first: ${pick(points, 0)} Enforce CRUD/FLS explicitly — \`with sharing\` alone is not enough. ${pick(points, 1)} ${short(note)}`,
  },
  {
    match: /error|failure|retry|timeout/i,
    build: ({ points, note }) =>
      `Never fail silently. ${pick(points, 0)} Implement retry with exponential backoff and a dead-letter queue for permanent failures. ${short(note)}`,
  },
];

interface EnrichCtx {
  followUp: string;
  title: string;
  points: string[];
  note: string;
  difficulty: Difficulty;
  categorySlug: string;
}

function pick(points: string[], i: number): string {
  const p = points[i];
  if (!p) return '';
  return p.endsWith('.') ? p : `${p}.`;
}

function short(note: string): string {
  const s = note.split('.')[0];
  return s.length > 20 ? `${s}.` : '';
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function difficultyTone(d: Difficulty): string {
  switch (d) {
    case 'BEGINNER':
      return 'Keep the solution simple and well-documented for the team.';
    case 'INTERMEDIATE':
      return 'Balance speed of delivery with maintainability.';
    case 'ADVANCED':
      return 'Optimize for scale and operational observability.';
    case 'ARCHITECT':
      return 'Document the decision in an ADR and align with enterprise standards.';
  }
}

function generateAnswer(ctx: EnrichCtx): string {
  if (ctx.followUp.trim().length < 5) return 'Review the expected answer above for context.';

  for (const { match, build } of PATTERNS) {
    if (match.test(ctx.followUp)) {
      const answer = build(ctx).replace(/\s+/g, ' ').trim();
      return `${answer} ${difficultyTone(ctx.difficulty)}`;
    }
  }

  // Default: synthesize from answer points
  const bullets = ctx.points.slice(0, 3).map((p) => p.replace(/^•\s*/, ''));
  return [
    `Direct answer: ${bullets[0] || 'Apply the core pattern from the main answer.'}`,
    bullets[1] ? `Also consider: ${bullets[1]}` : '',
    bullets[2] ? `In practice: ${bullets[2]}` : '',
    difficultyTone(ctx.difficulty),
  ]
    .filter(Boolean)
    .join(' ');
}

export function enrichFollowUps(question: QuestionSeed): QuestionSeed {
  const points = question.expectedAnswer
    .split('\n')
    .map((l) => l.replace(/^•\s*/, '').trim())
    .filter(Boolean);

  const followUpDetails: FollowUpDetail[] = question.followUpDetails.map((item) => ({
    question: item.question,
    answer:
      item.answer.trim() ||
      generateAnswer({
        followUp: item.question,
        title: question.title,
        points,
        note: question.architectPerspective,
        difficulty: question.difficulty,
        categorySlug: question.categorySlug,
      }),
  }));

  return {
    ...question,
    followUpDetails,
    followUpQuestions: followUpDetails.map((f) => f.question),
  };
}

export function enrichAllQuestions(questions: QuestionSeed[]): QuestionSeed[] {
  return questions.map(enrichFollowUps);
}
