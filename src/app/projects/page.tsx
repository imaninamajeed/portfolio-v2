import { Suspense } from "react";
import type { Metadata } from "next";

import { Eyebrow } from "@/components/eyebrow";
import { ProjectsArchive } from "@/components/projects-archive";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse Imanina Majeed's product, dashboard, analytics, transport, computer-vision, and web projects.",
};

export default function ProjectsPage() {
  return (
    <>
      <section className="pb-16">
        <div className="mx-auto grid w-full max-w-290 gap-8 px-4 pt-16 sm:grid-cols-[1fr_0.55fr] sm:items-end">
          <div>
            <Eyebrow className="mb-2.5">Project archive</Eyebrow>
            <h1 className="max-w-212.5 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[5.6rem]">
              Products, prototypes, and experiments.
            </h1>
          </div>
          <p className="text-muted-foreground">
            Search the complete archive by project name, category, status, year, or
            technology.
          </p>
        </div>
      </section>

      <section className="border-t border-border pb-28">
        <div className="mx-auto w-full max-w-290 px-4 pt-8">
          <Suspense>
            <ProjectsArchive />
          </Suspense>
        </div>
      </section>
    </>
  );
}
