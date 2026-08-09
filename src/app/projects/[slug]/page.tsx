import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import { ProjectMeta } from "@/components/project-meta";
import { ProjectVisual } from "@/components/project-visual";
import {
  PROJECTS,
  getNextProject,
  getProjectBySlug,
  getRelatedProjects,
  type Project,
} from "@/lib/projects";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
  };
}

const NAV_SECTIONS = [
  { id: "problem", label: "Problem" },
  { id: "approach", label: "Approach" },
  { id: "outcome", label: "Outcome" },
  { id: "highlights", label: "Highlights" },
];

const TEXT_SECTIONS: {
  id: string;
  heading: string;
  field: keyof Pick<Project, "problem" | "approach" | "outcome">;
  tone: "strong" | "muted";
}[] = [
  {
    id: "problem",
    heading: "Problem",
    field: "problem",
    tone: "strong",
  },
  {
    id: "approach",
    heading: "Approach",
    field: "approach",
    tone: "muted",
  },
  {
    id: "outcome",
    heading: "Outcome",
    field: "outcome",
    tone: "muted",
  },
];

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const next = getNextProject(project);
  const related = getRelatedProjects(project);
  const { demo, repository } = project.links;

  return (
    <>
      <section className="relative min-h-[min(78vh,44rem)] overflow-hidden">
        <div className="absolute inset-0" aria-hidden="true">
          <ProjectVisual
            project={project}
            bleed
            priority
            className="h-full min-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        </div>

        <div className="relative z-[1] mx-auto flex min-h-[min(78vh,44rem)] w-full max-w-290 flex-col justify-end px-4 pt-16 pb-14">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 text-[0.75rem] text-muted-foreground"
          >
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <span className="sr-only"> / {project.title}</span>
          </nav>

          <ProjectMeta project={project} variant="hero" />
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl line-clamp-2 text-[1.05rem] text-muted-foreground">
            {project.description}
          </p>
          {(demo || repository) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {demo && (
                <Button asChild>
                  <Link href={demo} target="_blank" rel="noreferrer">
                    Open Live Demo
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              )}
              {repository && (
                <Button asChild variant="outline">
                  <Link href={repository} target="_blank" rel="noreferrer">
                    View Repository
                    <ExternalLink className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto grid w-full max-w-290 justify-center gap-8 px-4 sm:grid-cols-[190px_minmax(0,720px)] sm:gap-20">
          <aside className="h-max sm:sticky sm:top-24">
            <nav
              aria-label="Case study sections"
              className="flex flex-wrap gap-4 sm:grid sm:gap-2.5"
            >
              {NAV_SECTIONS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-14 sm:gap-20">
            {TEXT_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <h2 className="reveal-title text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {section.heading}
                </h2>
                <p
                  className={
                    section.tone === "strong"
                      ? "mt-5 text-lg leading-relaxed text-foreground/90"
                      : "mt-5 text-lg leading-relaxed text-muted-foreground"
                  }
                >
                  {project[section.field]}
                </p>
              </section>
            ))}
            <section id="highlights" className="scroll-mt-28">
              <h2 className="reveal-title text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                Highlights
              </h2>
              <ol className="mt-5 grid">
                {project.highlights.map((item, index) => (
                  <li
                    key={item}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 border-t border-border/70 py-4 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[0.72rem] tracking-wide text-muted-foreground"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.98rem] leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border/70 bg-background/50 px-2.5 py-1 font-mono text-[0.62rem] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 sm:py-28">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-2.5">Related Work</Eyebrow>
              <h2 className="reveal-title text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                More from {project.category}
              </h2>
            </div>
            <Link
              href={`/projects?category=${encodeURIComponent(project.category)}`}
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold hover:underline hover:underline-offset-4"
            >
              Browse Projects
              <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProjectCard key={item.slug} project={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <Link
          href={`/projects/${next.slug}`}
          className="group mx-auto flex min-h-55 w-full max-w-290 items-center justify-between gap-8 px-4"
        >
          <div>
            <Eyebrow className="mb-2.5">Next Project</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {next.title}
            </h2>
          </div>
          <ArrowRight
            className="size-9 shrink-0 transition-transform group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </Link>
      </section>
    </>
  );
}
