import { Badge } from '@/components/ui/badge';

export function StandardsBadge({ label }: { label: string }) {
  return <Badge className="border-accent/50 bg-transparent text-[rgb(var(--accent-2))]">{label}</Badge>;
}
