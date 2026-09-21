# Decisiones de diseño y arquitectura

## Registro

### 2026-08-19 — Fundación inicial

- La inspección inicial no encontró un repositorio Git ni archivos de contexto previos; el workspace contenía únicamente `Yo.jpg`.
- Se eligió React + TypeScript + Vite porque el proyecto es una landing estática con componentes reutilizables y datos de proyectos separados.
- Se mantendrá el sitio sin backend inicialmente. El contacto usará `mailto:` hasta que exista una necesidad concreta de formulario persistente.
- Se creó una estructura mínima de aplicación, pero la experiencia visual de la landing queda reservada para la Etapa 2.
- Los proyectos viven en `src/data/projects.ts` con un modelo tipado común para facilitar la incorporación de nuevos casos.
- Se agregó el estado interno “Por confirmar” para no inventar estados públicos de proyectos antes de inspeccionar sus repositorios.
- Se mantendrá `Yo.jpg` como origen de la fotografía hasta decidir recorte y optimización; no se generará una persona con IA.
- No se crearán capturas sintéticas de productos ni se mostrarán interfaces con datos reales antes de contar con acceso autorizado y datos ficticios.

## Sistema visual propuesto

### Dirección

Oscura, sobria, editorial y tecnológica. La tecnología debe sentirse como una herramienta para resolver problemas, no como una estética gamer o cyberpunk.

### Tokens iniciales

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-bg` | `#09090B` | Fondo principal |
| `--color-surface` | `#121218` | Tarjetas y superficies |
| `--color-text` | `#F4F4F5` | Texto principal |
| `--color-muted` | `#A1A1AA` | Texto secundario |
| `--color-primary` | `#8B5CF6` | CTA y énfasis principal |
| `--color-accent` | `#F97316` | Acentos puntuales |
| `--color-border` | `rgba(244,244,245,.12)` | Bordes sutiles |

### Tipografía y composición

- Inter o Geist, con fallback de sistema.
- Jerarquía amplia en el hero, texto de lectura corto y ritmo vertical generoso.
- Contenedor central de ancho controlado, con secciones abiertas y algunas superficies focales.
- Hero asimétrico: texto y llamadas a la acción a la izquierda; retrato a la derecha.
- Proyectos como casos de producto con marcos de navegador únicamente cuando exista una captura segura.
- Violeta como color de acción; naranja únicamente para detalles de estado o pequeños indicadores.

### Interacción y accesibilidad

- Navegación semántica y accesible por teclado.
- Menú móvil con foco visible y cierre claro.
- Contraste objetivo WCAG AA.
- Animaciones pequeñas y fluidas, desactivadas o reducidas con `prefers-reduced-motion`.
- Imágenes con carga diferida fuera del primer viewport y textos alternativos descriptivos.

## Concepto visual de referencia

Se generó un concepto de dirección para validar ritmo, jerarquía, tratamiento de la fotografía y paleta. Es referencia de diseño, no un asset final ni fuente de contenido factual. La imagen usa la foto disponible como referencia del hero, pero todo el texto visible del mockup deberá validarse contra este documento antes de implementarse.

### 2026-08-19 — Etapa 2

- Se confirmó que Lucas estudia Ingeniería en Computación en la UNLP y es estudiante avanzado.
- Se implementó una primera experiencia visual con navegación fija, hero, fotografía personal, Sobre mí, experiencia actual en Murfi y un puente explícito hacia la siguiente etapa.
- La navegación móvil usa un menú accesible y bloquea el scroll del documento mientras está abierto.
- Los destinos todavía no implementados se muestran como “próximos” para evitar enlaces rotos o contenido inventado.
- La fotografía se sirve desde `public/images/lucas-rodriguez.jpg`, copiada sin alterar desde `Yo.jpg`.
- Se retiró una frase decorativa del hero para mantener la primera vista enfocada en el posicionamiento y la fotografía.

### 2026-08-25 — Etapa 3

