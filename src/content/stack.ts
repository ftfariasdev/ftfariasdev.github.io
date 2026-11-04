import { featured, projects } from "./projects.ts";
import type { Tech, Text } from "./types.ts";

const WORK = "Softwrench";
const EVERY_PROJECT: Text = { en: "every project", pt: "todos os projetos", es: "todos los proyectos" };

/** Technologies in the stack sphere. `daily` marks what Felipe uses every day at work. */
const list: { name: string; daily?: boolean; also?: Text[] }[] = [
  { name: "C#", daily: true, also: [WORK] },
  { name: ".NET", daily: true, also: [WORK] },
  { name: "SQL Server", daily: true, also: [WORK] },
  { name: "AngularJS", daily: true, also: [WORK] },
  { name: "SQL", daily: true, also: [WORK] },
  { name: "JavaScript" },
  { name: "TypeScript" },
  { name: "React" },
  { name: "Node.js" },
  { name: "Fastify" },
  { name: "Express" },
  { name: "Prisma" },
  { name: "PostgreSQL" },
  { name: "Socket.IO" },
  { name: "Python" },
  { name: "FastAPI" },
  { name: "Elixir" },
  { name: "LLM" },
  { name: "watsonx" },
  { name: "Docker" },
  { name: "Git", also: [EVERY_PROJECT] },
  { name: "GitHub Actions" },
  { name: "Vite" },
  { name: "HTML" },
  { name: "CSS" },
  { name: "SQLite" },
  { name: "PWA" },
  { name: "Three.js" },
  { name: "Bootstrap" },
];

const allProjects = [{ name: featured.name, stack: featured.stack }, ...projects];

/** Each technology with the places it is used, worked out from the project stacks. */
export const stack: Tech[] = list.map(({ name, daily = false, also = [] }) => ({
  name,
  daily,
  usedIn: [...also, ...allProjects.filter((p) => p.stack.includes(name)).map((p) => p.name)],
}));
