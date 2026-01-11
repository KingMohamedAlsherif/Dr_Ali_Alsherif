import { SectionHeader } from '@/components/section-header';
import { PublicationsSection } from '@/components/publications-section';
import { Section } from '@/components/section';
import { getPublications } from '@/lib/content';

export default async function PublicationsPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getPublications(params.lang);

  return (
    <Section className="py-0">
      <div className="space-y-10">
        <SectionHeader
          eyebrow={params.lang === 'ar' ? 'منشورات' : 'Publications'}
          title={params.lang === 'ar' ? 'المنشورات والمحاضرات' : 'Publications & talks'}
          description={
            params.lang === 'ar'
              ? 'أبحاث ومحاضرات في إدارة المعرفة والمكتبات الرقمية.'
              : 'Research papers and talks on knowledge governance and digital libraries.'
          }
        />
        <PublicationsSection items={items} lang={params.lang} />
      </div>
    </Section>
  );
}
