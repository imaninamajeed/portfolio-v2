import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";
import { ProjectMeta } from "@/components/project-meta";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group/card overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-0.5 hover:ring-foreground/20 hover:shadow-lg">
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.title} case study`}
        className="flex h-full flex-col"
      >
        <ProjectVisual project={project} />
        <div className="flex flex-1 flex-col p-5">
          <ProjectMeta project={project} />
          <h3 className="mt-3.5 text-[1.15rem] font-semibold tracking-tight">
            {project.title}
          </h3>
          <p className="mt-2 text-[0.86rem] text-muted-foreground">
            {project.summary}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border px-1.5 py-1 font-mono text-[0.62rem] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between gap-4 pt-5 text-[0.78rem] font-semibold">
            View case study
            <ArrowRight className="size-3.75 transition-transform group-hover/card:translate-x-1" aria-hidden="true" />
          </div>
        </div>
      </Link>
    </article>
  );
}
