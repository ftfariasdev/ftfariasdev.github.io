/**
 * Renders the 1200×630 link preview images (public/og-{en,pt,es}.jpg) with Playwright.
 * Run after changing the hero copy or photo: npm run og
 */
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");

const root = resolve(__dirname, "..");
const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(resolve(root, "node_modules/@fontsource", pkg, "files", file)).toString("base64")}`;
const hero = `data:image/webp;base64,${readFileSync(resolve(root, "public/img/hero-655.webp")).toString("base64")}`;

const COPY = {
  en: { hello: "Hello, I'm", role: "Full Stack Developer @ Softwrench" },
  pt: { hello: "Olá, eu sou", role: "Full Stack Developer @ Softwrench" },
  es: { hello: "Hola, soy", role: "Full Stack Developer @ Softwrench" },
};

const page = (c) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Anton; src: url(${font("anton", "anton-latin-400-normal.woff2")}); }
@font-face { font-family: Caveat; src: url(${font("caveat", "caveat-latin-700-normal.woff2")}); font-weight: 700; }
@font-face { font-family: JBM; src: url(${font("jetbrains-mono", "jetbrains-mono-latin-400-normal.woff2")}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #0A0A0C; color: #F3F0EC; position: relative; font-family: JBM, monospace; }
.grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(243,240,236,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(243,240,236,.07) 1px, transparent 1px); background-size: 60px 60px; }
.glow { position: absolute; inset: 0; background: radial-gradient(40% 60% at 70% 70%, rgba(34,216,119,.35), transparent 70%); }
.word { position: absolute; left: 0; right: 0; top: 54px; text-align: center; font: 262px/.8 Anton; color: #22D877; letter-spacing: -2px; }
.person { position: absolute; right: 150px; bottom: -40px; height: 640px; }
.text { position: absolute; left: 64px; bottom: 64px; }
.hello { font: 700 52px/1 Caveat; transform: rotate(-4deg); transform-origin: left; margin-bottom: 6px; }
.name { font: 112px/.86 Anton; text-transform: uppercase; }
.name i { color: #22D877; font-style: normal; }
.role { margin-top: 18px; font-size: 22px; color: #22D877; letter-spacing: .04em; text-transform: uppercase; }
.url { position: absolute; right: 64px; bottom: 40px; font-size: 18px; color: #F3F0EC; background: rgba(10,10,12,.72); padding: 8px 12px; border-radius: 8px; }
</style></head><body>
<div class="grid"></div><div class="glow"></div>
<div class="word">FTFARIAS</div>
<img class="person" src="${hero}">
<div class="url">ftfariasdev.github.io</div>
<div class="text"><p class="hello">${c.hello}</p><p class="name">Felipe<br>Farias<i>.</i></p><p class="role">${c.role}</p></div>
</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  for (const [lang, copy] of Object.entries(COPY)) {
    await tab.setContent(page(copy), { waitUntil: "load" });
    await tab.evaluate(() => document.fonts.ready);
    await tab.screenshot({ path: resolve(root, `public/og-${lang}.jpg`), type: "jpeg", quality: 88 });
    console.log(`public/og-${lang}.jpg`);
  }
  await browser.close();
})();
