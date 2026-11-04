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

**Presidente do Grêmio Estudantil · Escola Estadual Prof. Hedy Madalena Bocchi** (4 anos): liderança, comunicação, planejamento e trabalho em equipe.

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
| SAGA | Sistema de gestão acadêmica | Node.js, Express, Prisma, PostgreSQL, Docker | TCC da ETEC (confirmado), time de 4 |
| LinSolve | Calculadora de sistemas lineares (SPD/SPI/SI) | FastAPI, React, TypeScript | faculdade |
| ElixirBotForTelegram | Bot que valida CPF | Elixir | faculdade, time de 5 |
| ftfariasdev (perfil) | README gerado por código, SVGs a partir de design tokens | Node.js, SVG, GitHub Actions | pessoal |

## Contato

- E-mail: farias_felipe@outlook.com.br
- LinkedIn: linkedin.com/in/ftfariasdev (o site atual aponta para `/in/devfelipefarias`, que deve ser trocado)
- GitHub: @ftfariasdev
- Instagram: @eu_felipefarias

## Direção de design (protótipo v3, estilo pôster)

Regra do Felipe: o design não pode remeter a nenhum setor de negócio, apenas a TI. A v2 (Matrix) foi reprovada; a v3 segue a referência enviada por ele (pôster escuro com vermelho, palavra gigante atrás da foto recortada).

- **Abertura:** log de boot, contador 000→100%, barra de progresso e a tela abrindo ao meio com um traço vermelho. Botão para pular (Enter/Esc) e para rever.
- **Hero:** "FTFARIAS" gigante em verde atrás da foto recortada (Felipe de camisa branca, olhando para a câmera; crachá mantido sem edição, a pedido dele). A foto do pitch com microfone e notebook foi para a seção Sobre. Nome, cargo, bio e CTAs à esquerda; janela de terminal do Guardião e números (7 projetos, 3º lugar, 17 certificados) à direita. Cursores colaborativos flutuando (C#, SQL Server, AngularJS) e um cursor "você" que segue o mouse.
- **Profundidade 3D:** grade, brilho, palavra, foto e interface se movem em camadas com o mouse.
- **Seções:** faixas cruzadas com a stack, Sobre com a foto do pitch recortada, Experiência com anos gigantes, Projetos com destaque do Guardião e lista com prévia flutuante de código, Stack em esfera 3D feita com HTML e CSS (sem WebGL, que falhava no aparelho do Felipe) que gira com arraste, Formação em cards. Sem seção de contato: o rodapé traz só a frase do Felipe e links para GitHub, LinkedIn e Instagram.
- **Paleta (v3.1, verde a pedido do Felipe):** preto `#0A0A0C`, grafite `#131317`, verde `#22D877`, verde escuro `#0C5A33`, off-white `#F3F0EC`, cinza `#8E8E96`; amarelo `#F5B940` só para pendências do protótipo.
- **Tipografia:** Anton (títulos), Caveat ("Olá, eu sou"), Manrope (texto), JetBrains Mono (rótulos e código).
- **Fotos:** recortadas localmente com rembg (modelo BiRefNet portrait) e exportadas em WebP com transparência.
- **Acessibilidade:** "reduzir movimento" pula a intro e desliga animações; foco visível; PT/EN.

## Pendências

1. Aprovação do protótipo v3 ou lista de ajustes (nenhum código do site será escrito antes disso)
2. Foto 4 (a foto 3, frontal, já está no topo)
3. Grêmio estudantil: instituição, cargo e período
4. SAGA foi o TCC da ETEC?
5. Quais dos 17 certificados destacar
6. Idioma padrão do site (PT ou EN)

## Decisões de conteúdo (03/11/2026)

- **Idiomas:** inglês é o padrão; o site também precisa estar em português e espanhol (seletor EN · PT · ES no topo).
- **SAGA:** confirmado como TCC da ETEC.
- **Certificados em destaque:** Profissional 5.0 (AC International Group e UNASP Hortolândia, 28/10/2026, 4 h) e Python Intermediário (UNASPython, 4ª edição, UNASP Hortolândia, 21/09 a 30/11/2025, 16 h). As imagens estão em `design/prototipo/img/cert-*.webp` e abrem ampliadas ao clicar. Os cursos da Alura entram empilhados em um baralho que se folheia com clique: Projetos com programação (7 h, 03/2024), Lógica de programação: jogo estilo Pong (10 h, 05/2024), ChatGPT: desvendando a IA (8 h, 07/2024) e Página web responsiva com HTML e CSS, parte 2 (8 h, 11/2024). Total de 33 h. A imagem quebrada do avatar foi trocada pela foto do Felipe; os arquivos em PNG estão em `design/certificados/`.
- **Foto do topo:** crachá e cordão do evento sem desfoque, a pedido do Felipe.

### Ainda falta
- Nada de conteúdo. Próximo passo: aprovação final do design e plano de implementação.

- **DevAgenda:** removido do portfólio a pedido do Felipe (03/11/2026). Agora são 6 projetos.
- **Sem cara de busca de emprego** (04/11/2026): removidos a seção "Vamos conversar", o botão do topo, o selo "disponível para novos projetos" e o "Open to work" das faixas. Nada no site deve sugerir que o Felipe procura trabalho.
- **Ícones do GitHub e LinkedIn** (04/11/2026): no topo, ao lado do seletor de idioma, e no rodapé (com Instagram).
- **Palavra do topo** (04/11/2026): PORTFOLIO trocado por FTFARIAS (marca pessoal e usuário do GitHub). A altura da palavra agora tem limite, para não cobrir os números da direita com a fonte real carregada.
- **Marca do topo** (04/11/2026): "FELIPE." trocado por "FELIPE FARIAS." (menor no celular para caber ao lado dos ícones e do seletor de idioma).
