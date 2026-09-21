export const projectStatuses = [
  'En desarrollo',
  'MVP terminado',
  'Piloto pendiente',
  'Investigación',
  'Demo próximamente',
] as const

export type ProjectStatus = (typeof projectStatuses)[number]
export type ProjectTone = 'violet' | 'orange' | 'blue' | 'green' | 'rose' | 'slate'

export type ProjectMedia = {
  src: string
  alt: string
  caption: string
  format: 'desktop' | 'mobile' | 'hardware'
  width: number
  height: number
}

export type Project = {
  slug: string
  name: string
  category: string
  visualLabel: string
  tone: ProjectTone
  featured: boolean
  summary: string
  problem: string
  solution: string
  participation: string
  features: string[]
  technologies: string[]
  status: ProjectStatus
  mainImage?: ProjectMedia
  gallery: ProjectMedia[]
  captureNotice?: string
  technicalChallenges: string[]
  importantDecisions: string[]
  githubUrl?: string
  demoUrl?: string
  systemOverview?: { name: string; state: string; description: string }[]
}

// Solo se publican datos confirmados por Lucas, documentación local o una demo
// inspeccionada. Los proyectos originales permanecen sin modificaciones.
export const projects: Project[] = [
  {
    slug: 'compras-stock-domestico',
    name: 'Compras y stock doméstico',
    category: 'Producto propio · Sistema en evolución',
    visualLabel: 'ANDROID · WEB · EMBEBIDOS',
    tone: 'violet',
    featured: true,
    summary: 'Un sistema para registrar compras y organizar el stock del hogar: app Android en pruebas, web de gestión implementada y un dispositivo embebido en desarrollo.',
    problem: 'Durante una compra es difícil registrar precios, controlar el total y convertir lo comprado en un stock útil para después.',
    solution: 'El producto comenzó como una PWA y hoy tiene una app Android para registrar compras, seguir el gasto, gestionar el stock y preparar nuevas listas. La web de gestión y los servicios que la acompañan ya están implementados en un entorno privado. El componente embebido sigue en desarrollo y aún falta validar el recorrido completo entre dispositivos.',
    participation: 'Diseño y desarrollo del producto propio: experiencia móvil, servicios y web de gestión, además de la exploración de un dispositivo embebido.',
    systemOverview: [
      { name: 'Aplicación Android', state: 'Piloto en curso', description: 'Ya se probó en un teléfono real. Permite registrar compras, consultar historial, gestionar stock y armar listas; quedan pruebas de uso pendientes.' },
      { name: 'Web de gestión', state: 'Implementada en entorno privado', description: 'Amplía la consulta y la administración del sistema desde una computadora. No tiene una demo pública.' },
      { name: 'Dispositivo embebido', state: 'Prototipo en desarrollo', description: 'Explora cómo llevar información del inventario a un dispositivo físico. Hay software y pruebas de componentes, pero no se presenta como integración terminada.' },
    ],
    features: [
      'Compra con carrito y total',
      'Lectura asistida de productos',
      'Stock, consumos e historial',
      'Lista de compras desde el stock',
      'Uso sin conexión y sincronización progresiva',
    ],
    technologies: ['React', 'TypeScript', 'Capacitor', 'Android', 'Fastify', 'PostgreSQL', 'IndexedDB', 'ESP32'],
    status: 'En desarrollo',
    mainImage: {
      src: '/images/projects/compras-stock/carrito-2026-09-desktop.webp',
      width: 900,
      height: 900,
      alt: 'Compra en curso con dos productos ficticios, total calculado y acceso al escáner',
      caption: 'Interfaz web del producto ejecutada localmente con comercio, productos y precios ficticios. No es una captura del APK Android.',
      format: 'desktop',
    },
    gallery: [
      {
        src: '/images/projects/compras-stock/stock-2026-09-desktop.webp',
        width: 900,
        height: 900,
        alt: 'Stock doméstico con dos productos de prueba y acciones para agregarlos a una lista',
        caption: 'Stock generado al finalizar la compra ficticia en el build web actual.',
        format: 'desktop',
      },
      {
        src: '/images/projects/compras-stock/carrito-2026-09-mobile.webp',
        width: 390,
        height: 844,
        alt: 'Carrito de prueba en la interfaz web a tamaño de pantalla móvil',
        caption: 'Vista móvil de la interfaz web. El APK Android no se capturó.',
        format: 'mobile',
      },
      {
        src: '/images/projects/compras-stock/stock-2026-09-mobile.webp',
        width: 390,
        height: 844,
        alt: 'Vista móvil del stock con dos productos ficticios que necesitan atención',
        caption: 'Inventario de prueba después de terminar una compra en el entorno local.',
        format: 'mobile',
      },
    ],
    captureNotice: 'Interfaz web actual · Septiembre de 2026 · Datos ficticios · Sin capturas del APK ni de la web de gestión privada',
    technicalChallenges: [
      'Resolver captura y confirmación de datos en una interfaz pensada para usarse durante una compra.',
      'Mantener una experiencia útil sin conexión mientras se conectan sus componentes.',
      'Validar lectura de cámara y accesibilidad en hardware móvil real.',
    ],
    importantDecisions: [
      'Priorizar la app Android y desarrollar las nuevas partes de manera gradual.',
      'Toda lectura automática pasa por una confirmación editable.',
      'Comunicar el propósito de cada componente sin divulgar la arquitectura interna ni presentar la integración como terminada.',
    ],
  },
  {
    slug: 'cidcom-stock-ventas',
    name: 'CIDCom',
    category: 'Producto propio · Gestión local',
    visualLabel: 'STOCK · VENTAS',
    tone: 'blue',
    featured: true,
    summary: 'Gestión de stock y ventas para un comercio de informática, empaquetada como una aplicación local para Windows.',
    problem: 'Un comercio pequeño necesita registrar productos, movimientos y ventas sin depender de infraestructura externa ni instalaciones complejas.',
    solution: 'Una aplicación web servida localmente desde un ejecutable autocontenido, con base SQLite persistente y herramientas de respaldo y exportación.',
    participation: 'Proyecto propio; desarrollo del MVP web local y de su empaquetado autocontenido para Windows.',
    features: [
      'Productos, categorías y códigos de barras',
      'Entradas, salidas y ajustes de stock',
      'Ventas, anulación e historial',
      'Alertas de stock bajo y exportaciones CSV',
      'Backups manuales de la base local',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'ASP.NET Core', '.NET 8', 'SQLite'],
    status: 'MVP terminado',
    mainImage: {
      src: '/images/projects/cidcom/dashboard-desktop.webp',
      width: 1280,
      height: 720,
      alt: 'Panel principal de CIDCom con indicadores de demostración',
      caption: 'Panel operativo con productos, ventas e importes de demostración.',
      format: 'desktop',
    },
    gallery: [
      {
        src: '/images/projects/cidcom/productos-desktop.webp',
        width: 1253,
        height: 705,
        alt: 'Listado de productos y stock de CIDCom con datos ficticios',
        caption: 'Catálogo de prueba para revisar estados, precios y niveles de stock.',
        format: 'desktop',
      },
      {
        src: '/images/projects/cidcom/dashboard-mobile.webp',
        width: 375,
        height: 812,
        alt: 'Panel de CIDCom adaptado a una pantalla móvil',
        caption: 'Comportamiento responsive del panel principal.',
        format: 'mobile',
      },
    ],
    captureNotice: 'Entorno aislado de demostración · Datos ficticios',
    technicalChallenges: [
      'Integrar frontend, API y persistencia dentro de una distribución simple para Windows.',
      'Preservar la base de datos aunque el ejecutable cambie de ubicación.',
      'Evitar inconsistencias y stock negativo en los movimientos.',
    ],
    importantDecisions: [
      'Distribución en un único ejecutable autocontenido.',
      'Base SQLite persistente fuera de la carpeta temporal de la aplicación.',
      'Operación local, sin usuarios ni sincronización entre equipos en el MVP.',
    ],
  },
  {
    slug: 'rotiseria-gestion',
    name: 'Gestión para rotisería',
    category: 'Producto propio · Sistema de gestión',
    visualLabel: 'PEDIDOS · COCINA',
    tone: 'orange',
    featured: false,
    summary: 'Un MVP fullstack para coordinar pedidos, cocina, caja, stock y operación diaria de una rotisería de barrio.',
    problem: 'Los pedidos entran por distintos canales y deben llegar a cocina, caja y stock sin perder contexto ni trazabilidad.',
    solution: 'Un sistema centralizado con roles, estados controlados, numeración diaria y registro histórico de productos, precios y pagos.',
    participation: 'Proyecto propio; desarrollo del MVP fullstack y de sus principales flujos operativos.',
    features: [
      'Pedidos presenciales, telefónicos y de WhatsApp',
      'Vista de cocina y estados controlados',
      'Apertura y cierre de caja',
      'Productos, clientes, stock y alertas',
      'Roles para administración, atención y cocina',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Docker'],
    status: 'MVP terminado',
    mainImage: {
      src: '/images/projects/rotiseria/dashboard-desktop.webp',
      width: 1280,
      height: 720,
      alt: 'Panel de gestión para rotisería con pedidos y caja de demostración',
      caption: 'Resumen de operación con pedidos e importes de demostración.',
      format: 'desktop',
    },
    gallery: [
      {
        src: '/images/projects/rotiseria/cocina-desktop.webp',
        width: 1280,
        height: 720,
        alt: 'Tablero de cocina con pedidos ficticios en distintos estados',
        caption: 'Vista de cocina para coordinar pedidos pendientes, en preparación y listos.',
        format: 'desktop',
      },
      {
        src: '/images/projects/rotiseria/dashboard-mobile.webp',
        width: 375,
        height: 812,
        alt: 'Panel de la rotisería adaptado a una pantalla móvil',
        caption: 'Resumen operativo en formato móvil.',
        format: 'mobile',
      },
    ],
    captureNotice: 'Entorno aislado de demostración · Datos ficticios',
    technicalChallenges: [
      'Conservar snapshots históricos aunque cambien nombres o precios.',
      'Coordinar permisos y transiciones entre atención, caja y cocina.',
      'Mantener una numeración diaria consistente para los pedidos.',
    ],
    importantDecisions: [
      'Separación de permisos por roles operativos.',
      'Los pedidos conservan nombres y precios históricos.',
      'Los pedidos de WhatsApp se registran manualmente, sin automatizar conversaciones.',
    ],
  },
  {
    slug: 'radar-estacionamiento',
    name: 'Radar para estacionamiento',
    category: 'Proyecto académico · UNLP',
    visualLabel: 'ELECTRÓNICA · SENSORES',
    tone: 'green',
    featured: false,
    summary: 'Prototipo académico de asistencia al estacionamiento con sensores ultrasónicos y una interfaz visual en tiempo real.',
    problem: 'Representar distancias y obstáculos de forma clara mientras un prototipo de vehículo ejecuta una maniobra de estacionamiento.',
    solution: 'Un trabajo grupal que combinó electrónica, sensores, control de motores y una interfaz cenital que traduce distancias en señales visuales.',
    participation: 'Responsable de la estructura de la interfaz, la organización de los datos y el diseño visual de la experiencia en pantalla.',
    features: [
      'Lectura de cuatro sensores ultrasónicos',
      'Control sobre una placa EDU-CIAA',
      'Comunicación Bluetooth con una computadora',
      'Visualización cenital con alertas por distancia',
    ],
    technologies: ['EDU-CIAA', 'C', 'Python', 'Pygame', 'Bluetooth', 'Sensores ultrasónicos'],
    status: 'Investigación',
    mainImage: {
      src: '/images/projects/radar/autito-armado.webp',
      width: 525,
      height: 759,
      alt: 'Prototipo físico del autito para estacionamiento con placa, cables y sensores montados',
      caption: 'Autito armado del proyecto académico. Fotografía compartida por Lucas en septiembre de 2026.',
      format: 'hardware',
    },
    gallery: [
      {
        src: '/images/projects/radar/interfaz-desktop.webp',
        width: 522,
        height: 337,
        alt: 'Interfaz cenital del prototipo de radar para estacionamiento',
        caption: 'Interfaz visual documentada en el informe académico del proyecto.',
        format: 'desktop',
      },
      {
        src: '/images/projects/radar/pcb-captura-8.webp',
        width: 960,
        height: 1280,
        alt: 'Placa de circuito impreso del prototipo sostenida frente a una pared clara',
        caption: 'Placa del prototipo fotografiada en la captura 8 del material compartido.',
        format: 'hardware',
      },
      {
        src: '/images/projects/radar/pcb.webp',
        width: 960,
        height: 1280,
        alt: 'Placa de circuito impreso fabricada para el prototipo',
        caption: 'Registro del proceso de fabricación de la placa del prototipo.',
        format: 'hardware',
      },
    ],
    technicalChallenges: [
      'Integrar hardware, comunicación y visualización en tiempo real.',
      'Traducir mediciones de cuatro direcciones a una interfaz comprensible.',
      'La integración estable entre la interfaz y el hardware final quedó incompleta.',
    ],
    importantDecisions: [
      'Vista cenital para relacionar rápidamente cada sensor con su posición.',
      'Código de color verde, amarillo y rojo para comunicar proximidad.',
      'Presentar el trabajo como prototipo experimental, sin afirmar una integración final que no fue alcanzada.',
    ],
  },
  {
    slug: 'erp-gestion-administrativa',
    name: 'ERP para gestión administrativa',
    category: 'Experiencia profesional · Murfi',
    visualLabel: 'PROCESOS · DATOS',
    tone: 'rose',
    featured: false,
    summary: 'Participación en un sistema de gestión que digitaliza procesos administrativos reales y evoluciona con su uso.',
    problem: 'Ordenar procesos operativos e información proveniente de sistemas heredados sin interrumpir el trabajo cotidiano.',
    solution: 'Aplicaciones, API y flujos de gestión apoyados en normalización de datos, generación de documentos y despliegues reproducibles.',
    participation: 'Participo en el desarrollo y la evolución del producto como desarrollador de software en Murfi.',
    features: [
      'Gestión administrativa',
      'Migración y normalización de información',
      'Generación de documentos y reportes',
      'API REST y base de datos relacional',
      'Entornos contenerizados y autoalojados',
    ],
    technologies: ['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'Docker'],
    status: 'En desarrollo',
    gallery: [],
    technicalChallenges: [
      'Evolucionar el producto sobre requerimientos operativos reales.',
      'Migrar información heredada de forma consistente.',
      'Documentar el caso sin exponer datos de clientes ni detalles internos.',
    ],
    importantDecisions: [
      'Presentar capacidades y aprendizajes, no información confidencial.',
      'Tratar la normalización como parte explícita de la migración.',
      'Priorizar una base mantenible para la evolución continua.',
    ],
  },
  {
    slug: 'repuesteria-16',
    name: 'Repuestería 16',
    category: 'Sitio comercial · Publicado',
    visualLabel: 'CATÁLOGO · COMERCIO',
    tone: 'slate',
    featured: false,
    summary: 'Sitio comercial publicado para explorar un catálogo de repuestos de agua y gas y facilitar consultas y compras.',
    problem: 'Hacer visible un catálogo amplio y ofrecer una vía clara de consulta para productos con precio o disponibilidad variable.',
    solution: 'Una experiencia web con categorías, filtros, carrito y consultas directas por WhatsApp según el tipo de producto.',
    participation: 'Diseño y desarrollo integral del sitio, incluyendo la experiencia de catálogo, navegación, carrito y flujos de consulta.',
    features: [
      'Catálogo público y categorías',
      'Filtros y ofertas especiales',
      'Carrito para productos con precio',
      'Consulta contextual por WhatsApp',
      'Información institucional y contacto',
    ],
    technologies: ['React', '.NET'],
    status: 'MVP terminado',
    mainImage: {
      src: '/images/projects/repuesteria16/home-desktop.webp',
      width: 1253,
      height: 705,
      alt: 'Página de inicio pública de Repuestería 16',
      caption: 'Portada del sitio público capturada en escritorio.',
      format: 'desktop',
    },
    gallery: [
      {
        src: '/images/projects/repuesteria16/catalogo-desktop.webp',
        width: 1253,
        height: 705,
        alt: 'Catálogo público de Repuestería 16 con filtros y productos',
        caption: 'Exploración del catálogo y sus herramientas de búsqueda.',
        format: 'desktop',
      },
      {
        src: '/images/projects/repuesteria16/home-mobile.webp',
        width: 375,
        height: 812,
        alt: 'Página de inicio de Repuestería 16 en pantalla móvil',
        caption: 'Adaptación móvil de la portada y el acceso al catálogo.',
        format: 'mobile',
      },
    ],
    technicalChallenges: [
      'Combinar en un mismo catálogo productos con compra directa y productos sujetos a consulta.',
      'Mantener una navegación comprensible frente a un catálogo con muchas categorías.',
    ],
    importantDecisions: [
      'Derivar a WhatsApp cuando el producto requiere consulta.',
      'Reservar el carrito para artículos con precio publicado.',
      'Desarrollar la experiencia web con React y el backend con .NET.',
    ],
    demoUrl: 'https://repuesteria16.com.ar/',
  },
]

// Continúan en contexto, pero no se muestran públicamente hasta inspeccionar sus fuentes.
export const pendingProjects = [
  'Mapa de estacionamiento de CABA',
  'Bot de calendario y resultados de fútbol',
] as const
