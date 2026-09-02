import ArticleContent from '../components/ArticleContent'
import PageShell from '../components/PageShell'
import { withBasePath } from '../site-url'

export default function ArticlePage({ article, currentPath = `/blog/${article.slug}/` }) {
  return (
    <PageShell currentPath={currentPath} variant="article" className="article-page" labelledBy="article-title">
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
          <header className="article-header">
            <p className="eyebrow">Article</p>
            <h1 id="article-title">{article.title}</h1>
            <div className="article-meta">
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <p className="article-summary">{article.summary}</p>
          </header>
          <ArticleContent content={article.content} slug={article.slug} baseUrl={import.meta.env.BASE_URL} />
    </PageShell>
  )
}
