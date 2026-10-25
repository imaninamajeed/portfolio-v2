"use client";

import { useEffect } from "react";

import { prefersReducedMotion } from "@/lib/dom";

/**
 * Mouse-only polish, delegated from the document so it also covers content that
 * mounts later (the case dialog, filtered archive rows):
 *  - cursor spotlight behind the page
 *  - pointer-tracked glow on `.glass` panels
 *  - slight pull of `[data-magnetic]` buttons toward the cursor
 * Skipped entirely on touch devices and with prefers-reduced-motion.
 */
export function PointerEffects() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const spot = document.querySelector<HTMLElement>("[data-spot]");
    let magnet: HTMLElement | null = null;

    const release = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      spot?.style.setProperty("--mx", `${e.clientX}px`);
      spot?.style.setProperty("--my", `${e.clientY}px`);

      const target = e.target instanceof Element ? e.target : null;

      const glass = target?.closest<HTMLElement>(".glass");
      if (glass) {
        const r = glass.getBoundingClientRect();
        glass.style.setProperty("--x", `${e.clientX - r.left}px`);
        glass.style.setProperty("--y", `${e.clientY - r.top}px`);
      }

      const next = target?.closest<HTMLElement>("[data-magnetic]") ?? null;
      if (next !== magnet) release();
      magnet = next;
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnet.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", release);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", release);
      release();
    };
  }, []);

  return null;
}
