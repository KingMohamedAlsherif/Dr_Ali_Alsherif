'use client';

import { useMemo, useState } from 'react';
import { CaseStudyCard } from '@/components/case-study-card';
import { TagFilterBar } from '@/components/tag-filter-bar';
import { Input } from '@/components/ui/input';
import type { CaseStudy } from '@/lib/content-types';

export function ProjectsSection({ items, lang }: { items: CaseStudy[]; lang: 'en' | 'ar' }) {
  const [query, setQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQuery = item.title.toLowerCase().includes(query.toLowerCase());
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => item.standardsAndTools.includes(tag));
      return matchesQuery && matchesTags;
    });
  }, [items, query, selectedTags]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={lang === 'ar' ? 'ابحث في المشاريع' : 'Search projects'}
          className="lg:max-w-xs"
        />
        <TagFilterBar selected={selectedTags} onChange={setSelectedTags} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((item) => (
          <CaseStudyCard key={item.slug} item={item} lang={lang} />
        ))}
      </div>
    </div>
  );
}
