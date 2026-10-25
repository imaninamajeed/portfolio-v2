import { FileText } from "lucide-react";

import { SITE } from "@/data/portfolio";
import { reveal } from "@/lib/dom";

import { Github, Linkedin } from "./icon";
import { LinkButton } from "./ui";

import styles from "./contact.module.css";

export function Contact() {
  return (
    <section className={`wrap ${styles.contact}`} id="contact" aria-labelledby="contact-title">
      <div className={styles.card} {...reveal()}>
        <div className={styles.glow} aria-hidden="true" />
        <p className="kicker">
          <span>05</span> Contact
        </p>
        <h2 id="contact-title" className={styles.title}>
          Let’s build something <span className="volt">people can actually use.</span>
        </h2>
        <p className={styles.sub}>Hiring for frontend, product or UI/UX engineering? I’d love to hear about it.</p>
        <div className={styles.actions}>
          <LinkButton href={SITE.linkedin} size="lg" magnetic external>
            <Linkedin /> Connect on LinkedIn
          </LinkButton>
          <LinkButton href={SITE.github} variant="ghost" size="lg" magnetic external>
            <Github /> GitHub
          </LinkButton>
          <LinkButton href={SITE.resume} variant="ghost" size="lg" magnetic external>
            <FileText /> Résumé
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
