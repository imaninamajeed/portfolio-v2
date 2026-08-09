import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";

function contributionTags(role: string) {
  return role
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function ProjectMeta({
  project,
  extra,
  variant = "default",
}: {
  project: Project;
  extra?: string;
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";
  const tags = isHero ? contributionTags(project.role) : [];

  return (
    <div className={cn(isHero && "grid gap-3")}>
      <div
        className={cn(
          "flex flex-wrap items-center",
          isHero
            ? "gap-x-3 gap-y-2"
            : "min-h-6 flex-nowrap gap-x-2 overflow-hidden"
        )}
      >
        <span
          className={cn(
            "truncate text-muted-foreground",
            isHero
              ? "font-mono text-[0.72rem] font-medium tracking-[0.14em] uppercase"
              : "text-[0.69rem]"
          )}
        >
          {project.category}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "shrink-0",
            isHero
              ? "size-1 rounded-full bg-foreground/35"
              : "text-[0.69rem] text-muted-foreground"
          )}
        >
          {isHero ? null : "·"}
        </span>
        <span
          className={cn(
            "shrink-0 tabular-nums text-muted-foreground",
            isHero ? "text-[0.8rem]" : "text-[0.69rem]"
          )}
        >
          {project.year}
        </span>
        <span
          className={cn(
            "shrink-0 font-semibold whitespace-nowrap",
            isHero
              ? "rounded-md bg-foreground px-2 py-1 text-[0.68rem] tracking-wide text-background"
              : "rounded-full border border-border px-1.5 py-0.5 text-[0.69rem] text-foreground"
          )}
        >
          {project.status}
        </span>
        {extra && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                "shrink-0",
                isHero
                  ? "size-1 rounded-full bg-foreground/35"
                  : "text-[0.69rem] text-muted-foreground"
              )}
            >
              {isHero ? null : "·"}
            </span>
            <span
              className={cn(
                "truncate text-muted-foreground",
                isHero ? "text-[0.8rem]" : "text-[0.69rem]"
              )}
            >
              {extra}
            </span>
          </>
        )}
      </div>

      {tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded-md border border-border/70 bg-background/50 px-2.5 py-1 text-[0.72rem] text-foreground/85 backdrop-blur-sm"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
