import { expect, type Page } from "@playwright/test";

export const PAGES = [
  { path: "/", lang: "en" },
  { path: "/pt/", lang: "pt-BR" },
  { path: "/es/", lang: "es" },
] as const;

/** Collects page errors and failed requests, so a test can assert that none happened. */
export function trackErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith("http://localhost")) errors.push(`${r.status()} ${r.url()}`);
  });
  return errors;
}

/** Marks the boot sequence as already seen, so a test starts on the site itself. */
export async function skipBoot(page: Page): Promise<void> {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem("ff-booted", "1");
    } catch {
      /* ignore */
    }
  });
}

export async function openSite(page: Page, path = "/"): Promise<void> {
  await skipBoot(page);
  await page.goto(path);
  await expect(page.locator("html")).not.toHaveClass(/booting/);
}
