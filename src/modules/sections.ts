import { $, $$, finePointer, reduceMotion } from "./env.ts";

/** Fades content in as it scrolls into view. Content already on screen, or below a fold the
 *  visitor jumped past, is never hidden. */
export function initReveal(): void {
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const items = $$(".rv");
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("pre");
          io.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  for (const el of items) {
    if (el.getBoundingClientRect().top > innerHeight) el.classList.add("pre");
    io.observe(el);
  }
}

/** Swaps between the two Guardião photos. */
export function initPhotoSwap(): void {
  const box = $("#fImg");
  const button = $("#fSwap");
  if (!box || !button) return;
  const imgs = $$("img", box);
  button.addEventListener("click", () => {
    const alt = box.classList.toggle("alt");
    imgs.forEach((img, i) => img.toggleAttribute("aria-hidden", alt ? i === 0 : i !== 0));
  });
}

/** Floating code preview that follows the mouse over the project list. */
export function initProjectPreview(): void {
  const preview = $("#preview");
  if (!preview || !finePointer) return;
  let tx = 0,
    ty = 0,
    x = 0,
    y = 0,
    running = false;
  const follow = () => {
    x += (tx - x) * 0.15;
    y += (ty - y) * 0.15;
    preview.style.left = `${x}px`;
    preview.style.top = `${y}px`;
    if (preview.classList.contains("on") || Math.abs(tx - x) > 0.5) requestAnimationFrame(follow);
    else running = false;
  };
  for (const row of $$<HTMLAnchorElement>(".prow")) {
    const tpl = document.getElementById(`preview-${row.dataset.prev}`) as HTMLTemplateElement | null;
    if (!tpl) continue;
    row.addEventListener("mouseenter", () => {
      preview.replaceChildren();
      const box = document.createElement("div");
      box.className = "preview__code";
      box.append(tpl.content.cloneNode(true));
      preview.append(box);
      preview.classList.add("on");
      if (!running) {
        running = true;
        requestAnimationFrame(follow);
      }
    });
    row.addEventListener("mouseleave", () => preview.classList.remove("on"));
  }
  addEventListener("mousemove", (e) => {
    tx = Math.min(innerWidth - 160, e.clientX + 170);
    ty = e.clientY;
  });
}

/** Alura certificate stack: each click brings the next card to the front. */
export function initDeck(): void {
  const deck = $("#deck");
  if (!deck) return;
  const cards = $$(".deck__card", deck);
  const order = cards.map((_, i) => i);
  const layout = () =>
    order.forEach((card, pos) => {
      const el = cards[card];
      if (!el) return;
      el.style.setProperty("--i", String(pos));
      el.classList.toggle("is-top", pos === 0);
    });
  layout();
  const next = () => {
    order.push(order.shift() as number);
    layout();
  };
  // The cards are a picture you can click; the labelled button does the same for keyboard users.
  deck.addEventListener("click", next);
}

/** Certificate viewer. Uses <dialog>, so Esc and focus trapping come from the browser. */
export function initLightbox(): void {
  const dialog = $<HTMLDialogElement>("#lightbox");
  const img = $<HTMLImageElement>("#lightboxImg");
  const close = $("#lightboxClose");
  if (!dialog || !img || !close || typeof dialog.showModal !== "function") return;
  let opener: HTMLElement | null = null;
  for (const button of $$<HTMLElement>("[data-full]")) {
    button.addEventListener("click", () => {
      opener = button;
      img.src = button.dataset.full ?? "";
      img.alt = button.dataset.alt ?? button.querySelector("img")?.alt ?? "";
      dialog.showModal();
      close.focus();
    });
  }
  close.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    img.removeAttribute("src");
    opener?.focus();
  });
}
