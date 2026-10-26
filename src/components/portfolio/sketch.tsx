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

const ANPR_TABS: [string, number][] = [
  ["Video Source", 34],
  ["Region", 79],
  ["Models", 114],
  ["Messaging", 155],
  ["Post-Processing", 212],
  ["JSON", 261],
];
// [x, width, height] of skyline blocks standing on the horizon (y 126)
const ANPR_CITY: [number, number, number][] = [
  [18, 18, 22],
  [38, 12, 32],
  [52, 20, 18],
  [76, 14, 36],
  [92, 22, 24],
  [150, 16, 28],
  [168, 24, 20],
  [194, 12, 38],
  [208, 22, 26],
];
const ANPR_WINDOWS = [
  [42, 100],
  [80, 96],
  [82, 106],
  [98, 108],
  [154, 104],
  [198, 94],
  [200, 104],
  [212, 108],
];

/**
 * ARM VINO's Configuration page, labelled so it explains itself: the six config tabs, a camera
 * frame with its crop area and detection zone, the plate being read, the Region settings, and the
 * config.json those boxes write. Unlike the other sketches it follows the theme (night scene in
 * dark, day scene in light; see `.anpr`) and scales to fit ("meet") so no label is ever cropped;
 * the backdrop is drawn past the viewBox so any letterboxing stays seamless.
 */
