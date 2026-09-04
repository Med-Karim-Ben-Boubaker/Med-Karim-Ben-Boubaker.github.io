const SIGNAL_PROFILES = {
  about: {
    opacity: 0.075,
    pointerOpacity: 0.12,
    speed: 1,
    mouseInfluence: 0.72,
    accentThreshold: 0.7,
    phase: 0,
  },
  projects: {
    opacity: 0.065,
    pointerOpacity: 0.11,
    speed: 0.95,
    mouseInfluence: 0.62,
    accentThreshold: 0.72,
    phase: 1.4,
  },
  experience: {
    opacity: 0.05,
    pointerOpacity: 0.09,
    speed: 0.85,
    mouseInfluence: 0.52,
    accentThreshold: 0.76,
    phase: 2.6,
  },
  blog: {
    opacity: 0.04,
    pointerOpacity: 0.075,
    speed: 0.72,
    mouseInfluence: 0.44,
    accentThreshold: 0.8,
    phase: 3.8,
  },
  article: {
    opacity: 0.032,
    pointerOpacity: 0.06,
    speed: 0.65,
    mouseInfluence: 0.38,
    accentThreshold: 0.84,
    phase: 5.1,
  },
}

function routeForPath(path = '/') {
  if (path === '/') return 'about'
  if (path === '/projects') return 'projects'
  if (path === '/experience') return 'experience'
  if (path === '/blog') return 'blog'
  if (path.startsWith('/blog/')) return 'article'
  return null
}

export function getAmbientSignalRoute(path) {
  return routeForPath(path)
}

export function getAmbientSignalProfile(route) {
  return SIGNAL_PROFILES[route] || null
}
