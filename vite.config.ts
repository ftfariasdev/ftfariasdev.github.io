import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import { LANGS, type Lang } from "./src/content/types.ts";
import { LANG_DIR } from "./src/render/i18n.ts";
import { renderPage } from "./src/render/page.ts";

/** Each language page is a tiny shell; this plugin replaces it with the rendered document. */
function renderPages(): Plugin {
  const byPath = new Map<string, Lang>(LANGS.map((lang) => [`/${LANG_DIR[lang]}index.html`, lang]));
  return {
    name: "render-pages",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const lang = byPath.get(ctx.path);
        return lang ? renderPage(lang) : html;
      },
    },
  };
}

/** Preloads the display font so the giant hero word renders without a late swap. */
function preloadHeroFont(): Plugin {
  return {
    name: "preload-hero-font",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        const font = Object.keys(ctx.bundle ?? {}).find((f) => /anton-latin-400-normal-.*\.woff2$/.test(f));
        if (!font) return html;
        const prefix = ctx.path === "/index.html" ? "./" : "../";
        return html.replace(
          "</title>",
          `</title>\n  <link rel="preload" href="${prefix}${font}" as="font" type="font/woff2" crossorigin>`,
        );
      },
    },
  };
}

/**
 * Inlines the single stylesheet into each page. It is about 8 KB gzipped, so inlining removes a
 * render-blocking request without bloating the HTML. Font URLs are rewritten to stay valid.
 */
function inlineCss(): Plugin {
  return {
    name: "inline-css",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const css = Object.values(bundle).find((f) => f.type === "asset" && f.fileName.endsWith(".css"));
      if (!css || css.type !== "asset") return;
      const source = String(css.source);
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || !file.fileName.endsWith(".html")) continue;
        const depth = file.fileName.split("/").length - 1;
        const toAssets = depth ? "../assets/" : "./assets/";
        const styles = source.replace(/url\(\.\/([^)]+)\)/g, `url(${toAssets}$1)`);
        const html = String(file.source).replace(
          new RegExp(`<link rel="stylesheet"[^>]*${css.fileName.split("/").pop()}"[^>]*>`),
          () => `<style>${styles}</style>`,
        );
        file.source = html;
      }
      delete bundle[css.fileName];
    },
  };
}

export default defineConfig({
  // Relative base, so the build works on GitHub Pages and in any preview folder.
  base: "./",
  plugins: [renderPages(), preloadHeroFont(), inlineCss()],
  build: {
    target: "es2022",
    rollupOptions: {
      input: Object.fromEntries(LANGS.map((lang) => [lang, resolve(__dirname, `${LANG_DIR[lang]}index.html`)])),
    },
  },
});
