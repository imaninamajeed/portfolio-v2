import type { Metadata } from "next";

import { Resume } from "@/components/resume/resume";
import { RESUME } from "@/data/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${RESUME.name}, ${RESUME.title}. Experience, projects, skills, education and certifications.`,
  alternates: { canonical: "/resume" },
  openGraph: { type: "profile", url: "/resume", title: `Résumé — ${RESUME.name}` },
};

export default function ResumePage() {
  return <Resume />;
}
