import clsx from "clsx";
import type { ReactNode } from "react";

import type { SketchKind } from "@/data/portfolio";
import { cssVars } from "@/lib/dom";

import s from "./sketch.module.css";

type Tone = "volt" | "ice" | "violet" | "text";

const delay = (d: number) => cssVars({ "--d": `${d}s` });

/** Frame shared by every sketch: dark screen, grid, window chrome (480×300). */
function Shell({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 480 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className={s.bg} width="480" height="300" />
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} className={s.grid} d={`M${i * 40} 0V300M0 ${i * 30}H480`} />
      ))}
      <rect className={s.panel} x="24" y="24" width="432" height="252" rx="12" />
      <circle className={s.volt} cx="44" cy="44" r="4" />
      <circle className={s.mute} cx="58" cy="44" r="4" />
      <circle className={s.mute} cx="72" cy="44" r="4" />
      <rect className={s.mute} x="364" y="40" width="76" height="8" rx="4" />
      {children}
    </svg>
  );
}

function Kpi({ x, y, w, tone, value }: { x: number; y: number; w: number; tone: Tone; value: number }) {
  return (
    <>
      <rect className={s.panel} x={x} y={y} width={w} height="54" rx="8" />
      <rect className={s.mute} x={x + 12} y={y + 12} width="40" height="5" rx="2.5" />
      <rect className={s[tone]} x={x + 12} y={y + 26} width={value} height="14" rx="3" />
    </>
  );
}

function TableSketch() {
  const tones: Tone[] = ["volt", "ice", "violet", "ice", "volt", "ice"];
  return (
    <Shell>
      <Kpi x={44} y={64} w={124} tone="text" value={54} />
      <Kpi x={178} y={64} w={124} tone="volt" value={40} />
      <Kpi x={312} y={64} w={124} tone="ice" value={64} />
      <rect className={s.mute2} x="44" y="132" width="392" height="128" rx="8" />
      {[72, 236, 316, 384].map((x) => (
        <rect key={x} className={s.mute} x={x} y="140" width="28" height="4" rx="2" />
      ))}
      {tones.map((tone, i) => {
        const y = 156 + i * 18;
        return (
          <g key={i} className={s.pop} style={delay(0.1 + i * 0.08)}>
            <circle className={s[tone]} cx="58" cy={y} r="3.5" />
            <rect className={s.mute} x="72" y={y - 3} width={90 + (i % 3) * 22} height="6" rx="3" />
            <rect className={s.mute2} x="236" y={y - 3} width="60" height="6" rx="3" />
            <rect className={s.mute2} x="316" y={y - 3} width="44" height="6" rx="3" />
            <rect className={s[tone]} x="384" y={y - 5} width={40 - (i % 2) * 12} height="10" rx="5" opacity=".75" />
          </g>
        );
      })}
      <rect className={clsx(s.volt, s.blink)} x="44" y="149" width="2" height="14" rx="1" />
    </Shell>
  );
}

function PeriodsSketch() {
  const heights = [56, 78, 64, 98, 86, 118, 104, 140];
  return (
    <Shell>
      {["D", "W", "M", "Q"].map((tab, i) => (
        <rect key={tab} className={i === 2 ? s.volt : s.mute2} x={44 + i * 34} y="64" width="28" height="18" rx="9" />
      ))}
      <rect className={s.text} x="44" y="96" width="200" height="12" rx="3" />
      <rect className={s.mute} x="44" y="116" width="150" height="6" rx="3" />
      <path className={s.line} d="M56 250H306" />
      {heights.map((h, i) => (
        <rect
          key={i}
          className={clsx(i === 7 ? s.volt : s.text, s.bar)}
          style={delay(i * 0.07)}
          x={66 + i * 30}
          y={250 - h}
          width="16"
          height={h}
          rx="3"
          opacity={i === 7 ? 1 : 0.55}
        />
      ))}
      <path className={clsx(s.iceS, s.draw)} strokeWidth="2" d="M74 196 L104 176 L134 188 L164 150 L194 162 L224 128 L254 142 L284 104" />
      <rect className={s.panel} x="324" y="96" width="112" height="164" rx="8" />
      <rect className={s.volt} x="336" y="110" width="40" height="5" rx="2.5" />
      {[126, 140, 154, 180, 194, 208].map((y, i) => (
        <rect key={y} className={s.mute} x="336" y={y} width={[86, 70, 80, 62, 84, 50][i]} height="5" rx="2.5" />
      ))}
      <rect className={s.volt} x="336" y="230" width="88" height="18" rx="9" opacity=".9" />
    </Shell>
  );
}

