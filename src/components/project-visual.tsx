import Image from "next/image";

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
      aria-hidden={project.image ? undefined : "true"}
      className={cn(
        styles.visual,
        !project.image && styles[project.visual],
        large
          ? "min-h-115 rounded-xl border border-border"
          : "min-h-55 border-b border-border",
        className
      )}
    >
      {project.image ? (
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          sizes={large ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 640px) 33vw, 100vw"}
          className="object-cover object-top-left"
        />
      ) : (
        <div className={styles.mock}>
          <div className={styles.chrome}>
            <span className={styles.chromeDot} />
            <span className={styles.chromeDot} />
            <span className={styles.chromeDot} />
            <span className={styles.address} />
            <span className={styles.liveDot} aria-hidden="true" />
          </div>
          <div className={styles.body}>
            <div className={styles.sidebar}>
              <span className={styles.sidebarBrand} />
              <span className={styles.sidebarIcon} />
              <span className={styles.sidebarIcon} />
              <span className={cn(styles.sidebarIcon, styles.sidebarIconActive)} />
              <span className={styles.sidebarIcon} />
            </div>
            <div className={styles.content}>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel} />
                  <strong className={styles.statValue} />
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel} />
                  <strong className={styles.statValue} />
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel} />
                  <strong className={styles.statValue} />
                </div>
              </div>
              <div className={styles.mainPanel}>
                <div className={styles.chartBars}>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
                <div className={styles.tableRows}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
