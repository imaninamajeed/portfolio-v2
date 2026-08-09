import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  ChartColumn,
  Code2,
  Container,
  Database,
  FileText,
  GraduationCap,
  Layers,
  LayoutDashboard,
  Server,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/eyebrow";
import { Highlight } from "@/components/highlight";
import { ProjectCard } from "@/components/project-card";
import { type TimelineEntry } from "@/components/timeline";
import { SkillRadarChart, type SkillRating } from "@/components/skill-radar-chart";
import { getFeaturedProjects } from "@/lib/projects";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1-.004-4.123 2.062 2.062 0 0 1 .004 4.123zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const ABOUT_SKILLS: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Frontend Systems",
    description: "React, Next.js, TypeScript, component architecture, and responsive UI.",
    icon: Code2,
  },
  {
    title: "Data Interfaces",
    description: "Operational dashboards, analytics views, tables, charts, and status models.",
    icon: LayoutDashboard,
  },
  {
    title: "Product Structure",
    description: "Information architecture, reusable patterns, workflows, and design systems.",
    icon: Layers,
  },
  {
    title: "Rapid Prototyping",
    description: "Turning early requirements into practical, testable product experiences.",
    icon: Sparkles,
  },
];

const EXPERIENCE: TimelineEntry[] = [
  {
    date: "Jan 2022 — Present",
    title: "Engineer, Analytics / R&D",
    org: "Recogine Technology Sdn Bhd",
    current: true,
    description:
      "Ship analytics interfaces and operational dashboards for complex systems.",
  },
];

const EDUCATION: TimelineEntry[] = [
  {
    date: "2018 — 2021",
    title: "Bachelor of Computer Science (Hons.)",
    org: "Universiti Teknologi MARA",
    description: "First Class · CGPA 3.51",
  },
];

const SKILL_RATINGS: SkillRating[] = [
  { label: "Frontend", value: 4 },
  { label: "Dashboards", value: 4.5 },
  { label: "React & TypeScript", value: 4 },
  { label: "Product & UX", value: 4.5 },
  { label: "Analytics", value: 4 },
  { label: "Integrations", value: 3.5 },
];

