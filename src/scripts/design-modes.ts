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
// The original seven editions share a semantic hero but tell different,
// truthful stories about the same portfolio.
const heroCopy: Record<string, { es: [string, string, string]; en: [string, string, string] }> = {
  editorial: { es: ["Transformo ideas", "en software real.", "Diseño interfaces y desarrollo aplicaciones, APIs y sistemas. Del primer prototipo al despliegue."], en: ["I turn ideas", "into real software.", "I design interfaces and develop applications, APIs and systems. From first prototype to production."] },
  casebook: { es: ["Los proyectos", "hablan por sí solos.", "Una selección de productos, herramientas y experiencias: cada caso cuenta cómo fue construido."], en: ["The work", "speaks for itself.", "A selection of products, tools and experiences: each case tells the story of how it was built."] },
  systems: { es: ["Detrás de cada interfaz,", "un sistema.", "Diseño y conecto interfaces, APIs, datos e infraestructura para resolver problemas concretos."], en: ["Behind every interface,", "a system.", "I design and connect interfaces, APIs, data and infrastructure to solve real problems."] },
  atelier: { es: ["Diseño con intención.", "Código con oficio.", "Combino sensibilidad visual y desarrollo para crear experiencias que se pueden usar."], en: ["Design with intention.", "Code with craft.", "I combine visual thinking and development to create experiences people can use."] },
  chromatic: { es: ["Una idea.", "Muchas formas.", "Experimentos visuales, interfaces y software: una mirada a lo que pasa cuando el diseño se mueve."], en: ["One idea.", "Many forms.", "Visual experiments, interfaces and software: a look at what happens when design moves."] },
  pocket: { es: ["Software útil.", "Sin vueltas.", "Aplicaciones, herramientas y sistemas que hacen más simple el trabajo cotidiano."], en: ["Useful software.", "No detours.", "Applications, tools and systems that make everyday work simpler."] },
  studio: { es: ["Del problema", "al producto.", "Un estudio independiente para diseñar, construir y desplegar soluciones digitales."], en: ["From problem", "to product.", "An independent studio for designing, building and deploying digital solutions."] },
};
const workCopy: Record<string, { es: [string, string]; en: [string, string] }> = {
  editorial: {es:["No es un concepto.","Es software."],en:["Not just a concept.","It's working software."]},
  casebook: {es:["Cada proyecto", "tiene una historia."],en:["Every project", "has a story."]},
  systems: {es:["Arquitecturas", "para problemas reales."],en:["Architecture", "for real problems."]},
  atelier: {es:["Piezas hechas", "con intención."],en:["Work made", "with intention."]},
  chromatic: {es:["Ideas en movimiento.", "Software en acción."],en:["Ideas in motion.", "Software in action."]},
  pocket: {es:["Hecho para resolver.", "Menos ruido, más utilidad."],en:["Built to solve.", "Less noise, more purpose."]},
  studio: {es:["Del desafío", "al resultado."],en:["From challenge", "to outcome."]},
  "skull-os": {es:["Abrí un proyecto.", "Explorá el trabajo."],en:["Open a project.", "Explore the work."]},
  xray: {es:["Sistemas en capas.", "Productos reales."],en:["Layered systems.", "Real products."]},
  museum: {es:["Obras de código.", "Problemas reales."],en:["Works of code.", "Real problems."]},
  terminal: {es:["Proyectos", "listos para explorar."],en:["Projects", "ready to explore."]},
  canvas: {es:["Un mapa", "de lo que construyo."],en:["A map", "of what I build."]},
  brutalist: {es:["Trabajo concreto.", "Sin vueltas."],en:["Concrete work.", "No detours."]},
  story: {es:["Cada proyecto", "tiene un recorrido."],en:["Every project", "has a journey."]},
};
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
    const copy = heroCopy[mode.key];
    const hero = document.getElementById("hero-title");
    const lead = document.querySelector<HTMLElement>(".sp-hero .sp-lead");
    if(copy && hero){
      const [first, second, description] = english ? copy.en : copy.es;
      const emphasis = document.createElement("em");emphasis.textContent=second;
      hero.replaceChildren(document.createTextNode(first),document.createElement("br"),emphasis);
      if(lead)lead.textContent=description;
    }
    const workHeading=document.getElementById("portfolio-work-title");
    const work=workCopy[mode.key];
    if(workHeading && work){
      const [first, second] = english ? work.en : work.es;
      const emphasis=document.createElement("span");emphasis.textContent=second;
      workHeading.replaceChildren(document.createTextNode(first),document.createElement("br"),emphasis);
    }
    if (direct) direct.value = mode.key;
    if (title) title.textContent = english ? mode.en : mode.es;
    if (note) note.textContent = english ? mode.enNote : mode.esNote;
    // Project presentation carries each edition's identity beyond the hero.
    const workName=document.querySelector<HTMLElement>("[data-work-edition-name]");
    const workNote=document.querySelector<HTMLElement>("[data-work-edition-note]");
    if(workName)workName.textContent=english?mode.en:mode.es;
    if(workNote)workNote.textContent=english?mode.enNote:mode.esNote;
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
