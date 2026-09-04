import { Icon } from '@iconify/react/dist/offline'
import githubIcon from '@iconify-icons/thesvg/github'
import pdfIcon from '@iconify-icons/simple-icons/adobeacrobatreader'
import PageShell from './components/PageShell'
import ProjectTechnologies from './components/ProjectTechnologies'
import SocialLinks from './components/SocialLinks'
import ArticlePage from './pages/ArticlePage'
import BlogPage from './pages/BlogPage'
import projects from './content/projects'
import { normalizePath, withBasePath } from './site-url'
import portrait from './assets/karim-portrait.png'
import hochschuleOffenburgLogo from './assets/experience/hochschule-offenburg.png'
import greenEarthXLogo from './assets/experience/greenearthx.jpg'
import oratioLogo from './assets/experience/oratio.jpg'
import actiaLogo from './assets/experience/actia.jpg'
import ieeeInsatRoboticsLogo from './assets/experience/ieee-insat-robotics.png'
import './App.css'
import './styles/blog.css'

function ProjectVisual({ media = [], title, visualLabel, visualDetail }) {
  if (media.length === 0) {
    return (
      <div className="project-visual project-visual--empty" aria-label={`${title} visual`}>
        <span>{visualLabel || title}</span>
        {visualDetail && <small>{visualDetail}</small>}
      </div>
    )
  }

  return (
    <div className={`project-visual${media.length > 1 ? ' project-visual--multiple' : ''}`}>
      {media.map(({ src, alt }) => <img key={src} src={src} alt={alt} />)}
    </div>
  )
}

function ProjectMeta({ children }) {
  return <li className="project-meta">{children}</li>
}

const resourceIcons = {
  github: githubIcon,
  pdf: pdfIcon,
}

function ResourceIcon({ kind }) {
  const icon = resourceIcons[kind]

  if (icon) {
    return <Icon className="project-link-icon" icon={icon} aria-hidden="true" focusable="false" />
  }

  return (
    <svg className="project-link-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.3 2.5 3.5 5.5 3.5 9S14.3 18.5 12 21c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3Z" />
    </svg>
  )
}

function ProjectLinks({ title, links }) {
  if (!links?.length) return null

  return (
    <ul className="project-links" aria-label={`${title} resources`}>
      {links.map(({ label, href, kind = 'url' }) => (
        <li key={href}>
          <a href={href} target="_blank" rel="noreferrer" aria-label={`${kind === 'github' ? 'GitHub' : kind === 'pdf' ? 'PDF document' : 'URL'}: ${label}`}>
            <ResourceIcon kind={kind} />
            <span className="project-link-label">{label}</span>
            <span className="project-link-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ title, description, period, highlights, meta, technologies, media, visualLabel, visualDetail, links }) {
  return (
    <article className="project-card" aria-label={title}>
      <ProjectVisual media={media} title={title} visualLabel={visualLabel} visualDetail={visualDetail} />
      <div className="project-card-content">
        <div className="project-card-heading">
          <h3>{title}</h3>
        </div>
        <p className="project-card-period">{period}</p>
        <p className="project-card-description">{description}</p>
        <div className="project-highlights">
          {highlights.map((highlight) => <p key={highlight}>{highlight}</p>)}
        </div>
        <ul className="project-meta-list" aria-label={`${title} details`}>
          {meta.map((item) => <ProjectMeta key={item}>{item}</ProjectMeta>)}
        </ul>
        <ProjectTechnologies title={title} items={technologies} />
        <ProjectLinks title={title} links={links} />
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
              A selection of projects across language models, healthcare, knowledge tooling, computer vision, and embedded AI.
            </p>
          </section>

          <section className="projects-selection" aria-labelledby="selection-title">
            <div className="projects-section-heading">
              <div>
                <p className="section-label">Selected work</p>
                <h2 id="selection-title">Research, prototypes, and shipped experiments.</h2>
              </div>
              <span className="section-count">01—07</span>
            </div>

            <div className="project-card-list">
              {projects.map((project) => <ProjectCard key={project.title} {...project} />)}
            </div>
          </section>

          <aside className="projects-note" aria-label="Project documentation note">
            <span className="projects-note-mark" aria-hidden="true">+</span>
            <p>Project details and resource links are drawn from the project record on LinkedIn, with supporting media included where available.</p>
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
      { name: 'PydanticAI', icon: 'pydanticai' },
      { name: 'Qdrant', icon: 'qdrant' },
      { name: 'OpenRouter', icon: 'openrouter' },
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
      { name: 'LangChain', icon: 'langchain' },
      { name: 'LangGraph', icon: 'langgraph' },
      { name: 'Neo4j', icon: 'neo4j' },
      { name: 'AWS', icon: 'aws' },
      { name: 'Langfuse', icon: 'langfuse' },
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
    meta: ['Legal chatbot', 'RAG performance', 'Document Processing'],
    technologies: [
      { name: 'Python', icon: 'python' },
      { name: 'Azure' },
      { name: 'Terraform', icon: 'terraform' },
      { name: 'MongoDB', icon: 'mongodb' },
      { name: 'FastAPI', icon: 'fastapi' },
      { name: 'RAGAS' },
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
      { name: 'Python', icon: 'python' },
      { name: 'C/C++', icon: 'cpp' },
      { name: 'TensorFlow', icon: 'tensorflow' },
    ],
  },
  {
    period: '09/2023 — 07/2024',
    duration: '11 mos',
    title: 'Software Developer',
    organization: 'IEEE INSAT Robotics and Automation Society Chapter',
    employmentType: 'Part-time',
    location: 'Tunis, Tunisia · On-site',
    logos: [ieeeInsatRoboticsLogo],
    description: 'Led development of core software for an autonomous robot that qualified for the Eurobot 2024 international competition in France.',
    highlights: [
      'Designed a decision-making engine with a path planning algorithm fusing LiDAR, computer vision, and odometry for autonomous navigation.',
      'Engineered a task scheduler optimizing priorities by distance, resource availability, and multi-factor criteria.',
      'Architected a ROS system with service interfaces uniting LiDAR, camera, navigation, and task scheduling for seamless autonomous operation.',
      'Established reliable CAN Bus communication via SocketCAN and RS485/CAN HAT between Raspberry Pi 4 and STM32F407.',
    ],
    meta: ['Autonomous robotics', 'ROS', 'Embedded systems'],
    technologies: [
      { name: 'ROS1', icon: 'ros' },
      { name: 'Ubuntu', icon: 'ubuntu' },
      { name: 'Python', icon: 'python' },
      { name: 'Raspberry Pi', icon: 'raspberryPi' },
      { name: 'Bash', icon: 'bash' },
    ],
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
              {entry.organization}
              {entry.employmentType && <><span aria-hidden="true"> · </span>{entry.employmentType}</>}
              <span aria-hidden="true"> · </span> {entry.location}
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
              <span className="section-count">01—05</span>
            </div>

            <ol className="experience-timeline">
              {experienceEntries.map((entry) => <ExperienceEntry key={`${entry.period}-${entry.title}`} entry={entry} />)}
            </ol>
          </section>

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