const STACK_GROUPS: {
  title: string;
  icon: LucideIcon;
  items: string[];
}[] = [
  {
    title: "Frontend",
    icon: Code2,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["FastAPI", "Node.js / Express"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["PostgreSQL", "SQL", "REST APIs"],
  },
  {
    title: "Data Visualization",
    icon: ChartColumn,
    items: ["Grafana", "Chart.js"],
  },
  {
    title: "DevOps",
    icon: Container,
    items: ["Docker", "Git", "GitHub / GitLab"],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: ["VS Code", "Cursor", "pnpm"],
  },
];

export default function HomePage() {
  const featured = getFeaturedProjects(3);

  return (
    <>
      <section
        className="grid min-h-[calc(100vh-69px)] items-center"
        id="top"
      >
        <div className="mx-auto w-full max-w-290 px-4 pt-16 pb-10 sm:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div className="hero-stagger">
              <Eyebrow className="mb-4 text-[0.8rem] font-semibold tracking-[0.08em]">
                Product engineer · Subang Jaya, Malaysia
              </Eyebrow>
              <h1 className="max-w-2xl text-5xl leading-[1.08] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
                Building clear digital products for{" "}
                <span className="text-muted-foreground">complex operations</span>
              </h1>
              <p className="mt-6 max-w-lg text-base text-muted-foreground sm:text-lg">
                I design and ship operational dashboards and product UI that help
                teams see what matters and act with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link href="/projects">
                    Explore Projects
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <Image
                src="/images/profile.png"
                alt="Imanina Majeed"
                width={320}
                height={400}
                priority
                className="w-full max-w-sm rounded-2xl border border-border object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 sm:py-28" id="about">
        <div className="mx-auto grid w-full max-w-290 gap-14 px-4 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28">
          <div>
            <Eyebrow className="mb-2.5">About</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Developer Thinking, with a Strong Eye for Product Clarity
            </h2>
          </div>
          <div>
            <p className="text-[1.15rem] leading-relaxed">
              I work where <Highlight>frontend engineering</Highlight> meets{" "}
              <Highlight>analytics</Highlight> and product structure—
              especially systems that help teams move with confidence.
            </p>
            <p className="mt-4 text-muted-foreground">
              I focus on clear data presentation, sensible workflows, and UI
              patterns that stay easy to maintain as products grow.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {ABOUT_SKILLS.map((skill) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.title} className="rounded-lg border border-border p-4">
                    <Icon
                      className="mb-2.5 size-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <h3 className="text-sm font-semibold">{skill.title}</h3>
                    <p className="mt-1.5 text-[0.78rem] text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-24" id="experience">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <Eyebrow className="mb-2.5">Experience</Eyebrow>
              <h2 className="reveal-title text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Built through engineering, analytics, and continuous practice
              </h2>
              <p className="mt-4 text-muted-foreground">
                Hands-on engineering, computer science, and analytics—applied to
                complex systems, operational dashboards, and practical digital products
              </p>
            </div>
            <Button asChild variant="outline" size="lg">
              <Link
                href="/documents/resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <FileText className="size-4" aria-hidden="true" />
                View Resume
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            <div className="rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <Briefcase
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">Experience</h3>
              </div>
              {EXPERIENCE.map((item) => (
                <article key={`${item.title}-${item.org}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <time className="font-mono text-[0.7rem] text-muted-foreground">
                      {item.date}
                    </time>
                    {item.current && <Badge variant="outline">Current</Badge>}
                  </div>
                  <h4 className="mt-2 text-base font-semibold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.org}</p>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <div className="rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-5">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">Education</h3>
              </div>
              {EDUCATION.map((item) => (
                <article key={`${item.title}-${item.org}`}>
                  <time className="font-mono text-[0.7rem] text-muted-foreground">
                    {item.date}
                  </time>
                  <h4 className="mt-2 text-base font-semibold tracking-tight">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-muted-foreground">{item.org}</p>
                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <SkillRadarChart skills={SKILL_RATINGS} />

            <div className="flex h-full flex-col rounded-xl bg-card p-4 text-card-foreground ring-1 ring-foreground/10 sm:p-5">
              <div className="flex items-center gap-2">
                <Layers
                  className="size-3.5 text-muted-foreground"
                  aria-hidden="true"
                />
                <h3 className="text-sm font-semibold">Technology Stack</h3>
              </div>
              <div
                aria-label="Technology stack"
                className="mt-4 grid flex-1 content-start gap-2.5 sm:grid-cols-2"
              >
                {STACK_GROUPS.map((group) => {
                  const Icon = group.icon;
                  return (
                    <div
                      key={group.title}
                      className="rounded-lg border border-border/80 bg-background/50 p-3"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="grid size-6 place-items-center rounded-md border border-border bg-card">
                          <Icon
                            className="size-3.5 text-foreground/80"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="text-[0.72rem] font-semibold tracking-wide text-foreground/90">
                          {group.title}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="rounded-md border border-border bg-card px-2 py-0.5 font-mono text-[0.65rem] text-muted-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 sm:py-28" id="work">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-2.5">Featured Work</Eyebrow>
              <h2 className="reveal-title max-w-185 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                A focused selection from a growing project archive
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold hover:underline hover:underline-offset-4"
            >
              View all projects
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-24" id="contact">
        <div className="mx-auto flex w-full max-w-290 flex-col gap-8 px-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Eyebrow className="mb-2.5">Contact</Eyebrow>
            <h2 className="reveal-title text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Have a product or dashboard that needs clarity?
            </h2>
            <p className="mt-4 text-muted-foreground">
              Reach out through LinkedIn for frontend opportunities, operational
              dashboards, design systems, or product prototyping.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button asChild size="lg">
              <Link
                href="https://linkedin.com/in/imaninamajeed"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedInIcon className="size-4" />
                Connect on LinkedIn
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="https://github.com/imaninamajeed"
                target="_blank"
                rel="noreferrer"
              >
                <GitHubIcon className="size-4" />
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
