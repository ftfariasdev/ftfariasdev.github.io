import { $, $$, finePointer, reduceMotion, whileVisible } from "./env.ts";

/** Fills the width with the giant word, capped in height so it never covers the stats column. */
function initWordFit(hero: HTMLElement): void {
  const word = $("#word");
  if (!word) return;
  const fit = () => {
    word.style.fontSize = "";
    const mobile = innerWidth < 860;
    const target = hero.clientWidth * (mobile ? 0.97 : 0.94);
    const width = word.scrollWidth;
    if (!width) return;
    const fontSize = parseFloat(getComputedStyle(word).fontSize);
    const byWidth = (fontSize * target) / width;
    const byHeight = mobile ? Infinity : (hero.clientHeight * 0.34) / 0.8;
    word.style.fontSize = `${Math.min(byWidth, byHeight).toFixed(1)}px`;
  };
  fit();
  document.fonts?.ready.then(fit);
  let pending = 0;
  addEventListener("resize", () => {
    cancelAnimationFrame(pending);
    pending = requestAnimationFrame(fit);
  });
}

/** Mouse parallax across the hero layers, plus the "you" cursor that trails the pointer. */
function initParallax(hero: HTMLElement): void {
  if (!finePointer || reduceMotion) return;
  const you = $("#you");
  let tx = 0,
    ty = 0,
    cx = 0,
    cy = 0,
    ux = 0,
    uy = 0,
    px = 0,
    py = 0;
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    ux = e.clientX - r.left;
    uy = e.clientY - r.top;
    hero.classList.add("has-pointer");
  });
  hero.addEventListener("pointerleave", () => {
    tx = ty = 0;
    hero.classList.remove("has-pointer");
  });
  whileVisible(hero, () => {
    cx += (tx - cx) * 0.07;
    cy += (ty - cy) * 0.07;
    hero.style.setProperty("--mx", cx.toFixed(4));
    hero.style.setProperty("--my", cy.toFixed(4));
    px += (ux + 18 - px) * 0.18;
    py += (uy + 18 - py) * 0.18;
    if (you) you.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`;
  });
}

function initClock(): void {
  const clock = $("#clock");
  if (!clock) return;
  const format = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
  const tick = () => (clock.textContent = `${format.format(new Date())} BRT`);
  tick();
  setInterval(tick, 15000);
}

/** Staggered entrance after the boot sequence opens. */
export function playHeroEntrance(): void {
  if (reduceMotion) return;
  $$("#word span").forEach((s, i) => (s.style.transitionDelay = `${i * 55}ms`));
  const person = $(".person");
  if (person) person.style.transitionDelay = "350ms";
  $$(".intro > *").forEach((el, i) => (el.style.transitionDelay = `${600 + i * 90}ms`));
  $$(".win, .stat").forEach((el, i) => (el.style.transitionDelay = `${900 + i * 110}ms`));
  $$<HTMLElement>("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    const start = performance.now() + 1000;
    const step = (now: number) => {
      const p = Math.max(0, Math.min(1, (now - start) / 900));
      el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3)))).padStart(2, "0");
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

export function initHero(): void {
  const hero = $("#top");
  if (!hero) return;
  initWordFit(hero);
  initParallax(hero);
  initClock();
}
