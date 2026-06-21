/**
 * Scrolls to a section by ID. Works with HashRouter where
 * <a href="#section"> would conflict with hash-based routing.
 */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
