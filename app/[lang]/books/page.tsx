import { SectionHeader } from '@/components/section-header';
import { BookCard } from '@/components/book-card';
import { Section } from '@/components/section';
import { getBooks } from '@/lib/content';

export default async function BooksPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getBooks(params.lang);

  return (
    <Section className="py-0">
      <div className="space-y-10">
        <SectionHeader
          eyebrow={params.lang === 'ar' ? 'كتب' : 'Library'}
          title={params.lang === 'ar' ? 'مكتبة المعرفة' : 'Knowledge library'}
          description={
            params.lang === 'ar'
              ? 'كتب مختارة للقراءة داخل المنصة.'
              : 'Curated books available for on-site reading.'
          }
        />
        <div className="index-card p-6 pt-8">
          <div className="mb-6 h-px w-full bg-[rgb(var(--border))]" aria-hidden="true" />
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((book) => (
              <BookCard key={book.slug} book={book} lang={params.lang} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
