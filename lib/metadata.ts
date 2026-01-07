import type { Metadata } from 'next';
import { siteConfig } from './site';

export function buildMetadata(lang: 'en' | 'ar'): Metadata {
  const title = lang === 'ar' ? 'مركز المعرفة الرقمي' : siteConfig.title;
  const description =
    lang === 'ar'
      ? 'محفظة قيادية للتحول الرقمي للمكتبات وإدارة المعرفة.'
      : siteConfig.description;

  return {
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title,
      description,
      url: siteConfig.url,
      siteName: title,
      images: ['/og-image.svg'],
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.svg']
    }
  };
}
