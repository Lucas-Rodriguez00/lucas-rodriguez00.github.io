import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Close, Github, Linkedin, Mail, Menu } from './components/Icons'
import { ProjectCard } from './components/ProjectCard'
import { ProjectDialog } from './components/ProjectDialog'
import { projects, type Project } from './data/projects'
import { contactHref, profile, technologyGroups } from './data/profile'
import { Contact } from './components/Contact'
import { ProjectPage } from './components/ProjectPage'

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Tecnologías', href: '#tecnologias' },
  { label: 'Contacto', href: '#contacto' },
]

function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#inicio')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const menuButton = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting)
      if (visible) setActiveSection(`#${visible.target.id}`)
    }, { rootMargin: '-15% 0px -65% 0px' })
    for (const item of navItems) {
      const section = document.querySelector(item.href)
      if (section) observer.observe(section)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
      if (event.key === 'Tab') {
        const elements = headerRef.current?.querySelectorAll<HTMLElement>('a, button')
        if (!elements?.length) return
        const first = elements[0]
        const last = elements[elements.length - 1]
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
      }
    }
    const media = window.matchMedia('(max-width: 680px)')
    const onResize = () => { if (!media.matches) setMenuOpen(false) }
    document.addEventListener('keydown', onKeyDown)
    media.addEventListener('change', onResize)
    return () => { document.removeEventListener('keydown', onKeyDown); media.removeEventListener('change', onResize) }
  }, [menuOpen])

  useEffect(() => {
    document.body.style.overflow = menuOpen || selectedProject ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen, selectedProject])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header" ref={headerRef}>
        <div className="container header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="Lucas Rodríguez, ir al inicio">
            <span className="brand-mark" aria-hidden="true">LR</span>
            <span>Lucas Rodríguez</span>
          </a>

          <nav id="main-navigation" className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`} aria-label="Navegación principal">
            <div className="nav-list">
              {navItems.map((item) => (
                <a key={item.label} className="nav-link" href={item.href} aria-current={activeSection === item.href ? 'location' : undefined} onClick={() => {
                  closeMenu()
                  if (menuOpen) requestAnimationFrame(() => document.querySelector<HTMLElement>(item.href)?.focus({ preventScroll: true }))
                }}>
                  {item.label}
                </a>
              ))}
            </div>
          </nav>

          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="contenido" tabIndex={-1} inert={menuOpen}>
        <section id="inicio" className="hero" aria-labelledby="hero-title" tabIndex={-1}>
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Desarrollador de software <span aria-hidden="true">·</span> Actualmente en <a href={profile.company} target="_blank" rel="noreferrer">Murfi</a></p>
              <h1 id="hero-title">Construyo software para resolver <span>problemas reales.</span></h1>
              <p className="hero-description">Soy Lucas Rodríguez. Desarrollo aplicaciones web, sistemas de gestión y proyectos que combinan software, sistemas embebidos y electrónica para resolver necesidades concretas.</p>

              <div className="hero-actions">
                <a className="button button--primary" href="#proyectos">
                  Ver proyectos <ArrowUpRight />
                </a>
                <a className="button button--secondary" href="#contacto">
                  Hablemos de tu idea <Mail size={17} />
                </a>
              </div>

              <div className="social-links" aria-label="Enlaces profesionales">
                <a href={profile.github} aria-label="GitHub" target="_blank" rel="noreferrer"><Github /> <span>GitHub</span></a>
                <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin /> <span>LinkedIn</span></a>
                <a href={`mailto:${profile.email}`} aria-label="Correo"><Mail /> <span>Correo</span></a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="portrait-frame">
                <img src="/images/lucas-rodriguez.webp" alt="Lucas Rodríguez con traje oscuro en un parque durante la noche" width={750} height={938} fetchPriority="high" />
              </div>
              <div className="portrait-caption"><span>Lucas Rodríguez</span><p>Ingeniería en Computación · UNLP<br />Estudiante avanzado</p></div>
            </div>
          </div>
        </section>

        <section id="sobre-mi" className="intro-section section-band" aria-labelledby="about-title" tabIndex={-1}>
          <div className="container two-column-grid">
            <div>
              <p className="intro-lead-in">Mi manera de encarar cada proyecto:</p>
              <h2 id="about-title">Toma lo mejor que existe y mejóralo. Si no existe, diséñalo</h2>
            </div>
            <div className="section-copy">
              <p className="section-label">Sobre mí</p>
              <p>Estudio Ingeniería en Computación en la UNLP y soy estudiante avanzado. Actualmente trabajo como desarrollador en Murfi, donde participo en la construcción de soluciones para problemas operativos reales.</p>
              <p>Me interesa trabajar en productos completos: entender el problema, ordenar la información, construir la solución y dejar una base que pueda mantenerse y evolucionar. En mis proyectos propios también trabajo con sistemas embebidos y electrónica, conectando lo digital con dispositivos físicos.</p>
            </div>
          </div>
        </section>

        <section id="experiencia" className="experience-section" aria-labelledby="experience-title" tabIndex={-1}>
          <div className="container">
            <div className="section-heading-row">
              <div>
                <p className="section-label">Experiencia actual</p>
                <h2 id="experience-title">Mi trabajo en Murfi.</h2>
              </div>
              <p className="section-heading-note">Trabajo sobre requerimientos reales y evolución continua del producto.</p>
            </div>

            <article className="experience-card">
              <div className="experience-main">
                <div className="experience-company">
                  <span className="company-logo"><img src="/images/murfi-logo.webp" alt="" width={192} height={192} loading="lazy" decoding="async" /></span>
                  <div>
                    <p className="experience-role">Desarrollador de software</p>
                    <h3>Murfi</h3>
                  </div>
                </div>
                <div>
                  <p className="experience-period">Junio de 2026 — Actualidad</p>
                  <div className="experience-actions">
                    <a className="text-action experience-link" href="/proyectos/erp-gestion-administrativa/">Conocer mi participación <ArrowUpRight size={16} /></a>
                    <a className="text-action experience-link" href={profile.company} target="_blank" rel="noopener noreferrer">Visitar sitio de Murfi <ArrowUpRight size={16} /></a>
                  </div>
                </div>
              </div>

              <div className="experience-detail">
                <p>Actualmente participo en el desarrollo y la evolución de sistemas de gestión en Murfi. Trabajo sobre requerimientos reales: ordenar información de sistemas heredados, construir APIs y herramientas administrativas, y generar documentos y reportes que acompañan la operación diaria.</p>
                <ul className="experience-list">
                  <li>Aplicaciones y sistemas de gestión.</li>
                  <li>Backend con Node.js y TypeScript.</li>
                  <li>APIs y bases de datos PostgreSQL.</li>
                  <li>Migración y normalización de información heredada.</li>
                  <li>Generación de documentos y reportes.</li>
                  <li>Docker y entornos autoalojados.</li>
                </ul>
              </div>
            </article>
          </div>
        </section>

        <section id="proyectos" className="projects-section" aria-labelledby="projects-title" tabIndex={-1}>
          <div className="container">
            <div className="section-heading-row projects-heading">
              <div>
                <p className="section-label">Proyectos seleccionados</p>
                <h2 id="projects-title">Problemas concretos.<br />Software a medida.</h2>
              </div>
              <p className="section-heading-note">Sistemas de gestión, herramientas cotidianas y proyectos que conectan software con electrónica.</p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} onOpen={setSelectedProject} />
              ))}
            </div>

            <p className="projects-footnote">Cada caso se presenta con alcance verificable. Las escenas de demostración usan datos ficticios y el trabajo de Murfi se documenta sin exponer información confidencial.</p>
          </div>
        </section>
        <section id="tecnologias" className="technologies-section" aria-labelledby="technologies-title" tabIndex={-1}>
          <div className="container">
            <div className="section-heading-row">
              <div><p className="section-label">Tecnologías</p><h2 id="technologies-title">La herramienta depende del problema.</h2></div>
              <p className="section-heading-note">Estas son las tecnologías que uso para dar forma a mis proyectos.</p>
            </div>
            <div className="technology-groups">
              {technologyGroups.map((group) => (
                <article className="technology-group" key={group.name}>
                  <div><h3>{group.name}</h3><p>{group.description}</p></div>
                  <ul className="technology-list" aria-label={group.name}>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </div>
          </div>
        </section>
        <Contact />
      </main>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />

      <footer className="site-footer" inert={menuOpen}>
        <div className="container footer-inner">
          <p><span>Lucas Rodríguez</span> · Desarrollador de software</p>
          <p>Diseñado y desarrollado por mí · {new Date().getFullYear()}</p>
          <nav className="footer-links" aria-label="Enlaces del pie"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={contactHref}>Correo</a></nav>
        </div>
      </footer>
    </div>
  )
}

export default function App({ pathname = '/' }: { pathname?: string }) {
  const project = projects.find((item) => pathname.replace(/\/$/, '') === `/proyectos/${item.slug}`)
  return project ? <ProjectPage project={project} /> : <Portfolio />
}
