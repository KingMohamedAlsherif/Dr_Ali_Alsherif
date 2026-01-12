import { Badge } from '@/components/ui/badge';

export function RepositoryBadge({ label }: { label: string }) {
  return <Badge className="bg-[rgb(var(--surface))] text-foreground">{label}</Badge>;
}
