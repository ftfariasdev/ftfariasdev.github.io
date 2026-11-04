# Felipe Farias · Portfolio

<div align="center">

### [ftfariasdev.github.io →](https://ftfariasdev.github.io/)

Personal site of Felipe Teixeira Farias, Full Stack Developer at Softwrench.
English, Portuguese and Spanish.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white)

</div>

## Running it locally

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev        # development server
npm run build      # production build in dist/
npm run preview    # serve the production build at http://localhost:4173
```

## How to update the site

All content lives in data files, so most changes never touch HTML.

| To change                               | Edit                                     |
| --------------------------------------- | ---------------------------------------- |
| Interface text (headings, buttons, bio) | `src/i18n/en.json`, `pt.json`, `es.json` |
| Projects                                | `src/content/projects.ts`                |
| Jobs and education                      | `src/content/experience.ts`              |
| Certificates                            | `src/content/certificates.ts`            |
| Technologies in the stack sphere        | `src/content/stack.ts`                   |
| Colors and fonts                        | `src/styles/tokens.css`                  |

**Adding a certificate or photo**

1. Put the high-resolution file in `images/`.
2. Add it to the list in `scripts/optimize-images.ts`.
3. Run `npm run images`. It writes AVIF and WebP files at several sizes to `public/img/`.
4. Reference it by name in the content file (for example `image: "alura-5"`).

**Changing the hero photo or greeting:** run `npm run og` afterwards. It regenerates the link
preview images shown on LinkedIn and WhatsApp.

TypeScript refuses an entry that misses a language. The unit tests fail if a translation key is
missing or an image was not generated.

## Checks

```bash
npm run check          # types, lint, formatting and unit tests
npm run test:e2e       # browser tests (Chromium, Firefox, WebKit, desktop and mobile)
npm run lhci           # Lighthouse budgets on the three pages
npm run check:links    # every external link answers
```

The CI workflow runs all of them on every pull request. Lighthouse budgets: performance ≥ 90,
accessibility 100, best practices and SEO ≥ 95, LCP ≤ 2.5 s, CLS ≤ 0.05, first load ≤ 600 KB.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to
GitHub Pages. To roll back, revert the merge commit on `main`.

## Project structure

```
index.html, pt/, es/      page shells, filled at build time by src/render/page.ts
src/
  i18n/                   interface text per language
  content/                projects, experience, certificates, stack
  render/                 builds each language page from the content
  modules/                interactions: boot, hero, sphere, certificates, language
  styles/                 tokens, base and one file per section
images/                   high-resolution masters (not served)
public/                   generated images, favicon, link previews, robots.txt, sitemap.xml
scripts/                  image pipeline, link preview renderer, link checker
tests/                    unit tests and Playwright browser tests
design/                   briefing, approved prototype and implementation plan
```

---

<div align="center">

**Felipe Farias** · Full Stack Developer @ Softwrench

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ftfariasdev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ftfariasdev)

</div>
