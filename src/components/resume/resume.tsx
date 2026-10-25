import { ArrowLeft, ArrowUpRight, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import type { ComponentType, ReactNode } from "react";

import { Github, Icon, Linkedin } from "@/components/portfolio/icon";
import { caseHref, pad } from "@/data/portfolio";
import { RESUME, RESUME_SECTIONS, type ResumeProjectStatus } from "@/data/resume";
import { cssVars, reveal } from "@/lib/dom";

import { PrintPhone } from "./print-phone";
import { ResumeDownloads } from "./resume-downloads";
import { ResumeToc } from "./resume-toc";

import styles from "./resume.module.css";

const STATUS_TONE: Record<ResumeProjectStatus, string> = {
  "Live demo": "var(--volt)",
  Prototype: "var(--ice)",
  "In development": "var(--violet)",
  Concept: "var(--mute)",
};

const LINK_ICON: Record<string, ComponentType<{ className?: string }>> = {
  "linkedin.com/in/imaninamajeed": Linkedin,
  "github.com/imaninamajeed": Github,
};

type SectionId = (typeof RESUME_SECTIONS)[number]["id"];

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const index = RESUME_SECTIONS.findIndex((s) => s.id === id);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={styles.section}>
      <h2 id={`${id}-title`} className={styles.sectionTitle}>
        <span className={styles.sectionNum} aria-hidden="true">
          {pad(index + 1)}
        </span>
        {RESUME_SECTIONS[index].label}
      </h2>
      {children}
    </section>
  );
}

/** Comma-separated in print (ATS reads plain text), pills on screen. */
function Items({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.items}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function Resume() {
  return (
    <main id="main" className={`wrap ${styles.page}`}>
      {/* ---------- Identity ---------- */}
      <header className={styles.head}>
        <Link className={styles.back} href="/">
          <ArrowLeft /> Back to portfolio
        </Link>

        <div className={styles.identity}>
          <div>
            <h1 className={styles.name}>{RESUME.name}</h1>
            <p className={styles.title}>{RESUME.title}</p>
            {/* Two lists so the printed contact block breaks cleanly: details, then links */}
            <div className={styles.contactBlock}>
            <ul className={styles.contact}>
              <li>
                <MapPin aria-hidden="true" />
                {RESUME.location}
              </li>
              <PrintPhone />
              <li>
                <a href={`mailto:${RESUME.email}`}>
                  <Mail aria-hidden="true" />
                  {RESUME.email}
                </a>
              </li>
            </ul>
            <ul className={styles.contact}>
              {RESUME.links.map(({ label, href }) => {
                const Icon = LINK_ICON[label] ?? ArrowUpRight;
                return (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
            </div>
          </div>
        </div>

        <ul className={styles.highlights} aria-label="At a glance">
          {RESUME.highlights.map((h) => (
            <li key={h.label}>
              <b>{h.value}</b>
              <span>{h.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <ResumeDownloads />

      <div className={styles.layout}>
        <ResumeToc sections={RESUME_SECTIONS} />

        <div className={styles.content}>
          <Section id="cv-summary">
            <p className={styles.summary}>{RESUME.summary}</p>
          </Section>

          <Section id="cv-skills">
            {/* Same presentation as the portfolio's tech stack cards */}
            <div className={styles.skills}>
              {RESUME.skills.map((g, i) => (
                <div key={g.title} className={`glass ${styles.skillCard}`} {...reveal((i % 2) * 0.06)}>
                  <p className={styles.skillHead}>
                    <Icon name={g.icon} />
                    {g.title}
                  </p>
                  <Items items={g.items} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="cv-experience">
            <ol className={styles.timeline}>
              {RESUME.experience.map((role) => (
                <li key={role.title} className={styles.role} {...reveal()}>
                  <div className={styles.entryHead}>
                    <h3>{role.title}</h3>
                    <p className={styles.dates}>{role.dates}</p>
                  </div>
                  <p className={styles.org}>
                    {role.org}
                    <span>, {role.place}</span>
                  </p>
                  <ul className={styles.bullets}>
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="cv-projects">
            <div className={styles.projects}>
              {RESUME.projects.map((p) => (
                <article key={p.title} className={styles.project} {...reveal()}>
                  <div className={styles.entryHead}>
                    <h3>
                      {p.title}
                      <span className={styles.projectSub}>
                        <span className={styles.printOnly}> — </span>
                        {p.subtitle}
                      </span>
                    </h3>
                    <p className={styles.status} style={cssVars({ "--c": STATUS_TONE[p.status] })}>
                      <i aria-hidden="true" />
                      {p.status}, {p.year}
                    </p>
                  </div>
                  <ul className={styles.bullets}>
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <p className={styles.stack}>
                    <span>Tech:</span> {p.stack.join(", ")}
                  </p>
                  {(p.link || p.caseId) && (
                    <p className={styles.projectLinks}>
                      {p.link && (
                        <a href={p.link.href} target="_blank" rel="noopener noreferrer">
                          {p.link.label} <ArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                      {p.caseId && (
                        <a href={`/${caseHref(p.caseId)}`} className={styles.screenOnly}>
                          Read the case study <ArrowUpRight aria-hidden="true" />
                        </a>
                      )}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <Section id="cv-education">
            <ul className={styles.entries}>
              {RESUME.education.map((e) => (
                <li key={e.title}>
                  <div className={styles.entryHead}>
                    <h3>{e.title}</h3>
                    <p className={styles.dates}>{e.dates}</p>
                  </div>
                  <p className={styles.org}>{e.org}</p>
                  <p className={styles.note}>{e.notes.join(". ")}.</p>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="cv-certifications">
            <ul className={styles.entries}>
              {RESUME.certifications.map((c) => (
                <li key={c.title}>
                  <div className={styles.entryHead}>
                    <h3>
                      {c.title}
                      <span className={styles.issuer}>
                        <span className={styles.printOnly}> — </span>
                        {c.issuer}
                      </span>
                    </h3>
                    <p className={styles.dates}>{c.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="cv-additional">
            <p className={styles.note}>
              <b>Languages:</b> {RESUME.languages}
            </p>
            <p className={styles.note}>
              <b>References:</b> Available upon request
            </p>
          </Section>
        </div>
      </div>
    </main>
  );
}
