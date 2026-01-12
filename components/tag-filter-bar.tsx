'use client';

import { TAGS } from '@/lib/utils';
import { cn } from '@/lib/utils';

export function TagFilterBar({ selected, onChange }: { selected: string[]; onChange: (tags: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {TAGS.map((tag) => {
        const isActive = selected.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() =>
              onChange(isActive ? selected.filter((item) => item !== tag) : [...selected, tag])
            }
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-medium transition focus-outline',
              isActive
                ? 'border-transparent bg-accent text-accent-foreground'
                : 'border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-muted-foreground hover:text-foreground'
            )}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
