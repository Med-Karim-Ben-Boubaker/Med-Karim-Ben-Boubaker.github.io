import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { articleMarkdown, buildLlmsFullTxt, buildLlmsTxt, parseAbout, parseExperience } from './geo.mjs'
import { buildHead, buildJsonLd, buildSitemap, withHead } from './seo.mjs'

const projectRoot = resolve(import.meta.dirname, '..')
const distDirectory = join(projectRoot, 'dist')
const templatePath = join(distDirectory, 'index.html')
const serverEntryPath = join(projectRoot, '.prerender', 'entry-server.js')

const { getPublicRoutes, getSiteData, renderPage } = await import(serverEntryPath)
const template = await readFile(templatePath, 'utf8')

// The article page chunk is lazy on the client; link its CSS (KaTeX) up front so
// prerendered math is styled before JavaScript loads.
const articleStylesheets = (await readdir(join(distDirectory, 'assets')))
  .filter((file) => /^ArticlePage-.*\.css$/.test(file))
  .map((file) => `<link rel="stylesheet" crossorigin href="/assets/${file}">`)
  .join('\n    ')

function withArticleStyles(source, pathname) {
  if (!articleStylesheets || !pathname.startsWith('/blog/') || pathname === '/blog/') return source
  return source.replace('</head>', () => `  ${articleStylesheets}\n  </head>`)
}
const { articles, projects } = getSiteData()

function withRenderedApp(source, html) {
  const rootPattern = /(<div id="root">)[\s\S]*?(<\/div>)/
  if (!rootPattern.test(source)) {
    throw new Error('Could not find the root element in the Vite HTML template')
  }

  return source.replace(rootPattern, (_, openingTag, closingTag) => `${openingTag}${html}${closingTag}`)
}

function outputPath(pathname) {
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '')
  return cleanPath ? join(distDirectory, cleanPath, 'index.html') : join(distDirectory, 'index.html')
}

async function write(targetPath, contents) {
  await mkdir(dirname(targetPath), { recursive: true })
  await writeFile(targetPath, contents)
}

const routes = getPublicRoutes()
const rendered = new Map(routes.map((pathname) => [pathname, renderPage(pathname)]))

// About and Experience live in App.jsx; read their text from the rendered pages.
const about = parseAbout(rendered.get('/').html)
const experience = parseExperience(rendered.get('/experience/').html)
if (!about.intro || experience.length === 0) {
  throw new Error('Could not extract About/Experience content from the prerendered HTML')
}
const currentRole = experience.find((entry) => entry.current) ?? null
const homeDescription = rendered.get('/').metadata.description

for (const pathname of routes) {
  const { html, metadata } = rendered.get(pathname)
  const jsonLd = buildJsonLd(pathname, metadata, { articles, projects, currentRole })
  const page = withRenderedApp(withArticleStyles(withHead(template, buildHead(pathname, metadata, jsonLd)), pathname), html)
  await write(outputPath(pathname), page)
  console.log(`Pre-rendered ${pathname}`)
}

// 404.html is served by GitHub Pages for unknown URLs at any depth; assets are root-absolute.
{
  const { html, metadata } = renderPage('/404/')
  await write(join(distDirectory, '404.html'), withRenderedApp(withHead(template, buildHead('/404/', metadata, [])), html))
  console.log('Pre-rendered 404.html')
}

// sitemap.xml
const newest = articles.map((article) => article.date).sort().at(-1) ?? new Date().toISOString().slice(0, 10)
const articleDates = new Map(articles.map((article) => [`/blog/${article.slug}/`, article.date]))
await write(
  join(distDirectory, 'sitemap.xml'),
  buildSitemap(routes.map((path) => ({ path, lastmod: articleDates.get(path) ?? newest }))),
)

// GEO files
await write(join(distDirectory, 'llms.txt'), buildLlmsTxt({ articles, about, experience, description: homeDescription }))
await write(join(distDirectory, 'llms-full.txt'), buildLlmsFullTxt({ articles, projects, about, experience, description: homeDescription }))
for (const article of articles) {
  await write(join(distDirectory, 'blog', article.slug, 'index.md'), articleMarkdown(article))
}
console.log(`Wrote sitemap.xml (${routes.length} URLs), llms.txt, llms-full.txt and ${articles.length} article markdown files`)
