const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const mobileMenuButton = document.querySelector("#mobile-menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const currentYear = document.querySelector("#current-year");

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  themeToggle?.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
}

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

mobileMenuButton?.addEventListener("click", () => {
  const isOpen = mobileMenuButton.getAttribute("aria-expanded") === "true";
  mobileMenuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  mobileMenu?.classList.toggle("is-open", !isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuButton?.setAttribute("aria-expanded", "false");
    mobileMenuButton?.setAttribute("aria-label", "Open navigation");
    mobileMenu?.classList.remove("is-open");
  });
});

if (currentYear) currentYear.textContent = String(new Date().getFullYear());
setTheme(root.dataset.theme || "light");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function projectUrl(project) {
  return `project.html?slug=${encodeURIComponent(project.slug)}`;
}

function visualMarkup(project, large = false) {
  const label = escapeHtml(project.category);
  return `
    <div class="project-visual visual-${escapeHtml(project.visual)} ${large ? "project-visual-large" : ""}" aria-hidden="true">
      <div class="visual-grid"></div>
      <div class="visual-panel visual-panel-a"><span></span><strong></strong><i></i><i></i><i></i></div>
      <div class="visual-panel visual-panel-b"><span></span><strong></strong><em>${label}</em></div>
      <div class="visual-line"></div>
      <div class="visual-dot dot-a"></div><div class="visual-dot dot-b"></div><div class="visual-dot dot-c"></div>
    </div>`;
}

function projectCard(project) {
  const tech = project.technologies.slice(0, 3).map((item) => `<span>${escapeHtml(item)}</span>`).join("");
  return `
    <article class="archive-project-card card">
      <a class="project-card-link" href="${projectUrl(project)}" aria-label="View ${escapeHtml(project.title)} case study">
        ${visualMarkup(project)}
        <div class="archive-project-body">
          <div class="project-card-meta">
            <span>${escapeHtml(project.category)}</span>
            <span>${escapeHtml(project.year)}</span>
            <span class="status-pill">${escapeHtml(project.status)}</span>
          </div>
          <h2>${escapeHtml(project.title)}</h2>
          <p>${escapeHtml(project.summary)}</p>
          <div class="technology-list">${tech}</div>
          <div class="card-action">View case study
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"></path></svg>
          </div>
        </div>
      </a>
    </article>`;
}
