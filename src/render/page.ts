import { alura, certificateTotal, featuredCertificates } from "../content/certificates.ts";
import { courses, jobs } from "../content/experience.ts";
import { featured, projects } from "../content/projects.ts";
import { stack } from "../content/stack.ts";
import { LANGS, type Lang } from "../content/types.ts";
import { esc, HTML_LANG, LANG_DIR, plain, t, tx, type Key } from "./i18n.ts";
import { icons, SOCIAL } from "./icons.ts";
import { imageUrl, picture } from "./images.ts";

export const SITE_URL = "https://ftfariasdev.github.io/";

const pad = (n: number) => String(n).padStart(2, "0");
/** Path prefix from a language page back to the site root, for attributes Vite does not rewrite. */
const base = (lang: Lang) => (lang === "en" ? "./" : "../");

/**
 * Runs before first paint: plays the boot sequence once per browser session, never with
 * reduced motion, and never leaves the page hidden if the main script fails to load.
 */
const BOOT_GATE = [
  "(function(){var d=document.documentElement;",
  "if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;",
  "try{if(sessionStorage.getItem('ff-booted'))return;}catch(e){}",
  "d.classList.add('booting','pre-hero');",
  "setTimeout(function(){d.classList.remove('booting','pre-hero');},7000);})();",
].join("");

/** Relative link from one language page to another, so the site works under any base path. */
function langHref(from: Lang, to: Lang): string {
  const up = from === "en" ? "./" : "../";
  return to === "en" ? up : `${up}${LANG_DIR[to]}`;
}

const SECTIONS = ["about", "experience", "projects", "stack", "education"] as const;
const NAV_KEY: Record<(typeof SECTIONS)[number], Key | null> = {
  about: "nav.about",
  experience: "nav.xp",
  projects: "nav.projects",
  stack: null,
  education: "nav.edu",
};
const navLabel = (lang: Lang, id: (typeof SECTIONS)[number]) => {
  const key = NAV_KEY[id];
  return key ? t(lang, key) : "Stack";
};

const OG_LOCALE: Record<Lang, string> = { en: "en_US", pt: "pt_BR", es: "es_ES" };

/** schema.org Person, so search engines can show a profile card. */
function jsonLd(lang: Lang): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Felipe Teixeira Farias",
    alternateName: "ftfariasdev",
    url: SITE_URL + LANG_DIR[lang],
    image: `${SITE_URL}og-${lang}.jpg`,
    jobTitle: "Full Stack Developer",
    worksFor: { "@type": "Organization", name: "Softwrench" },
    address: { "@type": "PostalAddress", addressLocality: "Hortolândia", addressRegion: "SP", addressCountry: "BR" },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "ETEC" },
      { "@type": "CollegeOrUniversity", name: "UNASP – Centro Universitário Adventista de São Paulo" },
    ],
    knowsAbout: ["C#", ".NET", "SQL Server", "AngularJS", "TypeScript", "React", "Node.js", "Python"],
    knowsLanguage: ["pt-BR", "en"],
    sameAs: [SOCIAL.github, SOCIAL.linkedin, SOCIAL.instagram],
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function head(lang: Lang): string {
  const url = SITE_URL + LANG_DIR[lang];
  const alternates = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${HTML_LANG[l]}" href="${SITE_URL}${LANG_DIR[l]}">`,
  ).join("\n  ");
  return `<meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t(lang, "meta.title"))}</title>
  <meta name="description" content="${esc(t(lang, "meta.description"))}">
  <meta name="theme-color" content="#0A0A0C">
  <link rel="preload" as="image" type="image/avif" imagesrcset="/img/hero-360.avif 360w, /img/hero-520.avif 520w, /img/hero-655.avif 655w" imagesizes="(max-width: 860px) min(78vw, 400px), 440px" fetchpriority="high">
  <link rel="canonical" href="${url}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${SITE_URL}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="48x48">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <meta property="og:type" content="profile">
  <meta property="og:site_name" content="Felipe Farias">
  <meta property="og:title" content="${esc(t(lang, "meta.title"))}">
  <meta property="og:description" content="${esc(t(lang, "meta.description"))}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${SITE_URL}og-${lang}.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(t(lang, "alt.og"))}">
  <meta property="og:locale" content="${OG_LOCALE[lang]}">
  ${LANGS.filter((l) => l !== lang)
    .map((l) => `<meta property="og:locale:alternate" content="${OG_LOCALE[l]}">`)
    .join("\n  ")}
  <meta property="profile:first_name" content="Felipe">
  <meta property="profile:last_name" content="Teixeira Farias">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(t(lang, "meta.title"))}">
  <meta name="twitter:description" content="${esc(t(lang, "meta.description"))}">
  <meta name="twitter:image" content="${SITE_URL}og-${lang}.jpg">
  <script type="application/ld+json">${jsonLd(lang)}</script>
  <script>${BOOT_GATE}</script>`;
}

