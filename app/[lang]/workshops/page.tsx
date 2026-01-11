import { SectionHeader } from '@/components/section-header';
import { WorkshopsSection } from '@/components/workshops-section';
import { Section } from '@/components/section';
import { getWorkshops } from '@/lib/content';

export default async function WorkshopsPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getWorkshops(params.lang);

  return (
    <Section className="py-0">
      <div className="space-y-10">
        <SectionHeader
          eyebrow={params.lang === 'ar' ? 'ورش' : 'Workshops'}
          title={params.lang === 'ar' ? 'ورش العمل' : 'Workshops'}
          description={
            params.lang === 'ar'
              ? 'جلسات تدريبية في الأنظمة الرقمية، والمعايير، والحوكمة.'
              : 'Training experiences in digital systems, standards, and governance.'
          }
        />
        <WorkshopsSection items={items} lang={params.lang} />
      </div>
    </Section>
  );
}
