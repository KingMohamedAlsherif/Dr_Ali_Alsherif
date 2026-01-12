import { cn } from '@/lib/utils';

export function Prose({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('prose prose-neutral dark:prose-invert prose-p:text-muted-foreground', className)}
      {...props}
    />
  );
}
