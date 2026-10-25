import { FileText, Moon, Sun } from "lucide-react";

import { resumePdfHref } from "@/data/resume";

import styles from "./resume.module.css";

const external = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Compact download buttons for the résumé's section index. */
export function PdfOptions() {
  return (
    <div className={styles.pdfCompact} role="group" aria-label="Download résumé as PDF">
      <a className="btn btn-volt btn-sm" href={resumePdfHref("ats")} {...external}>
        <FileText /> ATS-friendly
      </a>
      <a className="btn btn-ghost btn-sm" href={resumePdfHref("dark")} {...external}>
        <Moon /> Portfolio · Dark
      </a>
      <a className="btn btn-ghost btn-sm" href={resumePdfHref("light")} {...external}>
        <Sun /> Portfolio · Light
      </a>
    </div>
  );
}
