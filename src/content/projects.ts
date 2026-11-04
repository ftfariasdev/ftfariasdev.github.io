import type { FeaturedProject, Project } from "./types.ts";

export const featured: FeaturedProject = {
  name: "Guardião Antigolpe",
  meta: {
    en: "01 · Featured · 2026 · solo · 9 days",
    pt: "01 · Destaque · 2026 · solo · 9 dias",
    es: "01 · Destacado · 2026 · solo · 9 días",
  },
  award: {
    rank: "3º",
    label: {
      en: "place · Tech Week<br>UNASP",
      pt: "lugar · Semana da<br>Tecnologia UNASP",
      es: "lugar · Semana de la<br>Tecnología UNASP",
    },
  },
  paragraphs: [
    {
      en: "An AI PWA that checks suspicious messages and alerts the family before a Pix payment. Fixed rules and an LLM decide together, and the final risk is always the higher of the two. Built for older adults, WCAG 2.1 AA.",
      pt: "PWA com IA que analisa mensagens suspeitas e avisa a família antes do Pix. Regras fixas e um LLM decidem juntos, e o risco final é sempre o maior dos dois. Pensado para pessoas idosas, com acessibilidade WCAG 2.1 AA.",
      es: "PWA con IA que analiza mensajes sospechosos y avisa a la familia antes del Pix. Reglas fijas y un LLM deciden juntos, y el riesgo final siempre es el mayor de los dos. Pensado para personas mayores, con accesibilidad WCAG 2.1 AA.",
    },
    {
      en: "I built it solo in 9 days during my second semester: the app, a real-time API and a coded 3D presentation.",
      pt: "Construí sozinho em 9 dias, no 2º semestre da faculdade: app, API em tempo real e uma apresentação 3D programada.",
      es: "Lo construí solo en 9 días, en el 2.º semestre de la facultad: la app, una API en tiempo real y una presentación 3D programada.",
    },
  ],
  tags: ["TypeScript", "React", "Fastify", "Prisma", "Socket.IO", "LLM"],
  links: [
    {
      label: { en: "Open app ↗", pt: "Abrir app ↗", es: "Abrir app ↗" },
      url: "https://guardiao-antigolpe.vercel.app",
      primary: true,
    },
    {
      label: { en: "Code ↗", pt: "Código ↗", es: "Código ↗" },
      url: "https://github.com/ftfariasdev/guardiao-antigolpe",
    },
    { label: "Pitch ↗", url: "https://guardiao-pitch.vercel.app" },
  ],
  photos: [
    {
      src: "img/p2.jpg",
      width: 760,
      height: 1140,
      position: "50% 12%",
      alt: {
        en: "Felipe presenting Guardião Antigolpe, with the app on the big screen",
        pt: "Felipe apresentando o Guardião Antigolpe, com o app projetado no telão",
        es: "Felipe presentando Guardião Antigolpe, con la app en la pantalla grande",
      },
    },
    {
      src: "img/p1.jpg",
      width: 760,
      height: 1140,
      position: "60% 18%",
      alt: {
        en: "Felipe on stage at UNASP next to his laptop",
        pt: "Felipe no palco da UNASP ao lado do notebook",
        es: "Felipe en el escenario de la UNASP junto a su portátil",
      },
    },
  ],
  stack: [
    "TypeScript",
    "React",
    "Vite",
    "Fastify",
    "Prisma",
    "Socket.IO",
    "PostgreSQL",
    "LLM",
    "Docker",
    "PWA",
    "Three.js",
  ],
};

export const projects: Project[] = [
  {
    id: "pulso",
    name: "Pulso",
    url: "https://github.com/ftfariasdev/pulso",
    aside: "2026",
    summary: {
      en: "Multi-agent platform matching volunteers with NGOs and civil defense · IBM watsonx · FastAPI",
      pt: "Plataforma multiagente que conecta voluntários a ONGs e à Defesa Civil · IBM watsonx · FastAPI",
      es: "Plataforma multiagente que conecta voluntarios con ONG y Defensa Civil · IBM watsonx · FastAPI",
    },
    preview:
      '<span class="c">// modo CRISE ativado</span>\n<span class="k">await</span> matchmaker.rank({\n  demanda: <span class="s">"enchente"</span>,\n  skills: [<span class="s">"primeiros_socorros"</span>],\n  raio_km: 15\n})\n<span class="ok">→ 8 voluntários convocados</span>',
    stack: ["Python", "FastAPI", "watsonx", "SQLite", "LLM"],
  },
  {
    id: "saga",
    name: "SAGA",
    url: "https://github.com/ftfariasdev/SAGA",
    aside: "2025",
    summary: {
      en: "Academic management system, ETEC capstone with a team of 4 · Node.js · Prisma · PostgreSQL",
      pt: "Sistema de gestão acadêmica, TCC da ETEC em time de 4 · Node.js · Prisma · PostgreSQL",
      es: "Sistema de gestión académica, proyecto final de la ETEC en equipo de 4 · Node.js · Prisma · PostgreSQL",
    },
    preview:
      '<span class="k">SELECT</span> a.nome, t.turma\n<span class="k">FROM</span> alunos a\n<span class="k">JOIN</span> matriculas m <span class="k">ON</span> m.aluno_id = a.id\n<span class="k">JOIN</span> turmas t <span class="k">ON</span> t.id = m.turma_id;\n<span class="ok">→ ok</span>',
    stack: ["JavaScript", "Node.js", "Express", "Prisma", "PostgreSQL", "Docker", "HTML", "CSS", "SQL"],
  },
  {
    id: "linsolve",
    name: "LinSolve",
    url: "https://github.com/ftfariasdev/LinSolve",
    aside: "2026",
    summary: {
      en: "Linear systems calculator · FastAPI · React · TypeScript",
      pt: "Calculadora de sistemas lineares · FastAPI · React · TypeScript",
      es: "Calculadora de sistemas lineales · FastAPI · React · TypeScript",
    },
    preview:
      '<span class="c">// POST /api/linear-system/solve</span>\n[ 2  1 | 5 ]\n[ 1 -1 | 1 ]\n\n<span class="ok">→ SPD · x = 2, y = 1</span>',
    stack: ["TypeScript", "Python", "FastAPI", "React", "Vite"],
  },
  {
    id: "elixir",
    name: "ElixirBot",
    url: "https://github.com/ftfariasdev/ElixirBotForTelegram",
    aside: "Elixir",
    summary: {
      en: "Telegram bot that validates CPF numbers, team of 5 · Elixir",
      pt: "Bot de Telegram que valida CPFs, time de 5 · Elixir",
      es: "Bot de Telegram que valida CPF, equipo de 5 · Elixir",
    },
    preview:
      '<span class="k">CpfValidator</span>.valid?(\n  <span class="s">"529.982.247-25"</span>\n)\n<span class="ok">→ true · CPF válido</span>',
    stack: ["Elixir"],
  },
  {
    id: "profile",
    name: "Profile as Code",
    url: "https://github.com/ftfariasdev/ftfariasdev",
    aside: "2026",
    summary: {
      en: "GitHub README generated by code · SVG · GitHub Actions",
      pt: "README do GitHub gerado por código · SVG · GitHub Actions",
      es: "README de GitHub generado por código · SVG · GitHub Actions",
    },
    preview:
      '$ npm run build\n<span class="c">reading tokens.json…</span>\n<span class="ok">✓ SVGs rendered</span>\n<span class="ok">✓ README.md updated</span>\n$ git push',
    stack: ["JavaScript", "Node.js", "GitHub Actions"],
  },
];
