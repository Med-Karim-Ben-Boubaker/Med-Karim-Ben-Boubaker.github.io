import Navbar from './components/Navbar'
import ProjectTechnologies from './components/ProjectTechnologies'
import ArticlePage from './pages/ArticlePage'
import BlogPage from './pages/BlogPage'
import { normalizePath, withBasePath } from './site-url'
import portrait from './assets/karim-portrait.png'
import projectPlaceholder from './assets/project-placeholder.png'
import './App.css'
import './styles/blog.css'

function ProjectVisual() {
  return (
    <div className="project-visual" aria-hidden="true">
      <img src={projectPlaceholder} alt="" />
    </div>
  )
}

function ProjectMeta({ children }) {
  return <li className="project-meta">{children}</li>
}

function ProjectCard({ title, description, status, meta, technologies }) {
  return (
    <article className="project-card" aria-label={title}>
      <ProjectVisual />
      <div className="project-card-content">
        <div className="project-card-heading">
          <p className="project-status">{status}</p>
          <h3>{title}</h3>
        </div>
        <p className="project-card-description">{description}</p>
        <ul className="project-meta-list" aria-label={`${title} details`}>
          {meta.map((item) => <ProjectMeta key={item}>{item}</ProjectMeta>)}
        </ul>
        <ProjectTechnologies title={title} items={technologies} />
        <span className="project-card-placeholder">Case study in preparation</span>
      </div>
    </article>
  )
}

function AboutPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />

      <main id="main-content">
        <article className="about-page" aria-labelledby="about-title">
          <section className="about-hero">
            <div className="about-hero-copy">
              <p className="eyebrow">About</p>
              <h1 id="about-title">Hello, I’m Karim.</h1>
              <p className="about-role">AI Engineer</p>
              <p className="about-intro">
                I’m exploring how humans and AI agents can collaborate, especially in knowledge work. I build reliable and transparent knowledge systems that help people find, understand, and use domain information with less friction. My work brings together LLMs, symbolic AI, information retrieval, and knowledge graphs.
              </p>
            </div>

            <figure className="about-portrait">
              <img src={portrait} width="800" height="800" alt="Portrait of Mohamed Karim Ben Boubaker" />
            </figure>
          </section>

          <section className="about-trajectory" aria-labelledby="trajectory-title">
            <div className="about-trajectory-copy">
              <h2 id="trajectory-title">From components to complete systems</h2>
              <p>
                I began my engineering journey in robotics and embedded systems, where I learned how software is built in layers of abstraction: each layer hides the complexity below it so we can focus on what matters. AI adds another layer to that stack, helping us handle more complexity and stay focused on the important questions. I began my career working on this layer in legal technology and regulatory compliance, and more recently in healthcare.
              </p>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />

      <main id="main-content">
        <article className="projects-page" aria-labelledby="projects-title">
          <section className="projects-intro">
            <p className="eyebrow">Projects</p>
            <h1 id="projects-title">A few systems I’m building.</h1>
            <p className="projects-lead">
              A selection of work exploring how people and AI agents can collaborate around domain information. The detailed case studies will follow as each project is documented.
            </p>
          </section>

          <section className="projects-featured" aria-labelledby="featured-project-title">
            <div className="projects-section-heading">
              <p className="section-label">Featured</p>
              <span className="section-count">01</span>
            </div>

            <article className="project-feature-card" aria-labelledby="featured-project-title">
              <ProjectVisual />
              <div className="project-feature-content">
                <p className="project-status">Placeholder · research system</p>
                <h2 id="featured-project-title">Reliable knowledge systems</h2>
                <p>
                  Exploring ways to make domain knowledge easier to find, understand, and use—with clearer links between sources, context, and generated answers.
                </p>
                <ul className="project-meta-list" aria-label="Reliable knowledge systems details">
                  <ProjectMeta>Agents</ProjectMeta>
                  <ProjectMeta>Retrieval</ProjectMeta>
                  <ProjectMeta>Provenance</ProjectMeta>
                </ul>
                <ProjectTechnologies
                  title="Reliable knowledge systems"
                  items={[
                    { name: 'Python', icon: 'python' },
                    { name: 'Jupyter', icon: 'jupyter' },
                    { name: 'GitHub', icon: 'github' },
                  ]}
                />
                <span className="project-card-placeholder">Case study in preparation</span>
              </div>
            </article>
          </section>

          <section className="projects-selection" aria-labelledby="selection-title">
            <div className="projects-section-heading">
              <div>
                <p className="section-label">More work</p>
                <h2 id="selection-title">Research, prototypes, and experiments.</h2>
              </div>
              <span className="section-count">02—04</span>
            </div>

            <div className="project-card-list">
              <ProjectCard
                status="Placeholder · applied AI"
                title="Clinical AI workflow"
                description="A research direction for combining structured clinical models with language-model assistance while keeping the workflow inspectable."
                meta={['Healthcare', 'Symbolic AI', 'Evaluation']}
                technologies={[
                  { name: 'Python', icon: 'python' },
                  { name: 'Jupyter', icon: 'jupyter' },
                  { name: 'GitHub', icon: 'github' },
                ]}
              />
              <ProjectCard
                status="Placeholder · knowledge tooling"
                title="Provenance-aware knowledge work"
                description="A system concept for keeping notes, sources, and decisions connected as knowledge moves through a working process."
                meta={['Knowledge graphs', 'Sources', 'Workflows']}
                technologies={[
                  { name: 'Obsidian', icon: 'obsidian' },
                  { name: 'Python', icon: 'python' },
                  { name: 'GitHub', icon: 'github' },
                ]}
              />
              <ProjectCard
                status="Placeholder · ongoing"
                title="Human–agent collaboration"
                description="Experiments around interfaces that make an agent’s context, uncertainty, and next useful action easier to understand."
                meta={['Interfaces', 'Agents', 'Transparency']}
                technologies={[
                  { name: 'React', icon: 'react' },
                  { name: 'JavaScript', icon: 'javascript' },
                  { name: 'Vite', icon: 'vite' },
                ]}
              />
            </div>
          </section>

          <aside className="projects-note" aria-label="Project documentation note">
            <span className="projects-note-mark" aria-hidden="true">+</span>
            <p>Each project will eventually include the problem, my role, the system or method, evidence, and what I learned.</p>
          </aside>
        </article>
      </main>
    </>
  )
}

function NotFoundPage() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <article className="not-found-page" aria-labelledby="not-found-title">
          <p className="eyebrow">Not found</p>
          <h1 id="not-found-title">This page does not exist.</h1>
          <p>The article or page you requested could not be found.</p>
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
        </article>
      </main>
    </>
  )
}

export default function App({ pathname = typeof window !== 'undefined' ? window.location.pathname : '/', articles = [] }) {
  const currentPath = normalizePath(pathname)

  if (currentPath === '/projects') return <ProjectsPage />
  if (currentPath === '/blog') return <BlogPage articles={articles} currentPath={currentPath} />

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.slice('/blog/'.length)
    const article = articles.find((candidate) => candidate.slug === slug)
    return article ? <ArticlePage article={article} currentPath={currentPath} /> : <NotFoundPage />
  }

  if (currentPath === '/') return <AboutPage />
  return <NotFoundPage />
}
