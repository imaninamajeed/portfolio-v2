# Imanina Portfolio — Scalable Multi-Project Version

A static, shadcn/ui-inspired portfolio designed to support a growing number of products and projects.

## Structure

```text
imanina-portfolio-scalable/
├── index.html                # Homepage with featured projects
├── projects.html             # Searchable and filterable archive
├── project.html              # Reusable project-detail template
├── styles.css                # Shared design system and responsive layout
├── script.js                 # Shared theme, navigation and card helpers
├── home.js                   # Featured-project rendering
├── projects.js               # Archive search, filters, sorting and load more
├── project-detail.js         # Dynamic case-study rendering
├── data/
│   └── projects.js           # The only file to edit when adding projects
└── assets/
    └── passport.png
```

## Add a project

Open `data/projects.js`, duplicate an existing object, and update:

- `slug` — unique URL-safe name
- `title`
- `category`
- `year`
- `status`
- `visibility`
- `featured`
- `visual`
- project descriptions and case-study fields
- `technologies`
- `links.demo` and/or `links.repository`

The homepage automatically displays up to six projects where `featured: true`.

The archive automatically generates:

- Category options
- Status options
- Year options
- Search results
- Sort order
- Load-more behaviour
- Result count

Each project uses the same detail page:

```text
project.html?slug=cmms-plus
```

## Visual options

The included CSS supports these abstract preview styles:

- `dashboard`
- `road`
- `rail`
- `train`
- `vision`
- `builder`
- `analytics`
- `traffic`
- `portfolio`
- `table`
- `weather`
- `code`

You can later replace the generated preview with an image field and render real screenshots.

## Run locally

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Deploy to Vercel or Netlify

This is a static site with no build step. Publish the project root.

## Recommended next content step

For strong public case studies, add real screenshots and measurable outcomes only where disclosure is permitted. Keep internal work marked as `Internal` and avoid exposing credentials, customer data, private URLs, or confidential metrics.
