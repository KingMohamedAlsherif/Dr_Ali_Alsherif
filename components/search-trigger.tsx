'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function SearchTrigger({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
      className="hidden h-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 text-muted-foreground md:inline-flex"
      title="Ctrl + K"
    >
      <Search className="h-5 w-5" />
    </Button>
  );
}
