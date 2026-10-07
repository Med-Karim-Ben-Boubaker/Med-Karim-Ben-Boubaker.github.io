// Build-time SEO helpers: head tags, JSON-LD and sitemap. Pure functions, no I/O.

export const SITE_URL = 'https://karimbenboubaker.me'
export const SITE_NAME = 'Karim Ben Boubaker'
export const PERSON_NAME = 'Mohamed Karim Ben Boubaker'
export const PERSON_ALTERNATE_NAME = 'Karim Ben Boubaker'
export const JOB_TITLE = 'AI Engineer'
export const DEFAULT_IMAGE_PATH = '/og/karim-ben-boubaker.jpg'
export const DEFAULT_IMAGE_ALT = `Portrait of ${PERSON_NAME}`
export const PROFILES = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-karim-ben-boubaker/' },
  { label: 'GitHub', href: 'https://github.com/Med-Karim-Ben-Boubaker' },
]
// Topics named in the About text.
export const KNOWS_ABOUT = [
  'Large language models',
  'AI agents',
  'Knowledge graphs',
  'Information retrieval',
  'Symbolic AI',
  'Retrieval-augmented generation',
  'Knowledge systems',
  'Human-AI collaboration',
  'Agent evaluation',
]

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export function absoluteUrl(path) {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export function articleAssetUrl(slug, filename) {
  const encodedFile = String(filename).replace(/^\.\//, '').split('/').map(encodeURIComponent).join('/')
  return absoluteUrl(`/articles/${encodeURIComponent(slug)}/${encodedFile}`)
}

export function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function escapeXml(value) {
  return escapeHtml(value)
}

/** JSON for an inline <script>: `<` is escaped so `</script>` cannot terminate it. */
export function safeJson(value) {
  return JSON.stringify(value)
    .replaceAll('<', '\\u003c')
    .replaceAll(' ', '\\u2028')
    .replaceAll(' ', '\\u2029')
}

function personRef() {
  return { '@type': 'Person', '@id': PERSON_ID, name: PERSON_NAME, url: `${SITE_URL}/` }
}

function breadcrumbs(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: absoluteUrl(path),
    })),
  }
}

function organizations(name) {
  return name.split(/\s+&\s+/).map((part) => ({ '@type': 'Organization', name: part.trim() }))
}

/**
 * Build the JSON-LD nodes for a route.
 * `context` = { articles, projects, currentRole: {organization} | null }.
 */
export function buildJsonLd(pathname, metadata, { articles, projects, currentRole }) {
  const url = absoluteUrl(pathname)
  const nodes = []

  if (metadata.article) {
    const { article } = metadata
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: article.title,
      description: article.summary,
      datePublished: article.date,
      dateModified: article.date,
      author: personRef(),
      publisher: personRef(),
      image: article.cover ? articleAssetUrl(article.slug, article.cover) : absoluteUrl(DEFAULT_IMAGE_PATH),
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      url,
      inLanguage: 'en',
      isPartOf: { '@type': 'Blog', '@id': absoluteUrl('/blog/') },
    })
    nodes.push(breadcrumbs([['Home', '/'], ['Blog', '/blog/'], [article.title, pathname]]))
    return nodes
  }

  if (pathname === '/') {
    const person = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': PERSON_ID,
      name: PERSON_NAME,
      alternateName: PERSON_ALTERNATE_NAME,
      jobTitle: JOB_TITLE,
      description: metadata.description,
      url: `${SITE_URL}/`,
      image: absoluteUrl(DEFAULT_IMAGE_PATH),
      sameAs: PROFILES.map((profile) => profile.href),
      knowsAbout: KNOWS_ABOUT,
    }
    if (currentRole?.organization) {
      const orgs = organizations(currentRole.organization)
      person.worksFor = orgs.length === 1 ? orgs[0] : orgs
    }
    nodes.push(person)
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: metadata.description,
      inLanguage: 'en',
      publisher: { '@id': PERSON_ID },
    })
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${url}#profile`,
      url,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': WEBSITE_ID },
      mainEntity: { '@id': PERSON_ID },
    })
    return nodes
  }

  const pageBase = {
    '@context': 'https://schema.org',
    url,
    name: metadata.title,
    description: metadata.description,
    inLanguage: 'en',
    isPartOf: { '@id': WEBSITE_ID },
  }

  if (pathname === '/blog/') {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': url,
      url,
      name: `${SITE_NAME} — Blog`,
      description: metadata.description,
      inLanguage: 'en',
      author: personRef(),
      blogPost: articles.map((article) => ({
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.summary,
        datePublished: article.date,
        url: absoluteUrl(`/blog/${article.slug}/`),
        author: { '@id': PERSON_ID },
      })),
    })
  } else if (pathname === '/projects/') {
    nodes.push({
      ...pageBase,
      '@type': 'CollectionPage',
      about: { '@id': PERSON_ID },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: project.title,
          description: project.description,
        })),
      },
    })
  } else if (pathname === '/experience/') {
    nodes.push({ ...pageBase, '@type': 'WebPage', about: { '@id': PERSON_ID } })
  }

  const label = metadata.title.split(' · ')[0]
  nodes.push(breadcrumbs([['Home', '/'], [label, pathname]]))
  return nodes
}

