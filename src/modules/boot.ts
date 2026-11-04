import { $ } from "./env.ts";

const LOG: [number, string][] = [
  [0, "<b>&gt;</b> <i>ftfarias.dev</i> boot sequence v3.0"],
  [8, "<b>[ OK ]</b> loading runtime ........ .NET · Node 22"],
  [22, "<b>[ OK ]</b> connecting database ... SQL Server"],
  [36, "<b>[ OK ]</b> compiling stack ....... C# · AngularJS · TypeScript"],
  [52, "<b>[ OK ]</b> mounting ~/projects ... 6 repos"],
  [68, "<b>[ OK ]</b> loading assets ........ photos · 3d sphere"],
  [84, "<b>[ OK ]</b> rendering interface ..."],
  [98, "<b>&gt;</b> <i>welcome.</i>"],
];
const DURATION = 2300;

/**
 * Plays the start-up sequence when the inline gate in <head> asked for it (`html.booting`),
 * then calls `onOpen` as the screen splits so the hero entrance can start.
 */
export function initBoot(onOpen: () => void): void {
  const root = document.documentElement;
  const boot = $("#boot");
  if (!boot || !root.classList.contains("booting")) return;

  const log = $("#bootLog");
  const num = $("#bootNum");
  const bar = $("#bootBar");
  const skip = $<HTMLButtonElement>("#bootSkip");
  let raf = 0;
  let done = false;

  const finish = () => {
    if (done) return;
    done = true;
    cancelAnimationFrame(raf);
    removeEventListener("keydown", onKey);
    try {
      sessionStorage.setItem("ff-booted", "1");
    } catch {
      /* private mode: the sequence simply plays again next time */
    }
    if (num) num.textContent = "100";
    if (bar) bar.style.width = "100%";
    boot.classList.add("is-done");
    setTimeout(() => {
      boot.classList.add("is-open");
      root.classList.remove("pre-hero");
      onOpen();
    }, 320);
    setTimeout(() => root.classList.remove("booting"), 1250);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") finish();
  };

  skip?.addEventListener("click", finish);
  addEventListener("keydown", onKey);
  if (skip) {
    skip.tabIndex = 0;
    skip.focus({ preventScroll: true });
  }

  const start = performance.now();
  let shown = 0;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / DURATION);
    const pct = Math.round((1 - Math.pow(1 - p, 2.2)) * 100);
    if (num) num.textContent = String(pct).padStart(3, "0");
    if (bar) bar.style.width = `${pct}%`;
    while (shown < LOG.length && pct >= (LOG[shown]?.[0] ?? 101)) {
      const line = document.createElement("div");
      line.innerHTML = LOG[shown]?.[1] ?? "";
      log?.appendChild(line);
      shown++;
    }
    if (p < 1) raf = requestAnimationFrame(step);
    else finish();
  };
  raf = requestAnimationFrame(step);
}