function topBar(lang: Lang): string {
  const nav = SECTIONS.map((id) => `<li><a href="#${id}">${navLabel(lang, id)}</a></li>`).join("");
  const langs = LANGS.map(
    (l) =>
      `<a href="${langHref(lang, l)}" hreflang="${HTML_LANG[l]}" lang="${HTML_LANG[l]}"${l === lang ? ' aria-current="page"' : ""}>${l.toUpperCase()}</a>`,
  ).join("");
  return `<header class="top">
    <div class="wrap top__in">
      <a class="brand" href="#top"><b>FELIPE FARIAS<i>.</i></b><span>full stack developer<br>c# · .net · sql · angular</span></a>
      <nav aria-label="${esc(t(lang, "a11y.nav"))}"><ul class="nav">${nav}</ul></nav>
      <div class="top__actions">
        <a class="icon-btn" href="${SOCIAL.github}" aria-label="GitHub" title="GitHub">${icons.github}</a>
        <a class="icon-btn" href="${SOCIAL.linkedin}" aria-label="LinkedIn" title="LinkedIn">${icons.linkedin}</a>
        <div class="langs" role="group" aria-label="${esc(t(lang, "a11y.lang"))}">${langs}</div>
      </div>
    </div>
  </header>`;
}

function hero(lang: Lang): string {
  const word = [..."FTFARIAS"].map((c) => `<span>${c}</span>`).join("");
  const totalProjects = projects.length + 1;
  return `<section class="hero" id="top" aria-label="${esc(t(lang, "a11y.hero"))}">
  ${topBar(lang)}
  <div class="layer hero__grid" aria-hidden="true"></div>
  <div class="layer hero__glow" aria-hidden="true"></div>
  <div class="layer hero__word" aria-hidden="true"><div class="word" id="word">${word}</div></div>
  <div class="layer hero__person">${picture("hero", { alt: t(lang, "alt.hero"), sizes: "(max-width: 860px) min(78vw, 400px), 440px", eager: true, className: "person" })}</div>
  <div class="layer hero__front" aria-hidden="true">
    <span class="spark" style="left:44%;top:30%">+</span>
    <span class="spark g" style="left:30%;top:64%;animation-delay:.8s">+</span>
    <span class="spark" style="left:66%;top:20%;animation-delay:1.4s">+</span>
    <span class="spark g" style="left:80%;top:44%;animation-delay:.4s">✦</span>
    <span class="spark" style="left:55%;top:72%;animation-delay:2s">+</span>
    <div class="cursor-tag c1">${icons.cursor("#22D877", "#fff")}<span>C#</span></div>
    <div class="cursor-tag c2">${icons.cursor("#2E6BFF", "#fff")}<span>SQL Server</span></div>
    <div class="cursor-tag c3">${icons.cursor("#F2F0EC", "#111")}<span>AngularJS</span></div>
  </div>
  <div class="cursor-tag you" id="you" aria-hidden="true">${icons.cursor("#F3F0EC", "#0A0A0C")}<span>${t(lang, "hero.you")}</span></div>

  <div class="wrap hero__ui" id="intro" tabindex="-1">
    <div class="intro">
      <p class="hello">${t(lang, "hero.hello")}</p>
      <h1 class="name">Felipe<br>Farias<i>.</i></h1>
      <p class="role">${t(lang, "hero.role")}</p>
      <p class="bio">${t(lang, "hero.bio")}</p>
      <div class="cta">
        <a class="btn btn--accent" href="#projects"><span>${t(lang, "hero.cta1")}</span>${icons.arrowDown}</a>
        <a class="btn btn--line" href="${SOCIAL.github}">GitHub ↗</a>
      </div>
      <p class="loc"><i></i>Hortolândia, SP · BR · <span id="clock">BRT</span></p>
    </div>
    <div class="stats">
      <div class="win" role="group" aria-label="${esc(t(lang, "a11y.build"))}">
        <div class="win__bar"><i></i><i></i><i></i><span>~/guardiao-antigolpe</span></div>
        <div class="win__body">$ git push origin main<br><span class="ok">✓ build passed</span> · 9 ${t(lang, "hero.days")}<br><span class="r">★ ${t(lang, "hero.place")}</span></div>
      </div>
      <div class="stat"><b data-count="${totalProjects}">${pad(totalProjects)}</b><span>${t(lang, "hero.s1")}</span></div>
      <div class="stat"><b>${featured.award.rank}</b><span>${t(lang, "hero.s2")}</span></div>
      <div class="stat"><b data-count="${certificateTotal}">${pad(certificateTotal)}</b><span>${t(lang, "hero.s3")}</span></div>
    </div>
  </div>

  <div class="hero__bottom">
    <div class="wrap">
      <span>© 2026 · ftfariasdev</span>
      <a class="scroll-cue" href="#about"><i></i><span>${t(lang, "hero.scroll")}</span></a>
      <span>C# · .NET · SQL Server · AngularJS</span>
    </div>
  </div>
</section>`;
}

