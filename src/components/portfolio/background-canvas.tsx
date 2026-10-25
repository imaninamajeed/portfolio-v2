"use client";

import { useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/lib/dom";

import styles from "./ambient.module.css";

const GAP = 34;
const TRAIL = 46;

type Packet = { horiz: boolean; lane: number; dir: 1 | -1; t: number; v: number; ice: boolean };

/**
 * Interactive "traffic grid": a dot grid that reacts to the cursor, with light
 * streaks travelling along the grid lanes like vehicles on a road network.
 */
export function BackgroundCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = prefersReducedMotion();
    const mouse = { x: -999, y: -999 };
    const colors = { dot: "", hot: "", cool: "" };
    let w = 0;
    let h = 0;
    let cols = 0;
    let rows = 0;
    let packets: Packet[] = [];
    let raf = 0;
    let dpr = 1;
    // Resting dots never change between frames, so they are drawn once into an
    // offscreen layer (per size and theme) and copied in with one drawImage.
    const dots = document.createElement("canvas");
    const dotsCtx = dots.getContext("2d")!;
    // While the page is actively scrolling, skip frames: the content is what moves.
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout> | undefined;

    const readColors = () => {
      const style = getComputedStyle(document.documentElement);
      const light = style.colorScheme.trim() === "light";
      colors.dot = `rgba(${style.getPropertyValue("--field-dot").trim()},${style.getPropertyValue("--field-dot-a").trim()})`;
      colors.hot = light ? "96,150,0" : "200,255,61";
      colors.cool = light ? "11,122,158" : "124,231,255";
      paintDots();
    };

    function paintDots() {
      if (!w) return;
      dots.width = w * dpr;
      dots.height = h * dpr;
      dotsCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsCtx.fillStyle = colors.dot;
      dotsCtx.beginPath();
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) dotsCtx.rect(i * GAP - 0.4, j * GAP - 0.4, 0.8, 0.8);
      dotsCtx.fill();
    }

    const spawn = (): Packet => {
      const horiz = Math.random() > 0.5;
      const lane = Math.floor(Math.random() * (horiz ? rows : cols)) * GAP;
      const dir = Math.random() > 0.5 ? 1 : -1;
      return { horiz, lane, dir, t: dir > 0 ? -60 : (horiz ? w : h) + 60, v: 0.6 + Math.random() * 1.4, ice: Math.random() > 0.7 };
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / GAP) + 1;
      rows = Math.ceil(h / GAP) + 1;
      const count = Math.round((w * h) / 60000);
      packets = Array.from({ length: Math.max(6, Math.min(count, 22)) }, spawn);
      paintDots();
      if (reduceMotion) draw();
    };

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      ctx!.drawImage(dots, 0, 0, w, h);

      // Only the dots within reach of the cursor are drawn per frame (drawn over the cached ones).
      const i0 = Math.max(0, Math.floor((mouse.x - 180) / GAP));
      const i1 = Math.min(cols - 1, Math.ceil((mouse.x + 180) / GAP));
      const j0 = Math.max(0, Math.floor((mouse.y - 180) / GAP));
      const j1 = Math.min(rows - 1, Math.ceil((mouse.y + 180) / GAP));
      for (let i = i0; i <= i1; i++) {
        for (let j = j0; j <= j1; j++) {
          const x = i * GAP;
          const y = j * GAP;
          const k = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 180);
          if (!k) continue;
          const r = 0.8 + k * 1.4;
          ctx!.fillStyle = `rgba(${colors.hot},${0.12 + k * 0.6})`;
          ctx!.fillRect(x - r / 2 + (x - mouse.x) * k * 0.06, y - r / 2 + (y - mouse.y) * k * 0.06, r, r);
        }
      }

      for (const p of packets) {
        p.t += p.v * p.dir;
        const x = p.horiz ? p.t : p.lane;
        const y = p.horiz ? p.lane : p.t;
        const tx = p.horiz ? x - TRAIL * p.dir : x;
        const ty = p.horiz ? y : y - TRAIL * p.dir;
        const gradient = ctx!.createLinearGradient(tx, ty, x, y);
        const col = p.ice ? colors.cool : colors.hot;
        gradient.addColorStop(0, `rgba(${col},0)`);
        gradient.addColorStop(1, `rgba(${col},0.55)`);
        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(tx, ty);
        ctx!.lineTo(x, y);
        ctx!.stroke();
        if (p.t > (p.horiz ? w : h) + 80 || p.t < -80) Object.assign(p, spawn());
      }
    }

    const loop = () => {
      if (!scrolling) draw();
      raf = requestAnimationFrame(loop);
    };
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => (scrolling = false), 140);
    };

    const onPointerMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onPointerLeave = () => {
      mouse.x = mouse.y = -999;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) loop();
    };

    let resizeFrame = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    };

    readColors();
    resize();

    // Re-read colours when the theme flips
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      // One still frame: no loops, no pointer tracking.
      draw();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
      document.addEventListener("visibilitychange", onVisibility);
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeFrame);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} className={styles.field} aria-hidden="true" />;
}
