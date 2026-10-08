import PageShell from '../components/PageShell'
import { getArticleImageSize } from '../content/article-images'
import { formatDate } from '../content/dates'
import { withArticleAssetPath, withBasePath } from '../site-url'

function ArticleListItem({ article, priority }) {
  const { width, height } = article.cover ? getArticleImageSize(article.slug, article.cover) : {}

  return (
    <li className="article-list-item">
      <a className="article-list-link" href={withBasePath(`/blog/${article.slug}/`)}>
        <div className="article-list-layout">
          {article.cover && (
            <img
              className="article-list-cover"
              src={withArticleAssetPath(article.slug, article.cover)}
              width={width}
              height={height}
              alt=""
              loading={priority ? undefined : 'lazy'}
              decoding="async"
              data-vt-name={`cover-${article.slug}`}
              data-vt-href={withBasePath(`/blog/${article.slug}/`)}
            />
          )}
          <div className="article-list-copy">
            <div className="article-list-heading">
              <h2>{article.title}</h2>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>
            <p>{article.summary}</p>
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
            <h1 id="blog-title">Writing</h1>
            <p className="blog-lead">
              Build logs, paper reviews and essays on LLMs, AI agents and AI infrastructure.
            </p>
          </header>

          <section className="blog-list-section" aria-label="Articles">
            <div className="projects-section-heading">
              <span className="section-count">{String(articles.length).padStart(2, '0')}</span>
            </div>

            {articles.length > 0 ? (
              <ol className="article-list">
                {articles.map((article, index) => <ArticleListItem key={article.slug} article={article} priority={index === 0} />)}
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
