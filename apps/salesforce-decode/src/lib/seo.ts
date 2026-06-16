import { SITE_URL } from './site';

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  author?: string;
}

export function buildMetadata({
  title,
  description,
  path = '',
  image = '/og-image.png',
  type = 'website',
}: SeoProps) {
  const url = `${SITE_URL}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: 'Salesforce Decode',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildQuestionSchema(question: {
  title: string;
  slug: string;
  expectedAnswer: string;
  difficulty: string;
  category: { name: string };
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question.title,
    url: `${SITE_URL}/interview/${question.slug}`,
    acceptedAnswer: {
      '@type': 'Answer',
      text: question.expectedAnswer.slice(0, 500),
    },
    about: {
      '@type': 'Thing',
      name: question.category.name,
    },
    educationalLevel: question.difficulty,
  };
}

export function buildArticleSchema(article: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt?: Date | null;
  authorName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/blog/${article.slug}`,
    author: { '@type': 'Person', name: article.authorName },
    publisher: {
      '@type': 'Organization',
      name: 'Salesforce Decode',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    },
    datePublished: article.publishedAt?.toISOString(),
  };
}

export function buildWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Salesforce Decode',
    url: SITE_URL,
    description:
      'Salesforce interview preparation, scenario-based questions, architecture guidance, and career resources by Avijit Patra.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/interview?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function buildPersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Avijit Patra',
    jobTitle: 'Senior Salesforce Technical Consultant',
    url: `${SITE_URL}/about`,
    worksFor: { '@type': 'Organization', name: 'Salesforce Decode' },
    knowsAbout: [
      'Salesforce Architecture',
      'Agentforce',
      'Data Cloud',
      'Apex',
      'Lightning Web Components',
      'Salesforce Integration',
    ],
  };
}
