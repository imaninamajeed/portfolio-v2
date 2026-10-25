"use client";

import { SECTION_ICONS } from "./section-icons";
import { useActiveSection } from "./use-active-section";

import styles from "./mobile-tab-bar.module.css";

const TABS = [
  { href: "#roles", label: "Roles" },
  { href: "#work", label: "Projects" },
  { href: "#archive", label: "Archive" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
].map((tab) => ({ ...tab, Icon: SECTION_ICONS[tab.href] }));

/** App-style bottom navigation for phones and small tablets (≤900px; hidden by CSS above). Always visible. */
export function MobileTabBar() {
  const active = useActiveSection();

  return (
    <nav className={styles.bar} aria-label="Sections">
      <ul>
        {TABS.map(({ href, label, Icon }) => (
          <li key={href}>
            <a href={`/${href}`} className={styles.tab} aria-current={active === href ? "location" : undefined}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
