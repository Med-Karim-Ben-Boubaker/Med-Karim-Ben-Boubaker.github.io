export function withBasePath(path) {
  const base = String(import.meta.env.BASE_URL || '/')
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = String(path || '/').replace(/^\/+/, '')

  return `${normalizedBase}${normalizedPath}`
}

export function withArticleAssetPath(slug, filename) {
  const encodedSlug = encodeURIComponent(String(slug || ''))
  const encodedFilename = String(filename || '')
    .split('/')
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment))
      } catch {
        return encodeURIComponent(segment)
      }
    })
    .join('/')

  return withBasePath(`/articles/${encodedSlug}/${encodedFilename}`)
}

export function normalizePath(pathname) {
  const path = String(pathname || '/').split(/[?#]/, 1)[0]
  return path.replace(/\/+$/, '') || '/'
}
