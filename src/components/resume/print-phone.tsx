"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

import { RESUME } from "@/data/resume";

/**
 * Renders the phone number only while the page is being printed (Ctrl+P),
 * so it lands in the PDF but is never in the page's HTML for scrapers. The number is read
 * here (client module) rather than passed as a prop, which would serialise it into the HTML.
 */
export function PrintPhone({ className }: { className?: string }) {
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    // flushSync: the DOM must update before the browser lays out the print copy.
    const before = () => flushSync(() => setPrinting(true));
    const after = () => setPrinting(false);
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, []);

  if (!printing) return null;
  return <li className={className}>{RESUME.phone}</li>;
}
