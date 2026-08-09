---
name: add-project
description: >-
  Adds or updates a portfolio case study in the PROJECTS array. Use when the
  user asks to add a project, create a case study, feature work on the
  homepage, or wire a project screenshot.
---

# Add a project

## Instructions

1. Collect from the user (ask only for what is missing): title, slug (or derive a URL-safe slug), category, year, status, visibility, whether it is `featured`, short `summary`, case-study copy, `technologies`, and optional demo/repo links.
2. Open [`src/lib/projects.ts`](src/lib/projects.ts). Duplicate a similar existing entry in `PROJECTS` and replace every field for the new project.
3. Set `visual` to the closest match among: `dashboard`, `road`, `rail`, `train`, `vision`, `builder`, `analytics`, `traffic`, `portfolio`, `table`, `weather`, `code`.
4. If the user provides a screenshot, save it as `public/images/projects/<slug>.png` and set `image: "/images/projects/<slug>.png"`. Otherwise omit `image`.
5. Do not add new pages, routes, or data files — the homepage, archive, and `/projects/[slug]` template already consume `PROJECTS`.
6. Confirm the slug is unique and that `featured` matches whether it should appear in homepage featured work.

## Checklist

- [ ] Entry added/updated only in `src/lib/projects.ts`
- [ ] `slug` unique and URL-safe
- [ ] `visual` is a valid `ProjectVisual`
- [ ] Optional `image` path matches a file under `public/images/projects/`
- [ ] Types still satisfy the `Project` interface
