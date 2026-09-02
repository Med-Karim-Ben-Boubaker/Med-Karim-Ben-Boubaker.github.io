import PageShell from './components/PageShell'
import ProjectTechnologies from './components/ProjectTechnologies'
import SocialLinks from './components/SocialLinks'
import ArticlePage from './pages/ArticlePage'
import BlogPage from './pages/BlogPage'
import { normalizePath, withBasePath } from './site-url'
import portrait from './assets/karim-portrait.png'
import projectPlaceholder from './assets/project-placeholder.png'
import hochschuleOffenburgLogo from './assets/experience/hochschule-offenburg.png'
import greenEarthXLogo from './assets/experience/greenearthx.jpg'
import oratioLogo from './assets/experience/oratio.jpg'
import actiaLogo from './assets/experience/actia.jpg'
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
              <SocialLinks />
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
    period: '03/2026 — Present',
    duration: '6 mos',
    title: 'AI Research Engineer',
    organization: 'Hochschule Offenburg & Hahn-Schickard',
    location: 'Offenburg, Germany',
    logos: [hochschuleOffenburgLogo],
    description: 'Building evidence-grounded AI systems that turn medical literature into validated probability distributions for clinical Bayesian networks.',
    highlights: [
      'Built a PydanticAI ReAct agent that searches medical literature, reasons over retrieved evidence, and generates validated probability distributions for clinical Bayesian networks.',
      'Designed a context-tree compression method for large Bayesian CPTs, reducing LLM elicitation calls by 79.4% on average.',
      'Built a concurrent agent evaluation runtime for benchmarking models and agent variants, with configuration-driven experiments, failure handling, tracing, and automated metrics.',
    ],
    meta: ['Healthcare', 'Bayesian networks', 'Agent evaluation'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'PydanticAI' },
      { name: 'LangGraph' },
    ],
    current: true,
  },
  {
    period: '11/2025 — 03/2026',
    duration: '4 mos',
    title: 'AI Engineer',
    organization: 'GreenEarthX',
    location: 'Palo Alto, CA · Remote',
    logos: [greenEarthXLogo],
    description: 'Built agentic compliance and regulatory-reasoning systems for EU renewable-energy regulations.',
    highlights: [
      'Built a LangGraph compliance agent combining multi-step reasoning, RAG, and expert validation, achieving 88% accuracy across 100 compliance scenarios.',
      'Built a Neo4j knowledge graph from EU regulations, modeling amendments, citations, and cross-document dependencies for multi-hop reasoning.',
      'Deployed containerized FastAPI services on AWS ECS with Langfuse observability for LLM tracing, token usage, and production debugging.',
    ],
    meta: ['Regulatory compliance', 'Knowledge graphs', 'Agent infrastructure'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'LangGraph' },
      { name: 'Neo4j' },
      { name: 'AWS' },
    ],
  },
  {
    period: '06/2025 — 11/2025',
    duration: '5 mos',
    title: 'AI Engineer',
    organization: 'Oratio Technologies',
    location: 'Tunis, Tunisia',
    logos: [oratioLogo],
    description: 'Built legal-information systems that made regulatory documents faster to ingest, retrieve, and evaluate.',
    highlights: [
      'Reduced average TTFT for a legal RAG system by 67%, from 15s to 5s, by optimizing async execution and introducing pooled, shared clients for MongoDB and Azure Cosmos DB Gremlin API.',
      'Designed and implemented a CDC and ETL platform provisioned with Terraform on Azure, synchronizing 30,000+ legal documents across MongoDB and Azure Cosmos DB Gremlin API.',
      'Built synthetic evaluation datasets and an LLM-as-judge framework integrated into CI/CD to detect RAG quality regressions before deployment.',
    ],
    meta: ['Legal technology', 'RAG performance', 'Data platforms'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'Terraform' },
      { name: 'Azure' },
      { name: 'MongoDB' },
    ],
  },
  {
    period: '06/2024 — 09/2024',
    duration: '3 mos',
    title: 'ML Engineering Intern',
    organization: 'ACTIA Engineering Services',
    location: 'Ariana, Tunisia',
    logos: [actiaLogo],
    description: 'Worked on low-latency speech-command recognition for automotive systems on resource-constrained microcontrollers.',
    highlights: [
      'Designed, trained, and optimized a CNN speech-command recognition model using TensorFlow for automotive applications.',
    ],
    meta: ['Embedded ML', 'Automotive systems', 'Low-latency inference'],
    technologies: [
      { name: 'TensorFlow' },
      { name: 'C / C++' },
    ],
  },
]

const additionalExperience = [
  {
    period: '01/2025 — 02/2025',
    duration: '1 mo',
    title: 'Machine Learning Instructor',
    organization: 'Data Overflow',
    description: 'Conducted an in-depth session on LLMs for 20+ attendees, covering sequence models, transformers, and prompt engineering; co-hosted a computer vision session on convolutional neural networks.',
  },
  {
    period: '09/2024 — Present',
    duration: '2 yrs',
    title: 'Technical Team Member',
    organization: 'IEEE INSAT Robotics and Automation Society Chapter',
    description: 'Delivered interactive AI/ML workshops covering neural networks, computer vision, and TinyML for beginner learners.',
  },
  {
    period: '08/2022 — Present',
    duration: '4 yrs 1 mo',
    title: 'Vice Chairman',
    organization: 'INSAT ACM Student Chapter',
    description: 'Helped organize the Tunisian Collegiate Programming Contest 2022, where students competed for qualification to the Africa and Arab Collegiate Programming Contest.',
  },
]

function ExperienceEntry({ entry }) {
  return (
    <li className={`experience-entry${entry.current ? ' is-current' : ''}`}>
      <div className="experience-date">
        <span>{entry.period}</span>
        <span className="experience-duration">{entry.duration}</span>
      </div>
      <span className="experience-marker" aria-hidden="true" />
      <article className="experience-card" aria-label={`${entry.title} at ${entry.organization}`}>
        <div className="experience-card-header">
          <div className="experience-logos" aria-hidden="true">
            {entry.logos.map((logo, index) => (
              <img className="experience-logo" key={`${entry.organization}-${index}`} src={logo} width="48" height="48" alt="" />
            ))}
          </div>
          <div className="experience-card-header-content">
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

function AdditionalExperienceSection() {
  return (
    <section className="additional-experience" aria-labelledby="additional-experience-title">
      <div className="projects-section-heading">
        <p className="section-label" id="additional-experience-title">Community &amp; teaching</p>
        <span className="section-count">05—07</span>
      </div>
      <div className="additional-experience-list">
        {additionalExperience.map((entry) => (
          <article className="additional-experience-entry" key={`${entry.period}-${entry.title}`}>
            <p className="additional-experience-date">
              <span>{entry.period}</span>
              <span className="experience-duration">{entry.duration}</span>
            </p>
            <div>
              <h3>{entry.title}</h3>
              <p className="additional-experience-organization">{entry.organization}</p>
              <p className="additional-experience-description">{entry.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
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
              <span className="section-count">01—04</span>
            </div>

            <ol className="experience-timeline">
              {experienceEntries.map((entry) => <ExperienceEntry key={`${entry.period}-${entry.title}`} entry={entry} />)}
            </ol>
          </section>

          <AdditionalExperienceSection />

          <aside className="projects-note experience-note" aria-label="Experience documentation note">
            <span className="projects-note-mark" aria-hidden="true">+</span>
            <p>The work timeline follows the current resume; teaching and student-leadership roles are listed separately from professional employment.</p>
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
