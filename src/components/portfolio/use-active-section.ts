"use client";

import { useEffect, useState } from "react";

const LINE = 0.45; // a section is "current" once its top passes 45% of the viewport

/**
 * The `#id` of the page section currently being read, or null (e.g. on the hero).
 * Position-based rather than IntersectionObserver, so instant jumps (nav taps,
 * reloads on a hash) and the very bottom of the page always resolve correctly.
 * Shared by the header nav and the mobile tab bar.
 */
export function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>("main > section")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
      let current: HTMLElement | undefined = atBottom ? sections.at(-1) : undefined;
      if (!current) {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= window.innerHeight * LINE) current = section;
        }
      }
      setActive(current?.id ? `#${current.id}` : null);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return active;
}
