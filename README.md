# Portafolio de Lucas Rodríguez

React, TypeScript y Vite. Landing y seis páginas de proyectos prerenderizadas: archivos estáticos, sin backend en producción.

## Desarrollo y verificación

Node.js 22.12+ (o 24) y npm. El lockfile fija las dependencias.

```sh
npm ci
npm run dev
```

```sh
npm run verify
npm run preview
```

`verify` ejecuta typecheck, lint, pruebas y build. `dist/` contiene la landing, `/proyectos/<slug>/`, imágenes, favicon, metadata social, JSON-LD, sitemap, robots y 404.

Para probar navegación, teclado, contacto, responsive y accesibilidad:

```sh
npx playwright install chromium
npm run test:e2e
```

Opciones de QA: `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` usa un Chromium existente; `QA_BASE_URL` permite probar otro servidor local; `QA_OUTPUT_DIR` guarda capturas fuera del repositorio.

## Contenido

- `src/data/profile.ts`: contacto y tecnologías confirmadas.
- `src/data/projects.ts`: casos, estados, galerías y visión general del sistema de compras. Cada nuevo caso genera su página al compilar.
- `src/App.tsx`: presentación personal y experiencia actual en Murfi.
- `public/images/projects/`: capturas WebP con dimensiones y textos alternativos.
- `public/images/social-preview.svg` y `.png`: imagen social provisional reemplazable de 1200×630.
- `contexto/`: fuentes, decisiones, validación y guía de despliegue.

## Alojamiento

GitHub Pages está preparado para el sitio de la cuenta personal `Lucas-Rodriguez00` en `https://lucas-rodriguez00.github.io/`. El repositorio público `Lucas-Rodriguez00/lucas-rodriguez00.github.io` ya existe. El workflow `.github/workflows/pages.yml` compila con esa URL y se ejecuta **solo manualmente**; la dirección no estará publicada hasta activar Pages y ejecutar el workflow. Ver los pasos de activación en `contexto/DESPLIEGUE.md`.

Para una compilación local o en el servidor propio, copiar `.env.example` a `.env` y completar `SITE_URL` con el origen HTTPS correspondiente. Mientras esté vacío se genera una preview con `noindex`, robots cerrado y sitemap sin URLs inventadas. Cambiar el dominio requiere recompilar. El servidor propio sigue preparado con Nginx sin privilegios detrás de Caddy; no se desplegó allí.

La configuración actual asume GitHub Pages en la raíz, no bajo `/nombre-del-repositorio/`. En este último caso habría que adaptar `base` de Vite y las rutas absolutas antes de publicar.
