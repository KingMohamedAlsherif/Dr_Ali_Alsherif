'use client';

import { useMemo, useState } from 'react';
import { PublicationItem } from '@/components/publication-item';
import { Input } from '@/components/ui/input';
import type { Publication } from '@/lib/content-types';

export function PublicationsSection({ items, lang }: { items: Publication[]; lang: 'en' | 'ar' }) {
  const [query, setQuery] = useState('');
  const [type, setType] = useState<'All' | 'Paper' | 'Talk'>('All');

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === 'All' || item.type === type;
      return matchesQuery && matchesType;
    });
  }, [items, query, type]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={lang === 'ar' ? 'ابحث في المنشورات' : 'Search publications'}
          className="md:max-w-xs"
        />
        {['All', 'Paper', 'Talk'].map((itemType) => (
          <button
            key={itemType}
            type="button"
            onClick={() => setType(itemType as typeof type)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition focus-outline ${
              type === itemType
                ? 'border-transparent bg-accent text-accent-foreground'
                : 'border-[rgb(var(--border))] text-muted-foreground hover:text-foreground'
            }`}
          >
            {lang === 'ar'
              ? itemType === 'All'
                ? 'الكل'
                : itemType === 'Paper'
                ? 'ورقة'
                : 'محاضرة'
              : itemType}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((item) => (
          <PublicationItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
