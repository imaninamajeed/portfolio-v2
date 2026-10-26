/**
 * All portfolio content lives here. Components never hard-code copy.
 * Add or edit case studies in CASES; the archive links to them by `caseId`.
 */

/* ---------- Types ---------- */

/** Lucide icon names used in content. Resolved to components in `components/portfolio/icon.tsx`. */
export type IconName =
  | "code-xml"
  | "boxes"
  | "pen-tool"
  | "route"
  | "wrench"
  | "chart-column"
  | "train-front"
  | "scan-eye"
  | "cctv"
  | "layout-template"
  | "chart-line"
  | "server"
  | "git-branch"
  | "briefcase"
  | "graduation-cap"
  | "external-link"
  | "github";

export type ProjectStatus = "Prototype" | "Completed" | "In progress" | "Concept";

/** Which animated interface sketch to draw when a case has no screenshot. */
export type SketchKind = "map" | "table" | "periods" | "line" | "pipeline" | "anpr";

export type CaseId =
  | "kkr-nitmc-dashboard"
  | "cmms-plus"
  | "analytics-presentation"
  | "mrt-operations-monitor"
  | "roadops"
  | "arm-vino-anpr-webview";

export interface Metric {
  v: string;
  l: string;
}

export interface CaseLink {
  label: string;
  href: string;
  icon: IconName;
  primary?: boolean;
}

export interface Role {
  icon: IconName;
  title: string;
  /** Optional qualifier shown smaller after the title, e.g. "Software". */
  qualifier?: string;
  line: string;
  skills: string[];
  /** Case studies that show this role in practice. */
  proof: CaseId[];
}

export interface CaseStudy {
  id: CaseId;
  title: string;
  /** Short label for compact links. */
  short: string;
  icon: IconName;
  domain: string;
  year: number;
  status: ProjectStatus;
  line: string;
  role: string;
  /** Optional screenshot in `public/`. Without it the animated `sketch` is shown. */
  image?: string;
  sketch: SketchKind;
  links?: CaseLink[];
  metrics: Metric[];
  problem: string;
  did: string[];
  result: string;
  stack: string[];
}

export interface ArchiveEntry {
  year: number;
  title: string;
  desc: string;
  domain: string;
  stack: string;
  status: ProjectStatus;
  /** When set, the row opens that case study. */
  caseId?: CaseId;
}

export interface TimelineEntry {
  icon: IconName;
  date: string;
  current?: boolean;
  title: string;
  org: string;
  desc: string;
}

/** Self-assessed level, 1 (learning) to 5 (expert). */
export type SkillLevel = 1 | 2 | 3 | 4 | 5;

export interface SkillGroup {
  /** Also the radar axis label. */
  title: string;
  icon: IconName;
  skills: { name: string; level: SkillLevel }[];
}

export interface ToolkitGroup {
  icon: IconName;
  title: string;
  items: string[];
}

export interface Stat {
  /** Number to count up to. Omit for a static `display` value. */
  value?: number;
  suffix?: string;
  /** Static text, with an optional superscript, e.g. `1` + `st`. */
  display?: string;
  sup?: string;
  label: string;
}

/* ---------- Site ---------- */

export const SITE = {
  name: "Imanina Majeed",
  title: "Imanina Majeed — Frontend & Product Engineer",
  tagline: "Complex work, made simple.",
  description:
    "Imanina Majeed is a frontend developer and product engineer in Malaysia who designs and builds clear, fast interfaces for complex data and workflows: dashboards, internal tools and product UI.",
  /** Short bio for the hero and footer. */
  bio: "I’m Imanina, a frontend and product engineer in Malaysia. I turn complex data and workflows into clear, fast interfaces that help teams spot problems early and act with confidence.",
  jobTitle: "Frontend & Product Engineer",
  location: "Subang Jaya, Malaysia",
  timeZone: "Asia/Kuala_Lumpur",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://imanina.vercel.app",
  /** Résumé page (web version, prints to PDF). The original PDF is still in `public/resume/`. */
  resume: "/resume",
  email: "imaninamajeed@gmail.com",
  linkedin: "https://linkedin.com/in/imaninamajeed",
  github: "https://github.com/imaninamajeed",
} as const;

export const NAV = [
  { href: "#roles", label: "What I do" },
  { href: "#work", label: "Projects" },
  { href: "#archive", label: "Archive" },
  { href: "#experience", label: "Experience" },
] as const;

/* ---------- Content ---------- */

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  Prototype: "var(--volt)",
  Completed: "var(--ice)",
  "In progress": "var(--violet)",
  Concept: "var(--mute)",
};

