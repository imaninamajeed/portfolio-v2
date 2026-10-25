export type Theme = "dark" | "light";

export const THEME_KEY = "theme";

/** Matches `--bg` in each theme; keeps the mobile browser chrome in step with the page. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#06070A", light: "#F3F4EF" };

/**
 * Runs inline in <head> before first paint, so a saved light theme never flashes dark.
 * Dark is the default when nothing is saved.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)});if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}})()`;

export const readTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function syncThemeColor(theme: Theme) {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
}

export function applyTheme(theme: Theme, persist = true) {
  document.documentElement.dataset.theme = theme;
  syncThemeColor(theme);
  if (!persist) return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the theme still applies for this visit.
  }
}

/** Re-applies the stored theme. A no-op in production; dev Strict Mode can clear <html> attributes. */
export function restoreTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") applyTheme(saved, false);
    else syncThemeColor(readTheme());
  } catch {
    syncThemeColor(readTheme());
  }
}
