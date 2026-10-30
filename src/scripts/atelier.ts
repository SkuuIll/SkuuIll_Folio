const english = document.documentElement.lang.startsWith("en");
const t = (es: string, en: string) => english ? en : es;
const shots = [
  ...document.querySelectorAll<HTMLButtonElement>("[data-atelier-shot]"),
];
document.querySelector(".atelier-tabs")?.removeAttribute("hidden");
shots.forEach((button) =>
  button.addEventListener("click", () => {
    const image = document.querySelector<HTMLImageElement>("#atelier-shot");
    if (!image) return;
    image.src = button.dataset.atelierShot!;
    image.alt = button.dataset.shotAlt!;
    if (
      document.documentElement.dataset.effects === "full" &&
      document.documentElement.dataset.motion !== "paused"
    ) {
      image.animate(
        [
          { opacity: 0.35, transform: "scale(1.015)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" },
      );
    }
    shots.forEach((item) =>
      item.setAttribute("aria-pressed", String(item === button)),
    );
  }),
);
document
  .querySelectorAll<HTMLElement>("[data-model-viewer]")
  .forEach((shell) => {
    const start = shell.querySelector<HTMLElement>(".viewer-start")!;
    const button = shell.querySelector<HTMLButtonElement>("[data-load-model]")!;
    const stage = shell.querySelector<HTMLElement>(".viewer-stage")!;
    const controls = shell.querySelector<HTMLElement>(".viewer-controls")!;
    const status = shell.querySelector<HTMLElement>(".viewer-status")!;
    start.hidden = false;
    let dispose: (() => void) | undefined;
    let loading = false;
    button.addEventListener("click", async () => {
      if (loading) return;
      loading = true;
      button.disabled = true;
      button.textContent = t("Cargando prenda…","Loading garment…");
      status.textContent = t("Preparando la muestra 3D.","Preparing the 3D preview.");
      try {
        const { mountModel } = await import("./model-viewer");
        stage.hidden = false;
        dispose = await mountModel(stage, shell.dataset.model!, shell);
        start.hidden = true;
        controls.hidden = false;
        status.textContent =
          t("Muestra 3D lista. Arrastrá horizontalmente para girar; también podés usar los botones o las flechas del teclado. El scroll vertical sigue disponible.","3D preview ready. Drag horizontally to rotate, or use the controls or arrow keys. Vertical scrolling remains available.");
        stage.querySelector("canvas")?.focus();
      } catch {
        stage.hidden = true;
        stage.replaceChildren();
        status.textContent =
          t("La vista 3D no está disponible en este dispositivo. Podés explorar las capturas del Atelier.","3D preview is not available on this device. You can browse the Atelier screenshots instead.");
      } finally {
        loading = false;
        button.disabled = false;
        button.textContent = t("Activar muestra 3D","Activate 3D preview");
      }
    });
    shell.querySelector("[data-close-model]")?.addEventListener("click", () => {
      dispose?.();
      dispose = undefined;
      stage.hidden = true;
      controls.hidden = true;
      start.hidden = false;
      status.textContent =
        t("Muestra 3D cerrada. Se liberaron sus recursos gráficos.","3D preview closed. Graphics resources released.");
      button.focus();
    });
    window.addEventListener("pagehide", () => dispose?.(), { once: true });
  });
