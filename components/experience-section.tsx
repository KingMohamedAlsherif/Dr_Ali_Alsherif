'use client';

import { useMemo, useState } from 'react';
import { TagFilterBar } from '@/components/tag-filter-bar';
import { Timeline } from '@/components/timeline';
import type { ExperienceItem } from '@/lib/content-types';

export function ExperienceSection({ items, lang }: { items: ExperienceItem[]; lang: 'en' | 'ar' }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (selectedTags.length === 0) return items;
    return items.filter((item) => selectedTags.some((tag) => item.tags.includes(tag)));
  }, [items, selectedTags]);

  return (
    <div className="space-y-6">
      <TagFilterBar selected={selectedTags} onChange={setSelectedTags} />
      <Timeline items={filtered} lang={lang} />
    </div>
  );
}
