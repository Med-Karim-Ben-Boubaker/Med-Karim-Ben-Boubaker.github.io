import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import { loadArticles } from './content/articles.js'
import projects from './content/projects.js'
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
      article,
    }
  }

  if (currentPath !== '/' && !['/projects', '/experience', '/blog'].includes(currentPath)) {
    return {
      title: 'Page not found · Karim Ben Boubaker',
      description: 'The page you requested does not exist.',
      notFound: true,
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
      description: 'Where Karim Ben Boubaker has worked: from robotics software and embedded ML to LLM agents, knowledge graphs and clinical AI research.',
    },
    '/blog': {
      title: 'Blog · Karim Ben Boubaker',
      description: 'Build logs, paper reviews and essays by Karim Ben Boubaker on LLMs, AI agents and AI infrastructure.',
    },
  }

  return pageMetadata[currentPath]
}

/** Structured site content for build-time SEO/GEO outputs (sitemap, llms.txt, JSON-LD). */
export function getSiteData() {
  return { articles: loadArticles({ includeDrafts: false }), projects }
}

export function renderPage(pathname) {
  const articles = loadArticles({ includeDrafts: false })
  const html = renderToString(<App pathname={pathname} articles={articles} pages={{ ArticlePage, BlogPage }} />)
  const metadata = getPageMetadata(pathname, articles)

  return { html, metadata }
}
