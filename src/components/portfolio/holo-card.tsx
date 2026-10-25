"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

import { prefersReducedMotion } from "@/lib/dom";

import styles from "./hero.module.css";

const TILT = 14;

/** Framed portrait card: 3D tilt and glare follow the mouse. The art itself is server-rendered `children`. */
export function HoloCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Freeze the portrait's SVG animations (blink, flicker, steam) for reduced motion
  useEffect(() => {
    if (prefersReducedMotion()) ref.current?.querySelector<SVGSVGElement>("svg")?.pauseAnimations();
  }, []);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * TILT}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * TILT}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const onLeave = () => {
    ref.current?.style.setProperty("--rx", "0deg");
    ref.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div ref={ref} className={styles.holo} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
