import { SectionHeader } from '@/components/section-header';
import { WorkshopsSection } from '@/components/workshops-section';
import { getWorkshops } from '@/lib/content';

export default async function WorkshopsPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getWorkshops(params.lang);

  return (
    <div className="space-y-10">
      <SectionHeader
        title={params.lang === 'ar' ? 'ورش العمل' : 'Workshops'}
        description={
          params.lang === 'ar'
            ? 'جلسات تدريبية في الأنظمة الرقمية، والمعايير، والحوكمة.'
            : 'Training experiences in digital systems, standards, and governance.'
        }
      />
      <WorkshopsSection items={items} lang={params.lang} />
    </div>
  );
}
