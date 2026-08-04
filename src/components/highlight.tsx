import { cn } from "@/lib/utils";

export function Highlight({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <mark
      className={cn(
        "rounded-[0.3em] bg-highlight/25 px-0.5 text-foreground font-semibold",
        className
      )}
    >
      {children}
    </mark>
  );
}
