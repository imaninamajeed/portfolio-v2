<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portfolio agent notes

- Use **pnpm** only (`pnpm install`, `pnpm dev`, `pnpm lint`, `pnpm build`). Do not use npm or yarn.
- Stack: Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui (Nova), `next-themes`.
- To add or edit case studies, change only [`src/lib/projects.ts`](src/lib/projects.ts). Homepage featured work, the projects archive, and related-work sections all derive from the `PROJECTS` array.
- Optional screenshots go in `public/images/projects/<slug>.png` with matching `image` on the project entry.
