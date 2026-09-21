import { ArrowUpRight } from './Icons'
import type { Project } from '../data/projects'

type ProjectCardProps = {
  project: Project
  onOpen: (project: Project) => void
}

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <article className={`project-card ${project.featured ? 'project-card--featured' : ''}`} data-tone={project.tone}>
      {project.mainImage ? (
        <a className="project-card__visual project-card__visual--image" href={`/proyectos/${project.slug}/`} aria-label={`Explorar ${project.name}`}>
          <span className="project-card__visual-label">{project.visualLabel}<ArrowUpRight size={15} /></span>
          <img
            src={project.mainImage.src}
            alt={project.mainImage.alt}
            width={project.mainImage.width ?? 1280}
            height={project.mainImage.height ?? 720}
            loading="lazy"
            decoding="async"
          />
        </a>
      ) : (
        <div className="project-card__visual project-card__visual--private">
          <span className="project-card__visual-label">Experiencia en Murfi</span>
          <div className="project-card__private-title" aria-hidden="true">Información clara.<br />Procesos más simples.</div>
          <span className="project-card__privacy">Caso documentado sin capturas internas</span>
        </div>
      )}

      <div className="project-card__content">
        <div className="project-card__meta">
          <span>{project.category}</span>
          <span className="status-badge">{project.status}</span>
        </div>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>

        {project.technologies.length > 0 && (
          <ul className="technology-list" aria-label={`Tecnologías de ${project.name}`}>
            {project.technologies.slice(0, 5).map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        )}

        <div className="project-card__actions">
          <a className="text-action" href={`/proyectos/${project.slug}/`}>
            Explorar el caso <ArrowUpRight size={16} />
          </a>
          <button className="project-demo-link" type="button" onClick={() => onOpen(project)} aria-label={`Vista rápida de ${project.name}`}>Vista rápida</button>
          {project.demoUrl && (
            <a className="project-demo-link" href={project.demoUrl} target="_blank" rel="noreferrer">
              Ver sitio <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
