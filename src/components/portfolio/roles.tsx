import { ArrowUpRight } from "lucide-react";

import { CASE_BY_ID, ROLES, caseHref, pad } from "@/data/portfolio";
import { reveal } from "@/lib/dom";

import { Icon } from "./icon";
import { PillList, SectionHead } from "./ui";

import styles from "./roles.module.css";

export function Roles() {
  return (
    <section className="section wrap" id="roles" aria-labelledby="roles-title">
      <SectionHead
        num="01"
        kicker="What I do"
        titleId="roles-title"
        title={
          <>
            Three roles. <span className="dim">One product mindset.</span>
          </>
        }
      />
      <div className={styles.roles}>
        {ROLES.map((role, i) => (
          <article key={role.title} className={`glass ${styles.role}`} {...reveal(i * 0.1)}>
            <div className={styles.head}>
              <span className={styles.icon}>
                <Icon name={role.icon} />
              </span>
              <span className={styles.num}>{pad(i + 1)}</span>
            </div>
            <h3 className={styles.title}>
              <span className={styles.titleText}>
                {role.title}
                {role.qualifier && <span className={styles.qualifier}> ({role.qualifier})</span>}
              </span>
            </h3>
            <p className={styles.line}>
              <span className={styles.lineText}>{role.line}</span>
            </p>
            <PillList items={role.skills} className={styles.skills} />
            <div className={styles.proof}>
              <span>See it in</span>
              <div className={styles.links}>
                {role.proof.map((id) => (
                  <a key={id} className={styles.link} href={caseHref(id)}>
                    {CASE_BY_ID[id].short} <ArrowUpRight />
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
