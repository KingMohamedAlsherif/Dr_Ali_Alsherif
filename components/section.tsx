import { cn } from '@/lib/utils';

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn('py-10 sm:py-14 lg:py-16', className)} {...props}>
      <div className="archive-page">{children}</div>
    </section>
  );
}
