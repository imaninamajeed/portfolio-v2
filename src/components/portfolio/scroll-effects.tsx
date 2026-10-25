"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/dom";

const STACK_BREAKPOINT = 900;
const STACK_STEP = 14; // px each later card sits lower (matches work.module.css)
const REVEAL_AT = 0.92; // reveal once an element's top passes 92% of the viewport
const DRAW_AT = 0.8; // start sketch/meter animations a little later

/**
 * Scroll-driven behaviour that needs no markup of its own:
 *  - reading-progress bar            [data-progress]
 *  - sticky stacked cards            [data-stack] > [data-stack-card]
 *  - fade-up reveal                  [data-reveal]
 *  - "start drawing" for sketches    [data-inview]
 *
 * Everything is visible by default; only content below the fold is hidden on mount.
 * The collection step is idempotent, so a second mount never strands hidden content.
 * Reveals are checked every scroll frame against the element's position (not an
 * IntersectionObserver), so content skipped by a fast scroll or a nav jump is never
 * left invisible.
 */
export function ScrollEffects() {
  useEffect(() => {
    const reduce = prefersReducedMotion();
    const bar = document.querySelector<HTMLElement>("[data-progress]");
    const stack = document.querySelector<HTMLElement>("[data-stack]");
    const cards = [...document.querySelectorAll<HTMLElement>("[data-stack-card]")];
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;

    // Stack only when every card fits below its sticky offset; a taller card would
    // have its lower half trapped under the next one.
    let stacking = false;
    const measure = () => {
      stacking =
        !reduce &&
        window.innerWidth > STACK_BREAKPOINT &&
        cards.every((card, i) => card.offsetHeight <= window.innerHeight - (headerH + 16 + i * STACK_STEP) - 16);
      if (stack) stack.dataset.stack = stacking ? "on" : "off";
    };

    // Collect everything not yet revealed, including elements a previous run of this
    // effect hid (Strict Mode runs effects twice in development), then classify by position.
    const vh = window.innerHeight;
    const pending = (selector: string) => (reduce ? [] : [...document.querySelectorAll<HTMLElement>(selector)]);
    let hidden = pending('[data-reveal]:not([data-reveal="shown"])');
    let undrawn = pending('[data-inview]:not([data-inview="on"])');
    for (const el of hidden) el.dataset.reveal = el.getBoundingClientRect().top > vh * REVEAL_AT ? "hidden" : "shown";
    for (const el of undrawn) el.dataset.inview = el.getBoundingClientRect().top > vh * DRAW_AT ? "off" : "on";
    hidden = hidden.filter((el) => el.dataset.reveal === "hidden");
    undrawn = undrawn.filter((el) => el.dataset.inview === "off");

    let frame = 0;
    const update = () => {
      frame = 0;
      const h = window.innerHeight;
      const max = document.documentElement.scrollHeight - h;
      bar?.style.setProperty("--p", String(max > 0 ? window.scrollY / max : 0));

      if (hidden.length) {
        hidden = hidden.filter((el) => {
          if (el.getBoundingClientRect().top > h * REVEAL_AT) return true;
          el.dataset.reveal = "shown";
          return false;
        });
      }
      if (undrawn.length) {
        undrawn = undrawn.filter((el) => {
          if (el.getBoundingClientRect().top > h * DRAW_AT) return true;
          el.dataset.inview = "on";
          return false;
        });
      }

      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!stacking || !next) {
          card.style.removeProperty("--s");
          card.style.removeProperty("--b");
          return;
        }
        // Each card shrinks and dims as the next one slides over it
        const gap = next.getBoundingClientRect().top - card.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, 1 - gap / card.offsetHeight));
        card.style.setProperty("--s", (1 - p * 0.05).toFixed(4));
        card.style.setProperty("--b", (1 - p * 0.35).toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    measure();
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    // A hash jump (nav link, reload on /#archive) may land after mount
    window.addEventListener("hashchange", schedule);
    // Web fonts change card heights after first paint
    document.fonts?.ready.then(onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("hashchange", schedule);
    };
  }, []);

  return null;
}
