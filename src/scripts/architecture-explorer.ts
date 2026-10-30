export {};
// A meaningful CSS-only data-flow illustration using documented project stacks.
// Does not request private APIs, claim live telemetry, or load WebGL.
const root = document.querySelector<HTMLElement>("[data-architecture]");
if (root) {
  const stage = root.querySelector<HTMLElement>(".architecture-stage");
  const english = document.documentElement.lang.startsWith("en");
  const t = (es: string, en: string) => english ? en : es;
  const projects = {
    vigia: {
      name: "Vigía · " + t("Gestión Hotelera", "Hotel Management"),
      slug: "vigia",
      nodes: [
        ["React / Android", t("Panel y app móvil", "Dashboard and mobile app"), t("El panel web y la aplicación Android presentan habitaciones, rondas y personal.", "The web dashboard and Android application present rooms, rounds, and staff.")],
        ["NestJS", t("API y permisos", "API and permissions"), t("La API conecta los módulos y delimita la información por sede, rol y permisos.", "The API connects modules and scopes information by site, role, and permissions.")],
        ["PostgreSQL", t("Persistencia", "Persistence"), t("Los datos de operación se organizan en PostgreSQL mediante Prisma.", "Operational data is stored in PostgreSQL through Prisma.")],
        [t("Operación", "Operations"), t("Hotel, rondas y personal", "Hotel, rounds and staff"), t("Se documentan reservas, rondas GPS consentidas y tareas del personal según los módulos disponibles.", "Documented workflows include bookings, consent-based GPS rounds and staff tasks, depending on enabled modules.")],
      ],
    },
    cpaul: {
      name: "CPAUL · " + t("Comercio personalizado", "Custom commerce"),
      slug: "cpaul",
      nodes: [
        ["Next.js / React", t("Tienda + Atelier", "Store + Atelier"), t("La experiencia web presenta catálogo, pedidos y un editor visual de prendas.", "The web experience presents the catalog, orders, and a clothing customization editor.")],
        ["TypeScript", t("Lógica comercial", "Commerce logic"), t("La aplicación coordina catálogo, carrito, personalización y pedidos.", "The application coordinates catalog, cart, customization and orders.")],
        ["Prisma / PostgreSQL", t("Catálogo y pedidos", "Catalog and orders"), t("Prisma y PostgreSQL estructuran productos y operaciones; Redis forma parte del stack documentado.", "Prisma and PostgreSQL structure products and operations; Redis is part of the documented stack.")],
        [t("Administración", "Administration"), t("Gestión comercial", "Commerce management"), t("El comercio conecta las vistas de compra con la gestión administrativa de productos y pedidos.", "The storefront connects purchasing views with product and order management.")],
      ],
    },
    "repo-setup": {
      name: "Repo Setup Kit",
      slug: "repo-setup",
      nodes: [
        ["Windows / Linux", t("Punto de entrada", "Entry points"), t("Los scripts permiten preparar repositorios desde entornos Windows y Linux.", "Scripts prepare repositories from Windows and Linux environments.")],
        ["Python / Shell", t("Configuración", "Configuration"), t("Se preparan instrucciones, contexto y comprobaciones para trabajar con Git y agentes.", "Instructions, project context, and checks are prepared for Git and agent workflows.")],
        [t("Diagnóstico", "Diagnostics"), t("Comprobaciones y vista previa", "Checks and previews"), t("Las herramientas de diagnóstico y previsualización indican qué quedó configurado y qué falta.", "Diagnostic and preview tools report what has been configured and what remains.")],
        ["GitHub Actions", t("Integración / CI", "Integration / CI"), t("Hooks e integraciones de CI se utilizan cuando el entorno lo permite; no se presume una instalación completa.", "Hooks and CI integrations are used where supported, without assuming every setup is complete.")],
      ],
    },
  } as const;
  type Key = keyof typeof projects;
  const projectButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-arch-project]")];
  const nodeButtons = [...root.querySelectorAll<HTMLButtonElement>("[data-arch-node]")];
  const title = root.querySelector<HTMLElement>("[data-arch-title]");
  const label = root.querySelector<HTMLElement>("[data-arch-detail-label]");
  const detail = root.querySelector<HTMLElement>("[data-arch-detail]");
  const link = root.querySelector<HTMLAnchorElement>("[data-arch-case]");
  const linkLabel = root.querySelector<HTMLElement>("[data-arch-case-label]");
  const feedback = root.querySelector<HTMLElement>("[data-arch-feedback]");
  const replay = root.querySelector<HTMLButtonElement>("[data-arch-replay]");
  const replayLabel = root.querySelector<HTMLElement>("[data-arch-replay-label]");
  const base = import.meta.env.BASE_URL;
  const localePath = english ? "en/projects/" : "proyectos/";
  const prefix = english ? "Stage" : "Etapa";
  let chosen: Key = "vigia";
  let step = 0;
  let timer: number | undefined;
  function setStep(next: number) {
    step = next;
    root.dataset.step = String(step);
    nodeButtons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === step)));
    const entry = projects[chosen].nodes[step];
    if (label) label.textContent = String(step + 1).padStart(2, "0") + " / " + prefix;
    if (detail) detail.textContent = entry[2];
  }
  function stopFlow() {
    if (timer !== undefined) window.clearTimeout(timer);
    timer = undefined;
    if (stage) stage.dataset.flow = "idle";
    if (replay) replay.disabled = false;
    if (replayLabel) replayLabel.textContent = t("Reproducir flujo", "Replay flow");
  }
  function selectProject(key: Key) {
    stopFlow();
    chosen = key;
    root.dataset.project = key;
    projectButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.archProject === key)));
    if (title) title.textContent = projects[key].name;
    nodeButtons.forEach((button, i) => {
      const part = projects[key].nodes[i];
      const name = button.querySelector<HTMLElement>("[data-arch-node-title]");
      const sub = button.querySelector<HTMLElement>("[data-arch-node-sub]");
      if (name) name.textContent = part[0];
      if (sub) sub.textContent = part[1];
    });
    const slug = projects[key].slug;
    if (link) link.href = base + localePath + slug + "/";
    if (linkLabel) linkLabel.textContent = t("Explorar el caso ", "Explore case study: ") + projects[key].name;
    if (feedback) feedback.textContent = t("Elegí un módulo o reproducí el flujo visual.", "Select a module or replay the visual flow.");
    setStep(0);
  }
  projectButtons.forEach(button => button.addEventListener("click", () => {
    const key = button.dataset.archProject as Key;
    if (key in projects) selectProject(key);
  }));
  nodeButtons.forEach((button,i) => button.addEventListener("click", () => {
    stopFlow();
    setStep(i);
  }));
  replay?.addEventListener("click", () => {
    stopFlow();
    if (stage) stage.dataset.flow = "running";
    replay.disabled = true;
    if (replayLabel) replayLabel.textContent = t("Reproduciendo…", "Replaying…");
    if (feedback) feedback.textContent = t("Simulación visual: interfaz → lógica → datos → operación.", "Visual simulation: interface → logic → data → operations.");
    // A discrete state change and an actual, visible CSS packet animation.
    timer = window.setTimeout(() => {
      setStep(3);
      stopFlow();
      if (feedback) feedback.textContent = t("Flujo simulado completado. Podés volver a explorarlo.", "Simulated flow complete. You can explore it again.");
    }, 1900);
  });
  window.addEventListener("pagehide", stopFlow, {once:true});
  // Keep static initial markup meaningful if script execution is blocked.
  selectProject("vigia");
}
