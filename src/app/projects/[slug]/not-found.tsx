import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";

export default function ProjectNotFound() {
  return (
    <section className="grid min-h-[70vh] items-center">
      <div className="mx-auto w-full max-w-180 px-4 text-center">
        <Eyebrow>Project not found</Eyebrow>
        <h1 className="mt-3 text-5xl font-semibold tracking-[-0.045em] sm:text-6xl">
          This case study is unavailable.
        </h1>
        <p className="mt-4 text-muted-foreground">
          The project may have been renamed or removed from the archive.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/projects">Return to projects</Link>
        </Button>
      </div>
    </section>
  );
}