function bands(): string {
  const a = [
    "C#",
    ".NET",
    "SQL Server",
    "AngularJS",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
  ];
  const b = ["Full Stack", "Clean Code", "End to End", "Remote", "Ship it", "Full Stack", "Clean Code", "End to End"];
  const track = (items: string[]) => {
    const once = items.map((x) => `<span>${esc(x)}</span>`).join("");
    return once.repeat(4);
  };
  return `<div class="bands" aria-hidden="true">
  <div class="band band--dark"><div class="band__track">${track(b)}</div></div>
  <div class="band band--accent"><div class="band__track">${track(a)}</div></div>
</div>`;
}

const sectionHead = (eyebrow: string, title: string, note: string) => `<div class="sec__head">
      <div><p class="eyebrow">${eyebrow}</p><h2 class="h2 rv">${title}</h2></div>
      <p class="sec__note">${note}</p>
    </div>`;

const ghost = (word: string) => `<span class="ghost" aria-hidden="true">${esc(word)}</span>`;

function about(lang: Lang): string {
  return `<section class="sec" id="about">
  ${ghost(plain(t(lang, "nav.about")).toUpperCase())}
  <div class="wrap about">
    <figure class="about__fig rv">
      ${picture("about", { alt: t(lang, "alt.about"), sizes: "(max-width: 900px) 330px, 430px" })}
      <figcaption>${t(lang, "about.cap")}</figcaption>
    </figure>
    <div class="about__text">
      <p class="eyebrow">${t(lang, "about.eyebrow")}</p>
      <h2 class="about__lead rv">${t(lang, "about.lead")}</h2>
      <p class="rv">${t(lang, "about.p1")}</p>
      <p class="rv">${t(lang, "about.p2")}</p>
      <p class="rv">${t(lang, "about.p3")}</p>
      <dl class="facts rv">
        <div><dt>${t(lang, "about.f1")}</dt><dd>Softwrench</dd></div>
        <div><dt>${t(lang, "about.f2")}</dt><dd>100%</dd></div>
        <div><dt>${t(lang, "about.f3")}</dt><dd>PT · EN</dd></div>
        <div><dt>${t(lang, "about.f4")}</dt><dd>2024</dd></div>
      </dl>
    </div>
  </div>
</section>`;
}

function experience(lang: Lang): string {
  const items = jobs
    .map((job) => {
      const where = [esc(job.org), job.location ? tx(lang, job.location) : "", job.remote ? t(lang, "xp.remote") : ""]
        .filter(Boolean)
        .join(" · ");
      const logo = job.logo ? picture(job.logo.name, { alt: tx(lang, job.logo.alt), sizes: "34px" }) : "";
      const tags = job.tags?.length
        ? `<div class="tags">${job.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>`
        : "";
      return `<article class="job rv">
      <div class="job__year">${esc(job.figure)}<small>${tx(lang, job.figureNote)}</small>${job.current ? `<span class="job__live">${t(lang, "xp.live")}</span>` : ""}</div>
      <div>
        <h3>${tx(lang, job.title)}</h3>
        <p class="job__co">${logo}${where}</p>
        <ul>${job.bullets.map((b) => `<li>${tx(lang, b)}</li>`).join("")}</ul>
        ${tags}
      </div>
    </article>`;
    })
    .join("\n    ");
  return `<section class="sec" id="experience">
  ${ghost("XP")}
  <div class="wrap">
    ${sectionHead(t(lang, "xp.eyebrow"), t(lang, "xp.h"), t(lang, "xp.note"))}
    ${items}
  </div>
</section>`;
}

