import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { Book } from '@/lib/content-types';

export function BookCard({ book, lang }: { book: Book; lang: 'en' | 'ar' }) {
  return (
    <div className="group flex h-full flex-col transition-all index-card hover:-translate-y-2 hover:shadow-lift">
      <div className="relative aspect-[3/4] overflow-hidden bg-[rgb(var(--muted))]">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6 pt-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{book.publisher}</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{book.title}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{book.description}</p>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <Badge>{book.year}</Badge>
          <Link href={`/${lang}/books/${book.slug}`} className="text-sm font-medium text-accent">
            {lang === 'ar' ? 'ابدأ القراءة' : 'Start reading'}
          </Link>
        </div>
      </div>
    </div>
  );
}
