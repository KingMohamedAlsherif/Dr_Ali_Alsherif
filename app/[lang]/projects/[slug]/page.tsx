import { notFound } from 'next/navigation';
import { SectionHeader } from '@/components/section-header';
import { Section } from '@/components/section';
import { RepositoryBadge } from '@/components/repository-badge';
import { StandardsBadge } from '@/components/standards-badge';
import { Prose } from '@/components/prose';
import { renderMdx } from '@/lib/mdx';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/content';

export async function generateStaticParams() {
  const items = await getCaseStudies('en');
  return items.flatMap((item) => [
    { slug: item.slug, lang: 'en' },
    { slug: item.slug, lang: 'ar' }
  ]);
}

export default async function CaseStudyPage({
  params
}: {
  params: { slug: string; lang: 'en' | 'ar' };
}) {
  try {
    const { meta, content } = await getCaseStudyBySlug(params.lang, params.slug);
    const mdxContent = await renderMdx(content);

    return (
      <Section className="py-0">
        <div className="space-y-10">
          <SectionHeader
            eyebrow={params.lang === 'ar' ? 'دراسة حالة' : 'Case study'}
            title={meta.title}
            description={meta.overview}
          />

          <div className="grid gap-10 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'المشكلة' : 'Problem'}</h3>
                <p className="text-sm text-muted-foreground">{meta.problem}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'الاستراتيجية' : 'Strategy'}</h3>
                <p className="text-sm text-muted-foreground">{meta.approach}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'النظام' : 'System'}</h3>
                <Prose>{mdxContent}</Prose>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{params.lang === 'ar' ? 'النتائج' : 'Outcomes'}</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                  {meta.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </div>
            <aside className="index-card space-y-6 p-6 pt-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{meta.year}</p>
                <h4 className="text-base font-semibold">{meta.role}</h4>
              </div>
              <div>
                <h5 className="text-sm font-semibold">
                  {params.lang === 'ar' ? 'المعايير والأدوات' : 'Standards & tools'}
                </h5>
                <div className="mt-3 flex flex-wrap gap-2">
                  {meta.standardsAndTools.map((tool) => (
                    <StandardsBadge key={tool} label={tool} />
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold">{params.lang === 'ar' ? 'روابط' : 'Links'}</h5>
                <div className="mt-3 space-y-2 text-sm text-accent">
                  {meta.links.map((link) => (
                    <a key={link.url} href={link.url} className="block hover:underline">
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold">{params.lang === 'ar' ? 'مستودعات' : 'Repositories'}</h5>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['DSpace', 'Fedora', 'Koha'].map((repo) => (
                    <RepositoryBadge key={repo} label={repo} />
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Section>
    );
  } catch {
    notFound();
  }
}
