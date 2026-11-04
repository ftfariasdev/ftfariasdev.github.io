/**
 * Checks that every external link on the built pages answers. Some sites (LinkedIn, Instagram)
 * refuse automated requests with 403, 429 or 999 even when the page exists; those count as up.
 * Run after a build: npm run check:links
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const pages = ["dist/index.html", "dist/pt/index.html", "dist/es/index.html"];
const BOT_BLOCKED = new Set([401, 403, 405, 429, 999]);

const links = new Set<string>();
for (const page of pages) {
  const html = await readFile(resolve(root, page), "utf8");
  for (const [, href] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    if (href && !href.startsWith("https://ftfariasdev.github.io")) links.add(href);
  }
}

async function check(url: string): Promise<string | null> {
  for (const method of ["HEAD", "GET"] as const) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0 (link check for ftfariasdev.github.io)" },
        signal: AbortSignal.timeout(15000),
      });
      if (res.ok || BOT_BLOCKED.has(res.status)) return null;
      if (method === "GET") return `${res.status} ${url}`;
    } catch (error) {
      if (method === "GET") return `${(error as Error).message} ${url}`;
    }
  }
  return null;
}

const results = await Promise.all([...links].map(check));
const broken = results.filter(Boolean);
console.log(`${links.size} external links checked, ${broken.length} broken`);
for (const b of broken) console.log(`  ✗ ${b}`);
process.exit(broken.length ? 1 : 0);
