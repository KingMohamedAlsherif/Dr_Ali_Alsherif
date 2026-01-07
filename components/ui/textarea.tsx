import * as React from 'react';
import { cn } from '@/lib/utils';

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[120px] w-full rounded-md border border-[rgb(var(--border))] bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus-outline',
        className
      )}
      {...props}
    />
  )
);
Textarea.displayName = 'Textarea';
