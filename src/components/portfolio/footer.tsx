import { ArrowUp, ArrowUpRight, FileText, MapPin } from "lucide-react";

import { NAV, SITE } from "@/data/portfolio";

import { Clock } from "./clock";
import { Github, Linkedin } from "./icon";

import styles from "./footer.module.css";

const ELSEWHERE = [
  { label: "LinkedIn", href: SITE.linkedin, Icon: Linkedin },
  { label: "GitHub", href: SITE.github, Icon: Github },
  { label: "Résumé (PDF)", href: SITE.resume, Icon: FileText },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.grid}`}>
        <div className={styles.brand}>
          <a className={styles.logo} href="#top" aria-label={`${SITE.name}, back to top`}>
            <span className={styles.mark}>IM</span>
            <span className={styles.logoText}>
              Imanina<span>.dev</span>
            </span>
          </a>
          <p className={styles.bio}>Frontend and product engineer building clear interfaces for complex data and workflows.</p>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            Open to frontend &amp; product roles
          </p>
        </div>

        <nav className={styles.col} aria-labelledby="footer-nav">
          <h2 id="footer-nav" className={styles.heading}>
            Navigate
          </h2>
          <ul>
            {[...NAV, { href: "#contact", label: "Contact" }].map(({ href, label }) => (
              <li key={href}>
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h2 className={styles.heading}>Elsewhere</h2>
          <ul>
            {ELSEWHERE.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon /> {label} <ArrowUpRight className={styles.ext} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h2 className={styles.heading}>Based in</h2>
          <p className={styles.place}>
            <MapPin /> {SITE.location}
          </p>
          <Clock className={styles.clock} />
        </div>
      </div>

      <div className={`wrap ${styles.bottom}`}>
        <span>
          © {new Date().getFullYear()} {SITE.name}. Designed with intention, built with AI.
        </span>
        <a href="#top" className={styles.top}>
          Back to top <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
