import { Badge } from '@/components/ui/badge';

export function StandardsBadge({ label }: { label: string }) {
  return <Badge className="border-accent/30 bg-transparent text-accent">{label}</Badge>;
}
