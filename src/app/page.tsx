import { Archive } from "@/components/portfolio/archive";
import { Contact } from "@/components/portfolio/contact";
import { Hero } from "@/components/portfolio/hero";
import { Experience } from "@/components/portfolio/experience";
import { Roles } from "@/components/portfolio/roles";
import { Stats } from "@/components/portfolio/stats";
import { Work } from "@/components/portfolio/work";
import { CASES, SITE, SKILLS, TIMELINE, caseHref } from "@/data/portfolio";

const personId = `${SITE.url}/#person`;

// Structured data: the site, the profile page, the person, and the featured projects.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      inLanguage: "en",
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE.url}/#profile`,
      url: SITE.url,
      name: SITE.title,
      isPartOf: { "@id": `${SITE.url}/#website` },
      mainEntity: { "@id": personId },
      primaryImageOfPage: `${SITE.url}/opengraph-image`,
    },
    {
      "@type": "Person",
      "@id": personId,
      name: SITE.name,
      givenName: "Imanina",
      familyName: "Majeed",
      url: SITE.url,
      image: `${SITE.url}/opengraph-image`,
      jobTitle: SITE.jobTitle,
      description: SITE.bio,
      worksFor: { "@type": "Organization", name: TIMELINE[0].org },
      alumniOf: { "@type": "CollegeOrUniversity", name: TIMELINE[1].org },
      address: { "@type": "PostalAddress", addressLocality: "Subang Jaya", addressRegion: "Selangor", addressCountry: "MY" },
      knowsAbout: SKILLS.flatMap((g) => g.skills.map((s) => s.name)),
      sameAs: [SITE.linkedin, SITE.github],
    },
    {
      "@type": "ItemList",
      name: "Selected projects",
      itemListElement: CASES.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "CreativeWork",
          name: c.title,
          description: c.line,
          url: `${SITE.url}/${caseHref(c.id)}`,
          dateCreated: String(c.year),
          creator: { "@id": personId },
          keywords: c.stack.join(", "),
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <main id="main">
        <Hero />
        <Stats />
        <Roles />
        <Work />
        <Archive />
        <Experience />
        <Contact />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
