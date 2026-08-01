import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import { getFeaturedProjects } from "@/lib/projects";

const SKILLS = [
  {
    title: "Frontend systems",
    description: "React, Next.js, TypeScript, component architecture, and responsive UI.",
  },
  {
    title: "Data interfaces",
    description: "Operational dashboards, analytics views, tables, charts, and status models.",
  },
  {
    title: "Product structure",
    description: "Information architecture, reusable patterns, workflows, and design systems.",
  },
  {
    title: "Rapid prototyping",
    description: "Turning early requirements into practical, testable product experiences.",
  },
];

const TIMELINE = [
  {
    date: "Jan 2022 — Present",
    title: "Engineer, Analytics / R&D",
    org: "Recogine Technology Sdn Bhd",
    current: true,
    description:
      "Develop web applications from user requirements, collaborate with stakeholders, and deliver analytics and data-visualisation interfaces for operational use cases.",
  },
  {
    date: "Mar 2021 — Aug 2021",
    title: "Research Intern",
    org: "Universiti Kebangsaan Malaysia",
    current: false,
    description:
      "Researched Microsoft products to support feature recommendations and assisted with technical documentation for project reports.",
  },
];

const EDUCATION = [
  {
    title: "Bachelor of Computer Science (Hons.)",
    org: "Universiti Teknologi MARA · 2018 — 2021",
    note: "CGPA 3.51 · First Class",
  },
  {
    title: "Diploma in Computer Science",
    org: "Universiti Teknologi MARA · 2015 — 2018",
    note: "CGPA 3.62",
  },
];

const CERTIFICATIONS = [
  { title: "SheCodes Plus", org: "Responsive web and React development" },
  { title: "Certified Data Analyst", org: "Asia Pacific University" },
];

const STACK = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "SQL",
  "Tailwind CSS",
  "shadcn/ui",
  "Docker",
  "Grafana",
  "GitHub",
  "GitLab",
  "Agile",
];

