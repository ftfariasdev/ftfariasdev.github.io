import { expect, test } from "@playwright/test";
import { openSite, trackErrors } from "./helpers.ts";

test.describe("boot sequence", () => {
  test("plays on the first visit and Enter skips it", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/booting/);
    await expect(page.locator("#bootLog div").first()).toBeVisible();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).not.toHaveClass(/booting|pre-hero/);
  });

  test("does not play again after a reload in the same session", async ({ page }) => {
    await page.goto("/");
    await page.locator("#bootSkip").click();
    await expect(page.locator("html")).not.toHaveClass(/booting/);
    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/booting/);
  });

  test("never plays with reduced motion", async ({ browser }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await expect(page.locator("html")).not.toHaveClass(/booting/);
    await context.close();
  });
});

test.describe("hero", () => {
  for (const [w, h] of [
    [1280, 720],
    [1366, 768],
    [1440, 900],
    [1536, 864],
    [1920, 1080],
  ]) {
    test(`giant word stays clear of the stats at ${w}×${h}`, async ({ page }) => {
      await page.setViewportSize({ width: w as number, height: h as number });
      await openSite(page, "/");
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(200);
      const overlaps = await page.evaluate(() => {
        const word = document.getElementById("word")!.getBoundingClientRect();
        return [...document.querySelectorAll(".stat b")].filter((s) => {
          const r = s.getBoundingClientRect();
          return !(r.left > word.right || r.right < word.left || r.top > word.bottom || r.bottom < word.top);
        }).length;
      });
      expect(overlaps).toBe(0);
    });
  }

  test("shows the time in Brasília", async ({ page }) => {
    await openSite(page, "/");
    await expect(page.locator("#clock")).toHaveText(/^\d{2}:\d{2} BRT$/);
  });
});

test.describe("projects", () => {
  test("swaps the Guardião photo", async ({ page }) => {
    await openSite(page, "/");
    await page.locator("#fSwap").click();
    await expect(page.locator("#fImg")).toHaveClass(/alt/);
  });

  test("shows a code preview on hover", async ({ page, isMobile }) => {
    test.skip(isMobile, "hover only");
    await openSite(page, "/");
    await page.locator(".prow").first().hover();
    await expect(page.locator("#preview")).toHaveClass(/on/);
    await expect(page.locator(".preview__code")).toContainText("matchmaker");
  });
});

test.describe("certificates", () => {
  test("the Alura stack brings the next card to the front", async ({ page }) => {
    await openSite(page, "/");
    const top = page.locator(".deck__card.is-top b");
    const first = await top.textContent();
    await page.locator("#deckNext").click();
    await expect(top).not.toHaveText(first ?? "");
  });

  test("the viewer opens, closes with Esc and returns focus", async ({ page }) => {
    await openSite(page, "/");
    const opener = page.locator(".cert__img").first();
    await opener.click();
    const dialog = page.locator("#lightbox");
    await expect(dialog).toHaveAttribute("open", "");
    await expect(page.locator("#lightboxImg")).toHaveAttribute("src", /cert-profissional50-1600\.webp$/);
    await page.keyboard.press("Escape");
    await expect(dialog).not.toHaveAttribute("open", "");
    await expect(opener).toBeFocused();
  });

  test("each Alura course opens its certificate", async ({ page }) => {
    await openSite(page, "/");
    await page.locator(".deck__row").nth(2).click();
    await expect(page.locator("#lightboxImg")).toHaveAttribute("src", /alura-4-\d+\.webp$/);
  });
});

test.describe("stack sphere", () => {
  test("is live, rotates and explains each technology", async ({ page }) => {
    const errors = trackErrors(page);
    await openSite(page, "/");
    const sphere = page.locator("#sphere");
    await sphere.scrollIntoViewIfNeeded();
    await expect(sphere).not.toHaveClass(/is-static/);
    const first = page.locator(".sphere__tags li").first();
    const before = await first.getAttribute("style");
    await expect.poll(() => first.getAttribute("style")).not.toBe(before);
    await page.locator(".tagb", { hasText: /^Prisma$/ }).focus();
    await expect(page.locator("#iName")).toHaveText("Prisma");
    await expect(page.locator("#iUses")).toContainText("SAGA");
    // Every technology stays reachable by keyboard, including those on the back of the sphere.
    const unreachable = await page
      .locator(".tagb")
      .evaluateAll((els) => els.filter((b) => (b as HTMLElement).tabIndex < 0).length);
    expect(unreachable).toBe(0);
    expect(errors).toEqual([]);
  });

  test("works with WebGL disabled and on touch", async ({ browser, browserName }) => {
    test.skip(browserName !== "chromium", "Chromium flag");
    const context = await browser.newContext({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    await page.addInitScript(() => {
      const original = HTMLCanvasElement.prototype.getContext;
      // @ts-expect-error simulate a device without WebGL
      HTMLCanvasElement.prototype.getContext = function (type: string, ...rest: unknown[]) {
        return /webgl/.test(type) ? null : original.call(this, type, ...(rest as []));
      };
      sessionStorage.setItem("ff-booted", "1");
    });
    await page.goto("/pt/");
    await page.locator("#sphere").scrollIntoViewIfNeeded();
    await expect(page.locator("#sphere")).not.toHaveClass(/is-static/);
    await page.locator(".tagb", { hasText: /^Python$/ }).tap({ force: true });
    await expect(page.locator("#iName")).toHaveText("Python");
    await context.close();
  });
});
