import Markdown, { defaultUrlTransform } from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
import '../styles/article-content.css'

function splitUrlSuffix(source) {
  const match = String(source).match(/^([^?#]*)([?#].*)?$/)
  return { path: match?.[1] || '', suffix: match?.[2] || '' }
}

function encodePath(path) {
  try {
    return path
      .split('/')
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join('/')
  } catch {
    return ''
  }
}

/**
 * Resolve a relative image reference against the public article asset
 * convention: public/articles/<slug>/<filename>.
 */
function resolveArticleImageUrl(source, { slug, baseUrl = '/' } = {}) {
  const safeSource = defaultUrlTransform(String(source || ''))

  if (!safeSource) return ''

  // Keep absolute, root-relative, and protocol-relative image URLs intact.
  if (
    /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(safeSource)
    || safeSource.startsWith('/')
  ) {
    return safeSource
  }

  if (!slug) return safeSource

  const { path, suffix } = splitUrlSuffix(safeSource)
  const relativePath = path.replace(/^\.\//, '')
  const segments = relativePath.split('/')

  if (
    !relativePath
    || segments.some((segment) => !segment || segment === '..')
  ) {
    return ''
  }

  const encodedPath = encodePath(relativePath)
  if (!encodedPath) return ''

  const normalizedBase = String(baseUrl || '/').replace(/\/+$/, '')
  return `${normalizedBase}/articles/${encodeURIComponent(slug)}/${encodedPath}${suffix}`
}

function hasOnlyImageChild(node) {
  const child = node?.children?.[0]

  return node?.children?.length === 1 && (
    child?.type === 'image'
    || (child?.type === 'element' && child?.tagName === 'img')
  )
}

function createComponents({ slug, baseUrl }) {
  return {
    a({ children, href, ...props }) {
      return <a href={href || undefined} {...props}>{children}</a>
    },

    blockquote({ children, ...props }) {
      return <blockquote className="article-blockquote" {...props}>{children}</blockquote>
    },

    code({ children, className, ...props }) {
      return <code className={className || undefined} {...props}>{children}</code>
    },

    h1({ children, ...props }) {
      return <h1 className="article-heading article-heading-1" {...props}>{children}</h1>
    },

    h2({ children, ...props }) {
      return <h2 className="article-heading article-heading-2" {...props}>{children}</h2>
    },

    h3({ children, ...props }) {
      return <h3 className="article-heading article-heading-3" {...props}>{children}</h3>
    },

    h4({ children, ...props }) {
      return <h4 className="article-heading article-heading-4" {...props}>{children}</h4>
    },

    h5({ children, ...props }) {
      return <h5 className="article-heading article-heading-5" {...props}>{children}</h5>
    },

    h6({ children, ...props }) {
      return <h6 className="article-heading article-heading-6" {...props}>{children}</h6>
    },

    img({ alt, src, title, ...props }) {
      const resolvedSrc = resolveArticleImageUrl(src, { slug, baseUrl })
      return (
        <img
          {...props}
          src={resolvedSrc || undefined}
          alt={alt || ''}
          title={title || undefined}
          loading="lazy"
        />
      )
    },

    p({ node, children, ...props }) {
      if (hasOnlyImageChild(node)) {
        const image = node.children[0]
        return (
          <figure className="article-figure">
            {children}
            {image.title && <figcaption>{image.title}</figcaption>}
          </figure>
        )
      }

      return <p {...props}>{children}</p>
    },

    pre({ children, ...props }) {
      return <pre className="article-code-block" {...props}>{children}</pre>
    },

    table({ children, ...props }) {
      return (
        <div className="article-table-wrap">
          <table {...props}>{children}</table>
        </div>
      )
    },
  }
}

/**
 * Render Markdown using the site's controlled article surface.
 * Raw HTML is intentionally not enabled; content is limited to Markdown and
 * the explicitly configured remark/rehype transformations.
 */
export default function ArticleContent({ content, children, slug, baseUrl = '/' }) {
  const markdown = typeof content === 'string' ? content : children

  return (
    <div className="article-content">
      <Markdown
        components={createComponents({ slug, baseUrl })}
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        skipHtml
        urlTransform={defaultUrlTransform}
      >
        {typeof markdown === 'string' ? markdown : ''}
      </Markdown>
    </div>
  )
}
