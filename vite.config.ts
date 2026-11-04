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

export default defineConfig({
  // Relative base, so the build works on GitHub Pages and in any preview folder.
  base: "./",
  plugins: [renderPages()],
  build: {
    target: "es2022",
    rollupOptions: {
      input: Object.fromEntries(LANGS.map((lang) => [lang, resolve(__dirname, `${LANG_DIR[lang]}index.html`)])),
    },
  },
});
