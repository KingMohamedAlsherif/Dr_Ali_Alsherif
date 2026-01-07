import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Workshop } from '@/lib/content-types';

export function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <Card className="hover:shadow-glow">
      <CardContent className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.audience}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          <span>{item.duration}</span>
          <span>•</span>
          <span>{item.language}</span>
          {item.venue && (
            <>
              <span>•</span>
              <span>{item.venue}</span>
            </>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {item.topics.map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
