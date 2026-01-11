import { cn } from '@/lib/utils';

export function Section({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('py-10 sm:py-14 lg:py-16', className)}
      {...props}
    />
  );
}
