import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, Check } from "lucide-react";

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
  eyebrow: string;
  heading: string;
  field: keyof Pick<Project, "problem" | "approach" | "outcome">;
}[] = [
  {
    id: "problem",
    eyebrow: "Problem",
    heading: "What Needed to Be Clearer?",
    field: "problem",
  },
  {
    id: "approach",
    eyebrow: "Approach",
    heading: "How the Product Was Structured",
    field: "approach",
  },
  {
    id: "outcome",
    eyebrow: "Outcome",
    heading: "What the Work Established",
    field: "outcome",
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
      <section className="pb-16">
        <div className="mx-auto w-full max-w-290 px-4 pt-10">
          <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-[0.75rem] text-muted-foreground">
            <Link href="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <span aria-hidden="true">/</span>
            <span>{project.title}</span>
          </nav>

          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <ProjectMeta project={project} extra={project.visibility} />
              <h1 className="mt-4 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-165 text-[1.05rem] text-muted-foreground">
                {project.description}
              </p>
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
                <Button asChild variant="outline">
                  <Link href="/projects">Back to Archive</Link>
                </Button>
              </div>
            </div>
            <ProjectVisual project={project} large />
          </div>
        </div>
      </section>

      <section className="border-t border-border py-6">
        <div className="mx-auto grid w-full max-w-290 grid-cols-2 gap-6 px-4 sm:grid-cols-4">
          <Fact label="Role" value={project.role} />
          <Fact label="Duration" value={project.duration} />
          <Fact label="Context" value={project.context} />
          <Fact label="Access" value={project.visibility} />
        </div>
      </section>

      <section className="py-24 sm:py-28">
        <div className="mx-auto grid w-full max-w-290 justify-center gap-8 px-4 sm:grid-cols-[190px_minmax(0,720px)] sm:gap-20">
          <aside className="h-max sm:sticky sm:top-27.5">
            <Eyebrow className="mb-2.5">Case Study</Eyebrow>
            <nav className="flex flex-wrap gap-4 sm:grid sm:gap-2.5">
              {NAV_SECTIONS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-[0.8rem] text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-14 sm:gap-20">
            {TEXT_SECTIONS.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-27.5">
                <Eyebrow>{section.eyebrow}</Eyebrow>
                <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                  {section.heading}
                </h2>
                <p className="mt-5 text-muted-foreground">{project[section.field]}</p>
              </section>
            ))}
            <section id="highlights" className="scroll-mt-27.5">
              <Eyebrow>Highlights</Eyebrow>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
                Key Parts of the Project
              </h2>
              <ul className="mt-5 grid gap-2.5">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-lg border border-border p-4"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <Eyebrow>Technology</Eyebrow>
              <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">Tools and Platforms</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border px-2.5 py-1.5 font-mono text-[0.72rem] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/45 py-24 sm:py-28">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow className="mb-2.5">Related Work</Eyebrow>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                More from {project.category}
              </h2>
            </div>
            <Link
              href={`/projects?category=${encodeURIComponent(project.category)}`}
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold hover:underline hover:underline-offset-4"
            >
              Browse Archive
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
            <h2 className="text-4xl font-semibold sm:text-5xl">{next.title}</h2>
          </div>
          <ArrowRight className="size-9 shrink-0 transition-transform group-hover:translate-x-1.5" aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-[0.69rem] text-muted-foreground">{label}</span>
      <strong className="mt-1 block text-[0.82rem]">{value}</strong>
    </div>
  );
}
