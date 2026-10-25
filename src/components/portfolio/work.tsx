import { ArrowUpRight } from "lucide-react";

import { CASES, caseHref, pad } from "@/data/portfolio";
import { cssVars } from "@/lib/dom";

import { Icon } from "./icon";
import { ProjectVisual } from "./project-visual";
import { LinkButton, PillList, SectionHead, Status } from "./ui";

import styles from "./work.module.css";

export function Work() {
  return (
    <section className="section wrap" id="work" aria-labelledby="work-title">
      <SectionHead
        row
        num="02"
        kicker="Selected projects"
        titleId="work-title"
        title={
          <>
            Real systems. <span className="dim">Real operations.</span>
          </>
        }
      >
        <p className="sec-note">
          Scroll through {CASES.length} case studies. Open any one for the problem, my decisions, and the result.
        </p>
      </SectionHead>

      <div className={styles.stack} data-stack="off">
        {CASES.map((study, i) => (
          <article
            key={study.id}
            className={styles.card}
            style={cssVars({ "--i": i })}
            data-stack-card=""
            aria-labelledby={`card-${study.id}`}
          >
            <div className={styles.info}>
              <div className={styles.top}>
                <span className={styles.num}>
                  <b>{pad(i + 1)}</b> / {pad(CASES.length)}
                </span>
                <Status status={study.status} />
              </div>
              <p className={styles.domain}>
                <Icon name={study.icon} />
                {study.domain} · {study.year}
              </p>
              <h3 id={`card-${study.id}`}>{study.title}</h3>
              <p className={styles.line}>{study.line}</p>
              <div className={styles.metrics}>
                {study.metrics.map((m) => (
                  <div key={m.l}>
                    <b>{m.v}</b>
                    <span>{m.l}</span>
                  </div>
                ))}
              </div>
              <div className={styles.foot}>
                <PillList items={study.stack.slice(0, 3)} className={styles.tags} />
                <LinkButton href={caseHref(study.id)} variant="ghost" size="sm">
                  Case study <ArrowUpRight />
                </LinkButton>
              </div>
            </div>

            {/* Mouse shortcut to the same case; keyboard and screen-reader users get the button above. */}
            <a className={styles.visual} href={caseHref(study.id)} tabIndex={-1} aria-hidden="true" data-inview="">
              <ProjectVisual study={study} sizes="(max-width: 1080px) 100vw, 560px" priority={i === 0} />
              <span className={styles.hint}>
                Open case <ArrowUpRight />
              </span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