function AnprSketch() {
  return (
    <svg className={s.anpr} viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect className={s.aBg} x="-400" y="-200" width="1200" height="700" />
      {Array.from({ length: 31 }, (_, i) => (
        <path key={i} className={s.aGrid} d={`M${-400 + i * 40} -200V500M-400 ${-180 + i * 30}H800`} />
      ))}

      {/* App bar */}
      <rect className={s.ice} x="14" y="16" width="18" height="18" rx="5" />
      <path className={s.inkS} strokeWidth="1.4" d="M18 22v-2.5h2.5M28 22v-2.5h-2.5M18 28v2.5h2.5M28 28v2.5h-2.5M20.5 25h5" />
      <text className={s.title} x="38" y="24.5" fontSize="9.5">
        ARM VINO
      </text>
      <text className={s.label} x="38" y="34" fontSize="6.4">
        ANPR engine configuration
      </text>
      <rect className={s.volt} x="258" y="18" width="40" height="15" rx="7.5" opacity=".14" />
      <path className={s.accentS} strokeWidth="1.2" d="M265 25.5l2 2 3.5-4" />
      <text className={s.accent} x="273" y="28" fontSize="6.4" fontWeight="600">
        Valid
      </text>
      <rect className={s.volt} x="304" y="17" width="82" height="17" rx="8.5" />
      <path className={s.inkS} strokeWidth="1.2" d="M314 21.5v6m-2.5-2.5 2.5 2.5 2.5-2.5M311 30h6" />
      <text className={s.ink} x="321" y="28.2" fontSize="6.3">
        Export config.json
      </text>

      {/* The six config sections, Region open; English and Malay */}
      {ANPR_TABS.map(([label, x]) => (
        <text key={label} className={label === "Region" ? s.strong : s.label} x={x} y="57" fontSize="6.8" textAnchor="middle">
          {label}
        </text>
      ))}
      <path className={s.aLine} d="M12 64.5H388" />
      <rect className={s.accent} x="66" y="63" width="26" height="2" rx="1" />
      <rect className={s.aPanel} x="346" y="47" width="42" height="13" rx="6.5" />
      <text className={s.label} x="367" y="55.6" fontSize="5.8" textAnchor="middle">
        EN · BM
      </text>

      {/* Reference frame: a road scene from the camera */}
      <rect className={s.ground} x="12" y="72" width="224" height="154" rx="8" />
      <rect className={s.sky} x="12" y="72" width="224" height="54" rx="8" />
      <rect className={s.sky} x="12" y="96" width="224" height="30" />
      <rect className={s.ice} x="12" y="110" width="224" height="16" opacity=".07" />
      {ANPR_CITY.map(([x, w, h]) => (
        <rect key={x} className={s.city} x={x} y={126 - h} width={w} height={h} rx="1.5" />
      ))}
      {ANPR_WINDOWS.map(([x, y]) => (
        <rect key={`${x}-${y}`} className={s.window} x={x} y={y} width="2.5" height="2.5" opacity=".55" />
      ))}
      <path className={s.road} d="M100 126H148L206 226H42Z" />
      <path className={s.lane} strokeWidth="1.2" d="M100 126L42 226M148 126L206 226" />
      <path className={s.lane} strokeWidth="1.4" strokeDasharray="6 7" d="M124 128V226" />

      {/* Car and plate */}
      <ellipse className={s.shade} cx="124" cy="201" rx="38" ry="4" />
      <rect className={s.tyre} x="94" y="196" width="9" height="6" rx="2" />
      <rect className={s.tyre} x="145" y="196" width="9" height="6" rx="2" />
      <path className={s.cabin} d="M102 167L108 152H140L146 167Z" />
      <path className={s.ice} opacity=".22" d="M106 166L111 154.5H137L142 166Z" />
      <rect className={s.car} x="92" y="165" width="64" height="33" rx="8" />
      <circle className={s.lamp} cx="101" cy="178.5" r="9" opacity=".14" />
      <circle className={s.lamp} cx="147" cy="178.5" r="9" opacity=".14" />
      <rect className={s.lamp} x="96" y="176" width="10" height="5" rx="2" />
      <rect className={s.lamp} x="142" y="176" width="10" height="5" rx="2" />
      <rect className={s.shade} x="112" y="174" width="24" height="3" rx="1.5" />
      <rect className={s.plate} x="109" y="183" width="30" height="10" rx="1.5" />
      <text className={clsx(s.mono, s.plateText)} x="124" y="190.2" fontSize="5.6" fontWeight="700" textAnchor="middle">
        WXY 1234
      </text>

      {/* Crop area (marching ants) and camera source */}
      <rect className={s.dataS} x="20" y="80" width="208" height="138" rx="4" strokeWidth="1.2" opacity=".35" />
      <rect className={clsx(s.dataS, s.flow)} x="20" y="80" width="208" height="138" rx="4" strokeWidth="1.2" />
      <rect className={s.ice} x="24" y="84" width="40" height="12" rx="3" />
      <text className={s.ink} x="44" y="92.2" fontSize="5.8" textAnchor="middle">
        Crop area
      </text>
      <rect className={s.osdBg} x="150" y="84" width="74" height="12" rx="3" />
      <circle className={clsx(s.rec, s.blink)} cx="157" cy="90" r="2.2" />
      <text className={s.osd} x="162" y="92.2" fontSize="5.6">
        cam-01 · 25 fps
      </text>

      {/* Detection zone, always inside the crop area (the app enforces it), with a scan line,
          drag handles and the cursor dragging it */}
      <rect className={s.zone} x="28" y="174" width="192" height="26" />
      <rect className={s.accentS} x="28" y="174" width="192" height="26" strokeWidth="1.3" />
      <g className={s.scan}>
        <rect className={s.volt} x="28" y="172.5" width="192" height="6" opacity=".18" />
        <rect className={s.accent} x="28" y="175" width="192" height="1.2" />
      </g>
      {[
        [26, 172],
        [218, 172],
        [26, 198],
        [218, 198],
      ].map(([x, y]) => (
        <rect key={`${x}-${y}`} className={s.accent} x={x} y={y} width="4" height="4" rx="1" />
      ))}
      <rect className={s.volt} x="166" y="160" width="54" height="12" rx="3" />
      <text className={s.ink} x="193" y="168.2" fontSize="5.8" textAnchor="middle">
        Detection zone
      </text>
      <path className={clsx(s.accentS, s.glow)} strokeWidth="1.4" d="M106 184v-4h4M142 184v-4h-4M106 192v4h4M142 192v4h-4" />

      {/* Plate read */}
      <path className={clsx(s.accentS, s.flow)} strokeWidth="1" d="M142 180L156 151" />
      <g className={s.read}>
        <rect className={s.chip} x="146" y="134" width="74" height="17" rx="4" />
        <circle className={s.accent} cx="154" cy="142.5" r="2.2" />
        <text className={clsx(s.mono, s.strong)} x="160" y="145" fontSize="6.4" fontWeight="700">
          WXY 1234
        </text>
        <text className={s.accent} x="214" y="145" fontSize="6" textAnchor="end">
          97%
        </text>
      </g>
      <circle className={clsx(s.accent, s.ping)} cx="220" cy="200" r="3" />
      <g className={s.drag}>
        <path className={s.cursor} d="M220 200V211L223 208L225.4 213L227.2 212.2L224.8 207.3H229Z" />
      </g>

      {/* Region settings, mirroring the two boxes */}
      <rect className={s.aPanel} x="244" y="72" width="144" height="154" rx="8" />
      <text className={s.accent} x="254" y="86" fontSize="5.6" fontWeight="600" letterSpacing=".8">
        REGION
      </text>
      <text className={s.label} x="254" y="100" fontSize="6">
        Detection sensitivity
      </text>
      <rect className={s.field} x="254" y="104" width="124" height="15" rx="4" />
      <text className={s.strong} x="261" y="114.1" fontSize="6.6">
        Low
      </text>
      <path className={s.iconS} d="M366 110.5l2.5 2.5 2.5-2.5" />
      <text className={s.label} x="254" y="134" fontSize="6">
        Crop area
      </text>
      <text className={clsx(s.mono, s.data)} x="378" y="134" fontSize="5.6" textAnchor="end">
        0–100%
      </text>
      <path className={s.aLine} strokeWidth="3" strokeLinecap="round" d="M256 143H376" />
      <rect className={s.data} x="256" y="141.5" width="120" height="3" rx="1.5" />
      <circle className={s.knob} cx="256" cy="143" r="4" />
      <circle className={s.knob} cx="376" cy="143" r="4" />
      <text className={s.label} x="254" y="162" fontSize="6">
        Detection zone
      </text>
      <text className={clsx(s.mono, s.accent)} x="378" y="162" fontSize="5.6" textAnchor="end">
        50–70%
      </text>
      <path className={s.aLine} strokeWidth="3" strokeLinecap="round" d="M256 171H376" />
      <rect className={s.accent} x="316" y="169.5" width="24" height="3" rx="1.5" />
      <circle className={s.knob} cx="316" cy="171" r="4" />
      <circle className={s.knob} cx="340" cy="171" r="4" />
      <text className={s.label} x="254" y="192" fontSize="6">
        Drag boxes on the frame
      </text>
      <rect className={s.volt} x="358" y="185" width="20" height="11" rx="5.5" />
      <circle className={s.tyre} cx="372.5" cy="190.5" r="3.6" />
      <path className={s.aLine} d="M254 203H378" />
      <text className={s.dim} x="254" y="216" fontSize="5.4">
        Stored as 0–1 of the frame
      </text>

      {/* The zone writes config.json */}
      <rect className={s.aPanel} x="12" y="234" width="224" height="52" rx="8" />
      <path className={clsx(s.accentS, s.flow)} strokeWidth="1" opacity=".8" d="M28 200V268" />
      <path className={s.accentS} strokeWidth="1" d="M25.5 265.5l2.5 2.5 2.5-2.5" />
      <text className={clsx(s.mono, s.data)} x="38" y="247" fontSize="6">
        config.json
      </text>
      <text className={s.dim} x="226" y="247" fontSize="5.4" textAnchor="end">
        updates as you edit
      </text>
      <text className={s.mono} x="38" y="260" fontSize="6">
        <tspan className={s.data}>&quot;crop&quot;</tspan>
        <tspan className={s.dim}>{': { "ymin": '}</tspan>
        <tspan className={s.strong}>0</tspan>
        <tspan className={s.dim}>{', "ymax": '}</tspan>
        <tspan className={s.strong}>1</tspan>
        <tspan className={s.dim}>{" }"}</tspan>
      </text>
      <g className={s.glow}>
        <rect className={s.volt} x="34" y="264.5" width="156" height="11" rx="2" opacity=".12" />
      </g>
      <text className={s.mono} x="38" y="272.5" fontSize="6">
        <tspan className={s.accent}>&quot;detect_zone&quot;</tspan>
        <tspan className={s.dim}>{': { "ymin": '}</tspan>
        <tspan className={s.accent}>0.5</tspan>
        <tspan className={s.dim}>{', "ymax": '}</tspan>
        <tspan className={s.accent}>0.7</tspan>
        <tspan className={s.dim}>{" }"}</tspan>
      </text>

      {/* Validation, browser-only storage, and how it reaches the device */}
      <rect className={s.aPanel} x="244" y="234" width="144" height="52" rx="8" />
      <circle className={s.accentS} cx="256" cy="248" r="4" strokeWidth="1.1" />
      <path className={s.accentS} strokeWidth="1.1" d="M254.2 248.1l1.3 1.3 2.6-2.7" />
      <text className={s.accent} x="264" y="250.2" fontSize="6.2" fontWeight="600">
        Draft passes validation
      </text>
      <rect className={s.iconS} x="252" y="258" width="8" height="6" rx="1.2" />
      <text className={s.label} x="264" y="263" fontSize="5.6">
        Saved in this browser only
      </text>
      <path className={s.iconS} d="M256 268.5v5m-2-2 2 2 2-2" />
      <text className={s.label} x="264" y="275" fontSize="5.6">
        Export, then copy to the device
      </text>
    </svg>
  );
}

/** Sketches that follow the site theme; the rest always draw a dark screen. */
export const THEMED_SKETCHES: ReadonlySet<SketchKind> = new Set(["anpr"]);

const SKETCHES: Record<SketchKind, () => ReactNode> = {
  table: TableSketch,
  periods: PeriodsSketch,
  line: LineSketch,
  pipeline: PipelineSketch,
  map: MapSketch,
  anpr: AnprSketch,
};

/** Animated stand-in for a project screenshot. */
export function Sketch({ kind }: { kind: SketchKind }) {
  const Component = SKETCHES[kind];
  return <Component />;
}
