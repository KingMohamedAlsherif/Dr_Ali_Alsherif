import { Badge } from '@/components/ui/badge';

export function StandardsBadge({ label }: { label: string }) {
  return <Badge className="border-sand-400 text-sand-600">{label}</Badge>;
}