export const ROLES: Role[] = [
  {
    icon: "code-xml",
    title: "Frontend Developer",
    line: "Fast, typed interfaces built to grow.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    proof: ["kkr-nitmc-dashboard", "cmms-plus"],
  },
  {
    icon: "boxes",
    title: "Product Engineer",
    qualifier: "Software",
    line: "Shaping what gets built, not only how.",
    skills: ["Product structure", "API integration", "Prototyping", "FastAPI"],
    proof: ["roadops", "cmms-plus"],
  },
  {
    icon: "pen-tool",
    title: "UI/UX Developer",
    line: "Dense data, made easy to act on.",
    skills: ["Dashboard UX", "Design systems", "Data viz", "Info design"],
    proof: ["analytics-presentation", "mrt-operations-monitor"],
  },
];

// Featured case studies. Projects without a screenshot get an animated interface sketch.
export const CASES: CaseStudy[] = [
  {
    id: "kkr-nitmc-dashboard",
    title: "KKR NITMC Dashboard",
    short: "KKR NITMC",
    icon: "route",
    domain: "Traffic & transit",
    year: 2026,
    status: "Prototype",
    line: "One home for Malaysia’s traffic and transit operations data.",
    role: "Frontend engineering · UI/UX direction · Dashboard design",
    image: "/images/projects/kkr-nitmc-dashboard.png",
    sketch: "map",
    links: [
      { label: "Live demo", href: "https://kkr-nextjs.vercel.app/", icon: "external-link", primary: true },
    ],
    metrics: [
      { v: "15", l: "dashboard modules" },
      { v: "5", l: "operational areas" },
      { v: "1", l: "shared app shell" },
    ],
    problem: "Teams jumped between separate tools and static reports to answer simple questions.",
    did: [
      "Rebuilt the static prototype in Next.js, one route per dashboard",
      "Shared shell and shadcn/ui so 15 modules feel like one product",
      "Typed mock data, ready to swap for a live feed",
      "Map layer that falls back cleanly when no API key is set",
    ],
    result: "A deployed suite that brings five operational areas into one interface.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "shadcn/ui", "Recharts", "Google Maps"],
  },
  {
    id: "cmms-plus",
    title: "CMMS Plus",
    short: "CMMS Plus",
    icon: "wrench",
    domain: "Maintenance operations",
    year: 2026,
    status: "Prototype",
    line: "Clear maintenance operations, with live enterprise data kept safely read-only.",
    role: "Frontend engineering · UX architecture · Integration design",
    sketch: "table",
    metrics: [
      { v: "5", l: "role-based views" },
      { v: "2", l: "workspaces: mock & live" },
      { v: "0", l: "write actions to source" },
    ],
    problem:
      "Maintenance data was buried in dense enterprise screens, and live records had to stay safe from accidental changes.",
    did: [
      "Views built around five roles, from technician to control room",
      "One set of tables, filters and exports, reused everywhere",
      "Backend proxy keeps hosts and credentials out of the browser",
      "Mock/live HxGN EAM switch, with the data source always labelled",
    ],
    result: "One product that works the same with demo data and live HxGN EAM records.",
    stack: ["Next.js", "React", "TypeScript", "shadcn/ui", "FastAPI", "Docker", "HxGN EAM"],
  },
  {
    id: "analytics-presentation",
    title: "Analytics Presentation",
    short: "Analytics",
    icon: "chart-column",
    domain: "Executive reporting",
    year: 2026,
    status: "Prototype",
    line: "Executive reports where the headline always agrees with the chart.",
    role: "Dashboard UX · Data storytelling · Frontend prototyping",
    sketch: "periods",
    metrics: [
      { v: "4", l: "periods, daily to quarterly" },
      { v: "1", l: "source for data and headlines" },
      { v: "0", l: "headline–chart contradictions" },
    ],
    problem:
      "Repeated metrics and vague labels made reports feel fake, and headlines could contradict the data.",
    did: [
      "Gave each period its own question, from daily to quarterly",
      "Data, headlines and actions all come from one scenario",
      "Checks stop a headline from contradicting its numbers",
      "Full-screen, export-ready layouts for briefings",
    ],
    result: "Reports where the story, the numbers and the next step stay in sync.",
    stack: ["React", "TypeScript", "Chart.js"],
  },
  {
    id: "mrt-operations-monitor",
    title: "MRT Operations Monitor",
    short: "MRT Monitor",
    icon: "train-front",
    domain: "Rail transit",
    year: 2026,
    status: "Prototype",
    line: "Crowding, fleet and service risk for the MRT Kajang Line, from control room to boardroom.",
    role: "Frontend engineering · Information design · Dashboard UX",
    sketch: "line",
    metrics: [
      { v: "2", l: "audiences: ops & execs" },
      { v: "4", l: "reporting periods" },
      { v: "6", l: "monitoring workflows" },
    ],
    problem:
      "Operators need detail and executives need the big picture. Both have to read risk in seconds.",
    did: [
      "Separate views for train load, stations and fleet readiness",
      "Every anomaly links straight to its evidence",
      "One layout from daily to quarterly reports",
      "Full-screen summaries made for briefings",
    ],
    result: "One monitoring product that serves operations and leadership.",
    stack: ["Next.js", "React", "TypeScript", "Chart.js", "shadcn/ui"],
  },
  {
    id: "roadops",
    title: "RoadOps",
    short: "RoadOps",
    icon: "scan-eye",
    domain: "Road maintenance · AI",
    year: 2026,
    status: "Prototype",
    line: "From AI-detected road defect to scheduled repair, without losing the evidence.",
    role: "Product naming · UX direction · Dashboard design",
    sketch: "pipeline",
    metrics: [
      { v: "3", l: "stages: detect, rank, fix" },
      { v: "2", l: "synced views: map & list" },
      { v: "1", l: "priority queue" },
    ],
    problem: "Defect location, photos and severity got lost between detection and repair planning.",
    did: [
      "Named the product and shaped its story",
      "Navigation follows the real flow: detect, prioritise, act",
      "Map and priority list as two views of one queue",
      "Return on investment framed for Malaysian road maintenance",
    ],
    result: "A clear product direction for computer vision in road maintenance.",
    stack: ["Next.js", "TypeScript", "Computer vision", "Maps"],
  },
  {
    id: "arm-vino-anpr-webview",
    title: "ARM VINO ANPR Webview",
    short: "ARM VINO",
    icon: "cctv",
    domain: "Plate recognition · Edge AI",
    year: 2021,
    status: "Completed",
    line: "Set up a plate-recognition camera from the browser, not the terminal.",
    role: "Frontend development · UI design · 2026 rebuild",
    sketch: "anpr",
    links: [
      { label: "Live demo", href: "https://arm-vino.vercel.app", icon: "external-link", primary: true },
    ],
    metrics: [
      { v: "3", l: "engine controls: start, stop, restart" },
      { v: "6", l: "config sections, validated" },
      { v: "2", l: "languages: English & Malay" },
    ],
    problem:
      "Tuning an ANPR camera meant editing the engine’s JSON config on the device and restarting it from a terminal.",
    did: [
      "Web panel to start, stop and restart the engine on the device",
      "Config forms built from the engine’s JSON Schema, checked before saving",
      "Upload, view and delete the reference plate images",
      "Rebuilt in 2026 in Next.js, with crop and detection zones drawn on a frame",
    ],
    result: "Cameras are set up from a browser. The rebuilt editor runs on Vercel and sends nothing to a server.",
    stack: ["Flask", "jQuery", "JSON Schema", "Bootstrap", "Next.js", "TypeScript", "shadcn/ui"],
  },
];