/** Head tags for a route (everything except the viewport/charset/theme-color/favicons in the template). */
export function buildHead(pathname, metadata, jsonLd) {
  const tag = (name, value, attr = 'name') => `<meta ${attr}="${name}" content="${escapeHtml(value)}" />`
  const lines = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    tag('description', metadata.description),
  ]

  if (metadata.notFound) {
    lines.push(tag('robots', 'noindex'))
    return lines.join('\n    ')
  }

  const url = absoluteUrl(pathname)
  const { article } = metadata
  const image = article?.cover ? articleAssetUrl(article.slug, article.cover) : absoluteUrl(DEFAULT_IMAGE_PATH)
  const imageAlt = article ? `Cover image for ${article.title}` : DEFAULT_IMAGE_ALT

  lines.push(
    tag('author', article?.author || PERSON_NAME),
    tag('robots', 'index,follow,max-image-preview:large'),
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    tag('og:title', metadata.title, 'property'),
    tag('og:description', metadata.description, 'property'),
    tag('og:url', url, 'property'),
    tag('og:type', article ? 'article' : 'website', 'property'),
    tag('og:site_name', SITE_NAME, 'property'),
    tag('og:image', image, 'property'),
    tag('og:image:alt', imageAlt, 'property'),
    tag('og:locale', 'en_US', 'property'),
  )
  if (!article?.cover) {
    lines.push(tag('og:image:width', '1200', 'property'), tag('og:image:height', '630', 'property'))
  }
  if (article) {
    lines.push(tag('article:published_time', article.date, 'property'), tag('article:author', article.author || PERSON_NAME, 'property'))
  }
  lines.push(
    tag('twitter:card', 'summary_large_image'),
    tag('twitter:title', metadata.title),
    tag('twitter:description', metadata.description),
    tag('twitter:image', image),
    tag('twitter:image:alt', imageAlt),
  )
  if (article) {
    lines.push(`<link rel="alternate" type="text/markdown" href="${escapeHtml(`${url}index.md`)}" />`)
  }
  for (const node of jsonLd) {
    lines.push(`<script type="application/ld+json">${safeJson(node)}</script>`)
  }
  return lines.join('\n    ')
}

/** Remove head tags this module manages so the template never produces duplicates. */
export function stripManagedHead(source) {
  return source
    .replace(/\s*<title>[\s\S]*?<\/title>/g, '')
    .replace(/\s*<meta\s+(?:name|property)="(?:description|author|robots|og:[^"]*|twitter:[^"]*|article:[^"]*)"[^>]*>/g, '')
    .replace(/\s*<link\s+rel="(?:canonical|alternate)"[^>]*>/g, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
}

export function withHead(source, head) {
  return stripManagedHead(source).replace('</head>', () => `    ${head}\n  </head>`)
}

export function buildSitemap(entries) {
  const urls = entries
    .map(({ path, lastmod }) => `  <url>\n    <loc>${escapeXml(absoluteUrl(path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}
