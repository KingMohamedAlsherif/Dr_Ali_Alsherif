import type { Workshop } from '@/lib/content-types';

export function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <article className="catalog-row group">
      <div className="grid gap-4 md:grid-cols-[1fr,200px]">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.audience}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span>{item.duration}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" aria-hidden="true" />
            <span>{item.language}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1 text-xs text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-muted-foreground md:text-right">
          {item.date && <p className="uppercase tracking-[0.18em]">{item.date}</p>}
          {item.venue && <p className="mt-3 text-sm text-muted-foreground">{item.venue}</p>}
        </div>
      </div>
    </article>
  );
}