- Se inspeccionaron cuatro carpetas autorizadas y la demo pública de Repuestería 16 sin modificar los proyectos fuente.
- La colección pública muestra seis casos con respaldo suficiente: compras y stock, CIDCom, gestión para rotisería, radar académico, ERP en Murfi y Repuestería 16.
- El mapa de estacionamiento de CABA y el bot de fútbol permanecen en contexto, pero no se publican hasta recibir repositorio, demo o documentación.
- No se agregaron filtros: seis casos siguen siendo comprensibles en una grilla y un control adicional no mejora el recorrido.
- Los casos se abren en un diálogo nativo accesible, evitando sumar una dependencia de routing antes de que existan páginas con capturas y contenido editorial más extenso.
- Las tarjetas usan composiciones abstractas generadas con CSS. Son una identidad visual deliberada, no capturas ficticias de los productos.
- No se incorporaron imágenes reales en esta etapa; la captura, sanitización y optimización quedan reservadas para la Etapa 4.
- Repuestería 16 es el único caso con enlace externo porque es la única demo pública verificada. Su stack y el alcance exacto de Lucas se mantienen explícitamente pendientes.
- Se excluyeron credenciales de seed, datos de contacto de terceros, información local de bases de datos y cualquier detalle confidencial de Murfi.
- La validación de cierre de etapa pasó `typecheck`, lint, 4 pruebas de datos y build de producción.
- La revisión en navegador cubrió escritorio, tablet y móvil; no se detectó desborde horizontal, el menú móvil cierra al navegar y los casos gestionan foco, bloqueo de scroll y cierre con `Escape`.

### 2026-08-26 — Inicio de Etapa 4

- Lucas confirmó que realizó el diseño y desarrollo integral de Repuestería 16. Se actualizó el caso sin atribuir un stack todavía no verificado.
- Las ejecuciones para capturas se realizarán con datos ficticios y, cuando sea posible, con rutas de datos o entornos aislados para no modificar los proyectos fuente.

### 2026-08-26 — Cierre de Etapa 4

- Se incorporaron galerías reales para Compras, CIDCom, Gestión para rotisería, Radar y Repuestería 16. El ERP de Murfi mantiene el recurso abstracto existente para proteger información confidencial.
- Las tarjetas usan una captura principal cuando existe y conservan el sistema visual abstracto como fallback explícito.
- CIDCom y Gestión para rotisería se capturaron con el frontend compilado original y APIs temporales aisladas porque Windows Application Control bloqueó el ejecutable de CIDCom y Docker Desktop no estuvo disponible.
- Compras se ejecutó desde su build original y se cargó mediante la interfaz con un comercio, productos y precios ficticios.
- Toda escena con información simulada lleva la etiqueta “Datos ficticios” dentro del caso de estudio.
- Las imágenes se sirven en WebP, con carga diferida, decodificación asíncrona, textos alternativos y marcos diferenciados para escritorio, móvil y hardware.
- El material del radar conserva su estado real: se muestra la interfaz documentada, pero el texto sigue indicando que la integración estable con el hardware final quedó incompleta.
- `.capture-runtime/` queda excluido de Git y ESLint: contiene únicamente herramientas y copias temporales de la captura, no código del producto final.
- La validación final pasó typecheck, lint, 5 pruebas y build. En navegador se revisaron 1440×900 y 390×844, carga de imágenes, anclas, desborde horizontal, consola, cierre con `Escape` y devolución de foco.
- Como control de rendimiento equivalente para esta etapa estática, el build final mantiene un único bundle de 67,94 kB gzip, CSS de 4,93 kB gzip y capturas WebP optimizadas. Lighthouse completo queda para la terminación de la Etapa 5, junto con SEO y accesibilidad final.

### 2026-09-05 — Etapas 5 y 6 implementadas; cierre registrado el 19 de septiembre

