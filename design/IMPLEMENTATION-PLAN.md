# Implementation plan: ftfariasdev.github.io v2

Status: approved by Felipe, 2026-11-04
Design source: approved prototype in `design/prototipo/index.html` (also at https://claude.ai/artifact/PwuYeCsjCswgerbAReT2Bz)
Content source: `design/BRIEFING.md`
Branch: `claude/portfolio-rebuild-696ssa`, merged into `main` by pull request at the end

## 1. Goal

Turn the approved prototype into the production site at https://ftfariasdev.github.io/:

- Same look and behavior as the prototype.
- English by default, plus Portuguese and Spanish.
- Fast on a phone, fully keyboard and screen-reader accessible, and findable on Google.
- Built, tested and deployed automatically by GitHub Actions.

The prototype is a single 100 KB HTML file with all CSS and JavaScript inline and photos as large JPEG/WebP files. That is fine for review, but not for production. Most of the work below is splitting it into maintainable pieces and optimizing what ships, not redesigning anything.

## 2. Decisions

| Topic | Decision | Why |
|---|---|---|
| Tooling | **Vite + TypeScript, no UI framework** | The site is one page of mostly static content. Vite gives minification, hashed assets and a dev server. TypeScript catches missing translations and broken data at build time. A framework (React, Angular) would add weight without adding anything here. |
| Languages | **Three static pages generated at build time**: `/` (English), `/pt/`, `/es/` | Each language gets its own URL, its own `<html lang>`, title and description, so Google indexes all three. There is no flash of the wrong language, and pages work even if JavaScript fails. The switcher is a plain link between the three pages and remembers the choice. |
| Content | **Data files, not hard-coded HTML**: `content/*.ts` for projects, certificates, stack and experience, `i18n/{en,pt,es}.json` for text | Adding a project or certificate becomes a one-line change, and a test can check that all three languages have every key. |
| 3D | **No WebGL**. The stack sphere stays plain HTML buttons placed with CSS transforms, as in the approved prototype | WebGL failed on your device. This approach works in every browser and stays keyboard accessible. |
| Fonts | **Self-hosted** (Anton, Caveat, Manrope, JetBrains Mono) as subset WOFF2, with Anton preloaded | Removes the Google Fonts round trip, avoids layout shift in the hero word, and keeps visitor data off third parties. |
| Images | **AVIF + WebP with `srcset`**, sized per breakpoint; certificate full-size images load only when opened | The hero photo is what loads first, so it gets several sizes. Certificates stay out of the initial load. |
| Hosting | **GitHub Pages, deployed from a GitHub Actions workflow** | Same URL as today, free. Needs one setting change (section 9). |

## 3. Project structure

```
/
├─ index.html                 page template (English source of truth)
├─ src/
│  ├─ main.ts                 starts each module
│  ├─ i18n/en.json  pt.json  es.json
│  ├─ content/
│  │  ├─ projects.ts          Guardião, Pulso, SAGA, LinSolve, ElixirBot, Profile as Code
│  │  ├─ certificates.ts      Profissional 5.0, Python, 4 Alura courses
│  │  ├─ stack.ts             technologies, daily flag, where each is used
│  │  └─ experience.ts        Softwrench, Student Council
│  ├─ modules/
│  │  ├─ boot.ts              startup sequence
│  │  ├─ hero.ts              letter entrance, parallax layers, "you" cursor, word fitting, clock
│  │  ├─ marquee.ts           crossing bands
│  │  ├─ reveal.ts            reveal on scroll
│  │  ├─ project-preview.ts   floating code preview on project rows
│  │  ├─ deck.ts              Alura certificate stack
│  │  ├─ lightbox.ts          certificate viewer (<dialog>)
│  │  ├─ sphere.ts            stack sphere and inspect panel
│  │  └─ lang.ts              switcher, remembered choice
│  └─ styles/
│     ├─ tokens.css           colors, fonts, spacing
│     ├─ base.css
│     └─ sections/*.css       one file per section
├─ public/
│  ├─ fonts/  img/  certificates/
│  ├─ favicon.svg  og-en.png  og-pt.png  og-es.png
│  └─ robots.txt  sitemap.xml
├─ scripts/
│  ├─ build-pages.ts          writes /pt/ and /es/ from the template and dictionaries
│  └─ optimize-images.ts      generates AVIF/WebP sizes from originals
├─ tests/                     Playwright and accessibility tests
├─ design/                    briefing, prototype, this plan (not deployed)
└─ .github/workflows/
   ├─ ci.yml                  checks on every pull request
   └─ deploy.yml              build and publish on push to main
```

The old `css/`, `js/` and `assets/` folders are removed. The 2.4 MB `me.webp` is no longer used.

## 4. What changes from the prototype

**Kept exactly:** layout, palette, typography, copy, photos, every interaction.

**Removed (prototype only):**
- The green strip at the top with "Prototype v3.x".
- The "Design system" section.
- The "replay intro" button.

**Adjusted:**
- **Boot sequence:** plays on the first visit of a browser session only. Reloads and in-page navigation skip straight to the site. Enter, Esc or the skip button end it early, and it never plays with "reduce motion" on. The 7-second failsafe stays.
- **Language switcher:** becomes three links (`/`, `/pt/`, `/es/`) instead of rewriting text with JavaScript.
- **Hero word fitting:** keeps the height cap that fixed the hidden stats, and runs again once fonts finish loading.
- **Lightbox:** traps focus while open, closes on Esc or a click outside, and returns focus to the certificate that opened it.

## 5. Phases

Each phase ends with something you can open and check. I'll stop after phases 2, 3 and 6 for your review.

### Phase 0: Setup
- Vite + TypeScript, ESLint, Prettier, npm scripts (`dev`, `build`, `preview`, `test`).
- Empty CI workflow running lint, type check and build on pull requests.
- **Done when:** `npm run build` produces a `dist/` with an empty page and CI passes.

### Phase 1: Content and translations
- Move every text from the prototype into `en/pt/es.json`, and every project, certificate, technology and job into `content/`.
- A test fails the build if a key is missing in any language or a content entry points to a missing image.
- **Done when:** all content lives in data files and the parity test passes.

### Phase 2: Static layout (checkpoint)
- HTML and CSS for every section: top bar, hero, bands, About, Experience, Projects, Stack, Education and certificates, footer.
- Responsive at 360, 390, 768, 1024, 1440 and 1920 px, with no sideways scroll.
- `build-pages.ts` writes the Portuguese and Spanish pages.
- **Done when:** the three pages match the prototype visually, without animations yet. I send you a preview link.

### Phase 3: Interactions (checkpoint)
- Boot sequence, hero entrance, parallax, cursors, marquee, reveal on scroll, project previews, Alura deck, lightbox, stack sphere, clock.
- Every effect respects "reduce motion" and pauses when off screen.
- Mouse-only effects (parallax, "you" cursor, previews) are skipped on touch screens.
- **Done when:** it behaves like the prototype in Chrome, Firefox and Safari, on desktop and on a phone. Preview link for you.

### Phase 4: Images, fonts and performance
- Generate AVIF/WebP in several sizes for the hero, About and project photos. Certificates get thumbnails, and the full image loads on demand.
- Subset and self-host the four fonts, preload Anton, use `font-display: swap`.
- Inline the critical CSS for the hero; defer the rest.
- **Budget:**
  - JavaScript under 30 KB gzipped.
  - First load under 600 KB on a phone.
  - LCP under 2.5 s and CLS under 0.05 on a mid-range phone over 4G.

### Phase 5: SEO and sharing
- Title and description per language, canonical URL, `hreflang` links between the three pages.
- Open Graph and Twitter cards with a 1200 × 630 image per language, built from the hero.
- New favicon in the green palette, `robots.txt`, `sitemap.xml`.
- JSON-LD `Person` with your name, role, company, GitHub and LinkedIn.

### Phase 6: Testing and QA (checkpoint)
- **Playwright:**
  - All three pages load without console errors.
  - No sideways scroll at each width.
  - The language links go to the right page.
  - The lightbox opens, closes and returns focus.
  - The deck cycles.
  - The sphere renders with WebGL disabled.
  - The boot sequence can be skipped and is skipped with "reduce motion".
- **Accessibility:** axe-core on all three pages with zero violations. A manual keyboard pass through the whole page.
- **Lighthouse CI on every pull request:**
  - Performance 90 or higher.
  - Accessibility 100.
  - Best practices and SEO 95 or higher.
- **External links:** a check that every link (GitHub, LinkedIn, Instagram, Vercel apps, Alura certificates) answers.
- **Manual pass on real devices:** your phone, plus Chrome, Firefox and Safari.
- **Done when:** all checks are green and you approve the preview.

### Phase 7: Publish
- Open a pull request from `claude/portfolio-rebuild-696ssa` to `main` with screenshots and the Lighthouse report.
- After you merge, `deploy.yml` builds and publishes to GitHub Pages.
- Verify the live site in the three languages, test the share preview on LinkedIn and WhatsApp, and update the README.
- **Rollback:** reverting the merge commit redeploys the previous site.

## 6. Accessibility checklist

- One `<h1>` (your name), headings in order, landmarks (`header`, `main`, `footer`), and a "skip to content" link.
- Every image has real alt text in the page's language. Decorative layers (grid, glow, sparks, floating cursors) are hidden from screen readers.
- Contrast: body text and green accents meet WCAG AA on the dark background, and dark text on green buttons meets it too.
- Visible focus on every link and button, including the sphere tags and the deck.
- "Reduce motion" turns off the boot sequence, parallax, marquee, sphere rotation and reveals.

## 7. Risks and how they're handled

| Risk | Handling |
|---|---|
| **GitHub refuses pushes from this session (403).** This blocks phases 6 and 7. | Reconnect GitHub at https://claude.ai/connect-github and, if needed, install the Claude GitHub App on the repository. All work stays committed locally until then. |
| WebGL or heavy effects failing on some phones | Already removed WebGL. Every effect has a static fallback and is tested with WebGL off and with "reduce motion" on. |
| The giant word covering content with real fonts | Height cap plus a re-fit after fonts load. Playwright screenshots at each width catch regressions. |
| External links breaking (Vercel apps, Alura) | Link check in CI. |
| Spanish copy quality | Written alongside the English and Portuguese. Worth a quick read by a Spanish speaker before launch. |

## 8. What I need from you

1. ~~Approve this plan~~ Approved 2026-11-04.
2. ~~Fix GitHub access~~ Working again since 2026-11-04.
3. **Change one GitHub setting when we reach phase 7:** Settings → Pages → Build and deployment → Source: "GitHub Actions". I'll remind you at that point.
4. ~~Confirm the LinkedIn URL~~ Confirmed: `linkedin.com/in/ftfariasdev`. The old `/in/devfelipefarias` link was fixed in the current site and README.

## 9. After launch

- Adding a project or certificate: one entry in `content/`, one line per language in the dictionaries, and the image in `public/`. CI checks the rest.
- The README gets a short "how to update the site" section with these steps.
