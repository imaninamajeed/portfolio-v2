"use client";

import { FileText, Palette } from "lucide-react";

import { printResume } from "./print-style";

import styles from "./resume.module.css";

/** Two résumé downloads: plain ATS-friendly, or designed in the portfolio theme. */
export function PdfOptions({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? styles.pdfCompact : styles.pdf} role="group" aria-labelledby={compact ? undefined : "pdf-label"} aria-label={compact ? "Download résumé as PDF" : undefined}>
      {!compact && (
        <p id="pdf-label" className={styles.pdfLabel}>
          Download résumé (PDF)
        </p>
      )}
      <div className={styles.pdfButtons}>
        <button type="button" className={`btn btn-volt ${compact ? "btn-sm" : ""}`} onClick={() => printResume("ats")}>
          <FileText /> ATS-friendly
        </button>
        <button type="button" className={`btn btn-ghost ${compact ? "btn-sm" : ""}`} onClick={() => printResume("themed")}>
          <Palette /> Designed
        </button>
      </div>
      {!compact && <p className={styles.pdfHint}>ATS-friendly parses cleanly in job portals. Designed matches this site.</p>}
    </div>
  );
}
