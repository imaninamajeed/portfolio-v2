# Imanina Majeed — Portfolio

Next.js portfolio site: featured work on the homepage, a searchable project
archive, and a reusable case-study template driven by one typed data file.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com) for tokens and utilities, CSS Modules for section styles
- [`next/font`](https://nextjs.org/docs/app/getting-started/fonts): Oxanium (headings) and Outfit (body)
- [lucide-react](https://lucide.dev) icons
- [pnpm](https://pnpm.io), the only supported package manager

The visual system (tokens, type, motion, light/dark rules) is specified in [`THEME.md`](THEME.md).

## Structure

```text
src/
├── app/
│   ├── layout.tsx               # Fonts, theme init script, metadata, shell
│   ├── page.tsx                 # Hero → Stats → Roles → Work → Archive → Experience (timeline + skills radar) → Contact
│   ├── globals.css              # Design tokens + shared primitives
│   ├── manifest.ts, icon.svg, apple-icon.png, favicon.ico, opengraph-image.tsx
├── components/portfolio/        # One file (+ .module.css) per section; "use client" only where needed
├── data/portfolio.ts            # The only file to edit for content
└── lib/                         # theme.ts (theme storage), dom.ts (helpers)
public/
├── icons/                       # PWA icons
├── images/projects/             # Optional screenshots, named after the case id
└── resume/                      # Résumé PDF
archive/                         # Superseded predecessors, kept for reference
```

## Add a project

Open `src/data/portfolio.ts`, duplicate an object in `CASES`, and update its
fields (`id`, `title`, `domain`, `status`, `metrics`, `problem`, `did`,
`result`, `stack`, …). Add the new id to the `CaseId` type. The work cards, the
case dialog and the "next project" flow all derive from this array. To list it
in the archive, add a row to `ARCHIVE` with `caseId` set.

`sketch` picks the animated interface drawing shown when there is no
screenshot: `map`, `table`, `periods`, `line` or `pipeline`. To use a real
screenshot instead, drop it in `public/images/projects/<id>.png` and set
`image: "/images/projects/<id>.png"`.

Case studies deep-link at `/#case/<id>`.

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm lint
pnpm build
pnpm start    # serve the production build locally
```

## Deploy

Zero-config on [Vercel](https://vercel.com): connect the repo, it detects
Next.js and `pnpm-lock.yaml` automatically. No `vercel.json` required.
