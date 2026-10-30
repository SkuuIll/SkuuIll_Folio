# SKULL: cinco skills de diseño (2026-10-30)

Esta carpeta contiene **puntos de entrada de skills para agentes**, copiados de repositorios públicos con licencias y autoría conservadas. No son dependencias runtime de Astro.

## Fuentes verificadas

| Skill | Upstream | Uso en SKULL | Estado del árbol incluido |
| --- | --- | --- | --- |
| UX Designer | `szilu/ux-designer-skill` | WCAG 2.2, móvil, i18n, pruebas y accesibilidad | `SKILL.md` + referencias seleccionadas |
| Canvas Design | `anthropics/skills` — `canvas-design` | filosofía visual y composición editorial | `SKILL.md` + Apache 2.0 |
| App Store Screenshots | `ParthJadhav/app-store-screenshots` | textos orientados al beneficio y presentación con capturas reales | `SKILL.md` + `copy-ideas.md`; editor Next.js no incorporado |
| Taste | `Leonxlnx/taste-skill` — `design-taste-frontend` | dirección de arte distinta entre 14 ediciones; auditoría antes de publicar | `SKILL.md`; scripts auxiliares no incorporados |
| Transitions.dev | `JakubAntalik/transitions.dev` — `transitions-dev` | tokens de movimiento, transiciones cortas, fallback de movimiento reducido | `SKILL.md` + recetas seleccionadas |

**Corrección de origen:** `szilut/ux-designer-skill` da 404. El repositorio verificable es `szilu/ux-designer-skill`.

## Instalación completa de recursos complementarios

Para que los editores/agentes tengan **todos** los scripts, plantillas, tipografías o recetas incluidos por sus autores, ejecutar localmente desde la raíz:

```bash
npm run skills:sync
```

El script `scripts/sync-design-skills.sh` usa `npx skills@1.7.4` con alcance de proyecto y agente Codex. **No se ejecuta automáticamente en CI ni en producción**. Revisar cambios de terceros antes de subirlos. Ejecutar no activa automáticamente ninguna dependencia de la web.

El editor de App Store Screenshots es un proyecto Next.js aparte; si se necesita, usarlo como herramienta local de material de marketing, **nunca incluirlo en `src/` o `dependencies` de SKULL**.

## Aplicación realizada al sitio

- La nueva sección `ProductFrames.astro` enseña capturas **reales** de Vigía, CPAUL y Tactical Map con un beneficio legible por panel, alt descriptivo y enlace a cada caso.
- `src/styles/skill-polish.css` unifica tiempos de interacción de 160/260/420 ms, refuerza foco visible y respeta `prefers-reduced-motion`.
- La galería se adapta a la identidad de cada una de las 14 ediciones sin cambiar los datos ni falsear estados de publicación en tiendas.
- El diseño se documenta en `docs/skull-visual-philosophy.md` y mantiene los principios de `docs/design-quality.md`.

## Controles

```bash
npm run check
npm run build
npx playwright test
npm run check:privacy
```

No presentar un mockup o un dispositivo decorativo como captura de una app publicada. Mantener los textos en ES/EN y las pruebas de 360px, teclado y movimiento reducido.
