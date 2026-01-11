import type { Publication } from '@/lib/content-types';

export function PublicationItem({ item }: { item: Publication }) {
  return (
    <article className="border-b border-[rgb(var(--border))] py-6">
      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        <span>{item.type}</span>
        <span className="h-1 w-1 rounded-full bg-muted-foreground" aria-hidden="true" />
        <span>{item.date}</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-foreground">{item.title}</h3>
      <p className="text-sm text-muted-foreground">{item.venue}</p>
      <p className="mt-3 text-sm text-muted-foreground">{item.abstract}</p>
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-accent">
        {item.links.map((link) => (
          <a key={link.url} href={link.url} className="hover:underline">
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}
