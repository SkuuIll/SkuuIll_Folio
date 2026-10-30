import { projects, type Project } from "./projects";

export type Locale = "es" | "en";
type Description = {
  summary: string;
  challenge: string;
  solution: string;
  highlights: string;
  scope: string;
  label?: string;
  title?: string;
};

// Editorial translations of documented public descriptions, not new product claims.
const english: Record<string, Description> = {
  vigia: {
    title: "Vigía", label: "Connected operations",
    summary: "Hotel operations, GPS patrols and personnel management in a connected web and Android ecosystem.",
    challenge: "Connect the hotel's day-to-day operations with field staff and centralized supervision.",
    solution: "An administration dashboard, API and Android application for rounds, received locations, evidence and synchronization, with site- and role-based permissions.",
    highlights: "Rooms, rates, bookings, guests and cash operations; patrol checkpoints, GPS history from consent-based shifts, staff records and attendance.",
    scope: "Available modules and features depend on each installation and license. Listing a module does not imply all workflows are deployed."
  },
  cpaul: {
    label: "Commerce & 3D customization",
    summary: "A customized clothing storefront with catalog, orders and an interactive 3D Atelier.",
    challenge: "Bring product customization and retail operations into one coherent experience.",
    solution: "A commerce interface with catalog, cart and payment flows connected to product and order management tools.",
    highlights: "3D Atelier customization, catalog and ordering workflows, administration and data persistence.",
    scope: "Private code. Payment and external integrations depend on the configured environment."
  },
  "repo-setup": {
    label: "Developer tooling",
    summary: "Reproducible repository setup for Git, Codex and AI-assisted workflows.",
    challenge: "Reduce repetitive project setup while giving coding assistants useful context.",
    solution: "A Windows and Linux kit for instructions, checks, repository analysis and contextual workflows.",
    highlights: "Setup scripts, diagnostics, previews and integrations such as RTK, GitNexus, Engram, hooks and CI where supported.",
    scope: "No specific token savings are guaranteed; partial setup is reported explicitly."
  },
  "pubg-map": {
    label: "Interactive cartography / PWA",
    summary: "Interactive maps, measurements and annotations to plan PUBG matches.",
    challenge: "Bring planning and measurement tools for the game into a shareable interface.",
    solution: "A modular web map for in-game mortar calculations, annotations and URL-based configuration.",
    highlights: "Distance measurement, drawing tools, image export, shareable presets, PWA support, themes and keyboard shortcuts.",
    scope: "Designed for the PUBG video game. Calculations refer only to its in-game mechanics."
  },
  fluxnet: {
    label: "Android & networking",
    summary: "Mobile client, API, administration panel and VPS nodes for a VPN platform.",
    challenge: "Coordinate Android clients, administration and distributed network nodes.",
    solution: "A system architecture connecting mobile apps, a cloud API, an administrative UI and a worker on each VPS.",
    highlights: "Flutter and Kotlin Android clients, node administration, server components and Linux operations.",
    scope: "Private development. Some client variants require additional device testing and are not presented as universally validated."
  },
  pipa: {
    label: "Gaming community identity",
    summary: "A distinct web presence for PIPAA and the Panza Army community.",
    challenge: "Introduce a gaming brand and bring its community into a dedicated space.",
    solution: "A visually focused landing page built around the brand and its audience.",
    highlights: "Gaming-oriented visual identity, community presentation and responsive web UI.",
    scope: "Public project. Community brands and content remain with their respective owners."
  },
  "mi-taller": {
    label: "Textile production management",
    summary: "Quoting, embroidery, clients, production, expenses and inventory for a textile workshop.",
    challenge: "Organize commercial and operational tasks in a textile studio.",
    solution: "A responsive web app for quotes, client records, product catalogs and production tracking.",
    highlights: "Clothing and embroidery quotes, production management, expense tracking, inventory, documents and PWA support.",
    scope: "Private project; descriptions reflect its available documentation."
  },
  showroom: {
    label: "Commercial catalog",
    summary: "A product catalog with filters, variants, stock and WhatsApp inquiries.",
    challenge: "Connect product discovery with practical catalog management.",
    solution: "A searchable catalog with filters, an access-controlled dashboard and assisted product publishing.",
    highlights: "Variants, stock tracking, category filters, product administration and WhatsApp inquiries.",
    scope: "Private code. External integrations depend on their configuration."
  },
  devblog: {
    label: "Editorial platform",
    summary: "A publishing platform with users, roles, posts and AI-assisted content.",
    challenge: "Implement an end-to-end editorial workflow as a hands-on learning project.",
    solution: "A blog with authentication, administration and assisted content creation developed for Informatorio Chaco.",
    highlights: "User roles, editor, comments, content management and optional image and text generation.",
    scope: "Educational project with a public repository; AI services require separate configuration."
  },
  newsblog: {
    label: "News & APIs",
    summary: "A news application with its own API, admin interface and independent frontend.",
    challenge: "Separate editorial content management from its public presentation.",
    solution: "An editorial backend with REST API and JWT authentication alongside a responsive Nuxt frontend.",
    highlights: "Editorial CRUD, moderation, administration dashboard, decoupled frontend and JWT authentication.",
    scope: "The description reflects the project's documented portfolio scope."
  },
  nfile: {
    label: "Android / open source",
    summary: "A fork of NFile with file browsing, galleries, playback and text editing.",
    challenge: "Combine file management and media browsing in a mobile interface.",
    solution: "Work based on the open-source NFile Android manager, with file navigation, categories and viewers.",
    highlights: "Copy, move and organize files, media viewers, players and a text editor.",
    scope: "Fork of Senzme/NFile with original attribution and GPL v3 licensing; not claimed as sole original work."
  },
  "vigia-licencias": {
    label: "Windows licensing",
    summary: "A Windows application for issuing and verifying commercial installation licenses.",
    challenge: "Manage activations without distributing the supplier's private keys.",
    solution: "An offline license tool with issuance, validation, encrypted backups and packaging.",
    highlights: "License generation and verification, separated key management, backups and Windows distribution.",
    scope: "Private component of Vigía. Keys and installation details are not published."
  },
  "vigia-portal": {
    label: "Commercial administration",
    summary: "Client, sales, activation request and license delivery management.",
    challenge: "Centralize Vigía's commercial operations.",
    solution: "A portal built on managed storage and serverless services to support activation and renewal.",
    highlights: "Client records, activation requests, sales tracking, license preparation and delivery.",
    scope: "Private administrative tool; internal access links are not shared."
  },
  capture: {
    label: "Authorized web diagnostics",
    summary: "Reproducible reports and workflows for authorized web troubleshooting.",
    challenge: "Collect the information needed to investigate a web flow reproducibly.",
    solution: "A browser extension organizing network activity and events into diagnostic reports.",
    highlights: "Authorized network and event logs, JSON and HTML reports, sensitive-data handling on export.",
    scope: "Authorized diagnostics only. Private source code."
  },
  video: {
    label: "Media automation",
    summary: "A workflow from text and scripts through narration and subtitles to vertical video.",
    challenge: "Coordinate repetitive stages of video production.",
    solution: "A generation pipeline with web administration and local commands for content and rendering.",
    highlights: "Script creation, voice, captions, vertical rendering and operational tools.",
    scope: "Output depends on the models, services and resources configured for each run."
  },
  circulo: {
    label: "Local data analysis",
    summary: "Local analysis of official Instagram and Facebook data exports.",
    challenge: "Explore changes and relationships between exports without uploading them to a server.",
    solution: "A browser-based tool that parses official exports locally and prepares reports.",
    highlights: "JSON/ZIP export reading, relationship reports and comparison between exports.",
    scope: "Works only with files provided by the user; does not imply access to other people's accounts."
  },
  flagforge: {
    label: "Design tooling",
    summary: "Flag and icon generator for PUBG spectator mode.",
    challenge: "Customize visual assets for a spectator experience.",
    solution: "A browser generator with preview and downloadable asset packages.",
    highlights: "Flag and icon customization, visual preview and ZIP package export.",
    scope: "A utility for the PUBG video game and its spectator assets."
  },
  djangoautomatic: {
    label: "Developer automation",
    summary: "Automated Django project initialization and development environments.",
    challenge: "Avoid repetitive tasks when starting a Django project.",
    solution: "A script setting up virtual environments, dependencies, folders and basic configuration.",
    highlights: "Project scaffolding, environment configuration, dependencies and initial migrations.",
    scope: "A setup tool; each application's final configuration still requires review."
  },
  "mesa-unida": {
    label: "Hospitality prototype",
    summary: "An early modular foundation for restaurants and point-of-sale operations.",
    challenge: "Explore a management foundation for food service operations.",
    solution: "An open-source-based prototype exploring self-service, orders and QR-related workflows.",
    highlights: "Modular management foundations, restaurant workflows and open-source customization.",
    scope: "Work-in-progress prototype; planned QR, ordering and self-service features are not claimed as verified production functionality."
  },
  battlefx: {
    label: "Windows audio processing",
    summary: "A Windows gaming control center with system audio processing.",
    challenge: "Connect a desktop control interface to system-level audio components.",
    solution: "A WPF application with a custom system audio effect.",
    highlights: "Desktop controls, audio processing and integrated C# and C++ components.",
    scope: "Private code. Compatibility depends on the Windows environment and audio hardware."
  },
  botcheck: {
    label: "Monitoring & bots",
    summary: "A bot with administration panel, service monitoring and diagnostics.",
    challenge: "Bring operational service status and events into one interface.",
    solution: "A Telegram bot linked to an administrative dashboard and diagnostics tools.",
    highlights: "Service monitoring, diagnostics and log management, and administration UI.",
    scope: "Private code; connected services and integrations vary by environment."
  }
};

function englishStatus(value: string) {
  if (value === "Código privado") return "Private code";
  if (value === "Código público") return "Public code";
  if (value === "En desarrollo") return "In development";
  if (value === "Prototipo") return "Prototype";
  if (value.includes("Fork")) return "Open-source fork";
  return value;
}
export function projectsForLocale(locale: Locale) {
  if (locale === "es") return projects;
  return projects.map((project) => {
    const copy = english[project.id];
    if (!copy) throw new Error("Missing English description: " + project.id);
    const sections = [
      { title: "The challenge", body: copy.challenge },
      { title: "The solution", body: copy.solution },
      { title: "What's included", body: copy.highlights },
      { title: "Technologies", body: project.stack.join(" · ") },
      { title: "Status and scope", body: copy.scope }
    ];
    return { ...project, summary: copy.summary, label: copy.label ?? "Software & tools",
      title: copy.title ?? project.title, status: englishStatus(project.status), sections };
  });
}
export function projectForLocale(project: Project, locale: Locale) {
  return projectsForLocale(locale).find((entry) => entry.id === project.id) ?? project;
}
