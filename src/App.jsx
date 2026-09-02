import PageShell from './components/PageShell'
import ProjectTechnologies from './components/ProjectTechnologies'
import ArticlePage from './pages/ArticlePage'
import BlogPage from './pages/BlogPage'
import { normalizePath, withBasePath } from './site-url'
import portrait from './assets/karim-portrait.png'
import projectPlaceholder from './assets/project-placeholder.png'
import companyLogoPlaceholder from './assets/company-logo-placeholder.png'
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
      </div>
    </article>
  )
}

function AboutPage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="standard" className="about-page" labelledBy="about-title">
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
    </PageShell>
  )
}

function ProjectsPage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="wide" className="projects-page" labelledBy="projects-title">
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
    </PageShell>
  )
}

const experienceEntries = [
  {
    period: 'YYYY—Now',
    status: 'Placeholder · current experience',
    title: 'Current role',
    organization: 'Organisation to be documented',
    location: 'Location / remote',
    description: 'A concise summary of the current role will be added here.',
    highlights: [
      'Scope and ownership to be documented.',
      'Systems or methods to be documented.',
      'Outcomes and learnings to be documented.',
    ],
    meta: ['Focus to be documented', 'Domain to be documented', 'Outcome to be documented'],
    technologies: [
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
    ],
    current: true,
  },
  {
    period: 'YYYY—YYYY',
    status: 'Placeholder · previous experience',
    title: 'Previous role',
    organization: 'Organisation to be documented',
    location: 'Location to be documented',
    description: 'The role context and contribution will be documented here.',
    highlights: [
      'Responsibilities to be documented.',
      'Technical contribution to be documented.',
      'Result or learning to be documented.',
    ],
    meta: ['Domain to be documented', 'Scope to be documented', 'Outcome to be documented'],
    technologies: [
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
    ],
  },
  {
    period: 'YYYY—YYYY',
    status: 'Placeholder · earlier experience',
    title: 'Earlier role',
    organization: 'Organisation to be documented',
    location: 'Location to be documented',
    description: 'The earlier experience and its place in the broader trajectory will be documented here.',
    highlights: [
      'Role scope to be documented.',
      'Tools or systems to be documented.',
      'Key takeaway to be documented.',
    ],
    meta: ['Area to be documented', 'Role to be documented', 'Learning to be documented'],
    technologies: [
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
      { name: 'Technology to be documented', icon: 'placeholder' },
    ],
  },
]

function ExperienceEntry({ entry }) {
  return (
    <li className={`experience-entry${entry.current ? ' is-current' : ''}`}>
      <div className="experience-date">{entry.period}</div>
      <span className="experience-marker" aria-hidden="true" />
      <article className="experience-card" aria-label={`${entry.title} at ${entry.organization}`}>
        <div className="experience-card-header">
          <img className="experience-logo" src={companyLogoPlaceholder} width="48" height="48" alt="" />
          <div>
            <p className="project-status">{entry.status}</p>
            <h3>{entry.title}</h3>
            <p className="experience-organization">
              {entry.organization} <span aria-hidden="true">·</span> {entry.location}
            </p>
          </div>
        </div>
        <p className="experience-description">{entry.description}</p>
        <ul className="experience-highlights">
          {entry.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <ul className="project-meta-list experience-meta-list" aria-label={`${entry.title} focus areas`}>
          {entry.meta.map((item) => <ProjectMeta key={item}>{item}</ProjectMeta>)}
        </ul>
        <ProjectTechnologies title={entry.title} items={entry.technologies} />
      </article>
    </li>
  )
}

function ExperiencePage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="standard" className="experience-page" labelledBy="experience-title">
          <section className="experience-intro">
            <p className="eyebrow">Experience</p>
            <h1 id="experience-title">Experience timeline.</h1>
            <p className="experience-lead">A chronological record of roles, systems, and professional growth.</p>
          </section>

          <section className="experience-history" aria-labelledby="work-history-title">
            <div className="projects-section-heading">
              <p className="section-label" id="work-history-title">Work history</p>
              <span className="section-count">01—03</span>
            </div>

            <ol className="experience-timeline">
              {experienceEntries.map((entry) => <ExperienceEntry key={`${entry.period}-${entry.title}`} entry={entry} />)}
            </ol>
          </section>

          <aside className="projects-note experience-note" aria-label="Experience documentation note">
            <span className="projects-note-mark" aria-hidden="true">+</span>
            <p>Role details, dates, and selected outcomes will be added as the experience record is documented.</p>
          </aside>
    </PageShell>
  )
}

function NotFoundPage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="reading" className="not-found-page" labelledBy="not-found-title">
          <p className="eyebrow">Not found</p>
          <h1 id="not-found-title">This page does not exist.</h1>
          <p>The article or page you requested could not be found.</p>
          <a className="article-back-link" href={withBasePath('/blog/')}>Back to articles</a>
    </PageShell>
  )
}

export default function App({ pathname = typeof window !== 'undefined' ? window.location.pathname : '/', articles = [] }) {
  const currentPath = normalizePath(pathname)

  if (currentPath === '/projects') return <ProjectsPage currentPath={currentPath} />
  if (currentPath === '/experience') return <ExperiencePage currentPath={currentPath} />
  if (currentPath === '/blog') return <BlogPage articles={articles} currentPath={currentPath} />

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.slice('/blog/'.length)
    const article = articles.find((candidate) => candidate.slug === slug)
    return article ? <ArticlePage article={article} currentPath={currentPath} /> : <NotFoundPage currentPath={currentPath} />
  }

  if (currentPath === '/') return <AboutPage currentPath={currentPath} />
  return <NotFoundPage currentPath={currentPath} />
}
