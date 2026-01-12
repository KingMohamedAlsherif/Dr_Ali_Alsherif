import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1 text-[11px] font-medium text-foreground shadow-[inset_0_0_0_1px_rgba(var(--border),0.15)]',
        className
      )}
      {...props}
    />
  );
}
