import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/eyebrow";
import { Highlight } from "@/components/highlight";
import { ProjectCard } from "@/components/project-card";
import { Timeline, type TimelineEntry } from "@/components/timeline";
import { SkillRadarChart, type SkillRating } from "@/components/skill-radar-chart";
import { getFeaturedProjects } from "@/lib/projects";

const SKILLS = [
  {
    title: "Frontend Systems",
    description: "React, Next.js, TypeScript, component architecture, and responsive UI.",
  },
  {
    title: "Data Interfaces",
    description: "Operational dashboards, analytics views, tables, charts, and status models.",
  },
  {
    title: "Product Structure",
    description: "Information architecture, reusable patterns, workflows, and design systems.",
  },
  {
    title: "Rapid Prototyping",
    description: "Turning early requirements into practical, testable product experiences.",
  },
];

const EXPERIENCE: TimelineEntry[] = [
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

const EDUCATION: TimelineEntry[] = [
  {
    date: "2018 — 2021",
    title: "Bachelor of Computer Science (Hons.)",
    org: "Universiti Teknologi MARA",
    description: "CGPA 3.51 · First Class",
  },
  {
    date: "2015 — 2018",
    title: "Diploma in Computer Science",
    org: "Universiti Teknologi MARA",
    description: "CGPA 3.62",
  },
];

const CERTIFICATIONS = [
  { title: "SheCodes Plus", org: "Responsive web and React development" },
  { title: "Certified Data Analyst", org: "Asia Pacific University" },
];

const SKILL_RATINGS: SkillRating[] = [
  { label: "Frontend", value: 4 },
  { label: "Dashboards", value: 4.5 },
  { label: "React & TypeScript", value: 4 },
  { label: "Product & UX", value: 4.5 },
  { label: "Analytics", value: 4 },
  { label: "Integrations", value: 3.5 },
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
  const featured = getFeaturedProjects(3);

  return (
    <>
      <section className="grid min-h-[calc(100vh-69px)] items-center" id="top">
        <div className="mx-auto grid w-full max-w-290 gap-10 px-4 py-20 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <Eyebrow className="mb-4">Product Engineer · Subang Jaya, Malaysia</Eyebrow>
            <h1 className="max-w-165 text-4xl leading-[1.15] font-semibold tracking-[-0.03em] sm:text-5xl">
              I Build Clear Dashboards for Complex Operations
            </h1>
            <p className="mt-5 max-w-135 text-lg text-muted-foreground">
              I&rsquo;m Imanina, a product engineer turning messy operational data
              into calm, usable interfaces.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/projects">
                  View Projects
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href="https://github.com/imaninamajeed/portfolio-v2/blob/main/public/documents/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  View Resume
                </Link>
              </Button>
            </div>
          </div>

          <div className="mx-auto sm:mx-0">
            <Image
              src="/images/profile.png"
              alt="Default profile picture"
              width={220}
              height={220}
              priority
              className="size-45 rounded-xl border border-border object-cover shadow-lg sm:size-55"
            />
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
            <p className="text-[1.18rem]">
              My work sits between <Highlight>frontend engineering</Highlight>,{" "}
              <Highlight>analytics</Highlight>, and product design. I enjoy turning
              complex operational requirements into interfaces that feel structured,
              calm, and easy to use.
            </p>
            <p className="mt-4 text-muted-foreground">
              The goal is not just decoration. It is helping users see what matters,
              understand what changed, and decide what to do next with{" "}
              <Highlight>clarity</Highlight>.
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
              <Eyebrow className="mb-2.5">Experience &amp; Education</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A Foundation across Engineering, Research, and Data
              </h2>
            </div>
            <p className="text-muted-foreground">
              Professional experience is supported by formal computer-science education
              and continuous frontend practice.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
              <h3 className="mb-6 text-base font-semibold">Experience</h3>
              <Timeline items={EXPERIENCE} />
            </div>

            <div className="grid gap-4">
              <div className="rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
                <h3 className="mb-6 text-base font-semibold">Education</h3>
                <Timeline items={EDUCATION} />
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

          <div className="mt-4 grid gap-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SkillRadarChart skills={SKILL_RATINGS} />
            <div className="rounded-xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10">
              <h3 className="text-base font-semibold">Technology Stack</h3>
              <div aria-label="Technology stack" className="mt-4 flex flex-wrap gap-2.5">
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
          </div>
        </div>
      </section>

      <section className="border-t border-border py-24 sm:py-28" id="work">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow className="mb-2.5">Featured Work</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                A Few Recent Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-semibold hover:underline hover:underline-offset-4"
            >
              View All Projects
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

      <section className="py-20" id="contact">
        <div className="mx-auto w-full max-w-290 px-4">
          <div className="grid gap-8 rounded-xl bg-card p-8 text-card-foreground ring-1 ring-foreground/10 sm:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Eyebrow className="mb-2.5">Contact</Eyebrow>
              <h2 className="max-w-185 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                Have a Product or Dashboard That Needs Clarity?
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
