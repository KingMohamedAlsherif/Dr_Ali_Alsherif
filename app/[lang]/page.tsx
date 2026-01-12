import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CaseStudyCard } from '@/components/case-study-card';
import { PublicationItem } from '@/components/publication-item';
import { WorkshopCard } from '@/components/workshop-card';
import { BookCard } from '@/components/book-card';
import { SectionHeader } from '@/components/section-header';
import { SectionReveal } from '@/components/section-reveal';
import { Section } from '@/components/section';
import { Timeline } from '@/components/timeline';
import { getBooks, getCaseStudies, getExperience, getPublications, getWorkshops } from '@/lib/content';

export default async function HomePage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const [caseStudies, experience, publications, workshops, books] = await Promise.all([
    getCaseStudies(params.lang),
    getExperience(params.lang),
    getPublications(params.lang),
    getWorkshops(params.lang),
    getBooks(params.lang)
  ]);

  const featured = caseStudies.slice(0, 3);
  const latestPublications = publications.slice(0, 4);
  const latestWorkshops = workshops.slice(0, 4);
  const featuredBooks = books.slice(0, 3);

  const chips =
    params.lang === 'ar'
      ? ['استراتيجية المعرفة', 'المستودعات الرقمية', 'الذكاء الاصطناعي في المكتبات']
      : ['KM Strategy', 'Digital Repositories', 'AI in Libraries'];

  return (
    <div>
      <SectionReveal>
        <Section className="pt-0">
          <div className="hero-atmosphere rounded-[26px] p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr,0.9fr,0.4fr] lg:items-center">
              <div className="space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {params.lang === 'ar' ? 'علي الشريف' : 'Ali Alsherif'}
                  </p>
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
                </div>
                <div className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <Badge key={chip}>{chip}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button asChild>
                    <Link href={`/${params.lang}/projects`}>
                      {params.lang === 'ar' ? 'عرض المشاريع' : 'View projects'}
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href={`/${params.lang}/contact`}>
                      {params.lang === 'ar' ? 'تواصل' : 'Contact'}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[32px] bg-accent/12" aria-hidden="true" />
                <div className="relative overflow-hidden rounded-[28px] border border-[rgb(var(--border))] bg-[rgb(var(--surface))]">
                  <Image
                    src="/images/ali-alsherif-placeholder.svg"
                    alt={params.lang === 'ar' ? 'صورة علي الشريف' : 'Portrait of Ali Alsherif'}
                    width={640}
                    height={760}
                    className="h-full w-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="hidden flex-col gap-4 border-l border-[rgb(var(--border))] pl-4 lg:flex">
                {chips.map((chip) => (
                  <div key={chip} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    <Badge className="bg-[rgb(var(--surface))]">{chip}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={params.lang === 'ar' ? 'مختارات' : 'Featured'}
              title={params.lang === 'ar' ? 'دراسات حالة مختارة' : 'Featured case studies'}
              description={
                params.lang === 'ar'
                  ? 'مختارات من المشاريع الاستراتيجية في التحول الرقمي وإدارة المعرفة.'
                  : 'Signature transformations spanning AI cataloging, digital repositories, and knowledge strategy.'
              }
            />
            <Link href={`/${params.lang}/projects`} className="text-sm font-medium text-accent">
              {params.lang === 'ar' ? 'كل المشاريع' : 'View all projects'}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((item) => (
              <CaseStudyCard key={item.slug} item={item} lang={params.lang} />
            ))}
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={params.lang === 'ar' ? 'المسار' : 'Trajectory'}
              title={params.lang === 'ar' ? 'محطات الخبرة' : 'Experience snapshot'}
              description={
                params.lang === 'ar'
                  ? 'مسار مهني في قيادة المكتبات الأكاديمية والتحول الرقمي.'
                  : 'A leadership timeline across academic and governmental knowledge institutions.'
              }
            />
            <Link href={`/${params.lang}/experience`} className="text-sm font-medium text-accent">
              {params.lang === 'ar' ? 'عرض المسار الكامل' : 'View full experience'}
            </Link>
          </div>
          <div className="mt-8">
            <Timeline items={experience.slice(0, 3)} lang={params.lang} defaultOpenOrg={experience[0]?.org} />
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={params.lang === 'ar' ? 'منشورات' : 'Publications'}
              title={params.lang === 'ar' ? 'منشورات ومحاضرات حديثة' : 'Recent publications & talks'}
              description={
                params.lang === 'ar'
                  ? 'أحدث المخرجات الفكرية في إدارة المعرفة والذكاء الاصطناعي للمكتبات.'
                  : 'Thought leadership on knowledge governance, metadata, and AI adoption.'
              }
            />
            <Link href={`/${params.lang}/publications`} className="text-sm font-medium text-accent">
              {params.lang === 'ar' ? 'عرض الكل' : 'View all publications'}
            </Link>
          </div>
          <div className="mt-6">
            {latestPublications.map((item) => (
              <PublicationItem key={item.title} item={item} />
            ))}
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={params.lang === 'ar' ? 'ورش' : 'Workshops'}
              title={params.lang === 'ar' ? 'ورش العمل القادمة' : 'Workshop highlights'}
              description={
                params.lang === 'ar'
                  ? 'ورش تدريبية متخصصة في الأنظمة الرقمية والمعايير الدولية.'
                  : 'Hands-on workshops in digital systems, metadata standards, and governance.'
              }
            />
            <Link href={`/${params.lang}/workshops`} className="text-sm font-medium text-accent">
              {params.lang === 'ar' ? 'عرض كل الورش' : 'View all workshops'}
            </Link>
          </div>
          <div className="mt-6">
            {latestWorkshops.map((item) => (
              <WorkshopCard key={item.title} item={item} />
            ))}
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={params.lang === 'ar' ? 'كتب' : 'Books'}
              title={params.lang === 'ar' ? 'إصدارات مختارة' : 'Selected books'}
              description={
                params.lang === 'ar'
                  ? 'كتب مرجعية في إدارة المعرفة والتحول الرقمي.'
                  : 'Reference titles on knowledge management and digital transformation.'
              }
            />
            <Link href={`/${params.lang}/books`} className="text-sm font-medium text-accent">
              {params.lang === 'ar' ? 'عرض كل الكتب' : 'View all books'}
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featuredBooks.map((book) => (
              <BookCard key={book.slug} book={book} lang={params.lang} />
            ))}
          </div>
        </Section>
      </SectionReveal>

      <SectionReveal>
        <Section className="pt-0">
          <div className="text-center">
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
              <Link href={`/${params.lang}/contact`}>
                {params.lang === 'ar' ? 'تواصل' : 'Contact'}
              </Link>
            </Button>
          </div>
        </Section>
      </SectionReveal>
    </div>
  );
}
