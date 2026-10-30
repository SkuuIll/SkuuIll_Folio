export {};
const machine = document.querySelector<HTMLElement>(".anatomy-section");
if (machine) {
  const en = document.documentElement.lang.startsWith("en");
  const labels = en ? ["Interface", "Application logic", "Delivery"] : ["Interfaz", "Lógica de aplicación", "Entrega"];
  const details = en
    ? ["Components, interface states and accessibility.", "API contracts, data validation, permissions and reliable behavior.", "Reproducible builds, automated tests and delivery."]
    : ["Diseño de componentes, estados y accesibilidad.", "Contratos de API, validación de datos, permisos y comportamiento confiable.", "Compilación reproducible, pruebas automáticas y publicación."];
  const buttons = [...machine.querySelectorAll<HTMLButtonElement>("[data-anatomy-step]")];
  const title = machine.querySelector<HTMLElement>("[data-anatomy-name]");
  const body = machine.querySelector<HTMLElement>("[data-anatomy-details]");
  const count = machine.querySelector<HTMLElement>("[data-anatomy-count]");
  const needle = machine.querySelector<SVGGElement>(".anatomy-needle");
  const select = (i: number) => {
    buttons.forEach((button, index) => button.setAttribute("aria-pressed", String(index === i)));
    if (title) title.textContent = labels[i];
    if (body) body.textContent = details[i];
    if (count) count.textContent = "0" + (i + 1) + " / 03";
    if (needle) needle.style.transform = "translate(" + (i * 152) + "px, " + (-i * 45) + "px)";
  };
  buttons.forEach((button, i) => button.addEventListener("click", () => select(i)));
}
