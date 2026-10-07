import sizes from './article-image-sizes.json'

/**
 * Intrinsic dimensions of an article asset (public/articles/<slug>/<file>),
 * generated alongside the optimized images. Returns {} for unknown files.
 */
export function getArticleImageSize(slug, filename) {
  let relative = String(filename || '').replace(/^\.\//, '')
  try {
    relative = decodeURIComponent(relative)
  } catch {
    // keep the raw name
  }

  const size = sizes[`${slug}/${relative}`]
  return size ? { width: size[0], height: size[1] } : {}
}
