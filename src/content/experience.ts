import type { Course, Job } from "./types.ts";

export const jobs: Job[] = [
  {
    figure: "2025",
    figureNote: {
      en: "Aug 2025 – now · full-time",
      pt: "ago 2025 – hoje · tempo integral",
      es: "ago 2025 – hoy · tiempo completo",
    },
    current: true,
    title: { en: "Full Stack Developer", pt: "Full Stack Developer", es: "Full Stack Developer" },
    org: "Softwrench",
    logo: { src: "img/sw.png", alt: { en: "Softwrench logo", pt: "Logo da Softwrench", es: "Logo de Softwrench" } },
    location: { en: "Scottsdale, AZ, USA", pt: "Scottsdale, AZ, EUA", es: "Scottsdale, AZ, EE. UU." },
    remote: true,
    bullets: [
      {
        en: "Full stack development of a web platform for maintenance and asset management (CMMS) used by customers in the US.",
        pt: "Desenvolvimento full stack de uma plataforma web de gestão de manutenção e ativos (CMMS) usada por clientes nos EUA.",
        es: "Desarrollo full stack de una plataforma web de gestión de mantenimiento y activos (CMMS) usada por clientes en EE. UU.",
      },
      {
        en: "Features end to end: back-end services in C# and .NET with SQL Server, front-end delivery in AngularJS.",
        pt: "Funcionalidades de ponta a ponta: serviços de back-end em C# e .NET com SQL Server e entrega no front-end em AngularJS.",
        es: "Funcionalidades de punta a punta: servicios de back-end en C# y .NET con SQL Server y entrega en el front-end con AngularJS.",
      },
      {
        en: "Bug fixing and continuous improvement of a production system, with an international team.",
        pt: "Correção de bugs e melhoria contínua de um sistema em produção, com time internacional.",
        es: "Corrección de errores y mejora continua de un sistema en producción, con un equipo internacional.",
      },
    ],
    tags: ["C#", ".NET Framework", "SQL Server", "AngularJS"],
  },
  {
    figure: "4",
    figureNote: { en: "years as president", pt: "anos na presidência", es: "años en la presidencia" },
    title: {
      en: "Student Council President",
      pt: "Presidente do Grêmio Estudantil",
      es: "Presidente del Centro de Estudiantes",
    },
    org: "Escola Estadual Prof. Hedy Madalena Bocchi",
    bullets: [
      {
        en: "Led the student council for 4 years, representing students before the school administration.",
        pt: "Presidi o grêmio estudantil por 4 anos, representando os alunos junto à direção da escola.",
        es: "Presidí el centro de estudiantes durante 4 años, representando a los alumnos ante la dirección de la escuela.",
      },
      {
        en: "Leadership, communication, planning and teamwork while organizing projects and events.",
        pt: "Liderança, comunicação, planejamento e trabalho em equipe na organização de projetos e eventos.",
        es: "Liderazgo, comunicación, planificación y trabajo en equipo en la organización de proyectos y eventos.",
      },
    ],
  },
];

export const courses: Course[] = [
  {
    status: {
      en: "in progress · Feb 2026 – Dec 2029",
      pt: "em andamento · fev 2026 – dez 2029",
      es: "en curso · feb 2026 – dic 2029",
    },
    title: { en: "Information Systems", pt: "Sistemas de Informação", es: "Sistemas de Información" },
    description: {
      en: "UNASP, Centro Universitário Adventista de São Paulo, Hortolândia campus.",
      pt: "UNASP, Centro Universitário Adventista de São Paulo, campus Hortolândia.",
      es: "UNASP, Centro Universitário Adventista de São Paulo, campus Hortolândia.",
    },
  },
  {
    status: {
      en: "completed · Feb 2024 – Jun 2025",
      pt: "concluído · fev 2024 – jun 2025",
      es: "concluido · feb 2024 – jun 2025",
    },
    title: { en: "Web Development Technician", pt: "Técnico em Desenvolvimento Web", es: "Técnico en Desarrollo Web" },
    description: {
      en: "ETEC. Programming logic, object-oriented programming and web development. Capstone: SAGA, an academic management system built by a team of four.",
      pt: "ETEC. Lógica de programação, orientação a objetos e desenvolvimento web. TCC: SAGA, sistema de gestão acadêmica feito em time de quatro.",
      es: "ETEC. Lógica de programación, orientación a objetos y desarrollo web. Proyecto final: SAGA, un sistema de gestión académica hecho en equipo de cuatro.",
    },
  },
];
