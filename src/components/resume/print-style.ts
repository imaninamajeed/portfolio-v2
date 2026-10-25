export type PrintStyle = "ats" | "themed";

/**
 * Print the résumé in one of two styles. The choice is a `data-print-style` attribute on
 * <html> for the duration of the print; CSS and ThemedPrint read it. Ctrl+P (no attribute)
 * prints the ATS version.
 */
export function printResume(style: PrintStyle) {
  const root = document.documentElement;
  root.dataset.printStyle = style;
  const done = () => {
    delete root.dataset.printStyle;
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  window.print();
}

export const isThemedPrint = () => document.documentElement.dataset.printStyle === "themed";
