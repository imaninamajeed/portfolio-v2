export type ProjectVisual =
  | "dashboard"
  | "road"
  | "rail"
  | "train"
  | "vision"
  | "builder"
  | "analytics"
  | "traffic"
  | "portfolio"
  | "table"
  | "weather"
  | "code";

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  status: string;
  visibility: string;
  featured: boolean;
  visual: ProjectVisual;
  image?: string;
  summary: string;
  description: string;
  role: string;
  duration: string;
  context: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
  technologies: string[];
  links: {
    demo?: string;
    repository?: string;
  };
}

export const PROJECTS: Project[] = [
  {
    slug: "cmms-plus",
    title: "CMMS Plus",
    category: "Operational Systems",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: true,
    visual: "dashboard",
    summary:
      "An operational intelligence layer for maintenance teams working across assets, work orders, incidents, and preventive maintenance.",
    description:
      "CMMS Plus brings maintenance operations into a consistent product experience. It combines management, technician, control-room, asset, incident, and HxGN EAM views while keeping workflows clear and read-only during the integration phase.",
    role: "Frontend engineering, UX architecture, product prototyping",
    duration: "Ongoing",
    context: "R&D product prototype",
    problem:
      "Maintenance information is often spread across dense enterprise screens, disconnected reports, and different operational roles. Teams need a clearer way to identify risks, understand work queues, and decide what requires attention.",
    approach:
      "Designed a role-based information architecture, reusable dashboard patterns, data tables, status models, notification workflows, and a workspace switcher for mock and live HxGN-shaped data.",
    outcome:
      "A scalable frontend foundation for demonstrating operational AI concepts without exposing credentials or enabling writeback to the source CMMS.",
    highlights: [
      "Management, technician, control-room, asset, and incident views",
      "Read-only HxGN EAM workspace with same-origin API proxying",
      "Reusable filters, tables, exports, notifications, and status patterns",
      "Mock FastAPI contract shaped for future integration",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "FastAPI",
      "Docker",
    ],
    links: {},
  },
  {
    slug: "roadops",
    title: "RoadOps",
    category: "Operational Systems",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: true,
    visual: "road",
    summary:
      "An AI-assisted road inspection and maintenance operations platform for turning detected defects into prioritised action.",
    description:
      "RoadOps is a product concept for managing road-condition findings, inspection evidence, maintenance priorities, work queues, and operational reporting in one practical interface.",
    role: "Product naming, UX direction, dashboard design",
    duration: "Concept and prototype",
    context: "Road inspection operations",
    problem:
      "Road defects need to move from detection to prioritisation and maintenance planning without losing location, image evidence, severity, or operational context.",
    approach:
      "Structured the product around an inspection pipeline, map and list views, severity-based prioritisation, operational metrics, and decision-oriented project pages.",
    outcome:
      "A clearer product narrative and interface direction for demonstrating how computer vision can support road-maintenance teams.",
    highlights: [
      "Map-based defect monitoring",
      "Priority queue for inspection findings",
      "Malaysia-relevant ROI and maintenance context",
      "Operational dashboard and executive reporting concepts",
    ],
    technologies: ["Next.js", "TypeScript", "Computer Vision", "Maps", "Analytics"],
    links: {},
  },
  {
    slug: "mrt-operations-monitor",
    title: "MRT Operations Monitor",
    category: "Transport",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: true,
    visual: "rail",
    summary:
      "A monitoring system for passenger demand, train load, fleet readiness, anomalies, predictions, and executive reporting.",
    description:
      "A product prototype for MRT Kajang Line operations teams and executive briefings. The interface connects train and station monitoring with anomaly review, forecasting, image analysis, and period-based analytics.",
    role: "Frontend engineering, information design, dashboard UX",
    duration: "Ongoing prototype",
    context: "Rail operations monitoring",
    problem:
      "Operational and executive users need different levels of detail, but both must understand crowding, service risk, fleet readiness, and recommended actions quickly.",
    approach:
      "Created modular monitoring pages, compact executive summaries, period-by-scenario analytics, anomaly evidence, forecast views, and C-level-friendly full-screen layouts.",
    outcome:
      "A cohesive monitoring concept that demonstrates how operational data can be presented at both detailed and strategic levels.",
    highlights: [
      "Train and station load monitoring",
      "Fleet readiness and service-status views",
      "Daily, weekly, monthly, and quarterly reporting",
      "Anomaly review, predictions, and image-analysis workflows",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Chart.js", "shadcn/ui", "Analytics"],
    links: {},
  },
  {
    slug: "visual-analytics-interfaces",
    title: "Visual Analytics Interfaces",
    category: "Computer Vision",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: true,
    visual: "vision",
    summary:
      "Interfaces that turn camera and image-analysis outputs into findings, confidence indicators, evidence, and operational actions.",
    description:
      "A reusable interface direction for presenting computer-vision outputs without overwhelming users with raw model responses. The design prioritises evidence, confidence, image quality, and actionability.",
    role: "Frontend engineering, interaction design, prototyping",
    duration: "Ongoing",
    context: "Computer-vision products",
    problem:
      "Raw AI output can be difficult for operational users to interpret, especially when confidence and image quality affect reliability.",
    approach:
      "Created structured outputs for observations, risk, confidence explanations, image quality, hotspots, evidence, and recommendations.",
    outcome:
      "A consistent pattern that can be adapted to crowding, traffic, road defects, ANPR, and other image-analysis products.",
    highlights: [
      "Evidence-first result layout",
      "Confidence and image-quality explanations",
      "Structured JSON and human-readable result views",
      "Reusable before-processing and post-analysis states",
    ],
    technologies: ["React", "TypeScript", "Computer Vision", "JSON", "Design Systems"],
    links: {},
  },
  {
    slug: "recogine-company-portfolio",
    title: "Recogine Company Portfolio",
    category: "Web",
    year: 2026,
    status: "In progress",
    visibility: "Internal",
    featured: true,
    visual: "portfolio",
    summary:
      "A company portfolio website structure focused on presenting products, capabilities, projects, and technical credibility.",
    description:
      "A multi-page company website direction for Recogine Technology, designed to make its products and project portfolio easier to explore and understand.",
    role: "UI/UX review, content architecture, frontend direction",
    duration: "In progress",
    context: "Corporate portfolio",
    problem:
      "A technology company with multiple products needs a site structure that can explain its capabilities without forcing every project into one long page.",
    approach:
      "Organised the experience around product categories, project case studies, capabilities, company context, and scalable content patterns.",
    outcome:
      "A cleaner foundation for adding many products while keeping navigation, messaging, and visual hierarchy consistent.",
    highlights: [
      "Scalable products and projects archive",
      "Reusable case-study structure",
      "Clear capability and company-content hierarchy",
      "Responsive shadcn/ui-inspired design direction",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "UI/UX", "Content Design"],
    links: {},
  },
  {
    slug: "hxgn-eam-workspace",
    title: "HxGN EAM Workspace",
    category: "Operational Systems",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: true,
    visual: "table",
    summary:
      "A read-only operational workspace that brings HxGN EAM work orders and preventive-maintenance data into a modern frontend.",
    description:
      "A dedicated workspace inside CMMS Plus that consumes read-only HxGN EAM endpoints through a backend proxy and presents operational records using consistent tables, filters, and overview components.",
    role: "Frontend integration design and implementation direction",
    duration: "Ongoing",
    context: "Enterprise system integration",
    problem:
      "Live enterprise records need to be accessible in a modern product experience without exposing backend hosts, API credentials, or enabling unintended write actions.",
    approach:
      "Defined same-origin API rewrites, source context, workspace switching, read-only helpers, inherited table patterns, and explicit data-source messaging.",
    outcome:
      "A safer integration path that separates mock and live workspaces while reusing the same product architecture.",
    highlights: [
      "Mock and HxGN workspace switcher",
      "Read-only work-order and PM pages",
      "Backend proxy hides internal hosts and credentials",
      "Reusable table, filter, column, and export controls",
    ],
    technologies: ["Next.js", "FastAPI", "REST API", "TypeScript", "HxGN EAM"],
    links: {},
  },
  {
    slug: "kkr-nitmc-dashboard",
    title: "KKR NITMC Dashboard",
    category: "Operational Systems",
    year: 2026,
    status: "Prototype",
    visibility: "Public",
    featured: true,
    visual: "dashboard",
    image: "/images/projects/kkr-nitmc-dashboard.png",
    summary:
      "Traffic and transit operations dashboard for Malaysia's road network, rebuilt in Next.js.",
    description:
      "A Next.js rebuild of a traffic and transit operations dashboard—executive reporting, live ops, and planning views in one shared shell, powered by a typed Malaysian mock dataset.",
    role: "Frontend engineering, UI/UX direction, product prototyping, dashboard designing",
    duration: "Work project",
    context: "Traffic and transit operations monitoring",
    problem:
      "Transit and traffic stakeholders needed a single, navigable interface to move between operational, planning, and analytics views instead of disconnected tools and reports.",
    approach:
      "Migrated a static Vite prototype to Next.js App Router—one route per dashboard domain, shared sidebar shell, Recharts charts, shadcn/ui, and a typed Malaysia-wide mock dataset.",
    outcome:
      "A cohesive, deployed dashboard suite (Vercel) that demonstrates how disparate transit and traffic data sources can be unified into one navigable operational interface, ready to swap mock data for a live feed.",
    highlights: [
      "15 dashboard modules across executive, ops, traffic, transit, and planning",
      "Migrated from static Vite to Next.js App Router with shadcn/ui and Recharts",
      "Google Maps traffic layer with fallback when no API key is set",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Recharts",
      "Google Maps API",
    ],
    links: {
      demo: "https://kkr-nextjs.vercel.app/",
      repository: "https://github.com/imaninamajeed/kkr-nextjs",
    },
  },
  {
    slug: "analytics-presentation",
    title: "Analytics Presentation",
    category: "Analytics",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: false,
    visual: "analytics",
    summary:
      "Period-based executive reporting that changes the business story across daily, weekly, monthly, and quarterly views.",
    description:
      "An analytics presentation module designed for executive readability. Each period changes the management perspective, while scenarios change the operating situation.",
    role: "Dashboard UX, data storytelling, frontend prototyping",
    duration: "Prototype",
    context: "Executive operational reporting",
    problem:
      "Repeated metrics and generic severity labels make dashboards feel artificial and can create contradictions between headlines and charts.",
    approach:
      "Defined period-specific objectives, scenario-specific datasets, invariant checks, compact executive headlines, and action-oriented recommendations.",
    outcome:
      "A stronger reporting model where data, headlines, evidence, and recommendations are generated from one scenario source.",
    highlights: [
      "Daily, weekly, monthly, and quarterly perspectives",
      "Scenario-specific operational stories",
      "Consistent metrics and executive headlines",
      "Full-screen presentation and export-friendly layouts",
    ],
    technologies: ["React", "TypeScript", "Chart.js", "Data Visualisation"],
    links: {},
  },
  {
    slug: "image-analysis-builder",
    title: "Image Analysis Builder",
    category: "Computer Vision",
    year: 2026,
    status: "Prototype",
    visibility: "Internal",
    featured: false,
    visual: "builder",
    summary:
      "A guided interface for configuring image-analysis inputs, prompts, structured outputs, and review states.",
    description:
      "A builder experience that helps users understand what will happen before processing an image and how to review the result afterwards.",
    role: "Interaction design and frontend prototyping",
    duration: "Prototype",
    context: "AI-assisted analysis workflow",
    problem:
      "Users need transparency before submitting an image and a predictable format for interpreting model results.",
    approach:
      "Separated configuration, preview, processing, structured JSON, human-readable analysis, confidence, and image-quality feedback.",
    outcome: "A reusable guided workflow that can support different image-analysis use cases.",
    highlights: [
      "Before-processing explanation",
      "Prompt and output-schema configuration",
      "Image-quality and confidence feedback",
      "Raw JSON and formatted result views",
    ],
    technologies: ["React", "TypeScript", "AI Integration", "JSON Schema"],
    links: {},
  },
  {
    slug: "train-load-indicator",
    title: "Train Load Indicator",
    category: "Transport",
    year: 2021,
    status: "Completed",
    visibility: "Public",
    featured: false,
    visual: "train",
    summary:
      "A React application exploring train-load data, operational status presentation, and visual dashboard patterns.",
    description:
      "An earlier frontend project focused on communicating train-load information clearly through React components and charts.",
    role: "Frontend development",
    duration: "Personal project",
    context: "Portfolio project",
    problem: "Passenger-load data needs a visual treatment that is easy to scan and compare.",
    approach:
      "Used React and Chart.js to build a compact interface for displaying train-load indicators.",
    outcome:
      "A practical early project that established a foundation in dashboard layouts and data visualisation.",
    highlights: [
      "React component structure",
      "Chart-based load visualisation",
      "Responsive interface",
      "Public source repository",
    ],
    technologies: ["React", "Chart.js", "JavaScript", "CSS"],
    links: {
      repository: "https://github.com/imaninamajeed/train-load-indicator",
    },
  },
  {
    slug: "traffic-vehicle-analytics",
    title: "Traffic Vehicle Analytics",
    category: "Analytics",
    year: 2021,
    status: "Completed",
    visibility: "Public",
    featured: false,
    visual: "traffic",
    summary:
      "A public analytics interface focused on vehicle and traffic information presented through practical dashboard components.",
    description:
      "A dashboard project exploring how traffic and vehicle metrics can be presented through readable cards, charts, and operational summaries.",
    role: "Frontend development and dashboard design",
    duration: "Personal project",
    context: "Analytics portfolio project",
    problem:
      "Traffic metrics can become difficult to interpret when presented as raw tables or disconnected charts.",
    approach: "Built a dashboard-style frontend with grouped metrics and visual summaries.",
    outcome: "A public project demonstrating an early focus on analytics UI and data presentation.",
    highlights: [
      "Dashboard information hierarchy",
      "Traffic and vehicle visualisation",
      "Responsive frontend",
      "Public source repository",
    ],
    technologies: ["React", "JavaScript", "Analytics UI", "CSS"],
    links: {
      repository: "https://github.com/imaninamajeed/traffic-vehicle-analytics",
    },
  },
  {
    slug: "react-weather-search",
    title: "React Weather Search",
    category: "Web",
    year: 2021,
    status: "Completed",
    visibility: "Public",
    featured: false,
    visual: "weather",
    summary:
      "A responsive weather-search interface built to practise API integration, user input, and forecast presentation.",
    description:
      "A React weather application that retrieves forecast information from an external API and presents current conditions through a responsive interface.",
    role: "Frontend development",
    duration: "Personal project",
    context: "API integration portfolio project",
    problem:
      "Weather applications need to handle input, loading, error, and forecast states without making the interface feel crowded.",
    approach: "Built a focused search flow with Axios-based API requests and responsive weather results.",
    outcome: "A public application demonstrating API integration and frontend state handling.",
    highlights: [
      "Weather API integration",
      "Search and response states",
      "Responsive interface",
      "Public source repository",
    ],
    technologies: ["React", "Axios", "Bootstrap", "JavaScript"],
    links: {
      repository: "https://github.com/imaninamajeed/react-weather-search",
    },
  },
  {
    slug: "developer-source-viewer",
    title: "Developer Source Viewer",
    category: "Developer Tools",
    year: 2026,
    status: "Concept",
    visibility: "Internal",
    featured: false,
    visual: "code",
    summary:
      "A developer-facing source viewer for inspecting API responses, contracts, and implementation context inside an operational product.",
    description:
      "A supporting tool concept for making backend source data and transformed frontend models easier to inspect during development and demos.",
    role: "Product UX and frontend direction",
    duration: "Concept",
    context: "Developer tooling",
    problem:
      "Developers and reviewers need a quick way to compare live source responses with the data shown in the product UI.",
    approach:
      "Designed a read-only viewer with clear source labels, formatted JSON, copy actions, and contextual metadata.",
    outcome:
      "A practical debugging and demonstration aid that keeps technical details separate from end-user screens.",
    highlights: [
      "Formatted source-response viewer",
      "Read-only developer context",
      "Copy and inspection actions",
      "Separation from operational user interfaces",
    ],
    technologies: ["Next.js", "TypeScript", "JSON", "Developer Experience"],
    links: {},
  },
];

export type SortOrder = "latest" | "oldest" | "title";

export function getFeaturedProjects(limit = 6): Project[] {
  const pinned = ["kkr-nitmc-dashboard"];

  return [...PROJECTS]
    .filter((project) => project.featured)
    .sort((a, b) => {
      const aPin = pinned.indexOf(a.slug);
      const bPin = pinned.indexOf(b.slug);
      if (aPin !== -1 || bPin !== -1) {
        if (aPin === -1) return 1;
        if (bPin === -1) return -1;
        return aPin - bPin;
      }
      return b.year - a.year;
    })
    .slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3): Project[] {
  const sameCategory = PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category === project.category
  );
  const pool = sameCategory.length
    ? sameCategory
    : PROJECTS.filter((item) => item.slug !== project.slug);
  return pool.slice(0, limit);
}

export function getNextProject(project: Project): Project {
  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  return PROJECTS[(index + 1) % PROJECTS.length];
}

export function getFilterOptions() {
  const categories = [...new Set(PROJECTS.map((project) => project.category))].sort((a, b) =>
    a.localeCompare(b)
  );
  const statuses = [...new Set(PROJECTS.map((project) => project.status))].sort((a, b) =>
    a.localeCompare(b)
  );
  const years = [...new Set(PROJECTS.map((project) => project.year))].sort((a, b) => b - a);
  return { categories, statuses, years };
}

export function sortProjects(projects: Project[], order: SortOrder): Project[] {
  const copy = [...projects];
  if (order === "oldest") {
    return copy.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
  }
  if (order === "title") {
    return copy.sort((a, b) => a.title.localeCompare(b.title));
  }
  return copy.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export function searchProjects(projects: Project[], term: string): Project[] {
  const normalized = term.trim().toLowerCase();
  if (!normalized) return projects;
  return projects.filter((project) => {
    const searchable = [
      project.title,
      project.category,
      project.status,
      project.visibility,
      project.summary,
      project.description,
      ...project.technologies,
    ]
      .join(" ")
      .toLowerCase();
    return searchable.includes(normalized);
  });
}
