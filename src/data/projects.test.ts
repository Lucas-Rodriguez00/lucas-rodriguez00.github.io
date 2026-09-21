import { describe, expect, it } from 'vitest'
import { pendingProjects, projects, projectStatuses } from './projects'

describe('projects data', () => {
  it('publishes only projects backed by inspected sources', () => {
    expect(projects).toHaveLength(6)
    expect(projects.map((project) => project.slug)).toEqual([
      'compras-stock-domestico',
      'cidcom-stock-ventas',
      'rotiseria-gestion',
      'radar-estacionamiento',
      'erp-gestion-administrativa',
      'repuesteria-16',
    ])
  })

  it('uses supported statuses and never exposes an empty case study', () => {
    expect(projects.every((project) => projectStatuses.includes(project.status))).toBe(true)
    expect(projects.every((project) => project.features.length > 0)).toBe(true)
    expect(projects.every((project) => project.technicalChallenges.length > 0)).toBe(true)
    expect(projects.every((project) => project.importantDecisions.length > 0)).toBe(true)
  })

  it('keeps uninspected projects out of the public collection', () => {
    expect(pendingProjects).toEqual([
      'Mapa de estacionamiento de CABA',
      'Bot de calendario y resultados de fútbol',
    ])
  })

  it('only publishes verified external links', () => {
    const linkedProjects = projects.filter((project) => project.demoUrl || project.githubUrl)
    expect(linkedProjects).toHaveLength(1)
    expect(linkedProjects[0].demoUrl).toBe('https://repuesteria16.com.ar/')
  })

  it('keeps captured cases traceable and labels demonstration data', () => {
    const capturedProjects = projects.filter((project) => project.mainImage)
    expect(capturedProjects.map((project) => project.slug)).toEqual([
      'compras-stock-domestico',
      'cidcom-stock-ventas',
      'rotiseria-gestion',
      'radar-estacionamiento',
      'repuesteria-16',
    ])
    expect(capturedProjects.every((project) => project.gallery.length > 0)).toBe(true)
    expect(projects.find((project) => project.slug === 'cidcom-stock-ventas')?.captureNotice).toContain('Datos ficticios')
    expect(projects.find((project) => project.slug === 'rotiseria-gestion')?.captureNotice).toContain('Datos ficticios')
  })
})
