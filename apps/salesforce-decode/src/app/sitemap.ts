import type { MetadataRoute } from 'next';
import { ALL_QUESTIONS } from '@/data/questions';
import { ARTICLES } from '@/data/articles';
import { CATEGORIES } from '@/data/categories';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/about', '/learn', '/interview', '/blog'].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const learnTopics = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/learn/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const interviewTopics = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/interview/topics/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  const questionPages = ALL_QUESTIONS.map((q) => ({
    url: `${SITE_URL}/interview/${q.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages = ARTICLES.map((a) => ({
    url: `${SITE_URL}/blog/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...learnTopics, ...interviewTopics, ...questionPages, ...articlePages];
}
