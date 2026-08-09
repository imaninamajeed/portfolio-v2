import { Radar } from "lucide-react";

export interface SkillRating {
  label: string;
  value: number;
}

const MAX_VALUE = 5;
const RINGS = 5;
const SIZE = 320;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 72;
const LABEL_RADIUS = RADIUS + 22;

function pointAt(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function wrapLabel(label: string): string[] {
  if (label.length <= 12) return [label];
  const spaceIndices = [...label.matchAll(/ /g)].map((m) => m.index!);
  if (spaceIndices.length === 0) return [label];
  const mid = label.length / 2;
  const splitAt = spaceIndices.reduce((best, idx) =>
    Math.abs(idx - mid) < Math.abs(best - mid) ? idx : best
  );
  return [label.slice(0, splitAt).trim(), label.slice(splitAt + 1).trim()];
}

function formatScore(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(1);
}

export function SkillRadarChart({ skills }: { skills: SkillRating[] }) {
  const total = skills.length;
  const gradientId = "skill-radar-fill";

  const ringPolygons = Array.from({ length: RINGS }, (_, ringIndex) => {
    const ringRadius = (RADIUS * (ringIndex + 1)) / RINGS;
    return skills
      .map((_, i) => pointAt(i, total, ringRadius))
      .map((p) => `${p.x},${p.y}`)
      .join(" ");
  });

  const dataPoints = skills.map((skill, i) =>
    pointAt(i, total, (RADIUS * Math.min(skill.value, MAX_VALUE)) / MAX_VALUE)
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="flex h-full flex-col rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Radar className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <h3 className="text-sm font-semibold">Skills Self-Assessment</h3>
        </div>
        <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] text-muted-foreground">
          1–5 scale
        </span>
      </div>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-labelledby="skill-radar-title"
        className="mx-auto mt-3 w-full max-w-80"
      >
        <title id="skill-radar-title">
          {`Self-assessed skill levels across ${skills.map((s) => s.label).join(", ")}`}
        </title>
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0.04" />
          </radialGradient>
        </defs>

        {ringPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill={i % 2 === 0 ? "color-mix(in oklch, var(--muted), transparent 70%)" : "none"}
            stroke="var(--border)"
            strokeWidth={1}
          />
        ))}

        {skills.map((_, i) => {
          const outer = pointAt(i, total, RADIUS);
          return (
            <line
              key={i}
              x1={CENTER}
              y1={CENTER}
              x2={outer.x}
              y2={outer.y}
              stroke="var(--border)"
              strokeWidth={1}
            />
          );
        })}

        <polygon
          points={dataPolygon}
          fill={`url(#${gradientId})`}
          stroke="var(--foreground)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {dataPoints.map((p, i) => (
          <g key={skills[i].label}>
            <circle
              cx={p.x}
              cy={p.y}
              r={5}
              fill="var(--background)"
              stroke="var(--foreground)"
              strokeWidth={1.5}
            />
            <circle cx={p.x} cy={p.y} r={2} fill="var(--foreground)" />
          </g>
        ))}

        {skills.map((skill, i) => {
          const labelPoint = pointAt(i, total, LABEL_RADIUS);
          const anchor =
            Math.abs(labelPoint.x - CENTER) < 8
              ? "middle"
              : labelPoint.x > CENTER
                ? "start"
                : "end";
          const lines = wrapLabel(skill.label);
          return (
            <text
              key={skill.label}
              x={labelPoint.x}
              y={labelPoint.y}
              textAnchor={anchor}
              dominantBaseline="middle"
              className="fill-muted-foreground"
              fontSize={10}
              fontFamily="var(--font-sans), ui-sans-serif, system-ui, sans-serif"
            >
              {lines.length > 1 ? (
                <>
                  <tspan x={labelPoint.x} dy="-0.55em">
                    {lines[0]}
                  </tspan>
                  <tspan x={labelPoint.x} dy="1.15em">
                    {lines[1]}
                  </tspan>
                </>
              ) : (
                skill.label
              )}
            </text>
          );
        })}
      </svg>

      <ul className="mt-auto grid grid-cols-2 gap-x-4 gap-y-2 border-t border-border pt-3">
        {skills.map((skill) => (
          <li key={skill.label} className="flex items-baseline justify-between gap-2">
            <span className="truncate text-[0.72rem] text-muted-foreground">
              {skill.label}
            </span>
            <span className="font-mono text-[0.72rem] font-semibold tabular-nums text-foreground">
              {formatScore(skill.value)}
              <span className="font-normal text-muted-foreground">/{MAX_VALUE}</span>
            </span>
          </li>
        ))}
      </ul>

      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={`a11y-${skill.label}`}>
            {skill.label}: {skill.value} out of {MAX_VALUE}, self-assessed
          </li>
        ))}
      </ul>
    </div>
  );
}
