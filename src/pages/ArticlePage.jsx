import Markdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articleMarkdown } from '../../scripts/geo.mjs'
import ArticleContent from '../components/ArticleContent'
import { CopyButton, ZoomableImage } from '../components/ArticleTools'
import { useImageLightbox } from '../components/use-image-lightbox'
import PageShell from '../components/PageShell'
import { getArticleImageSize } from '../content/article-images'
import { formatDate } from '../content/dates'
import { withArticleAssetPath, withBasePath } from '../site-url'

function CoverFigure({ article, onZoom }) {
  if (!article.cover) return null

  const { width, height } = getArticleImageSize(article.slug, article.cover)

  return (
    <figure className="article-cover">
      <ZoomableImage
        className="article-zoom-block"
        onZoom={onZoom}
        src={withArticleAssetPath(article.slug, article.cover)}
        width={width}
        height={height}
        fetchPriority="high"
        decoding="async"
        alt={article.title}
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
  const [openImage, lightbox] = useImageLightbox()

  return (
    <PageShell currentPath={currentPath} variant="article" className="article-page" labelledBy="article-title">
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
          <header className="article-header">
            <p className="eyebrow">Article</p>
            <h1 id="article-title">{article.title}</h1>
            <div className="article-meta">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <CopyButton getText={() => articleMarkdown(article)} label="Copy as Markdown" className="article-copy-markdown" />
            </div>
            <p className="article-summary">{article.summary}</p>
            <CoverFigure article={article} onZoom={openImage} />
          </header>
          <ArticleContent content={article.content} slug={article.slug} baseUrl={import.meta.env.BASE_URL} onZoomImage={openImage} />
          {lightbox}
    </PageShell>
  )
}
