# Criterios de diseño y calidad — Skull

## Identidad
- **Marca:** Skull (usuario técnico SkuuIll). URL principal: https://skuuill.pages.dev/.
- **Carácter:** estudio independiente de desarrollo, interfaces, sistemas y experiencias digitales. Editorial, técnico, preciso; evitar efectos sin función.
- **Jerarquía:** una idea principal por sección; textos descriptivos verificables; proyectos visibles antes de elementos ornamentales.
- **Casos privados:** indicar claramente que son privados y diferenciar prototipos, demostraciones y producto real.

## Diseño y usabilidad
- Tipografía legible y escalable; line-height adecuado, ancho de columna razonable y saltos de línea robustos.
- Controles comprensibles, estados hover/focus/active y navegación por teclado; no esconder interacciones solo detrás del cursor.
- Responsive comprobado al menos en 375, 768, 1024 y 1440 px; texto sin recortes a 200% de zoom.
- Contraste y textos alternativos; enlaces con nombre significativo; los errores deben explicarse en texto.
- Soportar `prefers-reduced-motion`, pausas para efectos costosos y contenido útil sin JavaScript.
- Evitar tendencias genéricas, efectos que dificulten la lectura y animación constante sin propósito.

## Calidad técnica
- Imágenes y recursos optimizados, fuentes locales, evitar JavaScript y dependencias que no aporten valor claro.
- Verificar `title`, `description`, `canonical`, Open Graph, favicon y enlaces en la URL de producción.
- Mantener la privacidad, acceso a repos privados y límites de las demos representados honestamente.
- Antes de publicar: `npm run check`; `npm run check:privacy`; `npm run build`; pruebas Playwright si el entorno las soporta.

## Proceso
Las referencias **UI UX Pro Max**, **Impeccable** y **Superpowers** se explican en [agent-toolkit.md](agent-toolkit.md). Se aplican como criterios y posibles herramientas en el entorno del desarrollador, no como dependencias instaladas automáticamente ni como sustitutos de pruebas reales.
