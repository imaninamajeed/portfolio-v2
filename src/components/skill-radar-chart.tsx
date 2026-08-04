export interface SkillRating {
  label: string;
  value: number;
}

const MAX_VALUE = 5;
const RINGS = 4;
const SIZE = 380;
const CENTER = SIZE / 2;
const RADIUS = SIZE / 2 - 96;
const LABEL_RADIUS = RADIUS + 26;

function pointAt(index: number, total: number, radius: number) {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / total;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
  };
}

function wrapLabel(label: string): string[] {
  if (label.length <= 14) return [label];
  const spaceIndices = [...label.matchAll(/ /g)].map((m) => m.index!);
  if (spaceIndices.length === 0) return [label];
  const mid = label.length / 2;
  const splitAt = spaceIndices.reduce((best, idx) =>
    Math.abs(idx - mid) < Math.abs(best - mid) ? idx : best
  );
  return [label.slice(0, splitAt).trim(), label.slice(splitAt + 1).trim()];
}

export function SkillRadarChart({ skills }: { skills: SkillRating[] }) {
  const total = skills.length;

  const ringPolygons = Array.from({ length: RINGS }, (_, ringIndex) => {
    const ringRadius = (RADIUS * (ringIndex + 1)) / RINGS;
    return skills.map((_, i) => pointAt(i, total, ringRadius)).map((p) => `${p.x},${p.y}`).join(" ");
  });

  const dataPoints = skills.map((skill, i) =>
    pointAt(i, total, (RADIUS * Math.min(skill.value, MAX_VALUE)) / MAX_VALUE)
  );
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="rounded-xl bg-card p-5 text-card-foreground ring-1 ring-foreground/10">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold">Skills Self-Assessment</h3>
        <span className="rounded-full border border-border px-2 py-0.5 text-[0.65rem] text-muted-foreground">
          Self-Rated · 1–5
        </span>
      </div>
      <p className="mt-1 text-[0.75rem] text-muted-foreground">
        Personal estimate of current proficiency, not a certification or test score.
      </p>

      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-labelledby="skill-radar-title"
        className="mx-auto mt-4 w-full max-w-95"
      >
        <title id="skill-radar-title">
          {`Self-assessed skill levels across ${skills.map((s) => s.label).join(", ")}`}
        </title>

        {ringPolygons.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
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
          fill="color-mix(in oklch, var(--foreground), transparent 88%)"
          stroke="var(--foreground)"
          strokeWidth={2}
          strokeLinejoin="round"
        />
        {dataPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3.5} fill="var(--foreground)" />
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
              fontSize={11}
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

      <ul className="sr-only">
        {skills.map((skill) => (
          <li key={skill.label}>
            {skill.label}: {skill.value} out of {MAX_VALUE}, self-assessed
          </li>
        ))}
      </ul>
    </div>
  );
}
