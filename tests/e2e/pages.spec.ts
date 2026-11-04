import { expect, test } from "@playwright/test";
import { openSite, PAGES, trackErrors } from "./helpers.ts";

for (const { path, lang } of PAGES) {
  test.describe(`page ${path}`, () => {
    test("loads in its language without errors", async ({ page }) => {
      const errors = trackErrors(page);
      await openSite(page, path);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      for (const id of ["about", "experience", "projects", "stack", "education"]) {
        await expect(page.locator(`#${id}`)).toBeAttached();
      }
      await page.evaluate(() => document.fonts.ready);
      expect(errors).toEqual([]);
    });

    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      test(`has no sideways scroll at ${width}px`, async ({ page }) => {
        await page.setViewportSize({ width, height: 900 });
        await openSite(page, path);
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
        expect(overflow).toBeLessThanOrEqual(0);
      });
    }
  });
}

test("language links point to the other pages and mark the current one", async ({ page }) => {
  await openSite(page, "/");
  const current = page.locator('.langs a[aria-current="page"]');
  await expect(current).toHaveText("EN");
  await page.locator('.langs a[hreflang="pt-BR"]').click();
  await expect(page).toHaveURL(/\/pt\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await page.locator('.langs a[hreflang="es"]').click();
  await expect(page).toHaveURL(/\/es\/$/);
  await page.locator('.langs a[hreflang="en"]').click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("every image loads", async ({ page }) => {
  await openSite(page, "/");
  // Bring each lazy image into view and wait for it, then list any that failed.
  const broken = await page.evaluate(async () => {
    const images = [...document.images].filter((img) => img.id !== "lightboxImg");
    const failed: string[] = [];
    for (const img of images) {
      img.scrollIntoView({ block: "center" });
      // Wait for the browser to start and finish the lazy load (Firefox resolves decode() early).
      const start = performance.now();
      while (!(img.complete && img.naturalWidth > 0) && performance.now() - start < 8000) {
        await new Promise((r) => setTimeout(r, 50));
      }
      if (img.naturalWidth === 0) failed.push(img.currentSrc || img.src);
    }
    return failed;
  });
  expect(broken).toEqual([]);
});

test("skip link moves focus to the introduction", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Safari does not focus links with Tab by default");
  await openSite(page, "/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#intro$/);
});
