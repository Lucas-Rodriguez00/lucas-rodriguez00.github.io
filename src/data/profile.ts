export const profile = {
  name: 'Lucas Rodríguez',
  email: 'lucasrodri017@gmail.com',
  github: 'https://github.com/Lucas-Rodriguez00',
  linkedin: 'https://www.linkedin.com/in/lucas-rodriguez-01b25a272/',
  company: 'https://murfi.com.ar/',
  title: 'Lucas Rodríguez · Desarrollo de software',
  description: 'Desarrollador de software en Murfi y estudiante avanzado de Ingeniería en Computación en la UNLP. Construyo aplicaciones, sistemas de gestión y proyectos con sistemas embebidos y electrónica.',
} as const

export const contactHref = `mailto:${profile.email}?subject=${encodeURIComponent('Hablemos de tu idea')}`

// Solo herramientas confirmadas en los proyectos y por Lucas.
export const technologyGroups = [
  { name: 'Interfaces', description: 'Aplicaciones web claras y adaptables.', items: ['React', 'TypeScript', 'Vite', 'HTML', 'CSS'] },
  { name: 'Backend', description: 'Lógica de negocio y servicios para los productos.', items: ['Node.js', 'Fastify', 'Express', '.NET', 'APIs REST'] },
  { name: 'Datos', description: 'Información organizada, en el servidor y en el dispositivo.', items: ['PostgreSQL', 'SQLite', 'IndexedDB'] },
  { name: 'Mobile', description: 'Experiencias que acompañan el uso cotidiano.', items: ['Android', 'Capacitor', 'PWA'] },
  { name: 'Embebidos y electrónica', description: 'Software que interactúa con dispositivos y sensores.', items: ['ESP32', 'C++', 'Sensores ultrasónicos'] },
  { name: 'Infraestructura y calidad', description: 'Entornos reproducibles y una base que se pueda mantener.', items: ['Docker', 'Git', 'GitHub', 'Vitest', 'Testing automatizado'] },
] as const