- Se completaron Tecnologías, Contacto, enlaces del footer, copia de correo y navegación móvil con Escape y control del foco. El contacto usa mailto y no requiere backend.
- Los seis casos tienen páginas propias prerenderizadas, además de la vista rápida. El contenido y los enlaces de contacto se pueden consultar sin JavaScript.
- Se confirmó React y .NET para Repuestería 16. Compras se presenta como un sistema en evolución con mobile existente, web y componente embebido en desarrollo; las capturas anteriores se identifican como PWA inicial.
- Murfi queda documentado con las actividades públicas autorizadas, sin requerir repositorios ni capturas internos.
- Se incorporaron favicon, imagen social provisional, Open Graph, Twitter Card, JSON-LD Person, canonical configurable, robots, sitemap y página 404. Sin SITE_URL se bloquea indexación y no se inventan URLs.
- Se prepararon Docker multi-stage, Nginx sin privilegios, healthcheck, límites de recursos, red proxy existente y documentación de Caddy, actualización y rollback. Las pruebas de contenedor se hicieron únicamente en la computadora local.
- La última ejecución completa pasó typecheck, lint, 8 pruebas de datos/SEO y build de siete páginas. Las 5 pruebas de navegador pasaron: escritorio 1440px, tablet 768px, móvil 390px, casos a 320px y contenido sin JavaScript. Se corrigió un desborde del título del radar a 320px.
- Axe no detectó infracciones en las reglas WCAG A/AA comprobadas. Esto no equivale a certificar accesibilidad en todos los navegadores o lectores de pantalla.
- Lighthouse inicial de preview: rendimiento móvil 98, accesibilidad 100, buenas prácticas 100 y SEO 66; la indexación estaba deliberadamente bloqueada al faltar el dominio. El puntaje no representa un sitio publicado.
- El contenedor local probado superó su healthcheck y nginx -t, con aproximadamente 4 MiB de RAM en reposo. La imagen final también se construyó correctamente; falta verificación en el servidor real tras autorizar el despliegue.
- Pendiente de publicación: elegir dirección y alojamiento definitivo, configurar SITE_URL, recompilar y validar HTTPS/SEO en destino con autorización. GitHub Pages bajo una subcarpeta requiere adaptar rutas; no está activado.
- El 19 de septiembre se revisaron los archivos y el resultado persistido de las pruebas, sin repetir las mediciones ni publicar cambios.

### 2026-09-20 — Revisión visual y del recorrido

- Se compactó el hero para que la fotografía real, la identidad profesional, el mensaje y las acciones principales se entiendan juntos también en móvil. La mención a Murfi sigue visible desde la primera pantalla; UNLP y estudiante avanzado acompañan el retrato.
- La navegación marca la sección visible y, al cerrar el menú móvil tras elegir una sección, lleva allí el foco para facilitar el uso con teclado.
- La experiencia en Murfi enlaza directamente a su caso público. Se mantiene la explicación general autorizada y la composición visual sin capturas internas.
- Se quitaron los números arbitrarios de las tarjetas y la sombra que oscurecía las capturas. Las imágenes son enlaces a los casos y se presentan como pantallas dentro de la tarjeta; cuando no hay imagen, se informa explícitamente que el caso no muestra capturas internas.
- La vista rápida quedó deliberadamente breve: problema, solución, participación, panorama del sistema de Compras y una imagen principal cuando existe. El caso completo conserva galería, funcionalidades, desafíos, decisiones y tecnologías. Las páginas individuales agregan navegación por secciones y enlace al siguiente proyecto.
- La tipografía usa una familia del sistema para evitar una descarga extra; la paleta oscura y el violeta siguen siendo la base, con naranja puntual.
- Las capturas de la revisión visual se guardan fuera del repositorio. No se publicó ni desplegó el sitio.
- La validación final pasó `typecheck`, lint, 8 pruebas unitarias/de SEO y build de las siete páginas estáticas. Las 5 pruebas de navegador pasaron, incluyendo foco tras elegir una sección en el menú móvil, vista rápida breve, navegación entre casos sin JavaScript, accesibilidad automatizada en las rutas y ausencia de desborde horizontal a 320 px. Se inspeccionaron capturas de escritorio y móvil del hero, tarjetas, caso y contacto; las imágenes del proyecto se comprobaron cargadas antes de revisar las tarjetas.

