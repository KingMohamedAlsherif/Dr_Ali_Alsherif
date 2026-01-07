import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Book } from '@/lib/content-types';

export function BookCard({ book, lang }: { book: Book; lang: 'en' | 'ar' }) {
  return (
    <Card className="group overflow-hidden hover:shadow-glow">
      <div className="relative h-56 bg-[rgb(var(--muted))]">
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">{book.publisher}</p>
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge>{book.year}</Badge>
          <Link href={`/${lang}/books/${book.slug}`} className="text-sm text-sand-600">
            {lang === 'ar' ? 'ابدأ القراءة' : 'Start reading'}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
