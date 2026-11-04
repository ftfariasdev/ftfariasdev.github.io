/** Shared environment checks, read once at start-up. */
export const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
export const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  root.querySelector<T>(sel);
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => [
  ...root.querySelectorAll<T>(sel),
];

/** Runs `tick` every animation frame while `el` is on screen, and stops when it scrolls away. */
export function whileVisible(el: Element, tick: () => void): void {
  let on = false;
  const loop = () => {
    if (!on) return;
    tick();
    requestAnimationFrame(loop);
  };
  new IntersectionObserver(([entry]) => {
    const was = on;
    on = !!entry?.isIntersecting;
    if (on && !was) requestAnimationFrame(loop);
  }).observe(el);
}

export function readJson<T>(id: string): T | null {
  const el = document.getElementById(id);
  try {
    return el?.textContent ? (JSON.parse(el.textContent) as T) : null;
  } catch {
    return null;
  }
}
