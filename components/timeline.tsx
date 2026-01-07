'use client';

import { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { ExperienceItem } from '@/lib/content-types';

export function Timeline({
  items,
  lang,
  defaultOpenOrg
}: {
  items: ExperienceItem[];
  lang: 'en' | 'ar';
  defaultOpenOrg?: string;
}) {
  const grouped = useMemo(() => {
    return items.reduce<Record<string, ExperienceItem[]>>((acc, item) => {
      acc[item.org] = acc[item.org] ?? [];
      acc[item.org].push(item);
      return acc;
    }, {});
  }, [items]);

  const [openOrg, setOpenOrg] = useState<string | null>(defaultOpenOrg ?? null);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([org, roles]) => {
        const isOpen = openOrg === org;
        return (
          <div key={org} className="rounded-2xl border border-[rgb(var(--border))] p-6">
            <button
              type="button"
              onClick={() => setOpenOrg(isOpen ? null : org)}
              className="flex w-full items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{org}</h3>
                <p className="text-sm text-muted-foreground">{roles[0].location}</p>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
              <div className="mt-4 space-y-4">
                {roles.map((role) => (
                  <div key={role.role} className="rounded-xl border border-dashed border-[rgb(var(--border))] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold">{role.role}</p>
                        <p className="text-xs text-muted-foreground">
                          {role.startDate} — {role.endDate}
                        </p>
                      </div>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {role.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {role.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
