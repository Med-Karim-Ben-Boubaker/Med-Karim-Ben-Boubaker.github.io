import { normalizePath } from './site-url'

/**
 * Client-only route registry. Pages that pull in heavy dependencies
 * (react-markdown, KaTeX) and the article content are loaded with a dynamic
 * import for the matching routes only, and awaited before hydration so the
 * first client render matches the prerendered HTML. The server entry imports
 * the same modules statically (see entry-server.jsx).
 *
 * Resolves to the `pages` and `articles` props for <App />.
 */
export async function loadRouteData(pathname) {
  const path = normalizePath(pathname)
  const includeDrafts = import.meta.env.DEV

  if (path === '/blog') {
    const [{ default: BlogPage }, { loadArticles }] = await Promise.all([
      import('./pages/BlogPage.jsx'),
      import('./content/articles.js'),
    ])
    return { pages: { BlogPage }, articles: loadArticles({ includeDrafts }) }
  }

  if (path.startsWith('/blog/')) {
    const [{ default: ArticlePage }, { loadArticles }] = await Promise.all([
      import('./pages/ArticlePage.jsx'),
      import('./content/articles.js'),
    ])
    return { pages: { ArticlePage }, articles: loadArticles({ includeDrafts }) }
  }

  return { pages: {}, articles: [] }
}
