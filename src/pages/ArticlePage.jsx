import Markdown, { defaultUrlTransform } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ArticleContent from '../components/ArticleContent'
import PageShell from '../components/PageShell'
import { withArticleAssetPath, withBasePath } from '../site-url'

function CoverFigure({ article }) {
  if (!article.cover) return null

  return (
    <figure className="article-cover">
      <img src={withArticleAssetPath(article.slug, article.cover)} alt={article.title} />
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
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
          <header className="article-header">
            <p className="eyebrow">Article</p>
            <h1 id="article-title">{article.title}</h1>
            <div className="article-meta">
              {article.author && <span>By {article.author}</span>}
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <p className="article-summary">{article.summary}</p>
            <CoverFigure article={article} />
          </header>
          <ArticleContent content={article.content} slug={article.slug} baseUrl={import.meta.env.BASE_URL} />
    </PageShell>
  )
}
