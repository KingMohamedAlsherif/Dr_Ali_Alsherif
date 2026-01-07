import { Badge } from '@/components/ui/badge';
import type { Publication } from '@/lib/content-types';

export function PublicationItem({ item }: { item: Publication }) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] p-6">
      <div className="flex flex-wrap items-center gap-2">
        <Badge>{item.type}</Badge>
        <span className="text-xs text-muted-foreground">{item.date}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.venue}</p>
      <p className="mt-3 text-sm text-muted-foreground">{item.abstract}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-sand-600">
        {item.links.map((link) => (
          <a key={link.url} href={link.url} className="hover:underline">
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