export const ARCHIVE: ArchiveEntry[] = [
  { year: 2026, title: "KKR NITMC Dashboard", desc: "Traffic & transit operations in one place", domain: "Operations", stack: "Next.js · TS · Recharts", status: "Prototype", caseId: "kkr-nitmc-dashboard" },
  { year: 2026, title: "CMMS Plus", desc: "Maintenance operations for every role", domain: "Operations", stack: "Next.js · TS · FastAPI", status: "Prototype", caseId: "cmms-plus" },
  { year: 2026, title: "HxGN EAM Workspace", desc: "Live enterprise records, safely read-only", domain: "Operations", stack: "Next.js · FastAPI · REST", status: "Prototype", caseId: "cmms-plus" },
  { year: 2026, title: "RoadOps", desc: "AI road inspection to repair queue", domain: "Operations", stack: "Next.js · TS · CV", status: "Prototype", caseId: "roadops" },
  { year: 2026, title: "Analytics Presentation", desc: "Executive reports that stay consistent", domain: "Analytics", stack: "React · TS · Chart.js", status: "Prototype", caseId: "analytics-presentation" },
  { year: 2026, title: "MRT Operations Monitor", desc: "Rail crowding, fleet & forecasts", domain: "Transport", stack: "Next.js · TS · Chart.js", status: "Prototype", caseId: "mrt-operations-monitor" },
  { year: 2026, title: "Image Analysis Builder", desc: "Guided setup for image-analysis jobs", domain: "Computer vision", stack: "React · TS · AI", status: "Prototype" },
  { year: 2026, title: "Visual Analytics Interfaces", desc: "Camera output turned into evidence", domain: "Computer vision", stack: "React · TS · CV", status: "Prototype" },
  { year: 2026, title: "Developer Source Viewer", desc: "Inspect API responses in-product", domain: "Dev tools", stack: "Next.js · TS · JSON", status: "Concept" },
  { year: 2026, title: "Recogine Company Site", desc: "Products and capabilities, clearly told", domain: "Web", stack: "HTML · CSS · JS", status: "In progress" },
  { year: 2021, title: "ARM VINO ANPR Webview", desc: "Plate-recognition camera setup in the browser", domain: "Computer vision", stack: "Flask · jQuery · Next.js", status: "Completed", caseId: "arm-vino-anpr-webview" },
  { year: 2021, title: "Traffic Vehicle Analytics", desc: "Public traffic data dashboard", domain: "Analytics", stack: "React · JS", status: "Completed" },
  { year: 2021, title: "Train Load Indicator", desc: "Train crowding at a glance", domain: "Transport", stack: "React · Chart.js", status: "Completed" },
  { year: 2021, title: "React Weather Search", desc: "Weather search with live API data", domain: "Web", stack: "React · Axios", status: "Completed" },
];

