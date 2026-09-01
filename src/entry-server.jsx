import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { loadArticles } from './content/articles.js'
import { normalizePath } from './site-url.js'

export function getPublicRoutes() {
  const articles = loadArticles({ includeDrafts: false })
  return ['/', '/projects/', '/experience/', '/blog/', ...articles.map((article) => `/blog/${article.slug}/`)]
}

export function getPageMetadata(pathname, articles) {
  const currentPath = normalizePath(pathname)
  const article = articles.find((candidate) => `/blog/${candidate.slug}` === currentPath)

  if (article) {
    return {
      title: `${article.title} · Karim Ben Boubaker`,
      description: article.summary,
    }
  }

  const pageMetadata = {
    '/': {
      title: 'About · Karim Ben Boubaker',
      description: 'About Karim Ben Boubaker, an AI Engineer building reliable agents and knowledge systems for knowledge work.',
    },
    '/projects': {
      title: 'Projects · Karim Ben Boubaker',
      description: 'Selected projects exploring reliable agents and knowledge systems for knowledge work.',
    },
    '/experience': {
      title: 'Experience · Karim Ben Boubaker',
      description: 'A chronological record of professional experience and technical direction.',
    },
    '/blog': {
      title: 'Blog · Karim Ben Boubaker',
      description: 'Notes on building reliable agents and knowledge systems for knowledge work.',
    },
  }

  return pageMetadata[currentPath] || pageMetadata['/']
}

export function renderPage(pathname) {
  const articles = loadArticles({ includeDrafts: false })
  const html = renderToString(<App pathname={pathname} articles={articles} />)
  const metadata = getPageMetadata(pathname, articles)

  return { html, metadata }
}
