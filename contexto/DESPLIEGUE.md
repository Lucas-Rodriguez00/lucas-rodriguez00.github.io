# Despliegue y operación

## Estado — 5 de septiembre de 2026

Etapa 6 implementada. Imagen Docker construida y ejecutada únicamente en esta computadora para QA. No se accedió al servidor, no se hizo push ni se publicó el sitio. Dominio pendiente por decisión de Lucas.

El PDF local `Contexto del servidor Debian y despliegue.pdf` describe Debian 13 x86-64, aproximadamente 3 GB de RAM, Docker/Compose y Caddy dentro de Docker en la red externa `proxy`. Es contexto de diseño, no autorización para ejecutar sus comandos. No se replican direcciones de administración en archivos públicos.

## Arquitectura

Internet → Caddy existente → red Docker `proxy` → servicio `lucas-portfolio:8080`.

Node 22 se usa solo durante el build. El runtime es Nginx Alpine, usuario `nginx`, filesystem de solo lectura, `/tmp` temporal, sin base de datos ni volúmenes persistentes. Compose limita RAM a 64 MB y CPU a 0,5. No publica puertos al host.

- `Dockerfile`: multi-stage y healthcheck HTTP en `/salud`.
- `docker-compose.yml`: límites, red externa y rotación de logs.
- `deploy/nginx.conf`: compresión, MIME, 404 reales y caché para assets con hash.
- `deploy/security-headers.conf`: CSP, protección contra iframes y MIME sniffing.
- `deploy/Caddyfile.example`: bloque con dominio placeholder claramente inválido.
- `.dockerignore`: solo permite código y recursos del build; excluye contexto, PDFs, fuentes privadas, herramientas de captura y secretos.

## Configuración

`SITE_URL`: origen HTTPS real, sin credenciales ni subcarpetas. Se lee al compilar desde `.env` o un argumento de build. Vacío genera preview con noindex, robots bloqueado y sitemap sin URLs. Completar y recompilar habilita canonical, Open Graph absoluto, sitemap e indexación.

`PORTFOLIO_TAG`: etiqueta local de la imagen. Usar una distinta por versión y conservar las anteriores para rollback.

## Procedimiento futuro, con autorización de publicación

1. Inspeccionar el estado real del servidor, memoria, disco, Caddy y red `proxy`. No reemplazar la red compartida.
2. Transferir el proyecto o la imagen a `/opt/apps/Mi_portafolio`. La fuente Git del portafolio todavía no está definida.
3. Crear `.env` desde el ejemplo, sin sobrescribir archivos existentes. Completar el dominio y una nueva etiqueta.
4. Validar y construir (preferir build en un equipo de desarrollo para evitar carga en el servidor modesto):

```sh
docker compose config --quiet
docker compose build portfolio
docker compose up -d --no-build portfolio
docker compose ps
docker compose exec -T portfolio wget -qO- http://127.0.0.1:8080/salud
```

5. Respaldar el Caddyfile actual con un nombre nuevo. Agregar el bloque de `deploy/Caddyfile.example`, sustituyendo el placeholder por el dominio real y preservando todos los otros sitios. Comprobar que Caddy esté conectado a `proxy`.

```sh
docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

6. Probar raíz, páginas de proyectos, ruta ausente (404), salud, HTTPS, canonical y robots. Revisar logs y `docker stats --no-stream`.

## Transferir sin compilar en el servidor

Construir localmente con el dominio correcto y una etiqueta nueva. Guardar con `docker save --output portfolio-version.tar lucas-portfolio:ETIQUETA`, transferir por el acceso administrativo autorizado y cargar con `docker load --input portfolio-version.tar`. Configurar esa etiqueta en `.env` y ejecutar Compose con `--no-build`. Sustituir `ETIQUETA` por el valor elegido.

## Actualización y rollback

Registrar la etiqueta vigente y conservar su imagen, el `.env` y una copia del Caddyfile. Compilar la nueva versión con otra etiqueta, verificarla y cambiar `PORTFOLIO_TAG`. Ejecutar `docker compose up -d --no-build portfolio` y verificar salud y páginas.

Para rollback, restaurar la etiqueta anterior en `.env` y ejecutar el mismo comando con `--no-build`. No hay migraciones ni volúmenes de aplicación. Si cambió Caddy, restaurar la copia verificada, validar y recargar. No eliminar imágenes anteriores durante la verificación.

## GitHub Pages — publicado

Sitio de la cuenta personal: `https://lucas-rodriguez00.github.io/`. GitHub confirmó que el login de Lucas ahora es `Lucas-Rodriguez00` y que el repositorio `Lucas-Rodriguez00/lucas-rodriguez00.github.io` existe, es público y está bajo su cuenta. GitHub Pages sirve la compilación estática de `dist/`. No se usa Docker ni el servidor propio para esta opción.

