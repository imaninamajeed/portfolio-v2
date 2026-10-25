"use client";

import { useEffect, useState } from "react";

import { cssVars, prefersReducedMotion } from "@/lib/dom";

import styles from "./hero.module.css";

const GLYPHS = "01<>/{}[]#_=+*";
const INTERVAL = 2800;
const FRAMES = 22;
const LEAD = 6;

/** Terminal-style line that scrambles from one role to the next. */
export function RoleCycle({ roles }: { roles: readonly string[] }) {
  const [text, setText] = useState(roles[0]);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    let index = 0;
    let raf = 0;
    let current = roles[0];

    const scramble = (to: string) => {
      const from = current;
      const len = Math.max(from.length, to.length);
      let frame = 0;
      const tick = () => {
        let out = "";
        for (let k = 0; k < len; k++) {
          const reveal = (k / len) * FRAMES * 0.7;
          if (frame >= reveal + LEAD) out += to[k] ?? "";
          else if (frame >= reveal) out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          else out += from[k] ?? "";
        }
        if (frame++ < FRAMES + LEAD) {
          setText(out);
          raf = requestAnimationFrame(tick);
        } else {
          current = to;
          setText(to);
        }
      };
      tick();
    };

    const timer = setInterval(() => {
      index = (index + 1) % roles.length;
      cancelAnimationFrame(raf);
      scramble(roles[index]);
    }, INTERVAL);

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
    };
  }, [roles]);

  return (
    <p className={`${styles.role} fade-up`} style={cssVars({ "--d": "0.41s" })}>
      <span className={styles.prompt} aria-hidden="true">
        &gt;_
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className={styles.caret} aria-hidden="true" />
    </p>
  );
}
