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
  const [expandedRoles, setExpandedRoles] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([org, roles]) => {
        const isOpen = openOrg === org;
        return (
          <div key={org} className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
            <button
              type="button"
              onClick={() => setOpenOrg(isOpen ? null : org)}
              className="flex w-full items-center justify-between gap-4 text-left"
            >
              <div>
                <h3 className="text-lg font-semibold text-foreground">{org}</h3>
                <p className="text-sm text-muted-foreground">{roles[0].location}</p>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            {isOpen && (
              <div className="mt-6 space-y-6 border-l border-[rgb(var(--border))] pl-6">
                {roles.map((role) => {
                  const roleKey = `${org}-${role.role}`;
                  const isExpanded = expandedRoles[roleKey] ?? false;
                  const highlights = isExpanded ? role.highlights : role.highlights.slice(0, 3);

                  return (
                    <div key={roleKey} className="relative space-y-3">
                      <span className="absolute -left-[30px] top-2 h-2.5 w-2.5 rounded-full bg-accent" />
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-semibold text-foreground">{role.role}</p>
                          <p className="text-xs text-muted-foreground">
                            {role.startDate} — {role.endDate}
                          </p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                      {role.highlights.length > 3 && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedRoles((prev) => ({
                              ...prev,
                              [roleKey]: !isExpanded
                            }))
                          }
                          className="text-sm font-medium text-accent"
                        >
                          {isExpanded
                            ? lang === 'ar'
                              ? 'عرض أقل'
                              : 'Show less'
                            : lang === 'ar'
                            ? 'عرض المزيد'
                            : 'Show more'}
                        </button>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {role.tags.map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
