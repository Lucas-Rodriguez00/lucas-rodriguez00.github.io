import type { RefObject } from 'react'
import type { Project } from '../data/projects'
import { ArrowUpRight, Close } from './Icons'

export function ProjectContent({ project, onClose, closeButtonRef }: { project: Project; onClose?: () => void; closeButtonRef?: RefObject<HTMLButtonElement | null> }) {
  const Title = onClose ? 'h2' : 'h1'
  const SectionTitle = onClose ? 'h3' : 'h2'
  const PartTitle = onClose ? 'h4' : 'h3'
  const sectionId = (name: string) => `${project.slug}-${name}`
  return (
        <div className="project-dialog__panel" data-tone={project.tone}>
          <header className="project-dialog__header">
            <div>
              <p className="project-dialog__category">{project.category}</p>
              <span className="status-badge">{project.status}</span>
            </div>
            {onClose ? <button ref={closeButtonRef} className="dialog-close" type="button" onClick={onClose} aria-label="Cerrar caso de estudio">
              <Close />
            </button> : <a className="text-action" href="/#proyectos">Volver a proyectos <ArrowUpRight /></a>}
          </header>

          <div className="project-dialog__intro">
            <p className="project-dialog__visual-label">{project.visualLabel}</p>
            <Title id={`project-dialog-${project.slug}`}>{project.name}</Title>
            <p className="project-dialog__summary">{project.summary}</p>
          </div>

          {!onClose && <nav className="case-navigation" aria-label="Contenido del caso">
            <a href={`#${sectionId('contexto')}`}>Problema y participación</a>
            {project.mainImage && <a href={`#${sectionId('imagenes')}`}>Capturas</a>}
            <a href={`#${sectionId('desarrollo')}`}>Desarrollo y decisiones</a>
          </nav>}

          <section id={sectionId('contexto')} className="case-study-grid" aria-label="Contexto del proyecto">
            <section>
              <SectionTitle className="case-study-label">El problema</SectionTitle>
              <p>{project.problem}</p>
            </section>
            <section>
              <SectionTitle className="case-study-label">La solución</SectionTitle>
              <p>{project.solution}</p>
            </section>
            <section className="case-study-grid__wide">
              <SectionTitle className="case-study-label">Mi participación</SectionTitle>
              <p>{project.participation}</p>
            </section>
          </section>

          {project.systemOverview && (
            <section className="system-overview" aria-label="Visión general del sistema">
              <SectionTitle>Un producto, tres frentes de trabajo</SectionTitle>
              <div className="system-overview__grid">{project.systemOverview.map((part) => (
                <article key={part.name}><p className="section-label">{part.state}</p><PartTitle>{part.name}</PartTitle><p>{part.description}</p></article>
              ))}</div>
              <p className="system-overview__note">La app y la web ya cubren parte del recorrido; el dispositivo embebido sigue en desarrollo y hay validaciones de uso pendientes.</p>
            </section>
          )}
          {project.mainImage && (
            <section id={sectionId('imagenes')} className="project-media" aria-label={`Imágenes de ${project.name}`}>
              {project.captureNotice && <p className="capture-notice">{project.captureNotice}</p>}
              <figure className="project-media__item project-media__item--main" data-format={project.mainImage.format}>
                <div className="media-frame">
                  {project.mainImage.format !== 'hardware' && <span className="media-frame__bar" aria-hidden="true"><i /><i /><i /></span>}
                  <img
                    src={project.mainImage.src}
                    alt={project.mainImage.alt}
                    width={project.mainImage.width ?? 1280}
                    height={project.mainImage.height ?? 720}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>{project.mainImage.caption}{project.mainImage.format === 'hardware' && <a className="media-original-link" href={project.mainImage.src} target="_blank" rel="noreferrer">Ver fotografía completa</a>}</figcaption>
              </figure>

              {!onClose && project.gallery.map((media) => (
                <figure className="project-media__item" data-format={media.format} key={media.src}>
                  <div className="media-frame">
                    {media.format !== 'hardware' && (
                      <span className="media-frame__bar" aria-hidden="true"><i /><i /><i /></span>
                    )}
                    <img
                      src={media.src}
                      alt={media.alt}
                      width={media.width ?? (media.format === 'mobile' ? 390 : 1280)}
                      height={media.height ?? (media.format === 'mobile' ? 844 : 720)}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>{media.caption}</figcaption>
                </figure>
              ))}
            </section>
          )}

          {!onClose && <section id={sectionId('desarrollo')} className="case-study-details" aria-label="Desarrollo del proyecto">
            <section>
              <SectionTitle>Funcionalidades</SectionTitle>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </section>
            <section>
              <SectionTitle>Desafíos técnicos</SectionTitle>
              <ul>{project.technicalChallenges.map((challenge) => <li key={challenge}>{challenge}</li>)}</ul>
            </section>
            <section>
              <SectionTitle>Decisiones importantes</SectionTitle>
              <ul>{project.importantDecisions.map((decision) => <li key={decision}>{decision}</li>)}</ul>
            </section>
          </section>}

          <footer className="project-dialog__footer">
            {project.technologies.length > 0 && (
              <ul className="technology-list" aria-label={`Tecnologías de ${project.name}`}>
                {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            )}
            {project.githubUrl && <a className="text-action" href={project.githubUrl} target="_blank" rel="noreferrer">Ver código <ArrowUpRight /></a>}
            {onClose && <a className="button button--primary" href={`/proyectos/${project.slug}/`}>Abrir caso completo <ArrowUpRight /></a>}
            {project.demoUrl && (
              <a className="button button--primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                Visitar el sitio <ArrowUpRight />
              </a>
            )}
          </footer>
        </div>
  )
}