Consulta previa al primer push del 20/9: la cuenta conectada era `Lucas-Rodriguez00` y el repositorio recién creado por Lucas estaba público y vacío.

El archivo `.github/workflows/pages.yml` usa `workflow_dispatch`: **subir cambios al código no actualiza la web**. Al ejecutarlo manualmente, instala dependencias, corre typecheck/lint/pruebas/build, compila con `SITE_URL=https://lucas-rodriguez00.github.io` y publica `dist/`. La URL canónica, Open Graph, robots y sitemap se generan durante ese build. Los builds locales sin `SITE_URL` siguen siendo previews no indexables.

### Activación realizada el 20/9/2026

1. Lucas creó el repositorio público vacío en su cuenta personal. Se revisaron los archivos a subir: `.gitignore` excluye `node_modules/`, `dist/`, `.env`, capturas temporales, el PDF local del servidor y `Yo.jpg`.
2. Se inicializó Git con rama `main`, autor específico de este repositorio y correo `noreply`, y se subió el primer commit `5cf3665` al remoto.
3. GitHub inicialmente publicó la raíz del código fuente mediante el modo `legacy`; eso mostraba una página en blanco porque Vite requiere compilación. Se cambió el origen de Pages a `workflow` sin alterar la visibilidad pública del repositorio.
4. Se ejecutó manualmente `Publicar portafolio en GitHub Pages` (run `35549017080`). La compilación y el despliegue terminaron correctamente.
5. Se verificó la landing renderizada en el navegador y respuestas HTTP 200 para raíz, casos de Compras, Radar y Murfi, `robots.txt`, `sitemap.xml` e imagen social. El HTML público contiene assets compilados y canonical `https://lucas-rodriguez00.github.io/`.

### Próximas actualizaciones

La carpeta local ya tiene remoto `origin` y rama `main`. Después de cada cambio, revisar los archivos, ejecutar `npm run verify`, hacer commit y push. Luego abrir **Actions → Publicar portafolio en GitHub Pages → Run workflow** en `main`; el push solo no despliega. Revisar el run y la web pública. No cambiar Pages de regreso a “Deploy from a branch” porque serviría los archivos fuente sin compilar.

Comandos de referencia para futuras actualizaciones de esta carpeta (Git y el remoto ya están configurados):

```powershell
git status --short
npm run verify
git add .
git diff --cached --check
git diff --cached
git commit -m "Actualizar portafolio"
git push
```

Si Lucas prefiere publicación automática en cada push, cambiar el disparador solo después de acordarlo. Un repositorio de proyecto bajo `/nombre-del-repositorio/` requeriría adaptar `base` de Vite y las rutas absolutas; **no** está configurado para esa variante.

Referencias: [GitHub Pages: sitios de usuario](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [activar GitHub Actions como origen](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [ejecutar un workflow manualmente](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/manually-run-a-workflow) y [despliegue de Vite](https://vite.dev/guide/static-deploy.html).

## Referencias

- [Docker multi-stage](https://docs.docker.com/build/building/multi-stage/).
- [Reverse proxy de Caddy](https://caddyserver.com/docs/caddyfile/directives/reverse_proxy).
- [Prerender con React](https://react.dev/reference/react-dom/server/renderToString).
