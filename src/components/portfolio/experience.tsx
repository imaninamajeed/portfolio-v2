import { SKILLS, SKILL_LEVELS, TIMELINE, TOOLKIT, groupScore, type SkillLevel } from "@/data/portfolio";
import { cssVars, reveal } from "@/lib/dom";

import { Icon } from "./icon";
import { SkillRadar } from "./skill-radar";
import { PillList, SectionHead } from "./ui";

import styles from "./experience.module.css";

const LEVELS = ([1, 2, 3, 4, 5] as const).map((n) => [n, SKILL_LEVELS[n]] as const);

/** Five-segment meter. The level name is always shown as text, so colour is never the only signal. */
function Meter({ name, level }: { name: string; level: SkillLevel }) {
  return (
    <div
      className={styles.meter}
      role="meter"
      aria-label={name}
      aria-valuemin={1}
      aria-valuemax={5}
      aria-valuenow={level}
      aria-valuetext={`${SKILL_LEVELS[level]}, ${level} of 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= level ? styles.on : undefined} style={cssVars({ "--d": `${n * 0.06}s` })} />
      ))}
    </div>
  );
}

/** Journey (timeline) and the skills self-assessment, as one section. */
export function Experience() {
  return (
    <section className="section wrap" id="experience" aria-labelledby="experience-title">
      <SectionHead
        num="04"
        kicker="Experience & skills"
        titleId="experience-title"
        title={
          <>
            Where I’ve been. <span className="dim">What I’m good at.</span>
          </>
        }
      />

      {/* Row 1: where I've been + what I use */}
      <div className={styles.top}>
        <div>
          <h3 className={styles.subhead}>Journey</h3>
          <ol className={styles.timeline}>
            {TIMELINE.map((entry) => (
              <li key={entry.title} className={`glass ${styles.item}`} {...reveal()}>
                <span className={styles.itemIcon}>
                  <Icon name={entry.icon} />
                </span>
                <div>
                  <p className={styles.date}>
                    {entry.date}
                    {entry.current && <span className={styles.now}>Now</span>}
                  </p>
                  <h4>{entry.title}</h4>
                  <p className={styles.org}>{entry.org}</p>
                  <p className={styles.desc}>{entry.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className={styles.subhead}>Tech stack</h3>
          <div className={styles.toolkit}>
            {TOOLKIT.map((group, i) => (
              <div key={group.title} className={`glass ${styles.tool}`} {...reveal(i * 0.06)}>
                <p className={styles.toolHead}>
                  <Icon name={group.icon} />
                  {group.title}
                </p>
                <PillList items={group.items} className={styles.toolList} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: self-assessment. The radar stays in view while the groups scroll past (desktop). */}
      <h3 className={`${styles.subhead} ${styles.spaced}`} id="skills">
        Skills self-assessment
      </h3>
      <div className={styles.skills}>
        <div className={styles.radarCol}>
          <div className={`glass ${styles.radarCard}`} data-inview="" {...reveal()}>
            <p className={styles.radarNote}>How I rate myself, honestly. Each axis is the average of its group.</p>
            <SkillRadar groups={SKILLS} />
            <ol className={styles.scale} aria-label="Rating scale">
              {LEVELS.map(([n, label]) => (
                <li key={n}>
                  <b>{n}</b> {label}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={styles.groups}>
          {SKILLS.map((group, i) => (
            <div key={group.title} className={`glass ${styles.group}`} data-inview="" {...reveal((i % 2) * 0.06)}>
              <h4 className={styles.groupHead}>
                <Icon name={group.icon} />
                {group.title}
                <span className={styles.score} aria-label={`Average ${groupScore(group)} of 5`}>
                  {groupScore(group).toFixed(1)}
                </span>
              </h4>
              <ul className={styles.list}>
                {group.skills.map((skill) => (
                  <li key={skill.name} className={styles.row}>
                    <span className={styles.name}>{skill.name}</span>
                    <Meter name={skill.name} level={skill.level} />
                    <span className={styles.level} aria-hidden="true">
                      {SKILL_LEVELS[skill.level]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
