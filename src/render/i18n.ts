import en from "../i18n/en.json";
import es from "../i18n/es.json";
import pt from "../i18n/pt.json";
import type { Lang, Text } from "../content/types.ts";

/** English is the source of truth: every other language must define the same keys. */
export type Dict = typeof en;
export type Key = keyof Dict;

export const dictionaries: Record<Lang, Dict> = {
  en,
  pt: pt satisfies Dict,
  es: es satisfies Dict,
};

export const HTML_LANG: Record<Lang, string> = { en: "en", pt: "pt-BR", es: "es" };

/** Folder each language is served from, relative to the site root. */
export const LANG_DIR: Record<Lang, string> = { en: "", pt: "pt/", es: "es/" };

/** A dictionary entry. Entries may contain trusted inline markup (<em>, <br>, <strong>). */
export const t = (lang: Lang, key: Key): string => dictionaries[lang][key];

/** Content text: plain strings are the same in every language. */
export const tx = (lang: Lang, text: Text): string => (typeof text === "string" ? text : text[lang]);

/** Escape a value for use inside HTML text or a double-quoted attribute. */
export const esc = (value: string): string =>
  value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

/** Strip markup from a dictionary entry, for attributes such as <title> or alt text. */
export const plain = (html: string): string => html.replace(/<br\s*\/?>/g, " ").replace(/<[^>]+>/g, "");