function projectsSection(lang: Lang): string {
  const f = featured;
  const photos = f.photos
    .map((p, i) =>
      picture(p.name, {
        alt: tx(lang, p.alt),
        sizes: "(max-width: 760px) calc(100vw - 40px), 640px",
        style: `object-position: ${p.position ?? "50% 50%"}`,
        attrs: i ? ' aria-hidden="true"' : "",
      }),
    )
    .join("\n        ");
  const links = f.links
    .map(
      (l) => `<a class="btn ${l.primary ? "btn--accent" : "btn--line"}" href="${esc(l.url)}">${tx(lang, l.label)}</a>`,
    )
    .join("");
  const rows = projects
    .map(
      (p, i) =>
        `<li><a class="prow" href="${esc(p.url)}" data-prev="${p.id}"><span class="prow__i">${pad(i + 2)}</span><span class="prow__n">${esc(p.name)}</span><span class="prow__d">${tx(lang, p.summary)}</span><span class="prow__y">${esc(p.aside)}</span>${icons.arrowUpRight.replace("<svg", '<svg class="prow__arrow"')}</a></li>`,
    )
    .join("\n      ");
  const previews = projects.map((p) => `<template id="preview-${p.id}">${p.preview}</template>`).join("\n");
  return `<section class="sec" id="projects">
  ${ghost("WORK")}
  <div class="wrap">
    ${sectionHead(t(lang, "pr.eyebrow"), t(lang, "pr.h"), t(lang, "pr.note"))}

    <article class="feature rv">
      <div class="feature__img" id="fImg">
        ${photos}
        <div class="medal"><b>${f.award.rank}</b><span>${tx(lang, f.award.label)}</span></div>
        <button class="pill" type="button" id="fSwap">${t(lang, "pr.g.swap")}</button>
      </div>
      <div class="feature__body">
        <p class="feature__meta">${tx(lang, f.meta)}</p>
        <h3>${esc(f.name)}</h3>
        ${f.paragraphs.map((p) => `<p>${tx(lang, p)}</p>`).join("\n        ")}
        <div class="tags">${f.tags.map((x) => `<span class="tag">${esc(x)}</span>`).join("")}</div>
        <div class="links">${links}</div>
      </div>
    </article>

    <ul class="plist">
      ${rows}
    </ul>
  </div>
  ${previews}
</section>`;
}

function stackSection(lang: Lang): string {
  const first = stack[0];
  const tags = stack
    .map(
      (tech, i) =>
        `<li><button type="button" class="tagb${tech.daily ? " daily" : ""}" data-i="${i}" aria-pressed="${i === 0}">${esc(tech.name)}</button></li>`,
    )
    .join("");
  const uses = first ? first.usedIn.map((u) => `<li>${esc(tx(lang, u))}</li>`).join("") : "";
  return `<section class="sec" id="stack">
  ${ghost("STACK")}
  <div class="wrap">
    ${sectionHead(t(lang, "st.eyebrow"), t(lang, "st.h"), t(lang, "st.note"))}
    <div class="stack">
      <div class="sphere is-static" id="sphere"><ul class="sphere__tags" id="sphereTags" aria-label="${esc(t(lang, "a11y.stack"))}">${tags}</ul><p class="sphere__hint">${t(lang, "st.hint")}</p></div>
      <div>
        <div class="inspect" aria-live="polite">
          <p class="inspect__k">${t(lang, "st.k")}</p>
          <p class="inspect__n" id="iName">${esc(first?.name ?? "")}</p>
          <p class="inspect__t" id="iType">${first?.daily ? t(lang, "_daily") : t(lang, "_side")}</p>
          <ul id="iUses">${uses}</ul>
        </div>
        <div class="legend"><span>${t(lang, "st.lg1")}</span><span>${t(lang, "st.lg2")}</span></div>
      </div>
    </div>
  </div>
</section>`;
}

