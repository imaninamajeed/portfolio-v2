import { ArrowDownRight, CodeXml, FileText, LayoutDashboard, MapPin } from "lucide-react";

import { MODULES_SHIPPED, ROLES, SITE, roleName } from "@/data/portfolio";
import { cssVars } from "@/lib/dom";

import { HeroPortrait } from "./hero-portrait";
import { HoloCard } from "./holo-card";
import { RoleCycle } from "./role-cycle";
import { LinkButton } from "./ui";

import styles from "./hero.module.css";

const roles = ROLES.map(roleName);

export function Hero() {
  return (
    <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.copy}>
        <p className={`${styles.statusPill} fade-up`} style={cssVars({ "--d": "0.25s" })}>
          <span className={styles.pulse} aria-hidden="true" />
          Open to frontend &amp; product roles
        </p>

        <h1 id="hero-title" className={styles.title}>
          <span className="sr-only">{SITE.name}, {SITE.jobTitle}: </span>
          <span className={styles.line}>
            <span>Complex</span>
          </span>
          <span className={styles.line}>
            <span>work, made</span>
          </span>
          <span className={styles.line}>
            <span className="volt">simple.</span>
          </span>
        </h1>

        <RoleCycle roles={roles} />

        <p className={`${styles.lede} fade-up`} style={cssVars({ "--d": "0.49s" })}>
          {SITE.bio}
        </p>

        <div className={`${styles.cta} fade-up`} style={cssVars({ "--d": "0.57s" })}>
          <LinkButton href="#work" magnetic>
            View projects <ArrowDownRight />
          </LinkButton>
          <LinkButton href={SITE.resume} variant="ghost" magnetic>
            <FileText /> Résumé
          </LinkButton>
        </div>
      </div>

      <div className={styles.visual}>
        <HoloCard>
          <div className={styles.holoInner}>
            <HeroPortrait />
            <span className={styles.scan} aria-hidden="true" />
            <span className={styles.glare} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.tl}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.tr}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.bl}`} aria-hidden="true" />
            <span className={`${styles.corner} ${styles.br}`} aria-hidden="true" />
            <div className={`${styles.label} ${styles.labelTop}`} aria-hidden="true">
              <span>ID // imaninamajeed</span>
              <span>v2026</span>
            </div>
            <div className={`${styles.label} ${styles.labelBottom}`} aria-hidden="true">
              <span>
                <MapPin /> Subang Jaya, MY
              </span>
              <span className={styles.rec}>
                <span />
                LIVE
              </span>
            </div>
          </div>
        </HoloCard>
        <div className={`${styles.chip} ${styles.chipA}`} aria-hidden="true">
          <CodeXml /> React · Next.js · TS
        </div>
        <div className={`${styles.chip} ${styles.chipB}`} aria-hidden="true">
          <LayoutDashboard /> {MODULES_SHIPPED} modules shipped
        </div>
      </div>
    </section>
  );
}
