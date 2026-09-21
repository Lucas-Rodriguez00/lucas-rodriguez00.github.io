# Inventario y protocolo de proyectos

## Estado

Actualización — 20 de septiembre de 2026. Se revisó el estado más reciente de Compras, se incorporaron nuevas fotografías del radar y el logo de Murfi proporcionado por Lucas. No se modificaron los proyectos fuente ni se publicaron datos. Cada caso tiene una página estática en `/proyectos/<slug>/` y una vista rápida.

## Casos incluidos en la sección pública

### Compras y stock doméstico

- Fuente: carpeta local autorizada `app_compras_super`.
- Evidencia revisada: README, documentación de contexto, manifiesto de dependencias y estructura del proyecto.
- Alcance confirmado: app Android para registrar una compra, calcular el total, mantener stock, registrar consumos, revisar el historial y preparar listas de compras. Surgió de una PWA local-first con IndexedDB/Dexie.
- Evolución actual: servicios centrales y web de gestión implementados en un entorno privado; dispositivo embebido en desarrollo. Hay pruebas parciales en un Android real y de componentes físicos, pero sigue pendiente validar el recorrido completo entre dispositivos.
- Tecnologías confirmadas: React, TypeScript, Vite, PWA, IndexedDB/Dexie, Vitest, Testing Library, Tesseract.js y ZXing.
- Autoría: el historial Git local inspeccionado identifica a Lucas Rodríguez.
- Estado público: **En desarrollo**. La app Android, web y servicios avanzaron durante septiembre; no se presenta la integración total como terminada.
- Actualización del 5 de septiembre: mobile existente, página web en creación y sistema embebido en desarrollo. Se explica el propósito de los tres componentes sin endpoints, tablas, algoritmos, parámetros, credenciales, detalles de hardware ni flujos administrativos internos.
- Fuentes recientes: `docs/contexto/README.md`, introducción de `docs/contexto/admin-web/README.md` y `package.json` de la carpeta autorizada. El README raíz mantiene información antigua; no se usa para afirmar que hoy no existe backend.
- Verificación del 20 de septiembre: `CLAUDE.md` (resumen de estado fechado el 16/9), `docs/contexto/admin-web/README.md`, `docs/contexto/embedded/README.md` y `firmware/README.md`. Los archivos tienen fechas y alcances distintos; se tomó el estado más reciente sin copiar rutas, credenciales, protocolos ni detalles internos al sitio.
- Capturas vigentes: build web del 15 de septiembre ejecutado localmente el 20/9 en un perfil de navegador limpio, con conexiones externas bloqueadas y comercio/productos/precios ficticios cargados desde la interfaz. Muestran carrito y stock en escritorio y móvil; no son capturas del APK Android ni de la web administrativa privada. Las capturas de la PWA inicial se conservan como archivos históricos sin referencia desde la interfaz.
- No publicar como terminado: pruebas reales de cámara/OCR, experiencia en distintos teléfonos y validación manual completa de accesibilidad.

### CIDCom

- Fuente: carpeta local autorizada `Cidcom`.
- Evidencia revisada: README, manual de uso, `frontend/package.json` y proyecto `.csproj` del backend.
- Alcance confirmado: gestión local de productos, stock, movimientos, ventas, anulación, alertas, CSV y backups.
- Arquitectura confirmada: frontend React servido por una API ASP.NET Core; persistencia SQLite en el perfil local del usuario; publicación autocontenida para Windows.
- Tecnologías confirmadas: React, TypeScript, Vite, ASP.NET Core, .NET 8, Entity Framework Core y SQLite.
- Estado público: **MVP terminado**, de acuerdo con las funciones del MVP y el proceso de publicación documentados.
- Límites documentados: sin login, sincronización entre equipos ni facturación fiscal en el MVP.
- Información excluida: datos de contacto incluidos en el manual y cualquier base local de uso real.

### Gestión para rotisería

