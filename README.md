# Imanina Majeed — Portfolio

Next.js portfolio site: featured work on the homepage, a searchable project
archive, and a reusable case-study template driven by one typed data file.

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) (Radix primitives, Nova preset)
- [lucide-react](https://lucide.dev) icons
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode
- [pnpm](https://pnpm.io) — the only supported package manager

## Structure

```text
src/
├── app/
│   ├── page.tsx                 # Home — hero, featured work, about, experience, contact
│   ├── icon.tsx                 # Generated favicon
│   ├── projects/
│   │   ├── page.tsx             # Searchable/filterable archive
│   │   └── [slug]/
│   │       ├── page.tsx         # Case-study template
│   │       └── not-found.tsx    # Custom 404 for unknown slugs
├── components/
│   ├── ui/                      # shadcn/ui primitives
│   ├── site-header.tsx          # Nav, theme toggle, mobile menu (Sheet)
│   ├── site-footer.tsx
│   ├── project-card.tsx
│   ├── project-visual.tsx       # Abstract per-category preview art
│   └── projects-archive.tsx     # Search/filter/sort/pagination (client)
└── lib/
    └── projects.ts              # The only file to edit when adding a project
public/
├── passport.png
└── resume.pdf
archive/                         # Superseded predecessors, kept for reference
├── legacy-static-site/          # The vanilla HTML/CSS/JS site this replaced
└── portfolio-v2-legacy-app/     # An earlier, unfinished Next.js scaffold
```

## Add a project

Open `src/lib/projects.ts`, duplicate an existing object in `PROJECTS`, and
update its fields (`slug`, `title`, `category`, `year`, `status`,
`featured`, case-study copy, `technologies`, `links`, etc.). The homepage,
archive filters, and related-work sections all derive from this array —
nothing else needs to change.

`visual` accepts one of: `dashboard`, `road`, `rail`, `train`, `vision`,
`builder`, `analytics`, `traffic`, `portfolio`, `table`, `weather`, `code`
(see `src/components/project-visual.module.css`).

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
