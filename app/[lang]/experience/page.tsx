import { SectionHeader } from '@/components/section-header';
import { ExperienceSection } from '@/components/experience-section';
import { getExperience } from '@/lib/content';

export default async function ExperiencePage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getExperience(params.lang);

  return (
    <div className="space-y-10">
      <SectionHeader
        title={params.lang === 'ar' ? 'الخبرات القيادية' : 'Leadership experience'}
        description={
          params.lang === 'ar'
            ? 'خط زمني للخبرة مع مرشحات معرفية حسب المجالات.'
            : 'A timeline of leadership roles with knowledge-domain filters.'
        }
      />
      <ExperienceSection items={items} lang={params.lang} />
    </div>
  );
}
