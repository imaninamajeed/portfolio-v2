import Image from "next/image";

import type { CaseStudy } from "@/data/portfolio";

import { Sketch } from "./sketch";

import styles from "./project-visual.module.css";

/** Real screenshot when the case has one, otherwise the animated interface sketch. */
export function ProjectVisual({ study, sizes, priority }: { study: CaseStudy; sizes: string; priority?: boolean }) {
  if (study.image) {
    return (
      <Image
        className={styles.image}
        src={study.image}
        alt={`${study.title} interface`}
        fill
        sizes={sizes}
        priority={priority}
      />
    );
  }
  return <Sketch kind={study.sketch} />;
}
