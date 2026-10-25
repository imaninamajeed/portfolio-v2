"use client";

import { useEffect, useRef, useState } from "react";

import { pad } from "@/data/portfolio";

import { PdfOptions } from "./pdf-options";

import styles from "./resume.module.css";

type Section = { id: string; label: string };

const LINE = 0.3; // a section is current once its top passes 30% of the viewport

/**
 * Section index for the résumé: a sticky numbered list beside the content on desktop,
 * a sticky chip bar on mobile. Highlights the section being read.
 */
export function ResumeToc({ sections }: { sections: readonly Section[] }) {
  const [active, setActive] = useState<string>(sections[0].id);
  const list = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let current = els[0];
      for (const el of els) if (el.getBoundingClientRect().top <= window.innerHeight * LINE) current = el;
      if (atBottom) current = els[els.length - 1];
      if (current) setActive(current.id);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  // On the mobile chip bar, keep the active chip in view
  useEffect(() => {
    const chip = list.current?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    const bar = list.current;
    if (!chip || !bar || bar.scrollWidth <= bar.clientWidth) return;
    bar.scrollTo({ left: chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  return (
    <nav className={styles.toc} aria-label="Résumé sections">
      <p className={styles.tocTitle}>On this page</p>
      <ol ref={list}>
        {sections.map((s, i) => (
          <li key={s.id}>
            <a href={`#${s.id}`} aria-current={active === s.id ? "location" : undefined}>
              <span className={styles.tocNum}>{pad(i + 1)}</span>
              {s.label}
            </a>
          </li>
        ))}
      </ol>
      <div className={styles.tocPrint}>
        <p className={styles.tocTitle}>Download PDF</p>
        <PdfOptions compact />
      </div>
    </nav>
  );
}
