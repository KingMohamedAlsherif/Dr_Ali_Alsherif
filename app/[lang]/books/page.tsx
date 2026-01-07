import { SectionHeader } from '@/components/section-header';
import { BookCard } from '@/components/book-card';
import { getBooks } from '@/lib/content';

export default async function BooksPage({ params }: { params: { lang: 'en' | 'ar' } }) {
  const items = await getBooks(params.lang);

  return (
    <div className="space-y-10">
      <SectionHeader
        title={params.lang === 'ar' ? 'مكتبة المعرفة' : 'Knowledge library'}
        description={
          params.lang === 'ar'
            ? 'كتب مختارة للقراءة داخل المنصة.'
            : 'Curated books available for on-site reading.'
        }
      />
      <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 shadow-sm">
        <div className="mb-6 h-2 rounded-full bg-sand-500/40" aria-hidden="true" />
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((book) => (
            <BookCard key={book.slug} book={book} lang={params.lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
