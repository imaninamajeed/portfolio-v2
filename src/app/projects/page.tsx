import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import { PROJECTS, sortProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Imanina's product, dashboard, analytics, transport, computer-vision, and web projects.",
};

export default function ProjectsPage() {
  const projects = sortProjects(PROJECTS, "latest");

  return (
    <>
      <section className="pb-12">
        <div className="mx-auto w-full max-w-290 px-4 pt-16">
          <Eyebrow className="mb-2.5">Projects</Eyebrow>
          <h1 className="reveal-title max-w-165 text-5xl font-semibold tracking-[-0.04em] sm:text-6xl">
            Products, Prototypes, and Experiments
          </h1>
          <p className="mt-4 max-w-135 text-muted-foreground">
            {projects.length} selected projects from recent work. Open any card for
            the case study.
          </p>
        </div>
      </section>

      <section className="border-t border-border pb-28">
        <div className="mx-auto w-full max-w-290 px-4 pt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
