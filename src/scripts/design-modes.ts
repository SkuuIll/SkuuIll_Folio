// Fourteen distinct art directions share one content tree. Names and descriptions are editorial, not SEO copy.
export {};
const root = document.documentElement;
const modes = [
  { key:"editorial", palette:"matrix", es:"Editorial / Identidad", en:"Editorial / Identity",
    esNote:"Tipografía protagonista, composición asimétrica y un lenguaje visual sobrio.",
    enNote:"Oversized type, asymmetrical composition and a restrained visual language." },
  { key:"casebook", palette:"copper", es:"Casebook / Proyectos", en:"Casebook / Projects",
    esNote:"Los trabajos lideran: tarjetas panorámicas y estética de revista de producto.",
    enNote:"The work leads: cinematic project spreads and product-magazine styling." },
  { key:"systems", palette:"ice", es:"Systems / Arquitectura", en:"Systems / Architecture",
    esNote:"Retículas técnicas, precisión y laboratorio de arquitectura interactivo.",
    enNote:"Technical grids, precision and an interactive architecture workbench." },
  { key:"atelier", palette:"violet", es:"Atelier / Perfil", en:"Atelier / About",
    esNote:"Una presentación más personal, con ritmo narrativo y tipografía expresiva.",
    enNote:"A more personal presentation with narrative pacing and expressive type." },
  { key:"chromatic", palette:"neon", es:"Chromatic / Identidad", en:"Chromatic / Identity",
    esNote:"Color audaz, formas modulares y una marca digital más experimental.",
    enNote:"Bold color, modular shapes and a more experimental digital identity." },
  { key:"pocket", palette:"forest", es:"Pocket / Rendimiento", en:"Pocket / Performance",
    esNote:"Menos ornamentación; claridad, contraste y lectura rápida en móvil.",
    enNote:"Less ornament; clarity, contrast and quick reading on mobile." },
  { key:"studio", palette:"amber", es:"Studio / Servicios", en:"Studio / Services",
    esNote:"Presentación de estudio independiente, servicios y contacto al frente.",
    enNote:"An independent-studio presentation, with services and contact up front." },
  { key:"skull-os", palette:"blue", es:"SKULL OS / Escritorio", en:"SKULL OS / Desktop",esNote:"Un sistema de escritorio con aplicaciones de proyectos.",enNote:"An interactive desktop with project apps." },
  { key:"xray", palette:"ice", es:"X-Ray 3D / Capas", en:"X-Ray 3D / Layers",esNote:"Placas de arquitectura explotadas en perspectiva.",enNote:"Exploded architecture plates in perspective." },
  { key:"museum", palette:"copper", es:"Digital Museum / Galería", en:"Digital Museum / Gallery",esNote:"Proyectos expuestos como obras de una galería.",enNote:"Projects displayed as gallery exhibits." },
  { key:"terminal", palette:"matrix", es:"Terminal Hacker Pro", en:"Terminal Hacker Pro",esNote:"Comandos reales para explorar habilidades y trabajos.",enNote:"Real commands for exploring projects and skills." },
  { key:"canvas", palette:"cobalt", es:"Infinite Canvas / Mapa", en:"Infinite Canvas / Map",esNote:"Un mapa interactivo de proyectos con controles de zoom.",enNote:"An interactive project map with zoom controls." },
  { key:"brutalist", palette:"amber", es:"Neo-Brutalist Lab", en:"Neo-Brutalist Lab",esNote:"Tipografía industrial, bordes duros y proceso interactivo.",enNote:"Industrial typography, hard edges and interactive process." },
  { key:"story", palette:"violet", es:"Story Mode / Capítulos", en:"Story Mode / Chapters",esNote:"El proceso de crear software contado en cuatro capítulos.",enNote:"The software process told through four chapters." },
] as const;
const english = root.lang.startsWith("en");
const selector = document.querySelector<HTMLElement>("[data-design-ribbon]");
if (selector) {
  const title = selector.querySelector<HTMLElement>("[data-design-name]");
  const note = selector.querySelector<HTMLElement>("[data-design-note]");
  const index = selector.querySelector<HTMLElement>("[data-design-index]");
  const icon = selector.querySelector<HTMLElement>("[data-design-icon]");
  const direct = selector.querySelector<HTMLSelectElement>("[data-design-select]");
  const prev = selector.querySelector<HTMLButtonElement>("[data-design-prev]");
  const next = selector.querySelector<HTMLButtonElement>("[data-design-next]");
  const paletteOf = (key: string) => modes.find((mode) => mode.key === key);
  const remember = (key: string) => {
    try { sessionStorage.setItem("skull-design-last", key); } catch {}
    try { localStorage.setItem("skull-design-last", key); } catch {}
  };
  // One semantic h1 in the active landing, even though all editions are
  // statically rendered for SEO and switch instantly without reloading.
  // Inactive scenes remain h2 so they cannot produce duplicate h1 elements.
  const swapHeading = (node: HTMLElement, tag: "h1" | "h2") => {
    if (node.tagName.toLowerCase() === tag) return;
    const next = document.createElement(tag);
    for (const attr of Array.from(node.attributes)) next.setAttribute(attr.name, attr.value);
    while (node.firstChild) next.appendChild(node.firstChild);
    node.replaceWith(next);
  };
  const syncHeadings = (key: string) => {
    const sceneActive = document.querySelector('[data-edition-scene="' + key + '"]') !== null;
    const original = document.getElementById("hero-title");
    if (original) swapHeading(original, sceneActive ? "h2" : "h1");
    for (const heading of Array.from(document.querySelectorAll<HTMLElement>("[data-primary-heading]"))) {
      const parent = heading.closest("[data-edition-scene]");
      swapHeading(heading, parent?.getAttribute("data-edition-scene") === key ? "h1" : "h2");
    }
  };
  let transitionTimer:ReturnType<typeof setTimeout>|undefined;
  const revealEdition = () => {
    const target=document.querySelector<HTMLElement>("main");
    if(!target)return;
    target.classList.remove("edition-revealing");
    // Restart short transition after each explicit edition change.
    void target.offsetWidth;
    target.classList.add("edition-revealing");
    if(transitionTimer!==undefined)clearTimeout(transitionTimer);
    transitionTimer=setTimeout(()=>target.classList.remove("edition-revealing"),450);
  };
  const paint = (key: string, save: boolean) => {
    const mode = paletteOf(key) ?? modes[0];
    root.dataset.design = mode.key;
    syncHeadings(mode.key);
    root.dataset.palette = mode.palette;
    if (direct) direct.value = mode.key;
    if (title) title.textContent = english ? mode.en : mode.es;
    if (note) note.textContent = english ? mode.enNote : mode.esNote;
    const at = modes.findIndex((item) => item.key === mode.key);
    if (index) index.textContent = String(at + 1).padStart(2, "0") + " / 14";
    if (icon) icon.textContent = String(at + 1).padStart(2, "0");
    if (save){remember(mode.key);revealEdition()}
    const color = getComputedStyle(root).getPropertyValue("--paper").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content",color);
  };
  const move = (direction: number) => {
    const current = modes.findIndex((item) => item.key === root.dataset.design);
    paint(modes[((current < 0 ? 0 : current) + direction + modes.length) % modes.length].key, true);
  };
  direct?.addEventListener("change", () => paint(direct.value,true));
  prev?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));
  paint(root.dataset.design || modes[0].key, false);
}
