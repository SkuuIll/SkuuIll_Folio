# Toolkit de diseño y desarrollo asistido · Skull

Este documento integra **referencias de trabajo** para los agentes que colaboran en el portafolio. No incluye ni ejecuta código de terceros: instalar un skill en un editor o agente requiere hacerlo en ese entorno.

## 1. UI UX Pro Max

- Fuente oficial: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Propósito: explorar patrones de portafolio, jerarquías visuales, tipografías, paletas y criterios de UX; contrastar las propuestas con nuestra identidad editorial y técnica.
- Instalación oficial (ejemplo en Codex CLI):

```bash
npm install -g ui-ux-pro-max-cli
uipro init --ai codex
```

Para Cursor se usa `uipro init --ai cursor`; para otros agentes, consultar el README actualizado. Python 3 es necesario para el script de búsqueda.

## 2. Impeccable

- Fuente oficial: https://github.com/pbakaus/impeccable
- Propósito: revisar componentes existentes, detectar antipatrones y priorizar mejoras visuales, de accesibilidad y de rendimiento.
- Instalación y verificación opcionales:

```bash
npx impeccable install
npx impeccable detect src/
```

En un agente compatible, iniciar el contexto de producto con `/impeccable init` (o `$impeccable init` en Codex). Revisar los hooks antes de habilitarlos; el instalador puede crear configuración y descargar herramientas adicionales.

## 3. Superpowers

- Fuente oficial: https://github.com/obra/superpowers
- Propósito: organizar cambios complejos con una breve especificación, plan, pruebas, revisión y verificación.
- Instalación: usar el marketplace de plugins de Codex, Claude Code o Cursor según las instrucciones actuales del repositorio. **No** es un paquete de runtime de Astro y no se agrega a `dependencies`.

## Cómo combinarlos en este proyecto

1. **Definir intención**: qué problema del usuario se está resolviendo, qué contenido es real y qué restricciones deben mantenerse.
2. **Proponer dirección**: contrastar opciones con UI UX Pro Max y documentar criterios, sin copiar una plantilla genérica.
3. **Implementar en cambios pequeños**: aplicar el enfoque de Superpowers (especificación, plan y pruebas), sin sobreingeniería.
4. **Auditar**: aplicar la crítica de Impeccable si está instalado y revisar manualmente accesibilidad, responsive, movimiento y rendimiento.
5. **Verificar**: ejecutar `npm run check`, `npm run check:privacy`, `npm run build` y Playwright cuando estén disponibles; registrar límites de cualquier prueba no ejecutada.
6. **Publicar**: verificar el sitio real en https://skuull.pages.dev/ y revisar `canonical`, Open Graph y enlaces de contacto.

Las tres herramientas son proyectos de terceros. Las referencias no certifican que estén instaladas ni constituyen una afirmación de autoría.
