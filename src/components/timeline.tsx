import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  date: string;
  title: string;
  org: string;
  description?: string;
  current?: boolean;
}

export function Timeline({
  items,
  compact = false,
}: {
  items: TimelineEntry[];
  compact?: boolean;
}) {
  return (
    <ol
      className={cn(
        "relative border-l border-border pl-7",
        compact ? "space-y-4" : "space-y-7"
      )}
    >
      {items.map((item) => (
        <li key={`${item.title}-${item.org}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-[calc(1.75rem+5px)] size-2.5 rounded-full border-2 border-background bg-foreground ring-1 ring-border"
          />
          <p className="font-mono text-[0.7rem] text-muted-foreground">{item.date}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h3 className={cn("font-semibold", compact && "text-sm")}>{item.title}</h3>
            {item.current && <Badge variant="outline">Current</Badge>}
          </div>
          <p className="text-[0.82rem] text-muted-foreground">{item.org}</p>
          {item.description && (
            <p
              className={cn(
                "mt-2 max-w-135 text-muted-foreground",
                compact ? "text-[0.8rem]" : "text-[0.85rem]"
              )}
            >
              {item.description}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
