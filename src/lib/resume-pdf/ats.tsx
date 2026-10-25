import { Document, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import { RESUME } from "@/data/resume";

import { registerFonts } from "./fonts";

/*
 * Classic, ATS-friendly résumé: one column, standard headings, plain text in reading order,
 * no graphics. Applicant-tracking systems and recruiters both parse it cleanly.
 */

const INK = "#111111";
const INK_2 = "#2b2f36";
const INK_3 = "#5b616b";
const ACCENT = "#2c4a00";

const s = StyleSheet.create({
  page: {
    paddingVertical: 30,
    paddingHorizontal: 38,
    fontFamily: "Outfit",
    fontSize: 9.2,
    lineHeight: 1.34,
    color: INK_2,
  },
  name: { fontFamily: "Oxanium", fontWeight: 700, fontSize: 20, color: INK, lineHeight: 1.1 },
  title: { marginTop: 3, fontFamily: "Oxanium", fontWeight: 600, fontSize: 11, color: ACCENT },
  contact: { marginTop: 6, fontSize: 9, color: INK_2 },
  link: { color: INK_2, textDecoration: "none" },

  section: { marginTop: 9 },
  h2: {
    marginBottom: 5,
    paddingBottom: 2.5,
    borderBottomWidth: 1,
    borderBottomColor: ACCENT,
    fontFamily: "Oxanium",
    fontWeight: 700,
    fontSize: 10,
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: ACCENT,
  },

  skill: { marginTop: 1.5 },
  label: { fontWeight: 600, color: INK },

  entry: { marginTop: 5 },
  entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" },
  entryTitle: { fontFamily: "Oxanium", fontWeight: 600, fontSize: 10, color: INK, flexShrink: 1, paddingRight: 8 },
  entrySub: { fontFamily: "Outfit", fontWeight: 400, fontSize: 9, color: INK_3 },
  date: { fontSize: 9, color: INK_3 },
  org: { marginTop: 1, fontSize: 9, color: INK_3 },

  bullets: { marginTop: 2.5 },
  bullet: { flexDirection: "row", marginTop: 1 },
  dot: { width: 10, color: INK },
  bulletText: { flex: 1 },

  meta: { marginTop: 2, fontSize: 8.8, color: INK_3 },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={s.section}>
      <Text style={s.h2} minPresenceAhead={80}>
        {title}
      </Text>
      {children}
    </View>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <View style={s.bullets}>
      {items.map((item) => (
        <View key={item} style={s.bullet} wrap={false}>
          <Text style={s.dot}>•</Text>
          <Text style={s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function AtsResume() {
  registerFonts();
  return (
    <Document
      title={`${RESUME.name} — Résumé`}
      author={RESUME.name}
      subject={RESUME.title}
      keywords={RESUME.skills.flatMap((g) => g.items).join(", ")}
      language="en"
    >
      <Page size="A4" style={s.page}>
        <Text style={s.name}>{RESUME.name}</Text>
        <Text style={s.title}>{RESUME.title}</Text>
        <Text style={s.contact}>
          {RESUME.location} | {RESUME.phone} | {RESUME.email}
        </Text>
        <Text style={[s.contact, { marginTop: 1 }]}>
          {RESUME.links.map((l, i) => (
            <Text key={l.href}>
              {i > 0 && " | "}
              <Link src={l.href} style={s.link}>
                {l.label}
              </Link>
            </Text>
          ))}
        </Text>

        <Section title="Summary">
          <Text>{RESUME.summary}</Text>
        </Section>

        <Section title="Skills">
          {RESUME.skills.map((g) => (
            <Text key={g.title} style={s.skill}>
              <Text style={s.label}>{g.title}: </Text>
              {g.items.join(", ")}
            </Text>
          ))}
        </Section>

        <Section title="Experience">
          {RESUME.experience.map((role) => (
            <View key={role.title} style={s.entry}>
              <View style={s.entryHead}>
                <Text style={s.entryTitle}>{role.title}</Text>
                <Text style={s.date}>{role.dates}</Text>
              </View>
              <Text style={s.org}>
                {role.org}, {role.place}
              </Text>
              <Bullets items={role.bullets} />
            </View>
          ))}
        </Section>

        <Section title="Projects">
          {RESUME.projects.map((p) => (
            <View key={p.title} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <Text style={s.entryTitle}>
                  {p.title}
                  <Text style={s.entrySub}> — {p.subtitle}</Text>
                </Text>
                <Text style={s.date}>
                  {p.status}, {p.year}
                </Text>
              </View>
              <Bullets items={p.bullets} />
              <Text style={s.meta}>
                <Text style={s.label}>Tech: </Text>
                {p.stack.join(", ")}
                {p.link && `  |  ${p.link.label}`}
              </Text>
            </View>
          ))}
        </Section>

        <Section title="Education">
          {RESUME.education.map((e) => (
            <View key={e.title} style={s.entry} wrap={false}>
              <View style={s.entryHead}>
                <Text style={s.entryTitle}>{e.title}</Text>
                <Text style={s.date}>{e.dates}</Text>
              </View>
              <Text style={s.org}>{e.org}</Text>
              <Text style={s.meta}>{e.notes.join(". ")}.</Text>
            </View>
          ))}
        </Section>

        <Section title="Certifications">
          {RESUME.certifications.map((c) => (
            <View key={c.title} style={[s.entryHead, { marginTop: 4 }]} wrap={false}>
              <Text style={s.entryTitle}>
                {c.title}
                <Text style={s.entrySub}> — {c.issuer}</Text>
              </Text>
              <Text style={s.date}>{c.date}</Text>
            </View>
          ))}
        </Section>

        <Section title="Additional">
          <Text>
            <Text style={s.label}>Languages: </Text>
            {RESUME.languages}
          </Text>
          <Text style={{ marginTop: 2 }}>
            <Text style={s.label}>References: </Text>
            Available upon request
          </Text>
        </Section>
      </Page>
    </Document>
  );
}
