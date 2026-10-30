# Seven Directions — diseño rotativo de SKULL

Implementado para las rutas españolas e inglesas. Un único árbol Astro sirve el contenido real; el modo de arte cambia en CSS y el nombre se presenta en una franja visible y accesible. No son sitios duplicados, ni versiones SEO diferenciadas.

## Las siete direcciones

1. **Editorial / Identidad:** tipografía de gran escala, ritmo arquitectónico, bordes rectos y composición asimétrica.
2. **Casebook / Proyectos:** enfoque de revista de producto, casos panorámicos e imágenes más grandes.
3. **Systems / Arquitectura:** retícula de laboratorio, tipografía monoespaciada y Anatomy como pieza visual.
4. **Atelier / Perfil:** composición personal, tipografía serif y sección de presentación desarrollador/capacidades verificables.
5. **Chromatic / Identidad:** gradientes de alto contraste, superficies modulares y estética experimental.
6. **Pocket / Rendimiento:** jerarquía limpia, superficies simples y legibilidad en móviles.
7. **Studio / Servicios:** enfoque en servicios, confianza y llamada a contacto, con paleta dorada.

## Comportamiento

- `src/layouts/Layout.astro` selecciona el siguiente modo **antes de pintar** la página, leyendo `skull-design-last` de sessionStorage o localStorage. El siguiente índice se calcula de forma cíclica para evitar repetir modos en recargas consecutivas.
- Cuando el navegador bloquea el almacenamiento, se inicia una versión predeterminada; no se prometen ciclos entre recargas en ese entorno.
- `src/scripts/design-modes.ts` sincroniza la etiqueta, el marcador 01/07 y los botones de anterior/siguiente. Al elegir otro modo manualmente, la siguiente recarga continúa desde allí.
- `src/styles/design-modes.css` contiene todas las composiciones y colores. Las identidades se extienden a tarjetas de proyecto, sección de arquitectura, perfil, servicios, tipografía y espacio.
- La elección no cambia títulos, rutas, información real de los proyectos, metadatos SEO, enlaces, idiomas ni funcionalidades principales.
- Se respetan `prefers-reduced-motion` y el modo liviano para hardware con pocos recursos. No se cargan siete motores ni componentes JS por separado.

## Comprobación

Ejecutar `npm run check`, `npm run check:privacy`, `npm run build`, `npx playwright test`. La suite `tests/design-modes.spec.js` cubre los siete modos, la rotación en recarga, la selección manual, inglés/español y ancho de pantalla de un dispositivo simulado con ahorro de datos.

Los siete diseños son direcciones artísticas de **un mismo portafolio** para facilitar comparación. La versión final puede seleccionarse posteriormente sin perder el trabajo.
