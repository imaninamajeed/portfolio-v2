const featuredContainer = document.querySelector("#featured-projects");

if (featuredContainer && Array.isArray(window.PROJECTS)) {
  const featured = window.PROJECTS
    .filter((project) => project.featured)
    .sort((a, b) => b.year - a.year)
    .slice(0, 6);

  featuredContainer.innerHTML = featured.map(projectCard).join("");
}
