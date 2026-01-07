import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';
import { getBooks, getCaseStudies } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;
  const [caseStudies, books] = await Promise.all([getCaseStudies('en'), getBooks('en')]);

  const staticRoutes = [
    '/en',
    '/en/about',
    '/en/experience',
    '/en/projects',
    '/en/publications',
    '/en/workshops',
    '/en/books',
    '/en/contact',
    '/ar',
    '/ar/about',
    '/ar/experience',
    '/ar/projects',
    '/ar/publications',
    '/ar/workshops',
    '/ar/books',
    '/ar/contact'
  ];

  const caseStudyRoutes = caseStudies.flatMap((item) => [
    `/en/projects/${item.slug}`,
    `/ar/projects/${item.slug}`
  ]);

  const bookRoutes = books.flatMap((item) => [`/en/books/${item.slug}`, `/ar/books/${item.slug}`]);

  return [...staticRoutes, ...caseStudyRoutes, ...bookRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date()
  }));
}
