"use client";

import { Clock3 } from "lucide-react";
import { useSyncExternalStore } from "react";

import { SITE } from "@/data/portfolio";

const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: SITE.timeZone });

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 20_000);
  return () => clearInterval(id);
}

/** Local time in Malaysia. Renders a placeholder on the server, then the real time on the client. */
export function Clock({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => format.format(new Date()),
    () => "--:--",
  );
  return (
    <span className={className}>
      <Clock3 />
      <span>
        <time suppressHydrationWarning>{time}</time> MYT
      </span>
    </span>
  );
}
