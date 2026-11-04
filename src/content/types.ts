export const LANGS = ["en", "pt", "es"] as const;
export type Lang = (typeof LANGS)[number];

/** Text in every language the site ships. TypeScript rejects an entry that misses one. */
export type L10n = Record<Lang, string>;

/** Plain text that reads the same in every language, or translated text. */
export type Text = string | L10n;

export interface Photo {
  src: string;
  alt: L10n;
  position?: string;
  width: number;
  height: number;
}

export interface FeaturedProject {
  name: string;
  meta: L10n;
  award: { rank: string; label: L10n };
  paragraphs: L10n[];
  tags: string[];
  links: { label: Text; url: string; primary?: boolean }[];
  photos: Photo[];
  stack: string[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
  summary: L10n;
  /** Short note shown at the end of the row: a year, or a language. */
  aside: string;
  /** Code shown in the floating preview on hover (trusted markup, written here). */
  preview: string;
  stack: string[];
}

export interface Job {
  /** Big figure on the left: a year or a duration. */
  figure: string;
  figureNote: L10n;
  current?: boolean;
  title: L10n;
  org: string;
  logo?: { src: string; alt: L10n };
  location?: L10n;
  remote?: boolean;
  bullets: L10n[];
  tags?: string[];
}

export interface Course {
  status: L10n;
  title: L10n;
  description: L10n;
}

export interface FeaturedCertificate {
  title: Text;
  meta: L10n;
  description: L10n;
  image: { src: string; width: number; height: number; alt: L10n };
}

export interface AluraCertificate {
  title: string;
  short: string;
  hours: number;
  /** MM/YYYY */
  date: string;
  image: string;
  url: string;
}

export interface Tech {
  name: string;
  daily: boolean;
  /** Where it is used: project names, or a translated label. */
  usedIn: Text[];
}
