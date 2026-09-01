import Navbar from '../components/Navbar'
import ArticleContent from '../components/ArticleContent'
import { withBasePath } from '../site-url'

export default function ArticlePage({ article, currentPath = `/blog/${article.slug}/` }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar currentPath={currentPath} />

      <main id="main-content">
        <article className="article-page" aria-labelledby="article-title">
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
        </article>
      </main>
    </>
  )
}
