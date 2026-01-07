import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/lib/content-types';

export function CaseStudyCard({ item, lang }: { item: CaseStudy; lang: 'en' | 'ar' }) {
  return (
    <Card className="group overflow-hidden hover:shadow-glow">
      <div className="relative h-40">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <CardContent className="space-y-4">
        <div>
          <p className="text-xs uppercase text-muted-foreground">{item.year}</p>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.overview}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.standardsAndTools.slice(0, 3).map((tool) => (
            <Badge key={tool}>{tool}</Badge>
          ))}
        </div>
        <Link href={`/${lang}/projects/${item.slug}`} className="text-sm font-medium text-sand-600">
          {lang === 'ar' ? 'عرض الدراسة' : 'View case study'}
        </Link>
      </CardContent>
    </Card>
  );
}
