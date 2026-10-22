# Skull / Folio

Portafolio web independiente de **Skull (SkuuIll)**, desarrollador freelance de software en Charata, Chaco, Argentina.

**Sitio previsto:** https://skuuill.github.io/SkuuIll_Folio/

> El perfil de GitHub se mantiene por separado en [SkuuIll/SkuuIll](https://github.com/SkuuIll/SkuuIll). Este repositorio contiene únicamente la aplicación web, su documentación y sus pruebas.

## Contenido

- **Inicio interactivo:** una experiencia generativa en Canvas 2D que responde al cursor y a la posición de lectura.
- **Proyectos seleccionados:** casos de software reales con capturas, tecnologías, estado público/privado y enlaces a cada caso.
- **Capacidades:** web, backend, Android, sistemas, infraestructura y automatización.
- **Laboratorio:** tres demostraciones con controles interactivos y navegación por teclado.
- **Archivo de proyectos:** índice filtrable y fichas individuales, con indicación del estado de cada desarrollo.
- **Experiencias espaciales:** recursos WebGL/Three.js activados bajo demanda cuando corresponde.

## Tecnologías

Astro · TypeScript · GSAP · Three.js · CSS · Canvas 2D · Playwright.

Las fuentes se sirven localmente; los recursos multimedia incluyen imágenes optimizadas, póster de respaldo y modelos 3D. Se respeta `prefers-reduced-motion`, se detienen animaciones fuera de pantalla y se soporta navegación sin JavaScript en las secciones esenciales.

## Desarrollo

Requiere Node.js 24 y npm.

```bash
npm ci
npm run dev
```

Abrí la dirección local que informa Astro. Para verificar:

```bash
npm run check
npm run check:privacy
npm run build
npx playwright install chromium
npx playwright test --workers=2
```

## GitHub Pages

La compilación está configurada para **`/SkuuIll_Folio/`**, no para la ruta del antiguo repositorio de perfil.

1. Abrí [Settings → Pages](https://github.com/SkuuIll/SkuuIll_Folio/settings/pages).
2. En **Build and deployment**, elegí **GitHub Actions** como origen.
3. En la pestaña **Actions**, abrí **Publish Skull Folio** y ejecutá **Run workflow** si el despliegue anterior falló por tener Pages desactivado.

El workflow [deploy.yml](.github/workflows/deploy.yml) verifica el proyecto, construye `dist/` y publica el artefacto. El workflow [qa.yml](.github/workflows/qa.yml) comprueba la experiencia en navegadores y tamaños de pantalla diferentes.

## Criterios de diseño

La dirección visual combina tipografía editorial, tarjetas modulares, capturas reales, microinteracciones moderadas y una experiencia generativa. Los efectos intensivos son progresivos: el contenido sigue accesible si se desactivan animaciones o JavaScript.

Las visualizaciones de proyectos privados no implican acceso público al código o a una demostración funcional; cada caso diferencia claramente las evidencias, alcances y limitaciones.

## Contacto

[GitHub](https://github.com/SkuuIll) · [Email](mailto:moreappmix@gmail.com)
