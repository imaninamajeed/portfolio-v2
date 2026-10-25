<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio agent notes

- Use **pnpm** only (`pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm build`). Do not use npm or yarn.
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, CSS Modules, `next/font` (Oxanium + Outfit), `lucide-react`.
- All copy lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) (`ROLES`, `CASES`, `ARCHIVE`, `SKILLS`, `TIMELINE`, `STATS`, `SITE`). `SKILLS` drives both the skill meters and the radar chart. To add or edit a case study, change only `CASES` there; the work cards, archive links, role "See it in" links and the case dialog all derive from it.
- The design spec is [`THEME.md`](THEME.md). Tokens are CSS variables in `src/app/globals.css`; section styles are CSS Modules next to each component in `src/components/portfolio/`.
- Optional screenshots go in `public/images/projects/<slug>.png` with a matching `image` on the case entry. Without one, the case shows its animated `sketch`.
- Case studies open in a dialog at `#case/<id>`; link to them with `<a href={caseHref(id)}>`.
- Interactive pieces are client components; everything else is server-rendered. Keep it that way.
- The résumé is a page at `/resume` (content in [`src/data/resume.ts`](src/data/resume.ts), components in `src/components/resume/`). It offers two PDFs (2 A4 pages each) via `printResume(style)`: "ATS-friendly" (the page's print stylesheet: single column, plain text; also what Ctrl+P gives) and "Designed" (`ThemedPrint`: the dark portfolio theme on a full-bleed `@page themed`, rendered only while printing). The phone number is print-only: `PrintPhone` renders it on `beforeprint`, so it never appears in the page HTML. All Résumé buttons link there via `SITE.resume`; the older PDF is still in `public/resume/`.
- Links to home-page sections use `/#id` so they also work from `/resume`.
- shadcn/ui primitives remain in `src/components/ui/` but the current design does not use them.
