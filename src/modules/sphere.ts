import { $, $$, finePointer, readJson, reduceMotion, whileVisible } from "./env.ts";

interface TechData {
  n: string;
  d: boolean;
  u: string[];
}

/** Shows where a technology is used, in the panel beside the sphere. */
function inspector() {
  const name = $("#iName");
  const type = $("#iType");
  const uses = $("#iUses");
  const labels = readJson<{ daily: string; side: string }>("i18n-data");
  return (tech: TechData) => {
    if (name) name.textContent = tech.n;
    if (type && labels) type.textContent = tech.d ? labels.daily : labels.side;
    if (uses)
      uses.replaceChildren(
        ...tech.u.map((u) => {
          const li = document.createElement("li");
          li.textContent = u;
          return li;
        }),
      );
  };
}

/**
 * Technologies on a rotating sphere. Plain HTML buttons placed in 3D with CSS transforms,
 * so it works without WebGL; without this script it stays a static list.
 */
export function initSphere(): void {
  const wrap = $("#sphere");
  const data = readJson<TechData[]>("stack-data");
  if (!wrap || !data) return;
  const show = inspector();
  const buttons = $$<HTMLButtonElement>(".tagb", wrap);
  const STEP = 11; // spreads the "daily" items around the sphere instead of clustering them
  const n = buttons.length;
  let paused = false;
  // Roving focus: one tag is in the Tab order, arrow keys move between all of them, and the
  // sphere turns to bring the focused one to the front.
  let target: { rx: number; ry: number } | null = null;

  const select = (i: number) => {
    buttons.forEach((x, j) => {
      x.setAttribute("aria-pressed", String(j === i));
      x.tabIndex = j === i ? 0 : -1;
    });
    const tech = data[i];
    if (tech) show(tech);
  };

  const items = buttons.map((b, i) => {
    b.addEventListener("click", () => select(i));
    b.addEventListener("focus", () => {
      paused = true;
      select(i);
      bringToFront(i);
    });
    b.addEventListener("blur", () => (paused = false));
    b.addEventListener("keydown", (e) => {
      const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let next = -1;
      if (e.key in keys) next = (i + (keys[e.key] ?? 0) + n) % n;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = n - 1;
      if (next < 0) return;
      e.preventDefault();
      buttons[next]?.focus();
    });
    if (finePointer) b.addEventListener("mouseenter", () => select(i));
    const k = (i * STEP) % n;
    const y = 1 - ((k + 0.5) / n) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = k * Math.PI * (3 - Math.sqrt(5));
    return { li: b.parentElement as HTMLElement, b, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
  });

  wrap.classList.remove("is-static");
  select(0);

  /** Angles that put item i at the front centre of the sphere. */
  function bringToFront(i: number) {
    const o = items[i];
    if (!o) return;
    const ty = Math.atan2(-o.x, o.z);
    const tx = Math.atan2(o.y, Math.hypot(o.x, o.z));
    // Take the short way round from the current angles.
    const near = (from: number, to: number) => from + Math.atan2(Math.sin(to - from), Math.cos(to - from));
    target = { rx: near(rx, tx), ry: near(ry, ty) };
    if (reduceMotion) {
      rx = target.rx;
      ry = target.ry;
      target = null;
      place();
    }
  }
  let rx = -0.25,
    ry = 0.6,
    vx = 0,
    vy = 0.0035,
    dragging = false,
    lx = 0,
    ly = 0,
    radius = 200;
  const size = () => (radius = wrap.clientWidth * 0.37);
  size();
  new ResizeObserver(size).observe(wrap);

  const place = () => {
    const cX = Math.cos(rx),
      sX = Math.sin(rx),
      cY = Math.cos(ry),
      sY = Math.sin(ry);
    for (const o of items) {
      const x1 = o.x * cY + o.z * sY;
      const z1 = -o.x * sY + o.z * cY;
      const y2 = o.y * cX - z1 * sX;
      const z2 = o.y * sX + z1 * cX;
      const depth = (z2 + 1) / 2; // 0 back, 1 front
      const scale = 0.5 + 0.62 * depth;
      o.li.style.transform = `translate3d(${(x1 * radius).toFixed(1)}px,${(y2 * radius).toFixed(1)}px,0) scale(${scale.toFixed(3)})`;
      o.li.style.opacity = (0.04 + 0.96 * Math.pow(Math.max(0, (depth - 0.28) / 0.72), 1.1)).toFixed(3);
      o.li.style.zIndex = String(Math.round(depth * 100));
      // Only the front half takes the mouse; the keyboard reaches every tag with the arrow keys.
      o.b.style.pointerEvents = depth > 0.5 ? "auto" : "none";
    }
  };

  wrap.addEventListener("pointerdown", (e) => {
    if ((e.target as Element).closest(".tagb")) return;
    dragging = true;
    lx = e.clientX;
    ly = e.clientY;
    wrap.setPointerCapture?.(e.pointerId);
  });
  wrap.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lx,
      dy = e.clientY - ly;
    lx = e.clientX;
    ly = e.clientY;
    ry += dx * 0.008;
    rx -= dy * 0.008;
    vy = dx * 0.0009;
    vx = -dy * 0.0009;
    place();
  });
  const stop = () => (dragging = false);
  wrap.addEventListener("pointerup", stop);
  wrap.addEventListener("pointercancel", stop);
  if (finePointer) {
    wrap.addEventListener("mouseenter", () => (paused = true));
    wrap.addEventListener("mouseleave", () => (paused = false));
  }

  place();
  if (reduceMotion) return;
  whileVisible(wrap, () => {
    if (target) {
      rx += (target.rx - rx) * 0.14;
      ry += (target.ry - ry) * 0.14;
      if (Math.abs(target.rx - rx) + Math.abs(target.ry - ry) < 0.002) target = null;
      place();
      return;
    }
    if (dragging || paused) return;
    vx += (0 - vx) * 0.03;
    vy += (0.0035 - vy) * 0.03;
    rx += vx;
    ry += vy;
    place();
  });
}
