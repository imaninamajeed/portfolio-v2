import path from "node:path";

import { Font } from "@react-pdf/renderer";

const files = (pkg: string) => path.join(process.cwd(), "node_modules", "@fontsource", pkg, "files");

let registered = false;

/** Embed the site fonts (Oxanium headings, Outfit body) so the PDFs match the portfolio. */
export function registerFonts() {
  if (registered) return;
  registered = true;

  const oxanium = files("oxanium");
  const outfit = files("outfit");
  Font.register({
    family: "Oxanium",
    fonts: [
      { src: `${oxanium}/oxanium-latin-600-normal.woff`, fontWeight: 600 },
      { src: `${oxanium}/oxanium-latin-700-normal.woff`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: "Outfit",
    fonts: [
      { src: `${outfit}/outfit-latin-300-normal.woff`, fontWeight: 300 },
      { src: `${outfit}/outfit-latin-400-normal.woff`, fontWeight: 400 },
      { src: `${outfit}/outfit-latin-500-normal.woff`, fontWeight: 500 },
      { src: `${outfit}/outfit-latin-600-normal.woff`, fontWeight: 600 },
    ],
  });
  // Keep words whole: no automatic hyphenation in a résumé
  Font.registerHyphenationCallback((word) => [word]);
}
