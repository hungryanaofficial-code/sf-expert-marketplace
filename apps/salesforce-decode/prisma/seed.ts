import { PrismaClient, Difficulty, ArticleStatus } from '@prisma/client';
import { CATEGORIES } from '../src/data/categories';
import { ALL_QUESTIONS } from '../src/data/questions';
import { ARTICLES } from '../src/data/articles';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Salesforce Decode database...');

  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  const categories = await prisma.category.findMany();
  const categoryMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  const allTags = new Set<string>();
  ALL_QUESTIONS.forEach((q) => q.tags.forEach((t) => allTags.add(t)));
  ARTICLES.forEach((a) => a.tags.forEach((t) => allTags.add(t)));

  for (const tagName of allTags) {
    const slug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name: tagName, slug },
    });
  }

  const tags = await prisma.tag.findMany();
  const tagMap = Object.fromEntries(tags.map((t) => [t.name, t.id]));

  for (const q of ALL_QUESTIONS) {
    const question = await prisma.question.upsert({
      where: { slug: q.slug },
      update: {
        title: q.title,
        difficulty: q.difficulty as Difficulty,
        expectedAnswer: q.expectedAnswer,
        followUpQuestions: q.followUpQuestions,
        realWorldScenario: q.realWorldScenario,
        architectPerspective: q.architectPerspective,
        isPublished: true,
      },
      create: {
        slug: q.slug,
        title: q.title,
        difficulty: q.difficulty as Difficulty,
        categoryId: categoryMap[q.categorySlug],
        expectedAnswer: q.expectedAnswer,
        followUpQuestions: q.followUpQuestions,
        realWorldScenario: q.realWorldScenario,
        architectPerspective: q.architectPerspective,
        isPublished: true,
      },
    });

    for (const tagName of q.tags) {
      const tagId = tagMap[tagName];
      if (tagId) {
        await prisma.questionTag.upsert({
          where: { questionId_tagId: { questionId: question.id, tagId } },
          update: {},
          create: { questionId: question.id, tagId },
        });
      }
    }
  }

  for (const article of ARTICLES) {
    const created = await prisma.article.upsert({
      where: { slug: article.slug },
      update: {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        readTimeMinutes: article.readTimeMinutes,
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
      },
      create: {
        slug: article.slug,
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        categoryId: categoryMap[article.categorySlug],
        seoTitle: article.seoTitle,
        seoDescription: article.seoDescription,
        readTimeMinutes: article.readTimeMinutes,
        status: ArticleStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });

    for (const tagName of article.tags) {
      const tagId = tagMap[tagName];
      if (tagId) {
        await prisma.articleTag.upsert({
          where: { articleId_tagId: { articleId: created.id, tagId } },
          update: {},
          create: { articleId: created.id, tagId },
        });
      }
    }
  }

  console.log(`Seeded ${ALL_QUESTIONS.length} questions, ${ARTICLES.length} articles`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
