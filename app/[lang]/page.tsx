import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MetricCard } from '@/components/metric-card';
import { CaseStudyCard } from '@/components/case-study-card';
import { PublicationItem } from '@/components/publication-item';
import { SectionHeader } from '@/components/section-header';
import { Timeline } from '@/components/timeline';
import { SectionReveal } from '@/components/section-reveal';
import { getCaseStudies, getExperience, getPublications } from '@/lib/content';

export default async function HomePage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const [caseStudies, experience, publications] = await Promise.all([
    getCaseStudies(params.lang),
    getExperience(params.lang),
    getPublications(params.lang)
  ]);

  const featured = caseStudies.slice(0, 3);
  const latestPublications = publications.slice(0, 2);

  const chips =
    params.lang === 'ar'
      ? ['استراتيجية المعرفة', 'المستودعات الرقمية', 'الذكاء الاصطناعي في المكتبات']
      : ['KM Strategy', 'Digital Repositories', 'AI in Libraries'];

  return (
    <div className="space-y-16">
      <SectionReveal>
        <section className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-10">
          <div className="pattern-overlay" aria-hidden="true" />
          <div className="relative space-y-6">
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <Badge key={chip}>{chip}</Badge>
              ))}
            </div>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              {params.lang === 'ar'
                ? 'قيادة التحول الرقمي وإدارة المعرفة للمكتبات الذكية.'
                : 'Leading digital knowledge ecosystems for modern libraries and academic excellence.'}
            </h1>
            <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
              {params.lang === 'ar'
                ? 'أبني منصات معرفة متكاملة تجمع بين الاستراتيجية، والحَوْكمة، والبنية الرقمية المدعومة بالذكاء الاصطناعي.'
                : 'I design and deliver integrated knowledge platforms that combine governance, digital repositories, and AI-powered services.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link href={`/${params.lang}/contact`}>
                  {params.lang === 'ar' ? 'تواصل الآن' : 'Start a conversation'}
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/${params.lang}/projects`}>
                  {params.lang === 'ar' ? 'استكشف المشاريع' : 'Explore projects'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="grid gap-4 md:grid-cols-3">
          <MetricCard label={params.lang === 'ar' ? 'مشروع تحويل رقمي' : 'Digital transformations'} value="12+" />
          <MetricCard label={params.lang === 'ar' ? 'مبادرات مستودعات رقمية' : 'Repository initiatives'} value="25+" />
          <MetricCard label={params.lang === 'ar' ? 'ورش تدريب احترافية' : 'Professional workshops'} value="40+" />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section>
        <SectionHeader
          title={params.lang === 'ar' ? 'دراسات حالة مختارة' : 'Featured case studies'}
          description={
            params.lang === 'ar'
              ? 'مختارات من المشاريع الاستراتيجية في التحول الرقمي وإدارة المعرفة.'
              : 'Signature transformations spanning AI cataloging, digital repositories, and knowledge strategy.'
          }
        />
        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((item) => (
            <CaseStudyCard key={item.slug} item={item} lang={params.lang} />
          ))}
        </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section>
        <SectionHeader
          title={params.lang === 'ar' ? 'محطات الخبرة' : 'Experience snapshot'}
          description={
            params.lang === 'ar'
              ? 'مسار مهني في قيادة المكتبات الأكاديمية والتحول الرقمي.'
              : 'A leadership timeline across academic and governmental knowledge institutions.'
          }
        />
        <Timeline
          items={experience.slice(0, 3)}
          lang={params.lang}
          defaultOpenOrg={experience[0]?.org}
        />
        </section>
      </SectionReveal>

      <SectionReveal>
        <section>
        <SectionHeader
          title={params.lang === 'ar' ? 'منشورات ومحاضرات حديثة' : 'Recent publications & talks'}
          description={
            params.lang === 'ar'
              ? 'أحدث المخرجات الفكرية في إدارة المعرفة والذكاء الاصطناعي للمكتبات.'
              : 'Thought leadership on knowledge governance, metadata, and AI adoption.'
          }
        />
        <div className="grid gap-6 md:grid-cols-2">
          {latestPublications.map((item) => (
            <PublicationItem key={item.title} item={item} />
          ))}
        </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 text-center">
        <h2 className="text-2xl font-semibold">
          {params.lang === 'ar'
            ? 'لنصمم بيئة معرفة رقمية تُحدث أثرًا.'
            : 'Let’s architect a digital knowledge environment that elevates impact.'}
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          {params.lang === 'ar'
            ? 'جاهز لبناء استراتيجية معرفية أو تحسين المستودعات الرقمية؟'
            : 'Ready to craft a knowledge strategy or transform your repository ecosystem?'}
        </p>
        <Button asChild className="mt-6">
          <Link href={`/${params.lang}/contact`}>{params.lang === 'ar' ? 'احجز جلسة' : 'Schedule a call'}</Link>
        </Button>
        </section>
      </SectionReveal>
    </div>
  );
}
