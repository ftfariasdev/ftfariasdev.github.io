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

  const items = buttons.map((b, i) => {
    const tech = data[i];
    const select = () => {
      buttons.forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      if (tech) show(tech);
    };
    b.addEventListener("click", select);
    b.addEventListener("focus", () => {
      paused = true;
      select();
    });
    b.addEventListener("blur", () => (paused = false));
    if (finePointer) b.addEventListener("mouseenter", select);
    const k = (i * STEP) % n;
    const y = 1 - ((k + 0.5) / n) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = k * Math.PI * (3 - Math.sqrt(5));
    return { li: b.parentElement as HTMLElement, b, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
  });

  wrap.classList.remove("is-static");
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
      const front = depth > 0.5;
      o.b.style.pointerEvents = front ? "auto" : "none";
      o.b.tabIndex = front ? 0 : -1;
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
    if (dragging || paused) return;
    vx += (0 - vx) * 0.03;
    vy += (0.0035 - vy) * 0.03;
    rx += vx;
    ry += vy;
    place();
  });
}