- Fuente: carpeta local autorizada `roticeria`.
- Evidencia revisada: README, manifiestos de frontend y backend y modelo Prisma.
- Alcance confirmado: catálogo, clientes, pedidos, cocina, caja, stock, historial, reportes, autenticación y permisos por roles.
- Tecnologías confirmadas: React, TypeScript, Vite, Node.js, Express, Prisma, PostgreSQL y Docker.
- Estado público: **MVP terminado**, según el README del proyecto. El build y la ejecución con datos ficticios se reservan para la Etapa 4.
- Decisiones confirmadas: snapshots históricos de nombres y precios; estados controlados; roles `ADMIN`, `EMPLEADO` y `COCINA`; pedidos de WhatsApp cargados manualmente.
- Información excluida: credenciales del seed y cualquier variable de entorno o dato operativo.

### Radar para estacionamiento

- Fuente: carpeta local autorizada `proyecto auto radar`.
- Evidencia revisada: informe académico de 31 páginas, código final e imágenes del proceso de fabricación de la placa.
- Contexto confirmado: proyecto grupal de Taller de Proyecto 1 en la Facultad de Ingeniería de la UNLP.
- Alcance confirmado: prototipo con cuatro sensores ultrasónicos, EDU-CIAA, motores, Bluetooth y visualización cenital desarrollada con Python/Pygame.
- Participación de Lucas confirmada por el informe: estructura de la interfaz, organización de los datos y diseño visual de la experiencia.
- Estado público: **Investigación**. La interfaz alcanzó nivel de desarrollo, pero la integración estable entre la computadora y el hardware final quedó incompleta.
- Restricción narrativa: no afirmar que Lucas desarrolló solo el vehículo ni que el sistema autónomo completo quedó terminado.
- Imágenes incorporadas: recorte fiel de la interfaz documentada en el informe académico y fotografía `7.jpeg` del proceso de fabricación de la PCB.
- Nuevas imágenes del 20 de septiembre: `Captura de pantalla 2026-09-20 200500.png` del autito armado como portada y `8.jpeg` de la placa como imagen de galería. Ambas provienen de la carpeta autorizada; se convirtieron a WebP sin alterar su contenido visual.

### ERP para gestión administrativa

- Fuente: descripción directa de Lucas y experiencia actual documentada en Murfi.
- Alcance público autorizado: gestión administrativa, migración y normalización de información heredada, documentos, reportes, API REST, PostgreSQL, Node.js, TypeScript, Fastify y Docker.
- Estado público: **En desarrollo** porque forma parte de la evolución continua de producto en su trabajo actual.
- Restricción: no publicar nombres de clientes, datos reales, capturas, credenciales, repositorios internos, métricas ni detalles que permitan reconstruir procesos confidenciales.
- Confirmación del 5 de septiembre: Lucas no puede proporcionar el material de Murfi. El caso está completo sin capturas ni repositorios; describe su actividad actual con alcance público autorizado.

### Repuestería 16

- Fuente pública: `https://repuesteria16.com.ar/`.
- Evidencia revisada en navegador el 25 de agosto de 2026: inicio, catálogo cargado, categorías, filtros, carrito, consultas por WhatsApp e información institucional.
- Alcance observable: catálogo de repuestos de agua y gas; productos con precio se agregan al carrito y productos sujetos a consulta derivan a WhatsApp con contexto.
- Estado público: **MVP terminado** y sitio publicado.
- Demo pública confirmada: `https://repuesteria16.com.ar/`.
- Participación confirmada directamente por Lucas: diseño y desarrollo integral de la página.
- Stack confirmado por Lucas el 5 de septiembre: React y .NET. No se inventan versiones ni frameworks adicionales; no requiere el repositorio para reflejar su confirmación.
- Información excluida: teléfono y correo comercial visibles en la web no se replican en el portfolio.

## Proyectos pendientes de inspección

### Mapa de estacionamiento de CABA

- Se conserva la descripción inicial indicada por Lucas: segmentos de estacionamiento, información geográfica, clasificación conservadora, MapLibre, PostGIS, Fastify, React y TypeScript.
- No se muestra en la colección pública de la Etapa 3 porque todavía no se recibió repositorio, demo ni documentación.

### Bot de calendario y resultados de fútbol

- Se conserva la descripción inicial indicada por Lucas: fixtures, seguimientos, notificaciones, calendarios ICS, Node.js, TypeScript y PostgreSQL.
- No se muestra en la colección pública de la Etapa 3 porque todavía no se recibió repositorio, demo ni documentación.

## Registro de capturas — 26 de agosto de 2026