export default function HomePage() {
  const featured = getFeaturedProjects(7);

  return (
    <>
      <section className="section-y grid min-h-[calc(100vh-69px)] items-center" id="top">
        <div className="mx-auto grid w-full max-w-290 gap-14 px-4 py-20 lg:grid-cols-[1.15fr_0.75fr] lg:items-center lg:gap-24">
          <div>
            {/* <Badge variant="outline" className="gap-2 rounded-full px-2.5 py-1 font-medium">
              <span className="size-1.75 rounded-full bg-success shadow-[0_0_0_3px_color-mix(in_oklch,var(--success),transparent_86%)]" />
              Frontend engineering · Analytics · R&amp;D
            </Badge> */}
            <Eyebrow className="mt-7">Product Engineer · Subang Jaya, Malaysia</Eyebrow>
            <h1 className="mt-3 max-w-190 text-5xl leading-[1.06] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[5.8rem]">
              Building clear digital products for{" "}
              <span className="text-muted-foreground">complex operations</span>
            </h1>
            <p className="mt-6 max-w-170 text-base text-muted-foreground sm:text-lg">
              I&rsquo;m Imanina, a product engineer who builds practical interfaces and
              dashboards that turn complex information into clear action.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  Explore all projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="https://github.com/imaninamajeed/portfolio-v2/blob/main/public/documents/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View resume
                </Link>
              </Button>
            </div>
            <dl className="mt-12 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <dt className="text-xs text-muted-foreground">Focus</dt>
                <dd className="mt-1 text-sm font-semibold">Dashboards &amp; product UI</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Stack</dt>
                <dd className="mt-1 text-sm font-semibold">React, Next.js, TypeScript</dd>
              </div>
              <div>
                <dt className="text-xs text-muted-foreground">Based in</dt>
                <dd className="mt-1 text-sm font-semibold">Malaysia</dd>
              </div>
            </dl>
          </div>

          <aside
            aria-label="Profile summary"
            className="overflow-hidden rounded-xl bg-card p-5 text-card-foreground shadow-lg ring-1 ring-foreground/10"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/images/profile.png"
                alt="Portrait of Imanina Majeed"
                width={48}
                height={48}
                className="rounded-full border border-border object-cover"
              />
              <div>
                <p className="font-semibold">Imanina Majeed</p>
                <p className="text-[0.82rem] text-muted-foreground">Engineer, Analytics / R&amp;D</p>
              </div>
            </div>
            <div className="mt-5 overflow-hidden rounded-lg border border-border bg-muted/50">
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
                <span className="size-1.75 rounded-full bg-muted-foreground/35" />
                <span className="size-1.75 rounded-full bg-muted-foreground/35" />
                <span className="size-1.75 rounded-full bg-muted-foreground/35" />
                <p className="ml-1.5 font-mono text-[0.67rem] text-muted-foreground">
                  portfolio-model.js
                </p>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[0.78rem] leading-[1.75]">
                <code>
                  <span className="font-bold text-muted-foreground">const</span> portfolio = {"{"}
                  {"\n  "}projects: <span className="font-semibold">&quot;data-driven&quot;</span>,
                  {"\n  "}filters: <span className="font-semibold">&quot;automatic&quot;</span>,
                  {"\n  "}details: <span className="font-semibold">&quot;reusable&quot;</span>
                  {"\n"}
                  {"}"};
                </code>
              </pre>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-[0.72rem] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Globe className="size-3.5" aria-hidden="true" />
                Kuala Lumpur time
              </span>
              <span className="font-semibold text-foreground">Product Engineer</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-border py-24 sm:py-28" id="work">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.58fr] lg:items-end">
            <div>
              <Eyebrow className="mb-2.5">Featured work</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A focused selection from a growing project archive.
              </h2>
            </div>
            <div className="grid justify-items-start gap-4">
              <p className="text-muted-foreground">
                The homepage stays concise while the dedicated archive handles search,
                filters, and the complete collection.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold hover:underline hover:underline-offset-4"
              >
                View all projects
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28" id="about">
        <div className="mx-auto grid w-full max-w-290 gap-14 px-4 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28">
          <div>
            <Eyebrow className="mb-2.5">About</Eyebrow>
            <h2 className="text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Developer thinking, with a strong eye for product clarity.
            </h2>
          </div>
          <div>
            <p className="text-[1.18rem]">
              My work sits between frontend engineering, analytics, and product design. I
              enjoy taking complex operational requirements and shaping them into interfaces
              that feel structured, calm, and easy to use.
            </p>
            <p className="mt-4 text-muted-foreground">
              The goal is not decoration. It is helping users identify what matters,
              understand what changed, and decide what to do next.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SKILLS.map((skill) => (
                <div key={skill.title} className="rounded-lg border border-border p-4">
                  <h3 className="text-sm font-semibold">{skill.title}</h3>
                  <p className="mt-1.5 text-[0.78rem] text-muted-foreground">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/45 py-24 sm:py-28" id="experience">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-10 grid gap-3">
            <div>
              <Eyebrow className="mb-2.5">Experience &amp; education</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A foundation across engineering, research, and data.
              </h2>
            </div>
            <p className="text-muted-foreground">
              Professional experience is supported by formal computer-science education,
              analytics training, and continuous frontend practice.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="overflow-hidden rounded-xl bg-card text-card-foreground ring-1 ring-foreground/10">
              {TIMELINE.map((item, index) => (
                <div
                  key={item.title}
                  className={`grid gap-3 p-6 sm:grid-cols-[180px_1fr] sm:gap-8 ${
                    index > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="font-mono text-[0.72rem] text-muted-foreground">
                    {item.date}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-[0.8rem] text-muted-foreground">{item.org}</p>
                      </div>
                      {item.current && <Badge variant="outline">Current</Badge>}
                    </div>
                    <p className="mt-3 text-[0.85rem] text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl bg-card p-5 text-card-foreground ring-1 ring-foreground/10">
                <h3 className="text-base font-semibold">Education</h3>
                {EDUCATION.map((item, index) => (
                  <div
                    key={item.title}
                    className={index > 0 ? "mt-4 border-t border-border pt-4" : "mt-4"}
                  >
                    <strong className="text-[0.86rem]">{item.title}</strong>
                    <p className="text-[0.73rem] text-muted-foreground">{item.org}</p>
                    <p className="text-[0.73rem] text-muted-foreground">{item.note}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-card p-5 text-card-foreground ring-1 ring-foreground/10">
                <h3 className="text-base font-semibold">Certifications</h3>
                {CERTIFICATIONS.map((item, index) => (
                  <div
                    key={item.title}
                    className={index > 0 ? "mt-4 border-t border-border pt-4" : "mt-4"}
                  >
                    <strong className="text-[0.86rem]">{item.title}</strong>
                    <p className="text-[0.73rem] text-muted-foreground">{item.org}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div aria-label="Technology stack" className="mt-8 flex flex-wrap gap-2.5">
            {STACK.map((item) => (
              <span
                key={item}
                className="rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-[0.69rem] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" id="contact">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="grid gap-8 rounded-xl bg-card p-8 text-card-foreground ring-1 ring-foreground/10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow className="mb-2.5">Contact</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Have a product or dashboard that needs clarity?
              </h2>
              <p className="mt-4 max-w-170 text-muted-foreground">
                Reach out through LinkedIn for frontend opportunities, operational
                dashboards, design systems, or product prototyping.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 lg:justify-end">
              <Button asChild size="lg">
                <Link href="https://linkedin.com/in/imaninamajeed" target="_blank" rel="noreferrer">
                  Connect on LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/imaninamajeed" target="_blank" rel="noreferrer">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
