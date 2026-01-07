import { getCaseStudies, getPublications, getWorkshops } from './content';

export type SearchItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  category: string;
  tags?: string[];
};

export async function getSearchIndex(lang: 'en' | 'ar'): Promise<SearchItem[]> {
  const [caseStudies, publications, workshops] = await Promise.all([
    getCaseStudies(lang),
    getPublications(lang),
    getWorkshops(lang)
  ]);

  return [
    ...caseStudies.map((item) => ({
      id: `case-${item.slug}`,
      title: item.title,
      description: item.overview,
      href: `/${lang}/projects/${item.slug}`,
      category: lang === 'ar' ? 'دراسات الحالة' : 'Case Studies',
      tags: item.standardsAndTools
    })),
    ...publications.map((item) => ({
      id: `pub-${item.title}`,
      title: item.title,
      description: item.abstract,
      href: `/${lang}/publications`,
      category: lang === 'ar' ? 'منشورات' : 'Publications'
    })),
    ...workshops.map((item) => ({
      id: `work-${item.title}`,
      title: item.title,
      description: item.audience,
      href: `/${lang}/workshops`,
      category: lang === 'ar' ? 'ورش العمل' : 'Workshops'
    }))
  ];
}
