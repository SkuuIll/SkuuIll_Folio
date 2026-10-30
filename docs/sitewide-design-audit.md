# Auditoría de diseño SKULL · 30 de octubre de 2026

## Alcance

Rediseño funcional para el portfolio Astro completo, sin sustituir sus 14 direcciones de arte ni agregar dependencias al cliente. La intervención incluye la portada, la galería de evidencia, el archivo de 21 proyectos, las 21 fichas individuales y sus equivalentes en inglés.

## Cinco skills, cinco decisiones observables

| Skill | Decisión aplicada |
| --- | --- |
| UX Designer | Mejor legibilidad del archivo con miniaturas y estado visible en móvil; navegación anterior/siguiente consistente y semántica; focos visibles y áreas de lectura claras |
| Canvas Design | Composición asimétrica y protagonismo de una captura real en la galería; uso de jerarquía, escala y espacio |
| App Store Screenshots | Mantener capturas reales, beneficios claros y rotulación honesta; no generar anuncios falsos ni integrar un editor Next.js innecesario |
| Taste (design-taste-frontend) | Evitar tres tarjetas idénticas en pantallas anchas; ajustar la composición al concepto de demostración técnica; preservar las personalidades de las 14 ediciones |
| Transitions.dev | Tiempos de 160/260/420 ms, foco y hover con semántica, animaciones opcionales y respeto a `prefers-reduced-motion` |

## Superficies tocadas

- **Portada ES/EN:** jerarquía editorial de la galería, con una captura protagonista y dos acompañantes en pantallas grandes, sin nuevos recursos remotos.
- **Archivo ES/EN:** imagen del proyecto cuando está documentada, marcador propio cuando no existe y estado conservado en pantallas pequeñas. No se crean falsas capturas.
- **Fichas ES/EN:** recorrido accesible y explícito entre el proyecto anterior, el siguiente y el archivo completo; el último proyecto termina en el archivo (no recorre circularmente al primero).
- **Sistema visual:** transiciones cortas, foco por teclado, contraste derivado de los tokens activos y composición responsive.
- **Copy:** corrección gramatical del título del archivo inglés.

## Pruebas

`tests/sitewide-skill-polish.spec.js` prueba las rutas ES/EN, los enlaces del recorrido, las miniaturas, el estado visible y el ancho de 360 px con movimiento reducido.

En CI: `npm run check`, `npm run check:privacy`, `npm run build` y `npx playwright test --workers=2`. Los resultados de CI deben consultarse antes de fusionar el PR.

## Límites e integridad

Los `SKILL.md` incluidos en `.agents/skills/` guían las decisiones; los ayudantes opcionales siguen disponibles mediante `npm run skills:sync`. Instalar esos ayudantes es independiente de publicar el portfolio. No insertar seguimiento ni recursos de terceros en runtime. No cambiar URLs, proyectos privados ni afirmaciones de publicación en tiendas.