### 2026-09-20 — Ajuste de contenido

- Lucas reemplazó el título de “Sobre mí” por “Toma lo mejor que existe y mejóralo. Si no existe, diséñalo”. Se usa su texto sin atribuirle una autoría no confirmada.
- Tras aclararlo Lucas, “Sobre mí” encabeza el texto de presentación, no la frase. Esta se introduce con “Mi manera de encarar cada proyecto:” para darle contexto sin una atribución no verificada.
- Se agregó el enlace público al sitio de Murfi en la experiencia, separado del enlace al caso de estudio del trabajo de Lucas. Se usa la URL limpia, sin parámetros de seguimiento.

### 2026-09-20 — Preparación de GitHub Pages

- Se eligió preparar un sitio de usuario en la raíz `https://princeps13.github.io/` para evitar cambiar rutas absolutas y la base de Vite. La URL todavía no se afirma como publicada.
- El workflow de GitHub Pages es manual (`workflow_dispatch`) y compila con `SITE_URL` propio de esa dirección. No hay despliegue al hacer push por sí solo.
- Se excluyeron del futuro repositorio público el PDF local del servidor y la foto original. Se quitaron rutas absolutas del registro de proyectos; `contexto/` permanece como documentación del proyecto y debe revisarse antes de subirlo.
- No se inicializó Git, no se creó un repositorio remoto, no se hizo push y no se publicó nada. La activación queda documentada en `contexto/DESPLIEGUE.md`.
- Se verificó en modo lectura que la cuenta de GitHub conectada es `Princeps13` y que el repositorio `Princeps13/Princeps13.github.io` todavía no existe. El build con `SITE_URL` pasó typecheck, lint, 8 pruebas y generó 7 páginas con canonical, Open Graph, robots y sitemap correctos; las 5 pruebas de navegador también pasaron. Se recompiló después sin `SITE_URL` para devolver la preview local a `noindex`.

### 2026-09-20 — URL con nombre sin renombrar la cuenta

- Lucas eligió `Lucas-Rodriguez00` como variante válida de `Lucas.Rodriguez00`; GitHub no admite el punto en nombres de cuenta. Se preparó el workflow y la documentación para una organización gratuita con ese nombre y el sitio `https://lucas-rodriguez00.github.io/`.
- La ausencia de perfil público no confirma disponibilidad: debe verificarse al crear la organización. La cuenta personal `Princeps13` y los enlaces del sitio a su GitHub permanecen intactos.
- La publicación sigue siendo manual. Aún no se creó la organización ni el repositorio, y no se hizo push ni despliegue.
- La compilación con `SITE_URL=https://lucas-rodriguez00.github.io` pasó typecheck, lint, 8 pruebas y build de 7 páginas. Se verificaron canonical, Open Graph, robots y sitemap con esa dirección; las 5 pruebas de navegador pasaron en escritorio, tablet y móvil. Después se devolvió la compilación local al modo preview sin indexación.

### 2026-09-20 — Cuenta personal renombrada

- Lucas cambió su usuario de GitHub. El conector confirmó que la cuenta autenticada ahora tiene el login `Lucas-Rodriguez00`; no hace falta crear una organización para esta URL.
- Se actualizó el enlace del perfil en la interfaz y los datos estructurados, y la guía de publicación ahora indica crear el repositorio de Pages en la cuenta personal.
- La API de GitHub respondió 404 para `Lucas-Rodriguez00/lucas-rodriguez00.github.io`: el repositorio aún no existe o no es accesible. No se hizo push ni se publicó el sitio.
- Con el login nuevo, la compilación para `https://lucas-rodriguez00.github.io` pasó typecheck, lint, 8 pruebas y build de 7 páginas. Se verificó que los datos estructurados apunten al perfil nuevo y que canonical conserve la URL elegida; las 5 pruebas de navegador también pasaron. Se recompiló la preview local sin `SITE_URL` para mantenerla en `noindex`.

