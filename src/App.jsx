import Navbar from './components/Navbar'
import portrait from './assets/karim-portrait.png'
import './App.css'

function ProjectVisual({ compact = false }) {
  return (
    <div className={`project-visual${compact ? ' project-visual-compact' : ''}`} aria-hidden="true">
      <div className="project-visual-bar">
        <span className="project-visual-dot" />
        <span className="project-visual-dot" />
        <span className="project-visual-dot" />
        <span className="project-visual-label">system map</span>
      </div>

      <div className="project-visual-body">
        <div className="project-visual-rail">
          <span className="project-visual-rail-line is-active" />
          <span className="project-visual-rail-line" />
          <span className="project-visual-rail-line" />
          <span className="project-visual-rail-line" />
        </div>

        <div className="project-visual-canvas">
          <span className="project-visual-caption">knowledge flow</span>
          <div className="project-visual-node node-source">source</div>
          <div className="project-visual-connector connector-one" />
          <div className="project-visual-node node-context">context</div>
          <div className="project-visual-connector connector-two" />
          <div className="project-visual-node node-answer">answer</div>
        </div>
      </div>
    </div>
  )
}

function ProjectMeta({ children }) {
  return <li className="project-meta">{children}</li>
}

function ProjectCard({ title, description, status, meta, compact = false }) {
  return (
    <article className="project-card" aria-label={title}>
      <ProjectVisual compact={compact} />
      <div className="project-card-content">
        <div className="project-card-heading">
          <p className="project-status">{status}</p>
          <h3>{title}</h3>
        </div>
        <p className="project-card-description">{description}</p>
        <ul className="project-meta-list" aria-label={`${title} details`}>
          {meta.map((item) => <ProjectMeta key={item}>{item}</ProjectMeta>)}
        </ul>
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
                compact
                status="Placeholder · applied AI"
                title="Clinical AI workflow"
                description="A research direction for combining structured clinical models with language-model assistance while keeping the workflow inspectable."
                meta={['Healthcare', 'Symbolic AI', 'Evaluation']}
              />
              <ProjectCard
                compact
                status="Placeholder · knowledge tooling"
                title="Provenance-aware knowledge work"
                description="A system concept for keeping notes, sources, and decisions connected as knowledge moves through a working process."
                meta={['Knowledge graphs', 'Sources', 'Workflows']}
              />
              <ProjectCard
                compact
                status="Placeholder · ongoing"
                title="Human–agent collaboration"
                description="Experiments around interfaces that make an agent’s context, uncertainty, and next useful action easier to understand."
                meta={['Interfaces', 'Agents', 'Transparency']}
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

function App() {
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'

  return currentPath === '/projects' ? <ProjectsPage /> : <AboutPage />
}

export default App
