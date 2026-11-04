const { chromium, firefox, webkit } = require("playwright");
// Smoke test for every interaction. Run against `npm run preview`: node tests/e2e/interactions.cjs [screenshotDir]
const OUT = process.argv[2] || "test-results";
const BASE = process.env.BASE_URL || "http://localhost:4173/";
let failures = 0;
const ok = (c, m) => {
  if (!c) failures++;
  console.log((c ? "PASS " : "FAIL ") + m);
};
(async () => {
  for (const [bname, bt] of [
    ["chromium", chromium],
    ["firefox", firefox],
    ["webkit", webkit],
  ]) {
    let b;
    try {
      b = await bt.launch();
    } catch (e) {
      console.log("SKIP", bname, e.message.split("\n")[0]);
      continue;
    }
    const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(e.message));
    p.on("console", (m) => {
      if (m.type() === "error") errs.push(m.text());
    });
    await p.goto(BASE, { waitUntil: "load" });
    await p.waitForTimeout(600);
    const booting = await p.evaluate(() => document.documentElement.classList.contains("booting"));
    ok(booting, `${bname}: boot sequence plays on first visit`);
    if (bname === "chromium") await p.screenshot({ path: `${OUT}/` + "p3-boot.png" });
    await p.keyboard.press("Enter");
    await p.waitForTimeout(2600);
    ok(
      !(await p.evaluate(() => document.documentElement.className.match(/booting|pre-hero/))),
      `${bname}: Enter ends boot, hero visible`,
    );
    await p.mouse.move(1000, 300);
    await p.waitForTimeout(700);
    if (bname === "chromium") await p.screenshot({ path: `${OUT}/` + "p3-hero.png" });
    const fs = await p.evaluate(() => {
      const w = document.getElementById("word").getBoundingClientRect(),
        s = document.querySelector(".stat").getBoundingClientRect();
      return { wordBottom: Math.round(w.bottom), statTop: Math.round(s.top) };
    });
    ok(fs.wordBottom <= fs.statTop + 5, `${bname}: giant word does not cover stats ${JSON.stringify(fs)}`);
    ok(
      await p.evaluate(() => document.getElementById("top").classList.contains("has-pointer")),
      `${bname}: you cursor follows pointer`,
    );
    // reload: no boot in same session
    await p.reload({ waitUntil: "load" });
    await p.waitForTimeout(300);
    ok(
      !(await p.evaluate(() => document.documentElement.classList.contains("booting"))),
      `${bname}: reload skips boot`,
    );
    // sphere
    await p.locator("#stack").scrollIntoViewIfNeeded();
    await p.waitForTimeout(900);
    ok(
      !(await p.evaluate(() => document.getElementById("sphere").classList.contains("is-static"))),
      `${bname}: sphere is live`,
    );
    const t1 = await p.evaluate(() => document.querySelector(".sphere__tags li").style.transform);
    await p.waitForTimeout(400);
    const t2 = await p.evaluate(() => document.querySelector(".sphere__tags li").style.transform);
    ok(t1 !== t2, `${bname}: sphere rotates`);
    await p.evaluate(() => {
      const b = [...document.querySelectorAll(".tagb")].find((x) => x.textContent === "Prisma");
      b.focus();
    });
    ok(
      (await p.textContent("#iName")) === "Prisma" && (await p.textContent("#iUses")).includes("SAGA"),
      `${bname}: inspect panel shows Prisma usage`,
    );
    if (bname === "chromium") await p.locator("#stack").screenshot({ path: `${OUT}/` + "p3-stack.png" });
    // project preview
    await p.locator(".prow").first().scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
    await p.locator(".prow").first().hover();
    await p.waitForTimeout(500);
    ok(
      await p.evaluate(
        () =>
          document.getElementById("preview").classList.contains("on") &&
          document.querySelector(".preview__code").textContent.includes("matchmaker"),
      ),
      `${bname}: project preview on hover`,
    );
    // photo swap
    await p.click("#fSwap");
    ok(await p.evaluate(() => document.getElementById("fImg").classList.contains("alt")), `${bname}: photo swap`);
    // deck
    await p.locator("#deck").scrollIntoViewIfNeeded();
    await p.waitForTimeout(800);
    const top1 = await p.evaluate(() => document.querySelector(".deck__card.is-top b").textContent);
    await p.click("#deck");
    const top2 = await p.evaluate(() => document.querySelector(".deck__card.is-top b").textContent);
    ok(top1 !== top2, `${bname}: deck cycles (${top1} -> ${top2})`);
    if (bname === "chromium") await p.locator(".certs").screenshot({ path: `${OUT}/` + "p3-certs.png" });
    // lightbox
    const opener = p.locator(".cert__img").first();
    await opener.click();
    await p.waitForTimeout(300);
    ok(await p.evaluate(() => document.getElementById("lightbox").open), `${bname}: lightbox opens`);
    await p.keyboard.press("Escape");
    await p.waitForTimeout(200);
    ok(
      !(await p.evaluate(() => document.getElementById("lightbox").open)) &&
        (await p.evaluate(() => document.activeElement.classList.contains("cert__img"))),
      `${bname}: Esc closes lightbox and returns focus`,
    );
    // lang link
    await p.evaluate(() => scrollTo(0, 0));
    await p.click('.langs a[hreflang="es"]');
    await p.waitForLoadState("load");
    ok(
      p.url().endsWith("/es/") && (await p.getAttribute("html", "lang")) === "es",
      `${bname}: language link goes to /es/`,
    );
    ok(errs.length === 0, `${bname}: no console errors ${errs.join(" | ")}`);
    await b.close();
  }
  // reduced motion + mobile + no WebGL
  const b = await chromium.launch({ args: ["--disable-webgl", "--disable-3d-apis"] });
  const rm = await (
    await b.newContext({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      hasTouch: true,
      isMobile: true,
    })
  ).newPage();
  const e2 = [];
  rm.on("pageerror", (e) => e2.push(e.message));
  await rm.goto(BASE + "pt/", { waitUntil: "load" });
  await rm.waitForTimeout(500);
  ok(
    !(await rm.evaluate(() => document.documentElement.classList.contains("booting"))),
    "reduced motion: no boot sequence",
  );
  await rm.locator("#stack").scrollIntoViewIfNeeded();
  await rm.waitForTimeout(500);
  ok(
    !(await rm.evaluate(() => document.getElementById("sphere").classList.contains("is-static"))),
    "no WebGL + mobile: sphere renders",
  );
  await rm.locator(".tagb").filter({ hasText: "Python" }).tap({ force: true });
  ok((await rm.textContent("#iName")) === "Python", "mobile: tap selects technology");
  await rm.screenshot({ path: `${OUT}/` + "p3-mob-stack.png" });
  ok(e2.length === 0, "mobile: no errors");
  await b.close();
  process.exit(failures ? 1 : 0);
})();
