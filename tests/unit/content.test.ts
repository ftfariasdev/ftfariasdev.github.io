import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { test } from "node:test";
import { alura, featuredCertificates } from "../../src/content/certificates.ts";
import { jobs } from "../../src/content/experience.ts";
import { featured, projects } from "../../src/content/projects.ts";
import { stack } from "../../src/content/stack.ts";
import { LANGS } from "../../src/content/types.ts";
import { dictionaries } from "../../src/render/i18n.ts";
import { renderPage } from "../../src/render/page.ts";

const publicFile = (path: string) => resolve(import.meta.dirname, "../../public", path);

test("every language has exactly the same dictionary keys as English", () => {
  const en = Object.keys(dictionaries.en).sort();
  for (const lang of LANGS) {
    assert.deepEqual(Object.keys(dictionaries[lang]).sort(), en, `keys differ in ${lang}`);
  }
});

test("no translation is empty", () => {
  for (const lang of LANGS) {
    for (const [key, value] of Object.entries(dictionaries[lang])) {
      assert.ok(value.trim().length > 0, `${lang}.${key} is empty`);
    }
  }
});

test("every image referenced by the content exists in public/", () => {
  const images = [
    ...featured.photos.map((p) => p.src),
    ...featuredCertificates.map((c) => c.image.src),
    ...alura.map((c) => c.image),
    ...jobs.flatMap((j) => (j.logo ? [j.logo.src] : [])),
    "img/hero.webp",
    "img/about.webp",
  ];
  for (const src of images) assert.ok(existsSync(publicFile(src)), `missing public/${src}`);
});

test("project ids are unique and every technology is used somewhere", () => {
  const ids = projects.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const tech of stack) {
    if (tech.name === "Bootstrap") continue; // listed in the stack, not tied to a published project
    assert.ok(tech.usedIn.length > 0, `${tech.name} has no usage`);
  }
});

test("each rendered page is complete and in its own language", () => {
  const htmlLang = { en: "en", pt: "pt-BR", es: "es" } as const;
  for (const lang of LANGS) {
    const html = renderPage(lang);
    assert.match(html, new RegExp(`<html lang="${htmlLang[lang]}">`));
    assert.doesNotMatch(html, /undefined|\$\{|\[object Object\]/, `leftover placeholder in ${lang}`);
    assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${lang} must have exactly one h1`);
    for (const id of ["about", "experience", "projects", "stack", "education"]) {
      assert.match(html, new RegExp(`id="${id}"`), `${lang} misses section #${id}`);
    }
  }
});
