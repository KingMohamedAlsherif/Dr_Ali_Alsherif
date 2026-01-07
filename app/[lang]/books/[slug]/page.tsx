import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { SectionHeader } from '@/components/section-header';
import { renderMdx, Prose } from '@/lib/mdx';
import { getBookBySlug, getBooks } from '@/lib/content';

const BookReader = dynamic(() => import('@/components/book-reader').then((mod) => mod.BookReader), {
  ssr: false
});

export async function generateStaticParams() {
  const items = await getBooks('en');
  return items.flatMap((item) => [
    { slug: item.slug, lang: 'en' },
    { slug: item.slug, lang: 'ar' }
  ]);
}

export default async function BookPage({ params }: { params: { lang: 'en' | 'ar'; slug: string } }) {
  try {
    const { meta, content } = await getBookBySlug(params.lang, params.slug);
    const mdxContent = await renderMdx(content);

    return (
      <div className="space-y-10">
        <SectionHeader title={meta.title} description={meta.description} />
        <div className="flex flex-wrap items-center gap-3">
          <Badge>{meta.year}</Badge>
          <Badge>{meta.publisher}</Badge>
          <Badge>{meta.access === 'gated' ? 'Gated' : 'Public reading'}</Badge>
        </div>
        <Prose>{mdxContent}</Prose>

        {meta.access === 'gated' ? (
          <div className="rounded-2xl border border-dashed border-[rgb(var(--border))] p-6 text-sm text-muted-foreground">
            {params.lang === 'ar'
              ? 'هذا الكتاب يتطلب رمز وصول. أضف رمز الوصول في ملف البيئة BOOK_ACCESS_CODE لتفعيل القراءة.'
              : 'This book is gated. Add BOOK_ACCESS_CODE in your environment to enable access.'}
          </div>
        ) : (
          <div id="reader" className="space-y-4">
            <h3 className="text-xl font-semibold">{params.lang === 'ar' ? 'ابدأ القراءة' : 'Start reading'}</h3>
            <BookReader
              slug={meta.slug}
              url={`/api/books/${meta.slug}`}
              watermark={params.lang === 'ar' ? 'للقراءة داخل الموقع' : 'For reading on this site'}
            />
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}
