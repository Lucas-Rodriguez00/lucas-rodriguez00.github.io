import { URL } from 'node:url'

export function siteOrigin(value = '') {
  if (!value.trim()) return ''
  const url = new URL(value)
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || url.hostname.endsWith('.invalid')) {
    throw new Error('SITE_URL debe ser un origen HTTPS real, sin subcarpetas, usuario, query ni fragmento.')
  }
  return url.origin
}

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char])
}

export function metadata(profile, origin, path, project) {
  const title = project ? `${project.name} · ${profile.name}` : profile.title
  const description = project?.summary ?? profile.description
  const url = origin ? `${origin}${path}` : ''
  const tags = {
    'og:type': 'website', 'og:locale': 'es_AR', 'og:site_name': profile.name,
    'og:title': title, 'og:description': description,
    'og:image': `${origin}/images/social-preview.png`,
    'og:image:width': '1200', 'og:image:height': '630',
    'og:image:alt': 'Lucas Rodríguez. Construyo software para resolver problemas reales.',
    ...(url ? { 'og:url': url } : {}),
  }
  const person = { '@context': 'https://schema.org', '@type': 'Person', name: profile.name, jobTitle: 'Desarrollador de software', email: `mailto:${profile.email}`, sameAs: [profile.github, profile.linkedin], worksFor: { '@type': 'Organization', name: 'Murfi', url: profile.company }, ...(origin ? { url: origin, image: `${origin}/images/lucas-rodriguez.webp` } : {}) }
  const head = [
    `<meta name="robots" content="${origin ? 'index, follow' : 'noindex, nofollow'}" />`,
    ...Object.entries(tags).map(([key, value]) => `<meta property="${key}" content="${escapeHtml(value)}" />`),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${origin}/images/social-preview.png" />`,
    ...(url ? [`<link rel="canonical" href="${escapeHtml(url)}" />`] : []),
    `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ')
  return { title, description, head }
}
