import type { ReactNode } from "react";

import { STATUS_COLOR, type ProjectStatus } from "@/data/portfolio";
import { cssVars } from "@/lib/dom";

/** Dot + label. Colour is never the only signal. */
export function Status({ status }: { status: ProjectStatus }) {
  return (
    <span className="status">
      <i style={cssVars({ "--c": STATUS_COLOR[status] })} />
      {status}
    </span>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return <li className="pill">{children}</li>;
}

export function PillList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <Pill key={item}>{item}</Pill>
      ))}
    </ul>
  );
}

type LinkButtonProps = {
  href: string;
  variant?: "volt" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
};

/** Pill-shaped anchor styled as a button. */
export function LinkButton({
  href,
  variant = "volt",
  size = "md",
  external,
  magnetic,
  className = "",
  children,
}: LinkButtonProps) {
  const cls = ["btn", `btn-${variant}`, size !== "md" && `btn-${size}`, className].filter(Boolean).join(" ");
  return (
    <a
      className={cls}
      href={href}
      data-magnetic={magnetic ? "" : undefined}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : null)}
    >
      {children}
    </a>
  );
}

type SectionHeadProps = {
  num: string;
  kicker: string;
  titleId: string;
  title: ReactNode;
  children?: ReactNode;
  row?: boolean;
};

export function SectionHead({ num, kicker, titleId, title, children, row }: SectionHeadProps) {
  const heading = (
    <div>
      <p className="kicker">
        <span>{num}</span> {kicker}
      </p>
      <h2 id={titleId} className="sec-title">
        {title}
      </h2>
    </div>
  );
  return (
    <header className={row ? "sec-head sec-head-row" : "sec-head"} data-reveal="">
      {heading}
      {children}
    </header>
  );
}
