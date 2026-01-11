import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import type { CaseStudy } from '@/lib/content-types';
import { cn } from '@/lib/utils';

export function CaseStudyCard({ item, lang }: { item: CaseStudy; lang: 'en' | 'ar' }) {
  return (
    <Link
      href={`/${lang}/projects/${item.slug}`}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-all',
        'hover:-translate-y-1 hover:shadow-lift focus-outline'
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[rgb(var(--muted))]">
        <Image
          src={item.images[0]}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span>{item.year}</span>
          <span>{item.role}</span>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.overview}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          {item.standardsAndTools.slice(0, 3).map((tool) => (
            <Badge key={tool}>{tool}</Badge>
          ))}
        </div>
        <span className="text-sm font-medium text-accent">
          {lang === 'ar' ? 'عرض الدراسة' : 'View case study'}
        </span>
      </div>
    </Link>
  );
}
