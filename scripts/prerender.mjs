import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const distDirectory = join(projectRoot, 'dist')
const templatePath = join(distDirectory, 'index.html')
const serverEntryPath = join(projectRoot, '.prerender', 'entry-server.js')

const { getPublicRoutes, renderPage } = await import(serverEntryPath)
const template = await readFile(templatePath, 'utf8')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function withMetadata(source, metadata) {
  const title = `<title>${escapeHtml(metadata.title)}</title>`
  const description = `<meta name="description" content="${escapeHtml(metadata.description)}" />`
  const withoutTitle = source.replace(/<title>.*?<\/title>/s, '')
  const withoutDescription = withoutTitle.replace(/\s*<meta name="description"[^>]*\/?\s*>/s, '')
  return withoutDescription.replace('</head>', () => `  ${title}\n    ${description}\n  </head>`)
}

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

for (const pathname of getPublicRoutes()) {
  const { html, metadata } = renderPage(pathname)
  const page = withRenderedApp(withMetadata(template, metadata), html)
  const targetPath = outputPath(pathname)
  await mkdir(dirname(targetPath), { recursive: true })
  await writeFile(targetPath, page)
  console.log(`Pre-rendered ${pathname} → ${targetPath}`)
}
