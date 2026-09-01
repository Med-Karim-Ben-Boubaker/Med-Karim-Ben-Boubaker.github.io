export function withBasePath(path) {
  const base = String(import.meta.env.BASE_URL || '/')
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  const normalizedPath = String(path || '/').replace(/^\/+/, '')

  return `${normalizedBase}${normalizedPath}`
}

export function normalizePath(pathname) {
  const path = String(pathname || '/').split(/[?#]/, 1)[0]
  return path.replace(/\/+$/, '') || '/'
}
