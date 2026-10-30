// Seven art directions share one content tree. Names and descriptions are editorial, not SEO copy.
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
] as const;
const english = root.lang.startsWith("en");
const selector = document.querySelector<HTMLElement>("[data-design-ribbon]");
if (selector) {
  const title = selector.querySelector<HTMLElement>("[data-design-name]");
  const note = selector.querySelector<HTMLElement>("[data-design-note]");
  const index = selector.querySelector<HTMLElement>("[data-design-index]");
  const icon = selector.querySelector<HTMLElement>("[data-design-icon]");
  const prev = selector.querySelector<HTMLButtonElement>("[data-design-prev]");
  const next = selector.querySelector<HTMLButtonElement>("[data-design-next]");
  const paletteOf = (key: string) => modes.find((mode) => mode.key === key);
  const remember = (key: string) => {
    try { sessionStorage.setItem("skull-design-last", key); } catch {}
    try { localStorage.setItem("skull-design-last", key); } catch {}
  };
  const paint = (key: string, save: boolean) => {
    const mode = paletteOf(key) ?? modes[0];
    root.dataset.design = mode.key;
    root.dataset.palette = mode.palette;
    if (title) title.textContent = english ? mode.en : mode.es;
    if (note) note.textContent = english ? mode.enNote : mode.esNote;
    const at = modes.findIndex((item) => item.key === mode.key);
    if (index) index.textContent = String(at + 1).padStart(2, "0") + " / 07";
    if (icon) icon.textContent = String(at + 1).padStart(2, "0");
    if (save) remember(mode.key);
    const color = getComputedStyle(root).getPropertyValue("--paper").trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content",color);
  };
  const move = (direction: number) => {
    const current = modes.findIndex((item) => item.key === root.dataset.design);
    paint(modes[((current < 0 ? 0 : current) + direction + modes.length) % modes.length].key, true);
  };
  prev?.addEventListener("click", () => move(-1));
  next?.addEventListener("click", () => move(1));
  paint(root.dataset.design || modes[0].key, false);
}
