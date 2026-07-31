import type { Project } from "@/lib/projects";

export function ProjectMeta({
  project,
  extra,
}: {
  project: Project;
  extra?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.69rem] text-muted-foreground">
      <span>{project.category}</span>
      <span aria-hidden="true">&middot;</span>
      <span>{project.year}</span>
      <span className="rounded-full border border-border px-1.5 py-0.5 font-semibold text-foreground">
        {project.status}
      </span>
      {extra && (
        <>
          <span aria-hidden="true">&middot;</span>
          <span>{extra}</span>
        </>
      )}
    </div>
  );
}
