import { renderToBuffer } from "@react-pdf/renderer";
import { createElement, type ReactElement } from "react";

import { RESUME_PDFS } from "@/data/resume";
import { AtsResume } from "@/lib/resume-pdf/ats";
import { PortfolioResume } from "@/lib/resume-pdf/portfolio";

/*
 * Real PDF files (text-based, so ATS-parsable), rendered once at build time and served
 * statically: /resume/Imanina-Majeed-Resume.pdf (classic) plus -Dark.pdf and -Light.pdf.
 * Buttons link straight to these, so there is no print dialog.
 */

const DOCUMENTS: Record<string, () => ReactElement> = {
  [RESUME_PDFS.ats.file]: () => createElement(AtsResume),
  [RESUME_PDFS.dark.file]: () => createElement(PortfolioResume, { mode: "dark" }),
  [RESUME_PDFS.light.file]: () => createElement(PortfolioResume, { mode: "light" }),
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCUMENTS).map((file) => ({ file }));
}

export async function GET(_request: Request, { params }: RouteContext<"/resume/[file]">) {
  const { file } = await params;
  const render = DOCUMENTS[file];
  if (!render) return new Response("Not found", { status: 404 });

  // renderToBuffer expects a <Document> element; our components return one.
  const pdf = await renderToBuffer(render() as Parameters<typeof renderToBuffer>[0]);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${file}"`,
    },
  });
}