export const SKILL_LEVELS: Record<SkillLevel, string> = {
  1: "Learning",
  2: "Working",
  3: "Proficient",
  4: "Advanced",
  5: "Expert",
};

// Self-assessment. Adjust levels honestly; the meters and the radar both render from this.
// Each group is one radar axis, plotted at the average of its skills.
export const SKILLS: SkillGroup[] = [
  {
    title: "Frontend",
    icon: "code-xml",
    skills: [
      { name: "HTML & CSS", level: 5 },
      { name: "React & Next.js", level: 4 },
      { name: "TypeScript", level: 4 },
    ],
  },
  {
    title: "UI/UX",
    icon: "pen-tool",
    skills: [
      { name: "Dashboard UX", level: 5 },
      { name: "Information design", level: 4 },
      { name: "Design systems", level: 4 },
    ],
  },
  {
    title: "Product",
    icon: "boxes",
    skills: [
      { name: "Prototyping", level: 5 },
      { name: "Product structure", level: 4 },
      { name: "Naming & storytelling", level: 4 },
    ],
  },
  {
    title: "Data & viz",
    icon: "chart-line",
    skills: [
      { name: "Data visualisation", level: 4 },
      { name: "Analytics reporting", level: 4 },
      { name: "SQL & PostgreSQL", level: 3 },
    ],
  },
  {
    title: "Backend",
    icon: "server",
    skills: [
      { name: "REST API integration", level: 4 },
      { name: "FastAPI", level: 3 },
      { name: "Node.js & Express", level: 3 },
    ],
  },
  {
    title: "Delivery",
    icon: "git-branch",
    skills: [
      { name: "Git workflow", level: 4 },
      { name: "Docker", level: 3 },
      { name: "Deployment", level: 3 },
    ],
  },
];

/** Average level of a group, rounded to one decimal: the group's radar value. */
export const groupScore = (g: SkillGroup) =>
  Math.round((g.skills.reduce((sum, s) => sum + s.level, 0) / g.skills.length) * 10) / 10;


/** Tech stack, shown beside the timeline. Not rated; see SKILLS for the self-assessment. */
export const TOOLKIT: ToolkitGroup[] = [
  { icon: "layout-template", title: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
  { icon: "chart-line", title: "Data & viz", items: ["Recharts", "Chart.js", "Grafana", "PostgreSQL", "SQL"] },
  { icon: "server", title: "Backend", items: ["FastAPI", "Flask", "Node.js", "Express", "REST APIs"] },
  { icon: "git-branch", title: "Delivery", items: ["Docker", "Git", "GitHub", "GitLab", "Vercel"] },
];

export const TIMELINE: TimelineEntry[] = [
  {
    icon: "briefcase",
    date: "Jan 2022 — Present",
    current: true,
    title: "Engineer, Analytics / R&D",
    org: "Recogine Technology Sdn Bhd",
    desc: "I build dashboards and product UI for traffic, transit, maintenance and computer-vision products, from first idea to working prototype.",
  },
  {
    icon: "graduation-cap",
    date: "2018 — 2021",
    title: "B.Sc. Computer Science (Hons.)",
    org: "Universiti Teknologi MARA",
    desc: "First Class Honours · CGPA 3.51",
  },
];

/** Dashboard modules in the KKR NITMC product; shown in the hero chip and the stats row. */
export const MODULES_SHIPPED = 15;

export const STATS: Stat[] = [
  { value: 4, suffix: "+", label: "years building dashboards" },
  { value: ARCHIVE.length, label: "products & prototypes" },
  { value: MODULES_SHIPPED, label: "modules in one product" },
  { display: "1", sup: "st", label: "Class Hons., Computer Science" },
];

/* ---------- Helpers ---------- */

export const CASE_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c])) as Record<CaseId, CaseStudy>;

export const isCaseId = (id: string): id is CaseId => id in CASE_BY_ID;

export const caseHref = (id: CaseId) => `#case/${id}`;

/** "Product Engineer (Software)" from a title and optional qualifier. */
export const roleName = (r: Role) => (r.qualifier ? `${r.title} (${r.qualifier})` : r.title);

export const pad = (n: number) => String(n).padStart(2, "0");
