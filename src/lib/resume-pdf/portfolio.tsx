import path from "node:path";

// Renamed so jsx-a11y doesn't treat it as an <img>: react-pdf images have no alt text.
import { Document, Image as PdfImage, Link, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";

import { RESUME, type ResumeProjectStatus } from "@/data/resume";

import { registerFonts } from "./fonts";
import type { PdfIconName } from "./icons";
import { PdfIcon } from "./pdf-icon";

/*
 * Portfolio-style résumé (dark or light), matching the site. Two palettes mirror the
 * site's themes (THEME.md tokens); layout and Lucide iconography are identical.
 */

export type PortfolioMode = "dark" | "light";

const PALETTES = {
  dark: {
    bg: "#06070A",
    panel: "#0E1015",
    line: "#1C1F26",
    line2: "#2A2E37",
    text: "#EEF1F5",
    text2: "#B4BAC6",
    text3: "#858C9B",
    accent: "#C8FF3D", // volt
    accentSoft: "rgba(200,255,61,0.10)",
    data: "#7CE7FF", // ice
    photoLine: "transparent", // the white photo already stands out on dark
    status: { "Live demo": "#C8FF3D", Prototype: "#7CE7FF", "In development": "#B6A4FF", Concept: "#8C94A3" },
  },
  light: {
    bg: "#F3F4EF",
    panel: "#FFFFFF",
    line: "#DFE1DA",
    line2: "#CDD0C8",
    text: "#0E1014",
    text2: "#4A505B",
    text3: "#646A75",
    accent: "#4C7A00", // volt-fg: readable on light
    accentSoft: "rgba(76,122,0,0.10)",
    data: "#0A6E8F", // ice-fg
    photoLine: "#CDD0C8", // keeps the white photo from melting into the page
    status: { "Live demo": "#4C7A00", Prototype: "#0A6E8F", "In development": "#6D55E0", Concept: "#646A75" },
  },
} satisfies Record<PortfolioMode, { status: Record<ResumeProjectStatus, string> } & Record<string, string | object>>;

type Palette = (typeof PALETTES)[PortfolioMode];

const PHOTO = path.join(process.cwd(), "public", RESUME.photo);
// Wider than the photo's own ratio (1284 × 1830), so "cover" zooms in a little; the crop is
// biased to the bottom (see `photo`) so the top of the head stays in frame.
const PHOTO_W = 76;
const PHOTO_H = 90;

const STATUS_ICON: Record<ResumeProjectStatus, PdfIconName> = {
  "Live demo": "circle-play",
  Prototype: "flask-conical",
  "In development": "hammer",
  Concept: "lightbulb",
};

const SKILL_ICON: Record<string, PdfIconName> = {
  "layout-template": "layout-template",
  "pen-tool": "pen-tool",
  "chart-line": "chart-line",
  server: "server",
  "git-branch": "git-branch",
  route: "route",
};

// simple-icons paths (Lucide 1.x has no brand logos)
const BRAND = {
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

// Shown as an even 3×2 grid that keeps this PDF to two pages; concepts and projects marked
// `portfolioPdf: false` stay on the web page and the ATS PDF.
const PROJECTS = RESUME.projects.filter((p) => p.status !== "Concept" && p.portfolioPdf !== false);
const PROJECT_ROWS = Array.from({ length: Math.ceil(PROJECTS.length / 2) }, (_, i) => PROJECTS.slice(i * 2, i * 2 + 2));

const hexAlpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

function createStyles(c: Palette) {
  return StyleSheet.create({
    page: {
      paddingVertical: 28,
      paddingHorizontal: 36,
      backgroundColor: c.bg,
      color: c.text2,
      fontFamily: "Outfit",
      fontSize: 8.6,
      lineHeight: 1.5,
    },

    /* Header */
    header: { position: "relative" },
    head: { paddingRight: PHOTO_W + 16 },
    // Images ignore borders, so the hairline is on a frame around it
    photoFrame: {
      position: "absolute",
      top: 0,
      right: 0,
      width: PHOTO_W,
      height: PHOTO_H,
      borderRadius: 6,
      borderWidth: 0.75,
      borderColor: c.photoLine,
    },
    photo: { width: "100%", height: "100%", borderRadius: 5.25, objectFit: "cover", objectPosition: "50% 25%" },
    name: { fontFamily: "Oxanium", fontWeight: 700, fontSize: 22, color: c.text, lineHeight: 1.1 },
    title: { marginTop: 3, fontFamily: "Oxanium", fontWeight: 600, fontSize: 11, color: c.accent },

    contact: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 14,
      paddingRight: PHOTO_W + 16,
      paddingBottom: 13,
      borderBottomWidth: 0.75,
      borderBottomColor: c.line2,
    },
    contactItem: { flexDirection: "row", alignItems: "center", marginRight: 15, marginBottom: 4 },
    contactText: { marginLeft: 5, fontSize: 8.2, color: c.text2, textDecoration: "none" },

    /* Section heading: icon tile + label + rule */
    h2Row: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    h2Tile: {
      width: 15,
      height: 15,
      marginRight: 7,
      borderRadius: 4,
      backgroundColor: c.accentSoft,
      alignItems: "center",
      justifyContent: "center",
    },
    h2: { fontFamily: "Oxanium", fontWeight: 600, fontSize: 8.4, letterSpacing: 1.6, textTransform: "uppercase", color: c.accent },
    h2Rule: { flex: 1, height: 0.75, marginLeft: 8, backgroundColor: c.line },

    /* Page 1 layout */
    body: { flexDirection: "row", marginTop: 18 },
    main: { flex: 1, paddingRight: 20 },
    side: { width: 190, padding: 11, borderRadius: 10, backgroundColor: c.panel, borderWidth: 0.75, borderColor: c.line },

    summary: { fontSize: 9, lineHeight: 1.6, color: c.text2, marginBottom: 18 },

    timeline: { borderLeftWidth: 0.75, borderLeftColor: c.line2, paddingLeft: 13, marginLeft: 3 },
    role: { position: "relative", marginBottom: 14 },
    roleDot: { position: "absolute", left: -17.6, top: 3.2, width: 9, height: 9, borderRadius: 4.5, borderWidth: 1.3, borderColor: c.accent },
    roleTitle: { fontFamily: "Oxanium", fontWeight: 600, fontSize: 10.2, color: c.text },
    metaRow: { flexDirection: "row", flexWrap: "wrap", alignItems: "center", marginTop: 3 },
    metaItem: { flexDirection: "row", alignItems: "center", marginRight: 10, marginBottom: 1 },
    metaText: { marginLeft: 4, fontSize: 8, color: c.text3 },
    metaOrg: { marginLeft: 4, fontSize: 8.2, color: c.accent },

    /* Bullets: Lucide chevron, aligned to the first line */
    bullets: { marginTop: 5 },
    bullet: { flexDirection: "row", marginBottom: 3 },
    bulletIcon: { marginTop: 2.6, marginRight: 4 },
    bulletText: { flex: 1, fontSize: 8.4, lineHeight: 1.5, color: c.text2 },
    cardBulletText: { flex: 1, fontSize: 7.9, lineHeight: 1.45, color: c.text2 },

    /* Skills panel */
    skillGroup: { marginBottom: 6.5 },
    skillHead: { flexDirection: "row", alignItems: "center", marginBottom: 3.5 },
    skillTitle: {
      marginLeft: 5,
      fontFamily: "Oxanium",
      fontWeight: 600,
      fontSize: 7.2,
      letterSpacing: 0.7,
      textTransform: "uppercase",
      color: c.text,
    },
    pills: { flexDirection: "row", flexWrap: "wrap" },
    pill: {
      marginRight: 2.4,
      marginBottom: 2.4,
      paddingVertical: 0.8,
      paddingHorizontal: 5,
      borderRadius: 99,
      borderWidth: 0.6,
      borderColor: c.line2,
      fontSize: 6.9,
      color: c.text2,
    },

    /* Project cards */
    row: { flexDirection: "row", marginBottom: 11 },
    card: { flex: 1, padding: 12, borderRadius: 9, backgroundColor: c.panel, borderWidth: 0.75, borderColor: c.line },
    cardGap: { width: 11 },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    cardTitle: { flex: 1, paddingRight: 6, fontFamily: "Oxanium", fontWeight: 600, fontSize: 9.8, color: c.text },
    badge: { flexDirection: "row", alignItems: "center", paddingVertical: 1.6, paddingHorizontal: 5.5, borderRadius: 99, borderWidth: 0.6 },
    badgeText: { marginLeft: 3.5, fontSize: 7, fontWeight: 500, lineHeight: 1.2 },
    cardSub: { marginTop: 2, fontSize: 7.9, color: c.data },
    footRow: { flexDirection: "row", alignItems: "flex-start", marginTop: "auto", paddingTop: 7 },
    tech: { flex: 1, marginLeft: 4, fontSize: 7.1, letterSpacing: 0.2, color: c.text3 },
    cardLink: { flexDirection: "row", alignItems: "center", marginTop: 3 },
    cardLinkText: { marginLeft: 4, fontSize: 7.6, color: c.data, textDecoration: "none" },

    /* Education / certifications / languages */
    strip: { flexDirection: "row", marginTop: 8, paddingTop: 16, borderTopWidth: 0.75, borderTopColor: c.line2 },
    stripCol: { paddingRight: 18 },
    entry: { marginBottom: 8 },
    entryTitle: { fontFamily: "Oxanium", fontWeight: 600, fontSize: 8.6, lineHeight: 1.3, color: c.text },
    entryOrg: { marginTop: 1.5, fontSize: 7.8, color: c.accent },
    entryMeta: { marginTop: 1.5, fontSize: 7.6, lineHeight: 1.45, color: c.text2 },
  });
}

type Styles = ReturnType<typeof createStyles>;

function H2({ s, c, icon, children }: { s: Styles; c: Palette; icon: PdfIconName; children: string }) {
  return (
    <View style={s.h2Row} minPresenceAhead={50}>
      <View style={s.h2Tile}>
        <PdfIcon name={icon} size={9} color={c.accent} />
      </View>
      <Text style={s.h2}>{children}</Text>
      <View style={s.h2Rule} />
    </View>
  );
}

function Bullets({ s, c, items, card = false }: { s: Styles; c: Palette; items: string[]; card?: boolean }) {
  return (
    <View style={s.bullets}>
      {items.map((item) => (
        <View key={item} style={s.bullet} wrap={false}>
          <PdfIcon name="chevron-right" size={card ? 7.5 : 8} color={c.accent} strokeWidth={2.6} style={s.bulletIcon} />
          <Text style={card ? s.cardBulletText : s.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Brand({ path, color }: { path: string; color: string }) {
  return (
    <Svg width={8.5} height={8.5} viewBox="0 0 24 24">
      <Path d={path} fill={color} />
    </Svg>
  );
}

function StatusBadge({ s, color, status, year }: { s: Styles; color: string; status: ResumeProjectStatus; year: number }) {
  return (
    <View style={[s.badge, { borderColor: hexAlpha(color, 0.45), backgroundColor: hexAlpha(color, 0.1) }]}>
      <PdfIcon name={STATUS_ICON[status]} size={7} color={color} strokeWidth={2.4} />
      <Text style={[s.badgeText, { color }]}>
        {status} · {year}
      </Text>
    </View>
  );
}

export function PortfolioResume({ mode }: { mode: PortfolioMode }) {
  registerFonts();
  const c = PALETTES[mode];
  const s = createStyles(c);

  const contact: { label: string; href?: string; icon: React.ReactNode }[] = [
    { label: RESUME.location, icon: <PdfIcon name="map-pin" size={8.5} color={c.data} /> },
    { label: RESUME.phone, icon: <PdfIcon name="phone" size={8.5} color={c.data} /> },
    { label: RESUME.email, href: `mailto:${RESUME.email}`, icon: <PdfIcon name="mail" size={8.5} color={c.data} /> },
    { label: RESUME.links[0].label, href: RESUME.links[0].href, icon: <PdfIcon name="globe" size={8.5} color={c.data} /> },
    { label: RESUME.links[1].label, href: RESUME.links[1].href, icon: <Brand path={BRAND.linkedin} color={c.data} /> },
    { label: RESUME.links[2].label, href: RESUME.links[2].href, icon: <Brand path={BRAND.github} color={c.data} /> },
  ];

  return (
    <Document title={`${RESUME.name} — Résumé`} author={RESUME.name} subject={RESUME.title} language="en">
      <Page size="A4" style={s.page}>
        {/* ---------- Header: name and contact; photo top right ---------- */}
        <View style={s.header}>
          <View style={s.head}>
            <Text style={s.name}>{RESUME.name}</Text>
            <Text style={s.title}>{RESUME.title}</Text>
          </View>

          <View style={s.contact}>
            {contact.map((item) => (
              <View key={item.label} style={s.contactItem}>
                {item.icon}
                {item.href ? (
                  <Link src={item.href} style={s.contactText}>
                    {item.label}
                  </Link>
                ) : (
                  <Text style={s.contactText}>{item.label}</Text>
                )}
              </View>
            ))}
          </View>

          <View style={s.photoFrame}>
            <PdfImage src={PHOTO} style={s.photo} />
          </View>
        </View>

        {/* ---------- Page 1: summary + experience, skills panel ---------- */}
        <View style={s.body}>
          <View style={s.main}>
            <H2 s={s} c={c} icon="file-text">
              Summary
            </H2>
            <Text style={s.summary}>{RESUME.summary}</Text>

            <H2 s={s} c={c} icon="briefcase">
              Experience
            </H2>
            <View style={s.timeline}>
              {RESUME.experience.map((role, i) => (
                <View key={role.title} style={s.role}>
                  <View style={[s.roleDot, { backgroundColor: i === 0 ? c.accent : c.bg }]} />
                  <Text style={s.roleTitle}>{role.title}</Text>
                  <View style={s.metaRow}>
                    <View style={s.metaItem}>
                      <PdfIcon name="building-2" size={7.5} color={c.accent} />
                      <Text style={s.metaOrg}>{role.org}</Text>
                    </View>
                    <View style={s.metaItem}>
                      <PdfIcon name="map-pin" size={7.5} color={c.text3} />
                      <Text style={s.metaText}>{role.place}</Text>
                    </View>
                    <View style={s.metaItem}>
                      <PdfIcon name="calendar" size={7.5} color={c.text3} />
                      <Text style={s.metaText}>{role.dates}</Text>
                    </View>
                  </View>
                  <Bullets s={s} c={c} items={role.bullets} />
                </View>
              ))}
            </View>
          </View>

          <View style={s.side}>
            <H2 s={s} c={c} icon="wrench">
              Skills
            </H2>
            {RESUME.skills.map((g) => (
              <View key={g.title} style={s.skillGroup} wrap={false}>
                <View style={s.skillHead}>
                  <PdfIcon name={SKILL_ICON[g.icon] ?? "wrench"} size={8} color={c.accent} />
                  <Text style={s.skillTitle}>{g.title}</Text>
                </View>
                <View style={s.pills}>
                  {g.items.map((item) => (
                    <Text key={item} style={s.pill}>
                      {item}
                    </Text>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ---------- Page 2: projects, then education / certifications / languages ---------- */}
        <View break>
          <H2 s={s} c={c} icon="folder-kanban">
            Selected projects
          </H2>
          {PROJECT_ROWS.map((row) => (
            <View key={row[0].title} style={s.row} wrap={false}>
              {row.map((p, i) => (
                <View key={p.title} style={{ flexDirection: "row", flex: 1 }}>
                  {i > 0 && <View style={s.cardGap} />}
                  <View style={s.card}>
                    <View style={s.cardTop}>
                      <Text style={s.cardTitle}>{p.title}</Text>
                      <StatusBadge s={s} color={c.status[p.status]} status={p.status} year={p.year} />
                    </View>
                    <Text style={s.cardSub}>{p.subtitle}</Text>
                    <Bullets s={s} c={c} items={p.bullets} card />
                    <View style={s.footRow}>
                      <PdfIcon name="code-xml" size={7.5} color={c.text3} style={{ marginTop: 0.6 }} />
                      <Text style={s.tech}>{p.stack.join("\u00a0 ·  ")}</Text>
                    </View>
                    {p.link && (
                      <View style={s.cardLink}>
                        <PdfIcon name="link" size={7.5} color={c.data} />
                        <Link src={p.link.href} style={s.cardLinkText}>
                          {p.link.label}
                        </Link>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </View>
          ))}

          <View style={s.strip} wrap={false}>
            <View style={[s.stripCol, { width: "36%" }]}>
              <H2 s={s} c={c} icon="graduation-cap">
                Education
              </H2>
              {RESUME.education.map((e) => (
                <View key={e.title} style={s.entry}>
                  <Text style={s.entryTitle}>{e.title}</Text>
                  <Text style={s.entryOrg}>{e.org}</Text>
                  <Text style={s.entryMeta}>
                    {e.dates} · {e.notes[0]}
                  </Text>
                </View>
              ))}
            </View>
            <View style={[s.stripCol, { width: "40%" }]}>
              <H2 s={s} c={c} icon="award">
                Certifications
              </H2>
              {RESUME.certifications.map((cert) => (
                <View key={cert.title} style={s.entry}>
                  <Text style={s.entryTitle}>{cert.title}</Text>
                  <Text style={s.entryMeta}>
                    {cert.issuer} · {cert.date}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{ width: "24%" }}>
              <H2 s={s} c={c} icon="languages">
                Languages
              </H2>
              <Text style={[s.entryMeta, { marginBottom: 12 }]}>{RESUME.languages}</Text>
              <H2 s={s} c={c} icon="user-round-check">
                References
              </H2>
              <Text style={s.entryMeta}>Available upon request</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
