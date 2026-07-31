"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import {
  PROJECTS,
  getFilterOptions,
  searchProjects,
  sortProjects,
  type SortOrder,
} from "@/lib/projects";

const PAGE_SIZE = 9;
const ALL_VALUE = "all";

export function ProjectsArchive() {
  const searchParams = useSearchParams();
  const { categories, statuses, years } = useMemo(() => getFilterOptions(), []);

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? ALL_VALUE);
  const [status, setStatus] = useState(searchParams.get("status") ?? ALL_VALUE);
  const [year, setYear] = useState(searchParams.get("year") ?? ALL_VALUE);
  const [sort, setSort] = useState<SortOrder>("latest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    let result = searchProjects(PROJECTS, query);
    if (category !== ALL_VALUE) result = result.filter((p) => p.category === category);
    if (status !== ALL_VALUE) result = result.filter((p) => p.status === status);
    if (year !== ALL_VALUE) result = result.filter((p) => String(p.year) === year);
    return sortProjects(result, sort);
  }, [query, category, status, year, sort]);

  // Reset pagination whenever the filters change. Adjusted during render
  // (React's recommended pattern) rather than an effect, since this is
  // derived from props/state, not a sync with an external system.
  const filterKey = `${query}|${category}|${status}|${year}|${sort}`;
  const [previousFilterKey, setPreviousFilterKey] = useState(filterKey);
  if (filterKey !== previousFilterKey) {
    setPreviousFilterKey(filterKey);
    setVisibleCount(PAGE_SIZE);
  }

  const visible = filtered.slice(0, visibleCount);
  const hasFilters =
    query !== "" || category !== ALL_VALUE || status !== ALL_VALUE || year !== ALL_VALUE || sort !== "latest";

  function clearFilters() {
    setQuery("");
    setCategory(ALL_VALUE);
    setStatus(ALL_VALUE);
    setYear(ALL_VALUE);
    setSort("latest");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <div>
      <div
        aria-label="Project filters"
        className="sticky top-17 z-20 mb-8 rounded-xl bg-card/95 p-4 text-card-foreground ring-1 ring-foreground/10 backdrop-blur-md"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4.25 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Label htmlFor="project-search" className="sr-only">
            Search projects or technologies
          </Label>
          <Input
            id="project-search"
            type="search"
            placeholder="Search projects or technologies&hellip;"
            autoComplete="off"
            className="h-11 pl-10"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <FilterField label="Category" value={category} onChange={setCategory}>
            <SelectItem value={ALL_VALUE}>All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </FilterField>
          <FilterField label="Status" value={status} onChange={setStatus}>
            <SelectItem value={ALL_VALUE}>All statuses</SelectItem>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </FilterField>
          <FilterField label="Year" value={year} onChange={setYear}>
            <SelectItem value={ALL_VALUE}>All years</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </FilterField>
          <FilterField
            label="Sort"
            value={sort}
            onChange={(v) => setSort(v as SortOrder)}
          >
            <SelectItem value="latest">Latest first</SelectItem>
            <SelectItem value="oldest">Oldest first</SelectItem>
            <SelectItem value="title">Title A&ndash;Z</SelectItem>
          </FilterField>
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p aria-live="polite" className="text-[0.75rem] text-muted-foreground">
            {filtered.length} project{filtered.length === 1 ? "" : "s"} found
          </p>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-card p-12 text-center text-card-foreground ring-1 ring-foreground/10">
          <Eyebrow>No matches</Eyebrow>
          <h2 className="mt-2 text-2xl font-semibold">No projects match these filters.</h2>
          <p className="mt-2 text-muted-foreground">
            Try a broader keyword or clear the selected filters.
          </p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      {filtered.length > visibleCount && (
        <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
            Load more projects
          </Button>
        </div>
      )}
    </div>
  );
}

function FilterField({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const id = `${label.toLowerCase()}-filter`;
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-[0.67rem] font-semibold text-muted-foreground">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="h-10 w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
