---
name: add-project
description: >-
  Adds or updates a portfolio case study in the CASES array. Use when the
  user asks to add a project, create a case study, feature work, or wire a
  project screenshot.
---

# Add a project

## Instructions

1. Collect from the user (ask only for what is missing): title, id (or derive a URL-safe one), domain, year, status, one-line summary, three metrics, problem, what they did, result, stack, and optional demo/repo links.
2. Open [`src/data/portfolio.ts`](src/data/portfolio.ts). Add the id to the `CaseId` union, then duplicate a similar entry in `CASES` and replace every field.
3. Set `sketch` to the closest of: `map`, `table`, `periods`, `line`, `pipeline`.
4. If the user provides a screenshot, save it as `public/images/projects/<id>.png` and set `image: "/images/projects/<id>.png"`. Otherwise omit `image`.
5. To show it in the archive, add an `ARCHIVE` row with `caseId` set.
6. Do not add new pages, routes, or data files. The work cards, archive, role links and case dialog already consume the data.

## Checklist

- [ ] Entry added/updated only in `src/data/portfolio.ts`
- [ ] `id` unique, URL-safe, and present in `CaseId`
- [ ] `sketch` is a valid `SketchKind`
- [ ] Optional `image` path matches a file under `public/images/projects/`
- [ ] `pnpm lint` and `pnpm build` pass
