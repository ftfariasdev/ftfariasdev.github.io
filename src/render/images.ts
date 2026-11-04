import manifest from "../content/images.generated.json";
import { esc } from "./i18n.ts";

type Name = keyof typeof manifest;

export function imageInfo(name: string) {
  const info = (manifest as Record<string, { width: number; height: number; widths: number[] }>)[name];
  if (!info) throw new Error(`Unknown image "${name}". Add it to scripts/optimize-images.ts and run npm run images.`);
  return info;
}

const srcset = (name: string, ext: "avif" | "webp", widths: number[]) =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

/** URL of one generated file, for attributes Vite does not rewrite (data-*): relative to the page. */
export function imageUrl(name: string, base: string, size: "small" | "large" = "large", ext = "webp"): string {
  const { widths } = imageInfo(name);
  const w = size === "large" ? widths[widths.length - 1] : widths[0];
  return `${base}img/${name}-${w}.${ext}`;
}

interface PictureOptions {
  alt: string;
  sizes: string;
  /** Only the first widths, for images that never need the large file inline (cards). */
  maxWidths?: number;
  eager?: boolean;
  className?: string;
  style?: string;
  attrs?: string;
}

/** <picture> with AVIF and WebP sources at every generated width. */
export function picture(name: Name | string, o: PictureOptions): string {
  const info = imageInfo(name);
  const widths = o.maxWidths ? info.widths.slice(0, o.maxWidths) : info.widths;
  const largest = widths[widths.length - 1] ?? info.width;
  const height = Math.round((info.height * largest) / info.width);
  const loading = o.eager ? ' fetchpriority="high"' : ' loading="lazy" decoding="async"';
  return `<picture><source type="image/avif" srcset="${srcset(name, "avif", widths)}" sizes="${o.sizes}"><source type="image/webp" srcset="${srcset(name, "webp", widths)}" sizes="${o.sizes}"><img src="/img/${name}-${largest}.webp" alt="${esc(o.alt)}" width="${largest}" height="${height}"${loading}${o.className ? ` class="${o.className}"` : ""}${o.style ? ` style="${o.style}"` : ""}${o.attrs ?? ""}></picture>`;
}
