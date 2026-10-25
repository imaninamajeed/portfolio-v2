"use client";

import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "@/lib/dom";

const DURATION = 1400;

/**
 * Number that counts up when it scrolls into view. The final value is rendered on the
 * server, so it is correct without JS and for crawlers.
 */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || el.getBoundingClientRect().top < window.innerHeight * 0.6) return;

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const k = Math.min(1, (t - t0) / DURATION);
          setShown(Math.round(value * (1 - Math.pow(1 - k, 4))));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        setShown(0);
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <b ref={ref}>
      {shown}
      {suffix}
    </b>
  );
}
