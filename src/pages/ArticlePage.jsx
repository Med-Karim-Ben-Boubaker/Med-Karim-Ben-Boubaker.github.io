import Markdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ArticleContent from '../components/ArticleContent'
import PageShell from '../components/PageShell'
import { getArticleImageSize } from '../content/article-images'
import { formatDate } from '../content/dates'
import { withArticleAssetPath, withBasePath } from '../site-url'

function CoverFigure({ article }) {
  if (!article.cover) return null

  const { width, height } = getArticleImageSize(article.slug, article.cover)

  return (
    <figure className="article-cover">
      <img
        src={withArticleAssetPath(article.slug, article.cover)}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        alt={article.title}
        data-vt-name={`cover-${article.slug}`}
        data-vt-href={withBasePath(`/blog/${article.slug}/`)}
      />
      {article.coverCaption && (
        <figcaption>
          <Markdown
            remarkPlugins={[remarkGfm]}
            skipHtml
            urlTransform={defaultUrlTransform}
            components={{ p: ({ children }) => <>{children}</> }}
          >
            {article.coverCaption}
          </Markdown>
        </figcaption>
      )}
    </figure>
  )
}

export default function ArticlePage({ article, currentPath = `/blog/${article.slug}/` }) {
  return (
    <PageShell currentPath={currentPath} variant="article" className="article-page" labelledBy="article-title">
          <div className="reading-progress" aria-hidden="true" />
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
          <header className="article-header">
            <p className="eyebrow">Article</p>
            <h1 id="article-title">{article.title}</h1>
            <div className="article-meta">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <p className="article-summary">{article.summary}</p>
            <CoverFigure article={article} />
          </header>
          <ArticleContent content={article.content} slug={article.slug} baseUrl={import.meta.env.BASE_URL} />
    </PageShell>
  )
}
