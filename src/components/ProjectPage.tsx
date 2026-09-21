import { projects, type Project } from '../data/projects'
import { contactHref } from '../data/profile'
import { ProjectContent } from './ProjectContent'
import { ArrowUpRight } from './Icons'

export function ProjectPage({ project }: { project: Project }) {
  const index = projects.findIndex((item) => item.slug === project.slug)
  const nextProject = projects[(index + 1) % projects.length]
  return (
    <div className="project-page">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Lucas Rodríguez, ir al inicio"><span className="brand-mark" aria-hidden="true">LR</span><span>Lucas Rodríguez</span></a>
          <a className="text-action" href="/#contacto">Conversemos</a>
        </div>
      </header>
      <main id="contenido" tabIndex={-1} className="container project-page__main">
        <ProjectContent project={project} />
        <nav className="project-next" aria-label="Seguir explorando">
          <a href="/#proyectos" className="text-action">Todos los proyectos</a>
          <a href={`/proyectos/${nextProject.slug}/`} className="project-next__link"><span>Siguiente proyecto</span><strong>{nextProject.name}</strong><ArrowUpRight /></a>
        </nav>
        <aside className="project-page__contact"><p>¿Tenés un problema que podríamos resolver con software?</p><a className="button button--primary" href={contactHref}>Contame sobre tu proyecto</a></aside>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><p>Lucas Rodríguez · Desarrollador de software</p><a href="/#proyectos">Explorar otros proyectos</a><p>Diseñado y desarrollado por mí · {new Date().getFullYear()}</p></div></footer>
    </div>
  )
}
