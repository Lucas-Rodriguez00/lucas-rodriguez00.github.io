import { describe, expect, it } from 'vitest'
import { metadata, siteOrigin } from './seo.mjs'

describe('Configuración pública', () => {
  it('no inventa un dominio y bloquea indexación cuando falta', () => {
    const result = metadata({ name: 'Prueba', title: 'Prueba', description: 'Prueba' }, siteOrigin(), '/')
    expect(result.head).toContain('noindex, nofollow')
    expect(result.head).not.toContain('rel="canonical"')
  })
  it('rechaza credenciales, subcarpetas y orígenes inseguros', () => {
    for (const value of ['http://example.com', 'https://user:pass@example.com', 'https://example.com/repo/', 'https://example.invalid', 'https://example.com/?token=secret']) expect(() => siteOrigin(value)).toThrow()
  })
  it('genera metadata propia de cada caso y escapa su contenido', () => {
    const result = metadata({ name: 'Lucas', title: 'Lucas', description: 'Inicio' }, siteOrigin('https://example.com/'), '/proyectos/prueba/', { name: 'A & B', summary: '<texto>' })
    expect(result.head).toContain('https://example.com/proyectos/prueba/')
    expect(result.head).toContain('A &amp; B')
    expect(result.head).toContain('&lt;texto&gt;')
    expect(result.head).toContain('index, follow')
  })
})
