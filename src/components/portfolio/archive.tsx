"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { ARCHIVE, caseHref, type ArchiveEntry } from "@/data/portfolio";
import { cssVars } from "@/lib/dom";

import { SectionHead, Status } from "./ui";

import styles from "./archive.module.css";

const ALL = "All";
const DOMAINS = [ALL, ...new Set(ARCHIVE.map((p) => p.domain))];
const COUNTS = new Map(DOMAINS.map((d) => [d, d === ALL ? ARCHIVE.length : ARCHIVE.filter((p) => p.domain === d).length]));

function Row({ entry, index, enter }: { entry: ArchiveEntry; index: number; enter: boolean }) {
  const inner = (
    <>
      <span className={styles.year}>{entry.year}</span>
      <span className={styles.main}>
        <span className={styles.title}>{entry.title}</span>
        <span className={styles.desc}>{entry.desc}</span>
      </span>
      <span className={styles.stack}>{entry.stack}</span>
      <span className={styles.status}>
        <Status status={entry.status} />
      </span>
      <span className={styles.go}>
        {entry.caseId && (
          <>
            <ArrowUpRight />
            <span className="sr-only">Open case study</span>
          </>
        )}
      </span>
    </>
  );

  return (
    <li
      className={enter ? styles.enter : undefined}
      style={cssVars({ "--d": `${Math.min(index, 6) * 0.04}s` })}
      data-reveal=""
    >
      {entry.caseId ? (
        <a className={styles.rowInner} href={caseHref(entry.caseId)}>
          {inner}
        </a>
      ) : (
        <div className={styles.rowInner}>{inner}</div>
      )}
    </li>
  );
}

export function Archive() {
  const [filter, setFilter] = useState(ALL);
  const [touched, setTouched] = useState(false);
  const rows = filter === ALL ? ARCHIVE : ARCHIVE.filter((p) => p.domain === filter);

  return (
    <section className="section wrap" id="archive" aria-labelledby="archive-title">
      <SectionHead
        row
        num="03"
        kicker="Archive"
        titleId="archive-title"
        title={
          <>
            Every build, <span className="dim">2021 → now.</span>
          </>
        }
      >
        <div className={styles.filters} role="group" aria-label="Filter projects by domain">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              type="button"
              className={styles.chip}
              aria-pressed={domain === filter}
              onClick={() => {
                setFilter(domain);
                setTouched(true);
              }}
            >
              {domain} <small>{COUNTS.get(domain)}</small>
            </button>
          ))}
        </div>
      </SectionHead>

      <p className={styles.count} role="status">
        Showing {rows.length} of {ARCHIVE.length} projects
      </p>
      <ul className={styles.archive}>
        {rows.map((entry, i) => (
          <Row key={entry.title} entry={entry} index={i} enter={touched} />
        ))}
      </ul>
    </section>
  );
}
