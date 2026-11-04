import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { openSite, PAGES } from "./helpers.ts";

for (const { path } of PAGES) {
  test(`${path} has no accessibility violations (WCAG 2.1 AA)`, async ({ page }) => {
    await openSite(page, path);
    // Check the page at rest: no transitions mid-fade, and everything that reveals on scroll shown.
    await page.addStyleTag({ content: "*, *::before, *::after { transition: none !important; }" });
    await page.evaluate(() => document.querySelectorAll(".rv.pre").forEach((el) => el.classList.remove("pre")));
    const results = await new AxeBuilder({
      page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]["page"],
    })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`);
    expect(summary).toEqual([]);
  });
}

test("every interactive element can be reached with the keyboard", async ({ page, browserName, isMobile }) => {
  test.skip(browserName === "webkit", "Safari skips links on Tab unless the user enables it");
  test.skip(isMobile, "touch devices have no Tab key");
  await openSite(page, "/");
  const reached = new Set<string>();
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const id = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return "";
      const visible = el.getBoundingClientRect().width > 0;
      return `${el.tagName}:${el.className}:${visible}`;
    });
    if (id) reached.add(id.split(":").slice(0, 2).join(":"));
  }
  const classes = [...reached].join(" ");
  for (const expected of [
    "skip-link",
    "icon-btn",
    "btn",
    "prow",
    "cert__img",
    "deck__next",
    "deck__row",
    "deck__verify",
  ]) {
    expect(classes, `Tab never reached .${expected}`).toContain(expected);
  }
});
