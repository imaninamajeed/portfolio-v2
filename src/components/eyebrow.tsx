import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[0.72rem] font-bold tracking-[0.12em] text-muted-foreground uppercase",
        className
      )}
    >
      {children}
    </p>
  );
}