| Proyecto | Archivos en el portfolio | Fuente y condición | Datos usados |
| --- | --- | --- | --- |
| Compras y stock doméstico | `public/images/projects/compras-stock/carrito-desktop.webp`, `stock-desktop.webp`, `carrito-mobile.webp` | Build original servido localmente; flujo cargado desde la interfaz sin modificar el proyecto | Productos, comercio y precios ficticios; persistencia local de prueba |
| CIDCom | `public/images/projects/cidcom/dashboard-desktop.webp`, `productos-desktop.webp`, `dashboard-mobile.webp` | Frontend compilado original servido con una API temporal aislada; Windows Application Control impidió ejecutar el binario y la DLL | Productos, ventas, importes y alertas ficticios |
| Gestión para rotisería | `public/images/projects/rotiseria/dashboard-desktop.webp`, `cocina-desktop.webp`, `dashboard-mobile.webp` | Frontend compilado original servido con una API temporal aislada; Docker Desktop no estuvo disponible | Pedidos, caja, clientes e importes ficticios; sesión local de demostración |
| Radar para estacionamiento | `public/images/projects/radar/autito-armado.webp`, `interfaz-desktop.webp`, `pcb-captura-8.webp`, `pcb.webp` | Captura del autito del 20/9, `8.jpeg` de la placa, informe académico y `7.jpeg` de la placa en caja | No aplica; material documental del proyecto |
| Repuestería 16 | `public/images/projects/repuesteria16/home-desktop.webp`, `catalogo-desktop.webp`, `home-mobile.webp` | Sitio público `https://repuesteria16.com.ar/` | Contenido público visible al momento de la captura |
| ERP de Murfi | — | No se accedió a repositorios internos ni se produjo una escena sintética | Sin captura por confidencialidad |

## Capturas nuevas — 20 de septiembre de 2026

| Proyecto | Archivos visibles | Procedencia y límites |
| --- | --- | --- |
| Compras y stock doméstico | `carrito-2026-09-desktop.webp`, `stock-2026-09-desktop.webp`, `carrito-2026-09-mobile.webp`, `stock-2026-09-mobile.webp` en `public/images/projects/compras-stock/` | Build existente de `app_compras_super/dist` fechado el 15/9; servido localmente sin modificar el proyecto fuente. Perfil de navegador nuevo, peticiones externas bloqueadas, comercio “Almacén de prueba”, productos y precios ficticios. Capturas WebP del 20/9. No representan el APK Android ni la web administrativa privada. |
| Radar para estacionamiento | `autito-armado.webp`, `pcb-captura-8.webp` en `public/images/projects/radar/` | Archivos `Captura de pantalla 2026-09-20 200500.png` y `8.jpeg` de la carpeta compartida por Lucas. La foto del autito se usa como portada con encuadre CSS y enlace a la imagen completa. |

Los PNG de captura de Compras previos a la optimización se guardaron fuera del repositorio, en el directorio local de visualizaciones de esta tarea. Se convirtieron a WebP a calidad 82 y las etiquetas del caso identifican los datos ficticios y el entorno de captura.

Logo de Murfi: `public/images/murfi-logo.webp` procede de la imagen entregada por Lucas el 20/9. Se recortó el margen blanco para mejorar su lectura a tamaño pequeño y se optimizó a WebP. No se usó material interno de Murfi.

Todos los archivos finales se convirtieron a WebP con calidad 82 y sin alterar el contenido visual. Las capturas con información ficticia llevan una etiqueta visible dentro de su caso de estudio.

## Protocolo aplicado en la Etapa 4

1. Ejecutar cada proyecto autorizado sin modificar inicialmente su código.
2. Documentar variables, servicios y comandos necesarios.
3. Usar datos ficticios y revisar que no aparezcan credenciales ni datos privados.
4. Preparar una escena representativa sin alterar el producto original solo para la captura.
5. Capturar escritorio, vista secundaria y móvil cuando corresponda.
6. Optimizar a WebP o AVIF y registrar origen, fecha y condiciones de ejecución.
7. Consultar a Lucas antes de cualquier cambio en el código de un proyecto fuente.

Resultado: el protocolo se cumplió sin cambios en los proyectos originales. Los servidores y APIs temporales viven fuera de las fuentes y están excluidos del análisis y del contenido publicable del portfolio.
