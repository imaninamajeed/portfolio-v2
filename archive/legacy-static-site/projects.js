const allProjects = Array.isArray(window.PROJECTS) ? [...window.PROJECTS] : [];
const results = document.querySelector("#project-results");
const count = document.querySelector("#project-count");
const search = document.querySelector("#project-search");
const category = document.querySelector("#category-filter");
const status = document.querySelector("#status-filter");
const year = document.querySelector("#year-filter");
const sort = document.querySelector("#sort-filter");
const clearButton = document.querySelector("#clear-filters");
const emptyClear = document.querySelector("#empty-clear");
const emptyState = document.querySelector("#empty-state");
const loadMore = document.querySelector("#load-more");

const PAGE_SIZE = 9;
let visibleCount = PAGE_SIZE;

function uniqueValues(key, sorter) {
  return [...new Set(allProjects.map((project) => project[key]))].sort(sorter);
}

function addOptions(select, values) {
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = String(value);
    option.textContent = String(value);
    select.appendChild(option);
  });
}

addOptions(category, uniqueValues("category", (a, b) => a.localeCompare(b)));
addOptions(status, uniqueValues("status", (a, b) => a.localeCompare(b)));
addOptions(year, uniqueValues("year", (a, b) => b - a));

const initialParams = new URLSearchParams(window.location.search);
const initialQuery = initialParams.get("q");
const initialCategory = initialParams.get("category");
const initialStatus = initialParams.get("status");
const initialYear = initialParams.get("year");
if (initialQuery) search.value = initialQuery;
if (initialCategory && [...category.options].some((option) => option.value === initialCategory)) category.value = initialCategory;
if (initialStatus && [...status.options].some((option) => option.value === initialStatus)) status.value = initialStatus;
if (initialYear && [...year.options].some((option) => option.value === initialYear)) year.value = initialYear;

function getFilteredProjects() {
  const term = search.value.trim().toLowerCase();
  const filtered = allProjects.filter((project) => {
    const searchable = [
      project.title,
      project.category,
      project.status,
      project.visibility,
      project.summary,
      project.description,
      ...project.technologies
    ].join(" ").toLowerCase();

    return (!term || searchable.includes(term))
      && (!category.value || project.category === category.value)
      && (!status.value || project.status === status.value)
      && (!year.value || String(project.year) === year.value);
  });

  return filtered.sort((a, b) => {
    if (sort.value === "oldest") return a.year - b.year || a.title.localeCompare(b.title);
    if (sort.value === "title") return a.title.localeCompare(b.title);
    return b.year - a.year || a.title.localeCompare(b.title);
  });
}

function render() {
  const filtered = getFilteredProjects();
  const visible = filtered.slice(0, visibleCount);
  results.innerHTML = visible.map(projectCard).join("");
  count.textContent = `${filtered.length} project${filtered.length === 1 ? "" : "s"} found`;
  emptyState.hidden = filtered.length !== 0;
  loadMore.hidden = filtered.length <= visibleCount;
}

function resetPaginationAndRender() {
  visibleCount = PAGE_SIZE;
  render();
}

[search, category, status, year, sort].forEach((control) => {
  control.addEventListener(control === search ? "input" : "change", resetPaginationAndRender);
});

loadMore.addEventListener("click", () => {
  visibleCount += PAGE_SIZE;
  render();
});

function clearFilters() {
  search.value = "";
  category.value = "";
  status.value = "";
  year.value = "";
  sort.value = "latest";
  resetPaginationAndRender();
}

clearButton.addEventListener("click", clearFilters);
emptyClear.addEventListener("click", clearFilters);
render();
