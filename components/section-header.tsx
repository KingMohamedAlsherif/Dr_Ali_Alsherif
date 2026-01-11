import { cn } from '@/lib/utils';

export function SectionHeader({
  title,
  description,
  eyebrow,
  align = 'left'
}: {
  title: string;
  description?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('space-y-3', align === 'center' && 'text-center')}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description && <p className="text-sm text-muted-foreground md:text-base">{description}</p>}
    </div>
  );
}