### 2026-09-20 — Repositorio público creado

- Lucas compartió `https://github.com/Lucas-Rodriguez00/lucas-rodriguez00.github.io.git`. GitHub confirmó que el propietario es su cuenta personal, la visibilidad es pública y el repositorio está vacío.
- Antes del primer commit se revisó el listado de archivos y patrones comunes de secretos. El PDF de contexto del servidor, la fotografía original y las salidas temporales quedan excluidos por `.gitignore`; el commit usará un correo `noreply` específico de este repositorio para no publicar la identidad de correo configurada globalmente.
- La publicación sigue siendo una acción manual: un push no activa el workflow `workflow_dispatch`.

### 2026-09-20 — Primera publicación en GitHub Pages

- El primer commit local `5cf3665` se subió a `main` en `Lucas-Rodriguez00/lucas-rodriguez00.github.io`. Contiene 68 archivos revisados; se excluyeron PDF local, foto original, dependencias y salidas temporales.
- GitHub creó automáticamente un sitio de Pages con `build_type=legacy` y fuente `main/`: servía el `index.html` sin compilar y la pantalla quedaba en blanco. Se cambió Pages a `build_type=workflow` y se ejecutó el workflow manual `35549017080` con la credencial Git existente, sin registrar ni mostrar el token. Todos sus pasos terminaron correctamente.
- Se observó la landing real con hero, retrato, enlaces al perfil nuevo, Murfi, casos y contacto. HTTP 200 para raíz, tres casos, robots, sitemap e imagen social; el HTML público incluye el bundle compilado y canonical correcto. La publicación de futuras versiones sigue siendo manual.

### 2026-09-20 — Identidad, proyectos y estado actualizado

- Lucas proporcionó el logo de Murfi y pidió usarlo en la experiencia actual. Se optimizó a WebP y se colocó junto al nombre de la empresa. El caso profesional sigue sin mostrar capturas o material interno.
- El perfil ahora menciona sistemas embebidos y electrónica. El grupo de tecnologías incluye herramientas respaldadas por los proyectos revisados, sin barras de nivel.
- Compras refleja la app Android probada, la web de gestión implementada en un entorno privado y el prototipo embebido todavía en desarrollo. Se evita publicar URLs privadas, contratos, credenciales y detalles de arquitectura.
- Para el radar se eligió como portada la fotografía reciente del autito armado. La placa de `8.jpeg` se añadió a la galería junto con la interfaz y la fotografía anterior de `7.jpeg`. Se conserva explícitamente la autoría grupal y el límite de integración estable descrito en el informe.
- La fotografía del autito conserva su archivo íntegro; su presentación en la portada se encuadra con CSS para que el vehículo se lea mejor y el caso ofrece un enlace a la imagen completa.
- Después se reemplazaron las imágenes visibles de Compras por capturas del build web reciente, realizadas sólo con datos ficticios y sin comunicación externa. Las imágenes históricas de agosto permanecen fuera del recorrido. El caso deja claro que estas nuevas capturas muestran la interfaz web en navegador, no el APK Android ni la web de gestión privada.
- El cierre de esta revisión pasó `typecheck`, lint, 8 pruebas de datos/SEO y el build estático de 7 páginas. Las 5 pruebas de navegador pasaron en escritorio, tablet y móvil; verifican logo, portada y galería del radar, estado/capturas de Compras, accesibilidad automatizada, navegación y ausencia de desborde. Se inspeccionaron visualmente el logo, las tarjetas y los casos en escritorio y móvil.
