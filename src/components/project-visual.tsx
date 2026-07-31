import { cn } from "@/lib/utils";
import type { Project } from "@/lib/projects";
import styles from "./project-visual.module.css";

export function ProjectVisual({
  project,
  large = false,
  className,
}: {
  project: Project;
  large?: boolean;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        styles.visual,
        styles[project.visual],
        large
          ? "min-h-115 rounded-xl border border-border"
          : "min-h-55 border-b border-border",
        className
      )}
    >
      <div className={styles.grid} />
      <div className={styles.panelA}>
        <span className={styles.barLabel} />
        <strong className={styles.barTitle} />
        <span className={styles.barLine} />
        <span className={styles.barLine} />
        <span className={styles.barLine} />
      </div>
      <div className={styles.panelB}>
        <span className={styles.barLabel} />
        <strong className={styles.barTitle} />
        <em className={styles.panelCaption}>{project.category}</em>
      </div>
      <div className={styles.line} />
      <div className={styles.dotA} />
      <div className={styles.dotB} />
      <div className={styles.dotC} />
    </div>
  );
}
