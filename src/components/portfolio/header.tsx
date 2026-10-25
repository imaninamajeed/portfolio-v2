"use client";

import clsx from "clsx";
import { ArrowUpRight, FileText } from "lucide-react";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";

import { NAV, SITE } from "@/data/portfolio";

import { Clock } from "./clock";
import { SECTION_ICONS } from "./section-icons";
import { ThemeToggle } from "./theme-toggle";
import { LinkButton } from "./ui";
import { useActiveSection } from "./use-active-section";

import styles from "./header.module.css";

const MOBILE = 900;

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** Top bar. On mobile the section links move to the bottom tab bar (MobileTabBar). */
export function Header() {
  // Floating bar once the page scrolls (also correct after a scroll-restored reload)
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 10,
    () => false,
  );
  const section = useActiveSection();
  const active = NAV.some((l) => l.href === section) ? section : null;
  const list = useRef<HTMLUListElement>(null);
  const indicator = useRef<HTMLLIElement>(null);

  // Slide the volt pill under the active link
  useLayoutEffect(() => {
    const ul = list.current;
    const pill = indicator.current;
    if (!ul || !pill) return;
    const place = () => {
      const link = active ? ul.querySelector<HTMLElement>(`a[href="${active}"]`) : null;
      if (!link || window.innerWidth <= MOBILE) {
        pill.style.opacity = "0";
        return;
      }
      const u = ul.getBoundingClientRect();
      const r = link.getBoundingClientRect();
      pill.style.setProperty("--x", `${r.left - u.left}px`);
      pill.style.setProperty("--w", `${r.width}px`);
      pill.style.opacity = "1";
    };
    place();
    const resize = new ResizeObserver(place);
    resize.observe(ul);
    return () => resize.disconnect();
  }, [active]);

  return (
    <header className={clsx(styles.header, scrolled && styles.scrolled)}>
      <div className="wrap">
        <div className={styles.bar}>
          <a className={styles.logo} href="#top" aria-label={`${SITE.name}, back to top`}>
            <span className={styles.mark}>IM</span>
            <span className={styles.logoText}>
              Imanina<span>.dev</span>
            </span>
          </a>

          <nav className={styles.nav} aria-label="Primary">
            <ul ref={list}>
              <li ref={indicator} className={styles.indicator} aria-hidden="true" />
              {NAV.map(({ href, label }) => {
                const Icon = SECTION_ICONS[href];
                return (
                  <li key={href}>
                    <a className={styles.link} href={href} aria-current={active === href ? "location" : undefined}>
                      <Icon />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.end}>
            <LinkButton href="#contact" size="sm" magnetic className={styles.cta}>
              Let’s talk <ArrowUpRight />
            </LinkButton>
            {/* Tools: local time, résumé, theme */}
            <div className={styles.tools}>
              <Clock className={styles.clock} />
              <a
                className="icon-btn"
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Résumé (PDF, opens in a new tab)"
                title="Résumé (PDF)"
              >
                <FileText />
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
