// Latin subset only: it covers English, Portuguese and Spanish.
import "@fontsource/anton/latin-400.css";
import "@fontsource/caveat/latin-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-500.css";
import "@fontsource/manrope/latin-700.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-700.css";
import "./styles/index.css";

import { initBoot } from "./modules/boot.ts";
import { initHero, playHeroEntrance } from "./modules/hero.ts";
import { initLang } from "./modules/lang.ts";
import { initDeck, initLightbox, initPhotoSwap, initProjectPreview, initReveal } from "./modules/sections.ts";
import { initSphere } from "./modules/sphere.ts";

const run = (name: string, fn: () => void) => {
  try {
    fn();
  } catch (error) {
    // One broken effect must not take the rest of the page down.
    console.error(`[${name}]`, error);
  }
};

run("lang", initLang);
run("hero", initHero);
run("boot", () => initBoot(playHeroEntrance));
run("reveal", initReveal);
run("photos", initPhotoSwap);
run("preview", initProjectPreview);
run("deck", initDeck);
run("lightbox", initLightbox);
run("sphere", initSphere);