function LineSketch() {
  return (
    <Shell>
      <rect className={s.mute2} x="44" y="64" width="268" height="196" rx="8" />
      <path className={s.line} strokeDasharray="3 5" d="M60 120H296M60 170H296M60 220H296" />
      <path
        className={clsx(s.trace, s.draw)}
        strokeWidth="2.5"
        d="M60 228 C 90 220, 104 180, 130 186 S 170 140, 196 150 S 230 120, 250 126"
      />
      <path className={clsx(s.voltS, s.flow)} strokeWidth="2.5" d="M250 126 C 266 118, 282 112, 296 94" />
      <circle className={s.volt} cx="196" cy="150" r="5" />
      <circle className={clsx(s.volt, s.ping)} cx="196" cy="150" r="5" />
      <rect className={s.panel} x="160" y="84" width="92" height="36" rx="6" />
      <rect className={s.volt} x="170" y="94" width="34" height="5" rx="2.5" />
      <rect className={s.mute} x="170" y="106" width="64" height="4" rx="2" />
      {[78, 92, 54, 70, 40].map((w, i) => (
        <g key={i}>
          <rect className={s.mute2} x="330" y={82 + i * 34} width="96" height="10" rx="5" />
          <rect
            className={clsx(i === 2 ? s.volt : s.ice, s.barx)}
            style={delay(i * 0.1)}
            x="330"
            y={82 + i * 34}
            width={w}
            height="10"
            rx="5"
            opacity=".85"
          />
          <rect className={s.mute} x="330" y={70 + i * 34} width="36" height="4" rx="2" />
        </g>
      ))}
    </Shell>
  );
}

function PipelineSketch() {
  const pins: [number, number, Tone][] = [
    [110, 170, "volt"],
    [168, 136, "ice"],
    [206, 198, "volt"],
    [142, 222, "violet"],
    [236, 150, "ice"],
  ];
  const queue: Tone[] = ["volt", "volt", "ice", "ice", "violet"];
  return (
    <Shell>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect className={i === 2 ? s.volt : s.mute2} x={44 + i * 70} y="64" width="60" height="20" rx="10" />
          {i < 3 && <path className={clsx(s.line, s.flow)} d={`M${104 + i * 70} 74h10`} />}
        </g>
      ))}
      <rect className={s.mute2} x="44" y="98" width="230" height="162" rx="8" />
      <path className={s.line} strokeWidth="7" strokeLinecap="round" d="M60 240 Q 120 160 180 190 T 262 112 M70 122 L 262 246" />
      {pins.map(([x, y, tone], i) => (
        <circle key={i} className={clsx(s[tone], s.pop)} style={delay(i * 0.12)} cx={x} cy={y} r="6" />
      ))}
      <circle className={clsx(s.volt, s.ping)} cx="206" cy="198" r="6" />
      <rect className={s.panel} x="288" y="98" width="148" height="162" rx="8" />
      {queue.map((tone, i) => (
        <g key={i} className={s.pop} style={delay(0.2 + i * 0.08)}>
          <rect className={s[tone]} x="300" y={112 + i * 28} width="4" height="18" rx="2" />
          <rect className={s.mute} x="312" y={113 + i * 28} width={92 - i * 8} height="6" rx="3" />
          <rect className={s.mute2} x="312" y={123 + i * 28} width="56" height="5" rx="2.5" />
        </g>
      ))}
    </Shell>
  );
}

function MapSketch() {
  return (
    <Shell>
      <Kpi x={44} y={64} w={124} tone="volt" value={46} />
      <Kpi x={178} y={64} w={124} tone="text" value={60} />
      <Kpi x={312} y={64} w={124} tone="ice" value={38} />
      <rect className={s.mute2} x="44" y="132" width="250" height="128" rx="8" />
      <path className={s.line} strokeWidth="5" strokeLinecap="round" d="M56 200 L 282 230 M 130 140 L 170 252 M 60 250 Q 160 170 286 160" />
      <path className={clsx(s.voltS, s.flow)} strokeWidth="5" strokeLinecap="round" d="M130 140 L 150 196" />
      <circle className={s.volt} cx="150" cy="196" r="5" />
      <circle className={clsx(s.volt, s.ping)} cx="150" cy="196" r="5" />
      <rect className={s.panel} x="306" y="132" width="130" height="128" rx="8" />
      {[50, 72, 40, 90, 62].map((h, i) => (
        <rect
          key={i}
          className={clsx(s.ice, s.bar)}
          style={delay(i * 0.08)}
          x={320 + i * 22}
          y={246 - h}
          width="12"
          height={h}
          rx="2"
          opacity=".8"
        />
      ))}
    </Shell>
  );
}

const SKETCHES: Record<SketchKind, () => ReactNode> = {
  table: TableSketch,
  periods: PeriodsSketch,
  line: LineSketch,
  pipeline: PipelineSketch,
  map: MapSketch,
};

/** Animated stand-in for a project screenshot. */
export function Sketch({ kind }: { kind: SketchKind }) {
  const Component = SKETCHES[kind];
  return <Component />;
}
