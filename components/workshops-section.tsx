'use client';

import { useMemo, useState } from 'react';
import { WorkshopCard } from '@/components/workshop-card';
import { Input } from '@/components/ui/input';
import type { Workshop } from '@/lib/content-types';

export function WorkshopsSection({ items, lang }: { items: Workshop[]; lang: 'en' | 'ar' }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return items.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  return (
    <div className="space-y-6">
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={lang === 'ar' ? 'ابحث في ورش العمل' : 'Search workshops'}
        className="md:max-w-xs"
      />
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <WorkshopCard key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
}
