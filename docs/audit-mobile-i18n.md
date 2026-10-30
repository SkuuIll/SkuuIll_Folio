# Auditoría de arquitectura, idiomas y rendimiento — Skull

Fecha: 2026-10-30. Web principal: https://skuull.pages.dev/.

## Inventario revisado por carpetas

| Ruta | Revisión y mejora |
|---|---|
| `src/pages/` | Home española, nuevo home inglés y archivo/casos bilingües bajo `/en/projects/`. Redirección heredada y 404. |
| `src/layouts/` | Enlaces de idiomas, `hreflang`, `canonical`, Open Graph y controles de apariencia. Se retiró del pie el panel «Acabado/Color» de la captura. |
| `src/components/` | Proyectos, contacto, experiencias 3D, Atelier, nuevo instrumento Anatomy en SVG. |
| `src/scripts/` | Localización de acciones, escenas WebGL bajo demanda, GSAP cargado de forma diferida, pausa de efectos y modo liviano. |
| `src/styles/` | Responsive, estados de foco, animaciones reducidas, degradación visual y controles de idioma. |
| `src/data/` | Registro original de 21 proyectos, presentación visual y descripciones inglesas manuales sin inventar prestaciones. |
| `public/` | Favicon, imagen social, licencia de fuentes y Three, capturas, modelos y otros recursos. La galería/modelo 3D mantiene carga diferida. |
| `tests/` | Navegador, accesibilidad, interacción, SEO, archivos localizados y simulación de dispositivo de 2 GB con ahorro de datos. |
| `scripts/` | Generación local de marca, privacidad, revisión visual y Lighthouse bajo ejecución explícita. |
| `docs/` | Alcance, privacidad, medios, criterio de diseño, herramientas de agentes y esta auditoría. |
| `.github/workflows/` | Publicación alternativa a GitHub Pages y validación con Playwright. Cloudflare Pages es el hosting principal. |

## Anatomy

Referencia de terceros: https://github.com/wheresryan22/anatomy (MIT). Se tomó su principio «el objeto explica el sistema» como dirección conceptual y se creó un instrumento SVG original: banco mecanizado con módulos de interfaz, lógica y entrega. Los botones alteran un indicador de forma accesible. **No** se distribuye el kit externo ni se añade WebGL u otra dependencia solo para esta figura.

## Política de rendimiento

1. El primer pantallazo conserva HTML, CSS y SVG útiles sin necesitar WebGL.
2. Las escenas complejas se cargan cerca del viewport; cuando el dispositivo informa ahorro de datos o memoria de 2 GB, se usa imagen/fallback estático en vez de instanciar Three/WebGL.
3. GSAP se importa dinámicamente solo cuando los efectos están permitidos; el fondo Canvas reduce densidad y resolución en dispositivos táctiles.
4. `prefers-reduced-motion` sigue controlando las animaciones; Matrix es opt-in y no se ejecuta en modo liviano.
5. El portafolio presenta siempre los proyectos y el formulario incluso si no hay 3D.

## Internacionalización

- Español: `/`, `/proyectos/`, `/proyectos/[slug]/`.
- Inglés: `/en/`, `/en/projects/`, `/en/projects/[slug]/`.
- Alternativas `hreflang` y rutas del sitemap; la portada, archivo, casos y navegación se renderizan en el idioma de cada URL.
- El catálogo conserva los nombres propios y datos técnicos originales; los textos ingleses explican el mismo estado y alcance.
- Los formularios no envían información a un servidor, sino que preparan un mensaje para correo.

## Validaciones

Las pruebas automatizadas verifican ambas rutas de idioma, menú, fichas de proyectos, navegación accesible, ilustración SVG y el fallback con memoria restringida. Las métricas Lighthouse reales de hardware bajo gama y redes locales deben medirse en un dispositivo objetivo antes de afirmar una puntuación numérica. Los resultados de la CI quedan consultables en GitHub Actions.

## Próximas oportunidades

Optimizar imágenes mediante `srcset` y formatos/anchos apropiados; revisar los modelos y texturas si se incorporan otras escenas; medir interacciones largas en teléfonos reales; mantener contenidos en ambos idiomas al editar nuevos casos.
