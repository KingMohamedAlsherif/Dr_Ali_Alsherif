import { SectionHeader } from '@/components/section-header';
import { ProjectsSection } from '@/components/projects-section';
import { getCaseStudies } from '@/lib/content';

export default async function ProjectsPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getCaseStudies(params.lang);

  return (
    <div className="space-y-10">
      <SectionHeader
        title={params.lang === 'ar' ? 'المشاريع ودراسات الحالة' : 'Projects & case studies'}
        description={
          params.lang === 'ar'
            ? 'استراتيجيات التحول الرقمي وأنظمة المستودعات الرقمية.'
            : 'Transformation strategies and repository systems delivered end-to-end.'
        }
      />
      <ProjectsSection items={items} lang={params.lang} />
    </div>
  );
}
