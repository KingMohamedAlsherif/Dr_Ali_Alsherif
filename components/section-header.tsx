import { cn } from '@/lib/utils';

export function SectionHeader({ title, description, align = 'left' }: { title: string; description?: string; align?: 'left' | 'center' }) {
  return (
    <div className={cn('relative mb-8 space-y-2', align === 'center' && 'text-center')}
    >
      <div className="pattern-overlay" aria-hidden="true" />
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  );
}
