import { $$ } from "./env.ts";

const KEY = "ff-lang";

/**
 * Remembers the language the visitor picks. On a later visit to the English home page with no
 * explicit choice in this navigation, sends them back to the language they chose before.
 */
export function initLang(): void {
  const current = document.documentElement.lang.slice(0, 2);
  for (const link of $$<HTMLAnchorElement>(".langs a")) {
    link.addEventListener("click", () => {
      try {
        localStorage.setItem(KEY, link.hreflang.slice(0, 2));
      } catch {
        /* storage blocked: the link still works */
      }
    });
  }
  try {
    const saved = localStorage.getItem(KEY);
    const cameFromSite = document.referrer.startsWith(location.origin);
    if (current === "en" && saved && saved !== "en" && !cameFromSite) {
      const target = $$<HTMLAnchorElement>(".langs a").find((a) => a.hreflang.startsWith(saved));
      if (target) location.replace(target.href);
    }
  } catch {
    /* ignore */
  }
}
