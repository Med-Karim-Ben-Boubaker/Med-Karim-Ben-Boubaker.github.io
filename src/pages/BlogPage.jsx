import PageShell from '../components/PageShell'
import { withArticleAssetPath, withBasePath } from '../site-url'

function ArticleListItem({ article }) {
  return (
    <li className="article-list-item">
      <a className="article-list-link" href={withBasePath(`/blog/${article.slug}/`)}>
        <div className="article-list-layout">
          {article.cover && (
            <img
              className="article-list-cover"
              src={withArticleAssetPath(article.slug, article.cover)}
              alt=""
              loading="lazy"
            />
          )}
          <div className="article-list-copy">
            <div className="article-list-heading">
              <h2>{article.title}</h2>
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <p>{article.summary}</p>
            {article.author && <p className="article-list-author">By {article.author}</p>}
          </div>
        </div>
      </a>
    </li>
  )
}

export default function BlogPage({ articles, currentPath = '/blog/' }) {
  return (
    <PageShell currentPath={currentPath} variant="reading" className="blog-page" labelledBy="blog-title">
          <header className="blog-intro">
            <p className="eyebrow">Blog</p>
            <h1 id="blog-title">Notes on building reliable systems.</h1>
            <p className="blog-lead">
              Writing about agents, knowledge systems, and the practical work of making AI easier to understand and use.
            </p>
          </header>

          <section className="blog-list-section" aria-labelledby="latest-articles-title">
            <div className="projects-section-heading">
              <p className="section-label" id="latest-articles-title">Latest articles</p>
              <span className="section-count">{String(articles.length).padStart(2, '0')}</span>
            </div>

            {articles.length > 0 ? (
              <ol className="article-list">
                {articles.map((article) => <ArticleListItem key={article.slug} article={article} />)}
              </ol>
            ) : (
              <div className="blog-empty-state">
                <p className="blog-empty-mark" aria-hidden="true">+</p>
                <div>
                  <h2>The first note is taking shape.</h2>
                  <p>Articles will appear here as they are written and documented.</p>
                </div>
              </div>
            )}
          </section>
    </PageShell>
  )
}
