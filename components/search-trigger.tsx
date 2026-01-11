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
      className="hidden h-9 w-9 items-center justify-center rounded-full md:inline-flex"
      title="Ctrl + K"
    >
      <Search className="h-4 w-4" />
    </Button>
  );
}
