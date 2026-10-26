import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

import { Linkedin } from "@/components/portfolio/icon";
import { RESUME, resumePdfHref } from "@/data/resume";

import styles from "./resume-downloads.module.css";

const OPTIONS = [
  {
    key: "ats",
    title: "ATS-friendly",
    tag: "Recommended",
    text: "Clean, single column. The one to upload to job portals and application forms.",
    page: styles.pageAts,
  },
  {
    key: "dark",
    title: "Portfolio · Dark",
    text: "Looks like this site, in dark. Great for sharing by email or chat.",
    page: styles.pageDark,
  },
  {
    key: "light",
    title: "Portfolio · Light",
    text: "Looks like this site, in light. Reads well on screen and on paper.",
    page: styles.pageLight,
  },
] as const;

/** Mini A4 sketch so each option shows what you get before you open it. */
function PagePreview({ className }: { className: string }) {
  return (
    <span className={`${styles.page} ${className}`} aria-hidden="true">
      <span className={styles.pPhoto} />
      <span className={styles.pName} />
      <span className={styles.pTitle} />
      <span className={styles.pRule} />
      <span className={styles.pBody}>
        <span className={styles.pCol}>
          <span />
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className={styles.pSide} />
      </span>
    </span>
  );
}

/** Downloads and a contact shortcut, as one section under the résumé header. */
export function ResumeDownloads() {
  return (
    <section className={styles.section} aria-labelledby="cv-get-title">
      <div className={styles.head}>
        <h2 id="cv-get-title" className={styles.title}>
          Get the résumé
        </h2>
        <p className={styles.sub}>Opens as a PDF in a new tab. 2 pages, A4.</p>
      </div>

      <div className={styles.grid}>
        {OPTIONS.map((o) => (
          <a
            key={o.key}
            className={`${styles.card} ${o.key === "ats" ? styles.primary : ""}`}
            href={resumePdfHref(o.key)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <PagePreview className={o.page} />
            <span className={styles.body}>
              <span className={styles.cardTitle}>
                {o.title}
                {"tag" in o && <span className={styles.tag}>{o.tag}</span>}
              </span>
              <span className={styles.text}>{o.text}</span>
              <span className={styles.action}>
                Open PDF <ArrowUpRight aria-hidden="true" />
              </span>
            </span>
          </a>
        ))}

        <div className={`${styles.card} ${styles.contact}`}>
          <span className={styles.contactIcon} aria-hidden="true">
            <MessageCircle />
          </span>
          <span className={styles.body}>
            <span className={styles.cardTitle}>Prefer to talk first?</span>
            <span className={styles.text}>Happy to walk you through any project or answer questions.</span>
            <span className={styles.contactActions}>
              <a className="btn btn-volt btn-sm" href={`mailto:${RESUME.email}`}>
                <Mail /> Email me
              </a>
              <a className="btn btn-ghost btn-sm" href={RESUME.links[1].href} target="_blank" rel="noopener noreferrer">
                <Linkedin /> LinkedIn
              </a>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
