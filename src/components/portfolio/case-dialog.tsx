"use client";

import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Hammer,
  Link as LinkIcon,
  Target,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent, type MouseEvent } from "react";

import { CASES, CASE_BY_ID, SITE, isCaseId, pad, type CaseId } from "@/data/portfolio";

import { Icon } from "./icon";
import { ProjectVisual } from "./project-visual";
import { LinkButton, PillList, Status } from "./ui";

import styles from "./case-dialog.module.css";

const HASH_PREFIX = "#case/";

/* The open case lives in the URL hash (#case/<id>), so deep links, reloads and Back all work. */

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
}

const readHash = () => window.location.hash;
const serverHash = () => "";

function parseCaseId(hash: string): CaseId | null {
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const id = decodeURIComponent(hash.slice(HASH_PREFIX.length));
  return isCaseId(id) ? id : null;
}

/** history.pushState / replaceState don't fire hashchange, so announce the change ourselves. */
const notifyHashChange = () => window.dispatchEvent(new HashChangeEvent("hashchange"));

export function CaseDialog() {
  const hash = useSyncExternalStore(subscribeHash, readHash, serverHash);
  const id = parseCaseId(hash);
  const index = id ? CASES.findIndex((c) => c.id === id) : -1;
  const study = id ? CASE_BY_ID[id] : null;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [copied, setCopied] = useState(false);

  // Open an in-page case link without scrolling or leaving a dead anchor. A pushed entry means Back closes the dialog.
  useEffect(() => {
    const onClick = (e: globalThis.MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>(`a[href^="${HASH_PREFIX}"]`) : null;
      if (!link) return;
      e.preventDefault();
      window.history.pushState({ case: true }, "", link.getAttribute("href"));
      notifyHashChange();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Keep the native <dialog> in step with the URL
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (id && !dialog.open) dialog.showModal();
    else if (!id && dialog.open) dialog.close();
    bodyRef.current?.scrollTo({ top: 0 });
  }, [id]);

  // Deep links get their own tab title
  useEffect(() => {
    if (!study) return;
    const previous = document.title;
    document.title = `${study.title} — ${SITE.name}`;
    return () => {
      document.title = previous;
    };
  }, [study]);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const go = (delta: number) => {
    const next = CASES[(index + delta + CASES.length) % CASES.length];
    window.history.replaceState(window.history.state, "", `${HASH_PREFIX}${next.id}`);
    notifyHashChange();
  };

  // Fires after the dialog closes by any route (Esc, X, backdrop). Undo the URL change.
  const onClose = () => {
    if (!parseCaseId(window.location.hash)) return;
    if (window.history.state?.case) {
      window.history.back();
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      notifyHashChange();
    }
  };

  const onBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) e.currentTarget.close();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      return;
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const next = study ? CASES[(index + 1) % CASES.length] : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="case-title"
      onClose={onClose}
      onClick={onBackdropClick}
      onKeyDown={onKeyDown}
    >
      <div className={styles.bar}>
        <span className={styles.crumb}>
          {study && (
            <>
              <b>{pad(index + 1)}</b> / {pad(CASES.length)} &nbsp;·&nbsp; {study.title}
            </>
          )}
        </span>
        <div className={styles.controls}>
          <button type="button" className="icon-btn" onClick={copyLink} aria-label="Copy link to this case study">
            {copied ? <Check /> : <LinkIcon />}
          </button>
          <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous project">
            <ChevronLeft />
          </button>
          <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next project">
            <ChevronRight />
          </button>
          <button type="button" className="icon-btn" onClick={() => dialogRef.current?.close()} aria-label="Close">
            <X />
          </button>
        </div>
        <span className="sr-only" role="status">
          {copied ? "Link copied" : ""}
        </span>
      </div>

      <div ref={bodyRef} className={styles.body}>
        {study && next && (
          <div key={study.id} className={styles.content}>
            <header>
              <p className={styles.domain}>
                <Icon name={study.icon} />
                {study.domain} · {study.year}
              </p>
              <h2 className={styles.title} id="case-title">
                {study.title}
              </h2>
              <p className={styles.line}>{study.line}</p>
              <div className={styles.meta}>
                <Status status={study.status} />
                <span className={styles.role}>
                  <UserRound />
                  {study.role}
                </span>
              </div>
              {study.links && (
                <div className={styles.links}>
                  {study.links.map((link) => (
                    <LinkButton key={link.href} href={link.href} variant={link.primary ? "volt" : "ghost"} size="sm" external>
                      <Icon name={link.icon} />
                      {link.label}
                    </LinkButton>
                  ))}
                </div>
              )}
            </header>

            <div className={styles.visual}>
              <ProjectVisual study={study} sizes="(max-width: 1040px) 100vw, 1000px" />
            </div>

            <div className={styles.metrics}>
              {study.metrics.map((m) => (
                <div key={m.l} className={styles.metric}>
                  <b>{m.v}</b>
                  <span>{m.l}</span>
                </div>
              ))}
            </div>

            <div className={styles.flow}>
              <section className={styles.block}>
                <h3>
                  <CircleAlert />
                  Problem
                </h3>
                <p>{study.problem}</p>
              </section>
              <section className={styles.block}>
                <h3>
                  <Hammer />
                  What I did
                </h3>
                <ul className={styles.did}>
                  {study.did.map((item) => (
                    <li key={item}>
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className={`${styles.block} ${styles.blockVolt}`}>
                <h3>
                  <Target />
                  Result
                </h3>
                <p>{study.result}</p>
              </section>
            </div>

            <PillList items={study.stack} className={styles.stack} />

            <button type="button" className={styles.next} onClick={() => go(1)}>
              <span>
                <small>Next project</small>
                <strong>{next.title}</strong>
              </span>
              <ArrowRight />
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
