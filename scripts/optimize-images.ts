/**
 * Builds responsive AVIF and WebP files in public/img/ from the high-resolution masters in images/,
 * and records their sizes in src/content/images.generated.json for the page renderer.
 *
 * Run after adding or replacing a master: npm run images
 */
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import sharp from "sharp";

const root = resolve(import.meta.dirname, "..");
const SRC = resolve(root, "images");
const OUT = resolve(root, "public/img");
const MANIFEST = resolve(root, "src/content/images.generated.json");

/** Each master and the widths to produce. The largest width is capped at the master's own width. */
const JOBS: { name: string; file: string; widths: number[] }[] = [
  { name: "hero", file: "hero.png", widths: [360, 520, 655] },
  { name: "about", file: "about.png", widths: [380, 560, 740] },
  { name: "guardiao-1", file: "guardiao-1.jpg", widths: [480, 760, 1100] },
  { name: "guardiao-2", file: "guardiao-2.jpg", widths: [480, 760, 1100] },
  { name: "softwrench", file: "softwrench.png", widths: [68] },
  // Certificates: a small card image, and a large one that only loads in the viewer.
  { name: "cert-profissional50", file: "cert-profissional50.png", widths: [600, 1600] },
  { name: "cert-python", file: "cert-python.jpg", widths: [600, 1600] },
  { name: "alura-1", file: "alura-1.png", widths: [600, 1460] },
  { name: "alura-2", file: "alura-2.png", widths: [600, 1460] },
  { name: "alura-3", file: "alura-3.png", widths: [600, 1460] },
  { name: "alura-4", file: "alura-4.png", widths: [600, 1460] },
];

export interface ImageInfo {
  width: number;
  height: number;
  widths: number[];
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });
  const manifest: Record<string, ImageInfo> = {};
  for (const job of JOBS) {
    const input = sharp(resolve(SRC, job.file));
    const meta = await input.metadata();
    const srcWidth = meta.width ?? 0;
    const srcHeight = meta.height ?? 0;
    const widths = [...new Set(job.widths.map((w) => Math.min(w, srcWidth)))];
    for (const w of widths) {
      const resized = sharp(resolve(SRC, job.file)).resize({ width: w, withoutEnlargement: true });
      await resized
        .clone()
        .avif({ quality: 55, effort: 6 })
        .toFile(resolve(OUT, `${job.name}-${w}.avif`));
      await resized
        .clone()
        .webp({ quality: 78, effort: 6 })
        .toFile(resolve(OUT, `${job.name}-${w}.webp`));
    }
    manifest[job.name] = { width: srcWidth, height: srcHeight, widths };
    console.log(`${job.name}: ${srcWidth}×${srcHeight} → ${widths.join(", ")}`);
  }
  await writeFile(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
  const files = await readdir(OUT);
  console.log(`${files.length} files in public/img`);
}

await main();
