import type { CSSProperties } from "react";

/** Style object that carries CSS custom properties. */
export const cssVars = (vars: Record<`--${string}`, string | number>): CSSProperties => vars as CSSProperties;

/**
 * Props that opt an element into the scroll reveal (see ScrollEffects).
 * `delay` is the stagger in seconds.
 */
export const reveal = (delay = 0) => ({
  "data-reveal": "",
  style: delay ? cssVars({ "--d": `${delay}s` }) : undefined,
});

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
