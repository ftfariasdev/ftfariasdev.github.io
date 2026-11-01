# Briefing do novo portfólio

Base de conteúdo e direção de design para a reconstrução de ftfariasdev.github.io.
O protótipo navegável está em `design/prototipo/index.html`.

## Fontes consultadas

| Fonte | Status |
|---|---|
| Portfólio atual (este repositório, branch `main`) | lido |
| GitHub: perfil, README do perfil (`src/content.json`, `src/tokens.json`) e READMEs dos repositórios | lido |
| LinkedIn `/in/ftfariasdev` | prints enviados pelo Felipe (a rede da sessão bloqueia linkedin.com) |
| Fotos profissionais | 2 recebidas (palco da UNASP, pitch do Guardião Antigolpe), 2 a caminho |

## Perfil

- **Nome:** Felipe Teixeira Farias, `ftfariasdev`
- **Headline (LinkedIn):** Full Stack Developer @Softwrench | C# · .NET · AngularJS · SQL
- **Local:** Hortolândia, SP (Campinas e região), UTC−3
- **Idiomas:** português nativo, inglês básico a intermediário
- **Fora do código:** guitarra e bateria. O perfil do GitHub usa 96 BPM como tempo de todas as animações.
- **Frase:** "Compare yourself to who you were yesterday, not to who someone else is today."

## Experiência

**Full Stack Developer · Softwrench** (Scottsdale, AZ, EUA · remoto · tempo integral) · ago 2025 até hoje
- Desenvolvimento full stack de uma plataforma web de gestão de manutenção e ativos (CMMS) usada por clientes nos EUA.
- Funcionalidades de ponta a ponta: back-end em C#/.NET com SQL Server, front-end em AngularJS.
- Correção de bugs e melhoria contínua de um sistema existente.

**Grêmio estudantil:** liderança, comunicação, planejamento e trabalho em equipe. *Falta: instituição, cargo e período.*

## Formação

- **Sistemas de Informação · UNASP** (Centro Universitário Adventista de São Paulo), fev 2026 a dez 2029, em andamento
- **Técnico em Desenvolvimento Web · ETEC**, fev 2024 a jun 2025
- **17 certificados**, entre eles Python Intermediário (UNASP, nov 2025) e Python Básico (UNASP, mai 2025)
- **3º lugar na Semana da Tecnologia da UNASP Hortolândia** com o Guardião Antigolpe: feito sozinho em 9 dias, no 2º semestre

## Projetos

| Projeto | Resumo | Stack | Contexto |
|---|---|---|---|
| Guardião Antigolpe | PWA com IA que analisa mensagens suspeitas e avisa a família antes do Pix | TypeScript, React, Vite, Fastify, Prisma, Socket.IO, PostgreSQL, LLM, React Three Fiber | solo, 9 dias, 3º lugar |
| Pulso | Plataforma multiagente que conecta voluntários a demandas (modos PAZ e CRISE) | Python, FastAPI, IBM watsonx Orchestrate | Hackathon IA Descomplicada 2026 |
| SAGA | Sistema de gestão acadêmica | Node.js, Express, Prisma, PostgreSQL, Docker | TCC, time de 4 |
| LinSolve | Calculadora de sistemas lineares (SPD/SPI/SI) | FastAPI, React, TypeScript | faculdade |
| DevAgenda | Controle de horas por task, sem back-end, PWA | JavaScript | ferramenta pessoal |
| ElixirBotForTelegram | Bot que valida CPF | Elixir | faculdade, time de 5 |
| ftfariasdev (perfil) | README gerado por código, SVGs a partir de design tokens | Node.js, SVG, GitHub Actions | pessoal |

## Contato

- E-mail: farias_felipe@outlook.com.br
- LinkedIn: linkedin.com/in/ftfariasdev (o site atual aponta para `/in/devfelipefarias`, que deve ser trocado)
- GitHub: @ftfariasdev
- Instagram: @eu_felipefarias

## Direção de design (protótipo v2, "Matrix")

Regra do Felipe: o design não pode remeter a nenhum setor de negócio, apenas a TI.

- **Conceito:** uma sessão de terminal que "decodifica" o Felipe. Sem referência a setor, só a código.
- **Hero 3D (Three.js):** chuva de código em profundidade feita de tokens da stack dele (C#, SQL, AngularJS, `=>`, `{}`). O cursor ilumina as colunas, o clique envia um pulso e a câmera acompanha o mouse. O nome é decodificado letra a letra na abertura.
- **Painel `system.status`:** cargo, empresa, stack do dia a dia, local, hora local ao vivo e último build (Guardião, 3º lugar).
- **Retrato em ASCII** gerado da foto do pitch do Guardião; o botão "decodificar" revela a foto real. As fotos do Guardião também aparecem no card do projeto.
- **Paleta (tema escuro único):** void `#030806`, panel `#07130D`, phosphor `#3DFF8C`, phosphor dim `#1F8A50`, ink `#D9F7E6`, pill `#FF3B5C` (só para alertas e o easter egg).
- **Tipografia:** Martian Mono condensada (títulos, rótulos, terminal) e IBM Plex Sans (texto corrido).
- **Interações:** terminal com comandos (incluindo `redpill`/`bluepill`), títulos que embaralham no hover, cards com tilt 3D, filtros, árvore `~/stack` ligada aos projetos, troca PT/EN.
- **Texto da experiência:** descreve a Softwrench como "plataforma web de gestão de manutenção e ativos (CMMS)".
- **Acessibilidade:** respeita "reduzir movimento", foco visível, contraste alto.

## Pendências

1. Aprovação do protótipo v2 ou lista de ajustes (nenhum código do site será escrito antes disso)
2. Fotos 3 e 4
3. Grêmio estudantil: instituição, cargo e período
4. SAGA foi o TCC da ETEC?
5. Quais dos 17 certificados destacar
6. Idioma padrão do site (PT ou EN)
