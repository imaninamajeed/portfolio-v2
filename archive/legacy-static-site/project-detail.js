const detailRoot = document.querySelector("#project-detail");
const projects = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
const project = projects.find((item) => item.slug === slug);

function externalLink(label, href, primary = false) {
  if (!href) return "";
  return `<a class="button ${primary ? "button-primary" : "button-outline"}" href="${escapeHtml(href)}" target="_blank" rel="noreferrer">${escapeHtml(label)}
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M10 14 19 5M19 13v6H5V5h6"></path></svg>
  </a>`;
}

if (!project) {
  document.title = "Project not found — Imanina Majeed";
  detailRoot.innerHTML = `
    <section class="section not-found">
      <div class="container narrow-container">
        <p class="eyebrow">Project not found</p>
        <h1>This case study is unavailable.</h1>
        <p>The project may have been renamed or removed from the archive.</p>
        <a class="button button-primary" href="projects.html">Return to projects</a>
      </div>
    </section>`;
} else {
  document.title = `${project.title} — Imanina Majeed`;
  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const related = projects
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);
  const fallbackRelated = related.length ? related : projects.filter((item) => item.slug !== project.slug).slice(0, 3);
  const links = project.links || {};
  const technologies = project.technologies.map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  const highlights = project.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  detailRoot.innerHTML = `
    <section class="case-hero section">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="projects.html">Projects</a><span>/</span><span>${escapeHtml(project.title)}</span>
        </nav>
        <div class="case-hero-grid">
          <div class="case-title">
            <div class="project-card-meta">
              <span>${escapeHtml(project.category)}</span>
              <span>${escapeHtml(project.year)}</span>
              <span class="status-pill">${escapeHtml(project.status)}</span>
              <span>${escapeHtml(project.visibility)}</span>
            </div>
            <h1>${escapeHtml(project.title)}</h1>
            <p>${escapeHtml(project.description)}</p>
            <div class="hero-actions">
              ${externalLink("Open live demo", links.demo, true)}
              ${externalLink("View repository", links.repository)}
              <a class="button button-outline" href="projects.html">Back to archive</a>
            </div>
          </div>
          ${visualMarkup(project, true)}
        </div>
      </div>
    </section>

    <section class="case-facts section-border">
      <div class="container case-facts-grid">
        <div><span>Role</span><strong>${escapeHtml(project.role)}</strong></div>
        <div><span>Duration</span><strong>${escapeHtml(project.duration)}</strong></div>
        <div><span>Context</span><strong>${escapeHtml(project.context)}</strong></div>
        <div><span>Access</span><strong>${escapeHtml(project.visibility)}</strong></div>
      </div>
    </section>

    <section class="section">
      <div class="container case-content-grid">
        <aside class="case-sidebar">
          <p class="eyebrow">Case study</p>
          <nav>
            <a href="#problem">Problem</a>
            <a href="#approach">Approach</a>
            <a href="#outcome">Outcome</a>
            <a href="#highlights">Highlights</a>
          </nav>
        </aside>
        <div class="case-content">
          <section id="problem"><p class="eyebrow">Problem</p><h2>What needed to be clearer?</h2><p>${escapeHtml(project.problem)}</p></section>
          <section id="approach"><p class="eyebrow">Approach</p><h2>How the product was structured.</h2><p>${escapeHtml(project.approach)}</p></section>
          <section id="outcome"><p class="eyebrow">Outcome</p><h2>What the work established.</h2><p>${escapeHtml(project.outcome)}</p></section>
          <section id="highlights"><p class="eyebrow">Highlights</p><h2>Key parts of the project.</h2><ul class="highlight-list">${highlights}</ul></section>
          <section><p class="eyebrow">Technology</p><h2>Tools and platforms.</h2><div class="technology-list technology-list-large">${technologies}</div></section>
        </div>
      </div>
    </section>

    <section class="section section-muted section-border">
      <div class="container">
        <div class="section-heading compact-heading">
          <div><p class="eyebrow">Related work</p><h2>More from ${escapeHtml(project.category)}.</h2></div>
          <a class="text-link" href="projects.html?category=${encodeURIComponent(project.category)}">Browse archive
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </a>
        </div>
        <div class="project-collection related-collection">${fallbackRelated.map(projectCard).join("")}</div>
      </div>
    </section>

    <section class="next-project section-border">
      <a class="container next-project-link" href="${projectUrl(next)}">
        <div><p class="eyebrow">Next project</p><h2>${escapeHtml(next.title)}</h2></div>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
      </a>
    </section>`;
}
