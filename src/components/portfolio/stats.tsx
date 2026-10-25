import { STATS } from "@/data/portfolio";
import { reveal } from "@/lib/dom";

import { CountUp } from "./count-up";

import styles from "./stats.module.css";

export function Stats() {
  return (
    <section className={`wrap ${styles.stats}`} aria-label="At a glance">
      {STATS.map((stat, i) => (
        <div key={stat.label} className={`glass ${styles.stat}`} {...reveal(i * 0.06)}>
          {stat.value === undefined ? (
            <b>
              {stat.display}
              {stat.sup && <sup>{stat.sup}</sup>}
            </b>
          ) : (
            <CountUp value={stat.value} suffix={stat.suffix} />
          )}
          <span>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
