"use client";

import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import { Github, Linkedin } from "@/components/portfolio/icon";
import { RESUME, type ResumeProjectStatus } from "@/data/resume";
import { cssVars } from "@/lib/dom";

import { isThemedPrint } from "./print-style";

import s from "./themed-print.module.css";

const STATUS_TONE: Record<ResumeProjectStatus, string> = {
  "Live demo": "#C8FF3D",
  Prototype: "#7CE7FF",
  "In development": "#B6A4FF",
  Concept: "#8C94A3",
};

const LINK_ICONS = [Globe, Linkedin, Github];

// The designed PDF shows shipped and prototype work as an even 3×2 grid; concepts stay on the web page and ATS PDF.
const DESIGNED_PROJECTS = RESUME.projects.filter((p) => p.status !== "Concept");

/**
 * The "Designed" résumé PDF: the portfolio's dark theme on A4. Rendered only while
 * printing in that style (see printResume), so it never duplicates the page content.
 */
export function ThemedPrint() {
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    const before = () => {
      if (isThemedPrint()) flushSync(() => setPrinting(true));
    };
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  if (!printing) return null;

  return (
    <div className={s.sheet} data-themed-sheet="">
      {/* ---------- Header ---------- */}
      <header className={s.head}>
        <span className={s.mark} aria-hidden="true">
          IM
        </span>
        <div>
          <h1 className={s.name}>{RESUME.name}</h1>
          <p className={s.title}>{RESUME.title}</p>
        </div>
      </header>
      <ul className={s.contact}>
        <li>
          <MapPin /> {RESUME.location}
        </li>
        <li>
          <Phone /> {RESUME.phone}
        </li>
        <li>
          <Mail /> {RESUME.email}
        </li>
        {RESUME.links.map(({ label }, i) => {
          const Icon = LINK_ICONS[i] ?? Globe;
          return (
            <li key={label}>
              <Icon /> {label}
            </li>
          );
        })}
      </ul>

      {/* ---------- Page 1: sidebar + summary/experience ---------- */}
      <div className={s.body}>
        <aside className={s.side}>
          <section>
            <h2 className={s.h2}>Skills</h2>
            {RESUME.skills.map((g) => (
              <div key={g.title} className={s.skillGroup}>
                <h3>{g.title}</h3>
                <ul className={s.pills}>
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

        </aside>

        <div className={s.main}>
          <section>
            <h2 className={s.h2}>Summary</h2>
            <p className={s.summary}>{RESUME.summary}</p>
          </section>

          <section>
            <h2 className={s.h2}>Experience</h2>
            <ol className={s.timeline}>
              {RESUME.experience.map((role) => (
                <li key={role.title} className={s.role}>
                  <div className={s.roleHead}>
                    <h3>{role.title}</h3>
                    <span className={s.date}>{role.dates}</span>
                  </div>
                  <p className={s.org}>
                    {role.org} <span>· {role.place}</span>
                  </p>
                  <ul className={s.bullets}>
                    {role.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>

      {/* ---------- Page 2: projects ---------- */}
      <section className={s.projectsPage}>
        <h2 className={s.h2}>Selected projects</h2>
        <div className={s.projects}>
          {DESIGNED_PROJECTS.map((p) => (
            <article key={p.title} className={s.card}>
              <h3 className={s.cardTitle}>{p.title}</h3>
              <p className={s.cardSub}>
                {p.subtitle}
                <span className={s.status} style={cssVars({ "--c": STATUS_TONE[p.status] })}>
                  <i />
                  {p.status} · {p.year}
                </span>
              </p>
              <ul className={s.bullets}>
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className={s.tech}>{p.stack.join(" · ")}</p>
              {p.link && <p className={s.cardLink}>{p.link.label}</p>}
            </article>
          ))}
        </div>
      </section>

      {/* Education, certifications, languages: a three-column strip under the projects */}
      <div className={s.strip}>
        <section>
          <h2 className={s.h2}>Education</h2>
          {RESUME.education.map((e) => (
            <div key={e.title} className={s.entry}>
              <h3>{e.title}</h3>
              <p className={s.entryOrg}>{e.org}</p>
              <p className={s.entryMeta}>
                {e.dates} · {e.notes[0]}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h2 className={s.h2}>Certifications</h2>
          {RESUME.certifications.map((c) => (
            <div key={c.title} className={s.entry}>
              <h3>{c.title}</h3>
              <p className={s.entryMeta}>
                {c.issuer} · {c.date}
              </p>
            </div>
          ))}
        </section>
        <section>
          <h2 className={s.h2}>Languages</h2>
          <p className={s.entryMeta}>{RESUME.languages}</p>
          <h2 className={`${s.h2} ${s.h2Spaced}`}>References</h2>
          <p className={s.entryMeta}>Available upon request</p>
        </section>
      </div>
    </div>
  );
}
