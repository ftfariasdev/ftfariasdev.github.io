import type { AluraCertificate, FeaturedCertificate } from "./types.ts";

export const featuredCertificates: FeaturedCertificate[] = [
  {
    title: "Profissional 5.0",
    meta: {
      en: "AC International Group · UNASP · Oct 2026 · 4 h",
      pt: "AC International Group · UNASP · out 2026 · 4 h",
      es: "AC International Group · UNASP · oct 2026 · 4 h",
    },
    description: {
      en: "Training promoted by AC International Group and UNASP Hortolândia.",
      pt: "Treinamento promovido pela AC International Group e pela UNASP Hortolândia.",
      es: "Capacitación promovida por AC International Group y la UNASP Hortolândia.",
    },
    image: {
      src: "img/cert-profissional50.webp",
      width: 1200,
      height: 933,
      alt: {
        en: "Certificate of participation in the Profissional 5.0 training, AC International Group and UNASP Hortolândia",
        pt: "Certificado de participação no treinamento Profissional 5.0, AC International Group e UNASP Hortolândia",
        es: "Certificado de participación en la capacitación Profissional 5.0, AC International Group y UNASP Hortolândia",
      },
    },
  },
  {
    title: { en: "Intermediate Python", pt: "Python Intermediário", es: "Python Intermedio" },
    meta: {
      en: "UNASP Hortolândia · Sep – Nov 2025 · 16 h",
      pt: "UNASP Hortolândia · set – nov 2025 · 16 h",
      es: "UNASP Hortolândia · sep – nov 2025 · 16 h",
    },
    description: {
      en: "4th edition of the UNASPython extension course, intermediate level. Follow-up to Basic Python (May 2025).",
      pt: "4ª edição do curso de extensão UNASPython, nível intermediário. Continuação do Python Básico (mai 2025).",
      es: "4.ª edición del curso de extensión UNASPython, nivel intermedio. Continuación de Python Básico (may 2025).",
    },
    image: {
      src: "img/cert-python.webp",
      width: 1200,
      height: 851,
      alt: {
        en: "Certificate of the UNASPython extension course, intermediate level, UNASP Hortolândia campus",
        pt: "Certificado do curso de extensão UNASPython, nível intermediário, UNASP campus Hortolândia",
        es: "Certificado del curso de extensión UNASPython, nivel intermedio, UNASP campus Hortolândia",
      },
    },
  },
];

/** Chronological. Course titles are kept in Portuguese, as issued. */
export const alura: AluraCertificate[] = [
  {
    title: "Projetos com programação: utilizando a criatividade através dos códigos",
    short: "Projetos com programação",
    hours: 7,
    date: "03/2024",
    image: "img/alura-1.webp",
    url: "https://cursos.alura.com.br/certificate/ac3eb375-fda1-4ac9-ac15-802e4355e174",
  },
  {
    title: "Lógica de programação: desenvolvendo um jogo estilo Pong",
    short: "Lógica de programação",
    hours: 10,
    date: "05/2024",
    image: "img/alura-3.webp",
    url: "https://cursos.alura.com.br/certificate/5a649649-665a-4085-832e-8c5a895a8d25",
  },
  {
    title: "ChatGPT: desvendando a IA em conversas e suas aplicações",
    short: "ChatGPT: desvendando a IA",
    hours: 8,
    date: "07/2024",
    image: "img/alura-4.webp",
    url: "https://cursos.alura.com.br/certificate/8b56d992-7ab5-42e0-9326-ca4db46c9ebc",
  },
  {
    title: "Página web: utilizando a responsividade em aplicações com HTML e CSS - Parte 2",
    short: "Página web responsiva",
    hours: 8,
    date: "11/2024",
    image: "img/alura-2.webp",
    url: "https://cursos.alura.com.br/certificate/e6dfdb8b-fb81-4713-9d2f-b802f8a4d5a2",
  },
];

/** Shown in the hero and the Education header. */
export const certificateTotal = 17;
