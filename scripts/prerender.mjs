import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createServer, loadEnv } from 'vite'
import { escapeHtml, metadata, siteOrigin } from './seo.mjs'

const env = loadEnv('production', process.cwd(), 'SITE_URL')
const origin = siteOrigin(process.env.SITE_URL ?? env.SITE_URL ?? '')
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { render, projects, profile } = await server.ssrLoadModule('/src/entry-server.tsx')
  const template = await readFile('dist/index.html', 'utf8')
  const routes = [{ path: '/', project: undefined }, ...projects.map(project => ({ path: `/proyectos/${project.slug}/`, project }))]
  for (const { path, project } of routes) {
    const { title, description, head } = metadata(profile, origin, path, project)
    const html = template.replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
      .replace('<!-- SEO_GENERATED -->', head)
      .replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`)
    const directory = `dist${path}`
    await mkdir(directory, { recursive: true })
    await writeFile(`${directory}index.html`, html)
  }
  const urls = origin ? routes.map(route => `<url><loc>${escapeHtml(origin + route.path)}</loc></url>`).join('\n') : ''
  await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
  await writeFile('dist/robots.txt', origin ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n')
  const stylesheet = template.match(/<link[^>]+rel="stylesheet"[^>]*>/)?.[0] ?? ''
  await writeFile('dist/404.html', `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>Página no encontrada · Lucas Rodríguez</title>${stylesheet}</head><body><main class="container contact-section"><h1>Esta página no existe.</h1><p>Podés volver al portafolio para explorar los proyectos.</p><a class="button button--primary" href="/">Volver al inicio</a></main></body></html>`)
  console.log(`HTML estático: ${routes.length} páginas. ${origin ? `Dominio: ${origin}` : 'Dominio pendiente: indexación desactivada.'}`)
} finally { await server.close() }
