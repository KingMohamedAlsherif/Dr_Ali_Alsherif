import type { Publication } from '@/lib/content-types';

export function PublicationItem({ item }: { item: Publication }) {
  return (
    <article className="catalog-row group">
      <div className="grid gap-4 md:grid-cols-[1fr,200px]">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>{item.type}</span>
          </div>
          <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{item.abstract}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-accent">
            {item.links.map((link) => (
              <a key={link.url} href={link.url} className="hover:underline">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground md:text-right">
          <p className="uppercase tracking-[0.18em]">{item.date}</p>
          <p className="mt-3 text-sm text-muted-foreground">{item.venue}</p>
        </div>
      </div>
    </article>
  );
}
