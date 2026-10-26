/**
 * Résumé content for /resume (and its printed PDF).
 * Written for recruiters and ATS parsers: standard section names, action-verb bullets,
 * verified numbers only, prototypes labelled as prototypes.
 */

import { SITE, type CaseId, type IconName } from "./portfolio";

export type ResumeProjectStatus = "Live demo" | "Prototype" | "In development" | "Concept";

export interface ResumeRole {
  title: string;
  org: string;
  place: string;
  dates: string;
  bullets: string[];
}

export interface ResumeSkillGroup {
  icon: IconName;
  title: string;
  items: string[];
}

export interface ResumeProject {
  title: string;
  subtitle: string;
  year: number;
  status: ResumeProjectStatus;
  stack: string[];
  bullets: string[];
  /** Public link; printed as plain text in the PDF. */
  link?: { label: string; href: string };
  /** Portfolio case study, if there is one (screen only). */
  caseId?: CaseId;
  /** False leaves it out of the portfolio-style PDFs, whose 3×2 grid holds six projects. */
  portfolioPdf?: false;
}

export const RESUME = {
  name: "Nur Imanina Binti Abdul Majeed",
  /** One plain job title line: what ATS and recruiters search for. */
  title: "Software Engineer — Frontend & Product UI/UX",
  location: "Subang Jaya, Selangor, Malaysia",
  email: SITE.email,
  /** Printed PDF only; never rendered into the page HTML (see PrintPhone). */
  phone: "+60 18-388 5790",
  /** Portrait in `public/`, used as-is, top right of the portfolio-style PDFs only (not the web page or the ATS PDF). */
  photo: "/images/IMG_0336.JPG",
  links: [
    { label: "imanina.vercel.app", href: "https://imanina.vercel.app" },
    { label: "linkedin.com/in/imaninamajeed", href: "https://linkedin.com/in/imaninamajeed" },
    { label: "github.com/imaninamajeed", href: "https://github.com/imaninamajeed" },
  ],

  /** At-a-glance strip on the page (not printed; the summary carries the same facts). */
  highlights: [
    { value: "4+ yrs", label: "building web products" },
    { value: "15", label: "modules in one shipped dashboard" },
    { value: "8", label: "products & prototypes" },
    { value: "1st", label: "Class Honours, Computer Science" },
  ],

  summary:
    "Software engineer with 4+ years of experience building web applications, operational dashboards and product prototypes for intelligent transportation, traffic intelligence and asset-management teams. Combines frontend engineering in React, Next.js and TypeScript with product thinking and UI/UX design to turn complex operational data into clear, responsive interfaces. Experienced with REST API integration, SQL and PostgreSQL, data visualisation and Docker-based delivery. First Class Honours in Computer Science.",

  skills: [
    {
      icon: "layout-template",
      title: "Frontend",
      items: ["React", "Next.js (App Router)", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "shadcn/ui", "Material UI", "Bootstrap", "React Admin"],
    },
    {
      icon: "pen-tool",
      title: "Product & UI/UX",
      items: [
        "Requirements analysis",
        "Information architecture",
        "User flows",
        "Role-based workflows",
        "Wireframes & storyboarding",
        "Prototyping",
        "Dashboard UX",
        "Design systems",
        "Usability refinement",
        "Stakeholder demos",
        "Agile/Scrum",
      ],
    },
    {
      icon: "chart-line",
      title: "Data & visualisation",
      items: ["SQL", "PostgreSQL", "MySQL", "Grafana", "Recharts", "Chart.js", "Power BI", "KPI reporting", "Geospatial views"],
    },
    {
      icon: "server",
      title: "Backend & integration",
      items: ["REST APIs", "FastAPI", "Flask", "Node.js", "Express.js", "Axios", "MQTT", "JWT authentication", "Postman"],
    },
    {
      icon: "git-branch",
      title: "Tools & delivery",
      items: ["Git", "GitHub", "GitLab", "Docker", "Docker Compose", "Traefik", "pnpm", "Turborepo", "Vercel", "Netlify", "Linux/Ubuntu", "API testing", "QA", "Technical writing"],
    },
    {
      icon: "route",
      title: "Domain",
      items: ["Intelligent Transportation Systems (ITS)", "ANPR/LPR", "Computer-vision interfaces", "Road asset monitoring", "CMMS/EAM"],
    },
  ] satisfies ResumeSkillGroup[],

  experience: [
    {
      title: "Engineer, Analytics / Research & Development",
      org: "Recogine Technology Sdn Bhd (Recovision)",
      place: "Putra Heights, Subang Jaya, Selangor",
      dates: "Jan 2022 – Present",
      bullets: [
        "Build and maintain responsive web dashboards and operational interfaces for transportation, traffic-intelligence, road-inspection and maintenance products using React, Next.js, TypeScript and Tailwind CSS.",
        "Rebuilt the KKR NITMC traffic and transit dashboard from a static Vite prototype into a Next.js App Router application: 15 modules sharing one layout shell and a typed data layer, deployed on Vercel.",
        "Designed the frontend integration for a read-only HxGN EAM workspace, using a same-origin API proxy to keep backend hosts and credentials server-side, with clearly labelled mock and live data modes.",
        "Standardised reusable UI patterns for tables, filters, exports, statuses and priorities across maintenance (CMMS) and highway-operations interfaces.",
        "Translate stakeholder requirements into user flows, information architecture, wireframes and interactive prototypes for client demonstrations.",
        "Integrate interfaces with REST APIs and FastAPI services; query and present operational data with SQL, PostgreSQL and Grafana.",
        "Contribute to computer-vision and ANPR/LPR product interfaces, including evidence review, camera and system status, vehicle search and geospatial views.",
        "Support delivery with Git, pnpm and Turborepo monorepos, Docker, Docker Compose, Traefik and Linux; take part in requirements reviews, QA checks and user-facing documentation.",
      ],
    },
    {
      title: "Research Intern",
      org: "IT Centre (Pusat Teknologi Maklumat), Universiti Kebangsaan Malaysia",
      place: "Bangi, Selangor",
      dates: "Mar 2021 – Aug 2021",
      bullets: [
        "Researched Microsoft products and features, contributing findings toward feature enhancements.",
        "Assisted with technical documentation and research reports.",
      ],
    },
  ] satisfies ResumeRole[],

  // Newest year first; within a year, strongest and most verifiable first.
  projects: [
    {
      title: "KKR NITMC Dashboard",
      subtitle: "Traffic & transit operations",
      year: 2026,
      status: "Live demo",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Recharts", "Google Maps API"],
      bullets: [
        "Unified executive, operations, traffic, transit and planning views into 15 dashboard modules within one navigable interface, deployed on Vercel.",
        "Added a Google Maps traffic layer with a clear fallback state when no API key is configured.",
      ],
      link: { label: "kkr-nextjs.vercel.app", href: "https://kkr-nextjs.vercel.app/" },
      caseId: "kkr-nitmc-dashboard",
    },
    {
      title: "CMMS Plus & HxGN EAM Workspace",
      subtitle: "Maintenance operations",
      year: 2026,
      status: "Prototype",
      stack: ["Next.js", "React", "TypeScript", "shadcn/ui", "FastAPI", "Docker"],
      bullets: [
        "Designed five role-based views (management, technician, control room, asset, incident) with shared table, filter, export and notification patterns.",
        "Built against a mock FastAPI contract shaped for future HxGN EAM integration, keeping the source system read-only.",
      ],
      caseId: "cmms-plus",
    },
    {
      title: "RoadOps",
      subtitle: "AI-assisted road inspection",
      year: 2026,
      status: "Prototype",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Docker", "Maps"],
      bullets: [
        "Named and shaped the product around a detect, prioritise and act workflow for road-maintenance teams.",
        "Designed KPI dashboards, detection review, hotspot maps, a severity-ranked priority queue and mobile-capture flows for AI-detected road defects.",
        "Wrote plain-language product storytelling for public-works stakeholders.",
      ],
      caseId: "roadops",
    },
    {
      title: "MRT Operations Monitor & Analytics Presentation",
      subtitle: "Rail operations & executive reporting",
      year: 2026,
      status: "Prototype",
      stack: ["Next.js", "React", "TypeScript", "Chart.js", "shadcn/ui"],
      bullets: [
        "Designed monitoring and executive views for MRT Kajang Line operations: train and station load, fleet readiness, anomalies and forecasts.",
        "Generated report data, headlines and recommendations from a single scenario source, with checks so headlines stay consistent with charts.",
      ],
      caseId: "mrt-operations-monitor",
    },
    {
      title: "Jalur",
      subtitle: "Highway operations web platform",
      year: 2026,
      status: "In development",
      stack: ["Next.js", "TypeScript", "REST APIs", "pnpm", "Docker", "Traefik"],
      bullets: [
        "Contributed modular dashboard structure, highway network maps, asset views and operational page patterns.",
        "Worked on Live/Sample data modes that separate backend data from demo data; helped refine health checks, API connectivity validation and reverse-proxy deployment.",
      ],
    },
    {
      title: "ANPR Vision",
      subtitle: "Plate-recognition interfaces",
      year: 2026,
      status: "Prototype",
      stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "MQTT", "Docker"],
      bullets: ["Designed ANPR/LPR interfaces for camera monitoring, evidence search, traffic flow and journey analytics."],
      portfolioPdf: false,
    },
    {
      title: "RoadMaster Maintenance",
      subtitle: "CMMS concepts",
      year: 2026,
      status: "Concept",
      stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "REST APIs"],
      bullets: [
        "Developed concepts for asset registers, work orders, inspections, preventive maintenance, inventory and reporting.",
        "Designed role-based workflows for field inspectors, mechanics and operations teams, with standard patterns for statuses, priorities, filters and forms.",
      ],
    },
    {
      title: "ARM VINO ANPR Webview",
      subtitle: "ANPR camera control panel",
      year: 2021,
      status: "Live demo",
      stack: ["Flask", "jQuery", "Bootstrap", "JSON Schema", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
      bullets: [
        "Built a web control panel for an edge ANPR engine: start, stop and restart it, edit its configuration through JSON Schema forms validated before saving, and manage reference plate images.",
        "Rebuilt it in 2026 as a browser-only Next.js editor with drag-to-draw crop and detection zones, English and Malay, and config import/export; deployed on Vercel.",
      ],
      link: { label: "arm-vino.vercel.app", href: "https://arm-vino.vercel.app" },
      caseId: "arm-vino-anpr-webview",
    },
  ] satisfies ResumeProject[],

  education: [
    {
      title: "Bachelor of Computer Science (Hons.)",
      org: "Universiti Teknologi MARA (UiTM), Shah Alam",
      dates: "Mar 2018 – Sep 2021",
      notes: ["First Class Honours, CGPA 3.51", "Final year project: Sentiment Classification for Online Statements"],
    },
    {
      title: "Diploma in Computer Science",
      org: "Universiti Teknologi MARA (UiTM), Kelantan",
      dates: "Jun 2015 – Feb 2018",
      notes: ["CGPA 3.62", "Mentor, C++ Peer Mentoring"],
    },
  ],

  certifications: [
    { title: "SheCodes Plus: Responsive Web Development & React Development", issuer: "SheCodes", date: "May 2024" },
    { title: "Certified Data Analyst", issuer: "Asia Pacific University of Technology & Innovation (APU)", date: "Dec 2021" },
    { title: "Intel AI Academy 2020", issuer: "Malaysia Digital Economy Corporation (MDEC)", date: "Aug 2020" },
  ],

  languages: "English and Malay (bilingual)",
};

/** Section order follows common ATS/recruiter expectations. */
export const RESUME_SECTIONS = [
  { id: "cv-summary", label: "Summary" },
  { id: "cv-skills", label: "Skills" },
  { id: "cv-experience", label: "Experience" },
  { id: "cv-projects", label: "Projects" },
  { id: "cv-education", label: "Education" },
  { id: "cv-certifications", label: "Certifications" },
  { id: "cv-additional", label: "Additional" },
] as const;

/** Downloadable PDFs, generated at build time by app/resume/[file]/route.ts. */
export const RESUME_PDFS = {
  /** ATS-friendly: plain single column. */
  ats: { file: "Imanina-Majeed-Resume.pdf" },
  /** Portfolio style, in the site's dark or light theme. */
  dark: { file: "Imanina-Majeed-Resume-Dark.pdf" },
  light: { file: "Imanina-Majeed-Resume-Light.pdf" },
} as const;

export const resumePdfHref = (key: keyof typeof RESUME_PDFS) => `/resume/${RESUME_PDFS[key].file}`;