function education(lang: Lang): string {
  const cards = courses
    .map(
      (c, i) =>
        `<article class="card rv"><span class="card__n">${pad(i + 1)}</span><span class="card__s">${tx(lang, c.status)}</span><h3>${tx(lang, c.title)}</h3><p>${tx(lang, c.description)}</p></article>`,
    )
    .join("\n      ");
  const featuredCards = featuredCertificates
    .map(
      (c) => `<article class="cert rv">
          <button class="cert__img" type="button" data-full="${imageUrl(c.image.name, base(lang))}">${picture(c.image.name, { alt: tx(lang, c.image.alt), sizes: "(max-width: 900px) calc(100vw - 40px), 400px", maxWidths: 1 })}<span class="cert__zoom">${t(lang, "ce.zoom")}</span></button>
          <div class="cert__body"><span class="card__s">${tx(lang, c.meta)}</span><h4>${esc(tx(lang, c.title))}</h4><p>${tx(lang, c.description)}</p></div>
        </article>`,
    )
    .join("\n        ");
  const deckCards = alura
    .map(
      (c) =>
        `<span class="deck__card">${picture(c.image, { alt: "", sizes: "(max-width: 900px) calc(100vw - 40px), 400px", maxWidths: 1 })}<span class="deck__cap"><b>${esc(c.short)}</b><span>${c.hours} h · ${c.date}</span></span></span>`,
    )
    .join("\n            ");
  const deckRows = alura
    .map(
      (c) =>
        `<li><button type="button" class="deck__row" data-full="${imageUrl(c.image, base(lang))}" data-alt="${esc(`${t(lang, "alt.cert")} Alura: ${c.title}`)}"><span>${esc(c.title)}</span><span class="deck__meta">${c.hours} h · ${c.date}</span></button><a class="deck__verify" href="${esc(c.url)}">${t(lang, "ce.alura.v")}</a></li>`,
    )
    .join("\n            ");
  return `<section class="sec" id="education">
  ${ghost("EDU")}
  <div class="wrap">
    ${sectionHead(t(lang, "ed.eyebrow"), t(lang, "ed.h"), t(lang, "ed.note"))}
    <div class="edu">
      ${cards}
    </div>

    <div class="certs">
      <div class="certs__head"><h3 class="certs__title">${t(lang, "ce.h")}</h3><span class="certs__count">${t(lang, "ce.count")}</span></div>
      <div class="certs__grid">
        ${featuredCards}
        <div class="deck-wrap rv">
          <div class="deck" id="deck">
            ${deckCards}
            <button class="pill deck__next" id="deckNext" type="button">${t(lang, "_deck")} →</button>
          </div>
          <h4>${t(lang, "ce.alura")}</h4>
          <p>${t(lang, "ce.alura.d")}</p>
          <ul class="deck__links">
            ${deckRows}
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>`;
}

function footer(lang: Lang): string {
  return `<footer>
  <div class="wrap foot">
    <p class="foot__quote">${t(lang, "ft.q")}</p>
    <ul class="foot__links" aria-label="${esc(t(lang, "a11y.social"))}">
      <li><a href="${SOCIAL.github}">${icons.github}GitHub</a></li>
      <li><a href="${SOCIAL.linkedin}">${icons.linkedin}LinkedIn</a></li>
      <li><a href="${SOCIAL.instagram}">${icons.instagram}Instagram</a></li>
    </ul>
    <div class="foot__base"><span>© 2026 Felipe Teixeira Farias</span><span>${t(lang, "ft")}</span></div>
  </div>
</footer>`;
}

/** The whole document for one language. */
export function renderPage(lang: Lang): string {
  return `<!DOCTYPE html>
<html lang="${HTML_LANG[lang]}">
<head>
  ${head(lang)}
  <script type="module" src="/src/main.ts"></script>
</head>
<body>
<a class="skip-link" href="#intro">${t(lang, "a11y.skip")}</a>
<div class="boot" id="boot" aria-hidden="true">
  <div class="boot__half boot__half--top"></div>
  <div class="boot__half boot__half--bot"></div>
  <div class="boot__seam"></div>
  <div class="boot__log" id="bootLog"></div>
  <button class="boot__skip" id="bootSkip" type="button" tabindex="-1">${t(lang, "boot.skip")}</button>
  <div class="boot__count"><span id="bootNum"><span>0</span><span>0</span><span>0</span></span><small>%</small></div>
  <div class="boot__bar"><i id="bootBar"></i></div>
</div>
<main>
${hero(lang)}
${bands()}
${about(lang)}
${experience(lang)}
${projectsSection(lang)}
<div class="preview" id="preview" aria-hidden="true"></div>
${stackSection(lang)}
${education(lang)}
</main>
<script type="application/json" id="stack-data">${JSON.stringify(
    stack.map((tech) => ({ n: tech.name, d: tech.daily, u: tech.usedIn.map((u) => tx(lang, u)) })),
  ).replace(/</g, "\\u003c")}</script>
<script type="application/json" id="i18n-data">${JSON.stringify({
    daily: t(lang, "_daily"),
    side: t(lang, "_side"),
  })}</script>
<dialog class="lightbox" id="lightbox"><img id="lightboxImg" src="" alt=""><button class="pill" type="button" id="lightboxClose">${t(lang, "ce.close")}</button></dialog>
${footer(lang)}
</body>
</html>
`;
}
