import { Card, CardContent } from '@/components/ui/card';

export function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <Card className="hover:shadow-lift">
      <CardContent className="space-y-2">
        <p className="text-3xl font-semibold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}
