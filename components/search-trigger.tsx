'use client';

import { Button } from '@/components/ui/button';

export function SearchTrigger({ label }: { label: string }) {
  return (
    <Button
      variant="outline"
      size="sm"
      aria-label={label}
      onClick={() => window.dispatchEvent(new CustomEvent('open-search'))}
      className="hidden md:inline-flex"
    >
      <span className="text-xs text-muted-foreground">Ctrl + K</span>
    </Button>
  );
}
