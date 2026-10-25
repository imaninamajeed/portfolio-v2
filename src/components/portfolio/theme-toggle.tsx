"use client";

import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useSyncExternalStore } from "react";

import { prefersReducedMotion } from "@/lib/dom";
import { applyTheme, readTheme, restoreTheme, subscribeTheme, type Theme } from "@/lib/theme";

import styles from "./theme-toggle.module.css";

const serverTheme = (): Theme => "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, serverTheme);

  useLayoutEffect(() => {
    restoreTheme();
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    // Crossfade the whole page where supported instead of snapping colours.
    if (document.startViewTransition && !prefersReducedMotion()) {
      document.startViewTransition(() => applyTheme(next));
    } else {
      applyTheme(next);
    }
  };

  return (
    <button
      type="button"
      className={`icon-btn ${styles.toggle}`}
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {/* Both icons are server-rendered; CSS picks one so the saved theme never flashes the wrong icon. */}
      <Moon className={styles.moon} />
      <Sun className={styles.sun} />
    </button>
  );
}
