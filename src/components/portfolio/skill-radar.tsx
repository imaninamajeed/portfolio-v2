import { groupScore, type SkillGroup } from "@/data/portfolio";

import styles from "./skill-radar.module.css";

const R = 112; // radius of level 5
const MAX = 5;
const LABEL_GAP = 24;

const point = (i: number, n: number, r: number) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [Math.cos(a) * r, Math.sin(a) * r] as const;
};
const fmt = (v: number) => v.toFixed(1);
const poly = (pts: (readonly [number, number])[]) => pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

/**
 * Radar of self-assessed skill areas: one axis per group, plotted at the group's
 * average level. Single series, so no legend; every axis label carries its value.
 */
export function SkillRadar({ groups }: { groups: SkillGroup[] }) {
  const n = groups.length;
  const scores = groups.map(groupScore);
  const shape = scores.map((v, i) => point(i, n, (v / MAX) * R));
  const summary = groups.map((g, i) => `${g.title} ${fmt(scores[i])}`).join(", ");

  return (
    <svg className={styles.radar} viewBox="-190 -160 380 335" role="img" aria-labelledby="radar-title radar-desc">
      <title id="radar-title">Skills self-assessment radar</title>
      <desc id="radar-desc">Average self-rated level out of 5 per area: {summary}.</desc>

      {/* Level rings 1–5 and spokes: recessive */}
      {[1, 2, 3, 4, 5].map((level) => (
        <polygon
          key={level}
          className={level === MAX ? styles.ringOuter : styles.ring}
          points={poly(groups.map((_, i) => point(i, n, (level / MAX) * R)))}
        />
      ))}
      {groups.map((g, i) => {
        const [x, y] = point(i, n, R);
        return <line key={g.title} className={styles.spoke} x1="0" y1="0" x2={x} y2={y} />;
      })}
      {[1, 3, 5].map((level) => (
        <text key={level} className={styles.tick} x="4" y={-(level / MAX) * R + 3}>
          {level}
        </text>
      ))}

      {/* Data */}
      <g className={styles.shape}>
        <polygon className={styles.area} points={poly(shape)} />
        {shape.map(([x, y], i) => (
          <circle key={groups[i].title} className={styles.dot} cx={x} cy={y} r="4.5">
            <title>{`${groups[i].title}: ${fmt(scores[i])} of 5`}</title>
          </circle>
        ))}
      </g>

      {/* Axis labels: name + value, in text tokens */}
      {groups.map((g, i) => {
        const [x, y] = point(i, n, R + LABEL_GAP);
        const anchor = Math.abs(x) < 1 ? "middle" : x > 0 ? "start" : "end";
        const dy = Math.abs(x) < 1 ? (y < 0 ? -6 : 14) : -4;
        return (
          <text key={g.title} className={styles.label} x={x} y={y + dy} textAnchor={anchor}>
            <tspan className={styles.labelName}>{g.title}</tspan>
            <tspan className={styles.labelValue} x={x} dy="16">
              {fmt(scores[i])}
            </tspan>
          </text>
        );
      })}
    </svg>
  );
}
