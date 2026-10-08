import { Icon } from '@iconify/react/dist/offline'
import githubIcon from '@iconify-icons/thesvg/github'
import pdfIcon from '@iconify-icons/simple-icons/adobeacrobatreader'
import PageShell from './components/PageShell'
import PointerSpotlightCard, { PointerSpotlightGroup } from './components/PointerSpotlightCard'
import ProjectTechnologies from './components/ProjectTechnologies'
import SocialLinks from './components/SocialLinks'
import experienceEntries from './content/experience'
import { currentRole, featuredProjects, projectAnchor } from './content/home'
import projects from './content/projects'
import { normalizePath, withBasePath } from './site-url'
import portrait from './assets/karim-portrait.webp'
import './App.css'
import './styles/article-content.css'
import './styles/blog.css'
import './styles/motion.css'

function ProjectVisual({ media = [], title, visualLabel, visualDetail, priority, transitionName }) {
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
      {media.map(({ src, alt, width, height }, index) => (
        <img
          key={src}
          data-vt-name={index === 0 && transitionName ? transitionName.name : undefined}
          data-vt-href={index === 0 && transitionName ? transitionName.href : undefined}
          src={src}
          width={width}
          height={height}
          alt={alt}
          loading={priority ? undefined : 'lazy'}
          decoding="async"
        />
      ))}
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
      {links.map(({ label, href, kind = 'url', internal = false }) => (
        <li key={href}>
          <a href={href} {...(internal ? {} : { target: '_blank', rel: 'noreferrer' })} aria-label={`${kind === 'github' ? 'GitHub' : kind === 'pdf' ? 'PDF document' : 'URL'}: ${label}`}>
            <ResourceIcon kind={kind} />
            <span className="project-link-label">{label}</span>
            <span className="project-link-arrow" aria-hidden="true">↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ title, description, period, meta, technologies, media, visualLabel, visualDetail, links, priority }) {
  return (
    <PointerSpotlightCard as="article" className="project-card" id={projectAnchor(title)} aria-label={title}>
      <ProjectVisual media={media} title={title} visualLabel={visualLabel} visualDetail={visualDetail} priority={priority} transitionName={{ name: `project-${projectAnchor(title)}`, href: withBasePath(`/projects/#${projectAnchor(title)}`) }} />
      <div className="project-card-content">
        <div className="project-card-heading">
          <h2>{title}</h2>
        </div>
        <p className="project-card-period">{period}</p>
        <p className="project-card-description">{description}</p>
        <ul className="project-meta-list" aria-label={`${title} details`}>
          {meta.map((item) => <ProjectMeta key={item}>{item}</ProjectMeta>)}
        </ul>
        <ProjectTechnologies title={title} items={technologies} />
        <ProjectLinks title={title} links={links} />
      </div>
    </PointerSpotlightCard>
  )
}

function FeaturedProjectCard({ title, period, description, media }) {
  const image = media[0]

  return (
    <PointerSpotlightCard as="li" className="home-work-card">
      <a className="home-work-link" href={withBasePath(`/projects/#${projectAnchor(title)}`)}>
        {image && <img src={image.src} width={image.width} height={image.height} alt="" loading="lazy" decoding="async" data-vt-name={`project-${projectAnchor(title)}`} data-vt-href={withBasePath(`/projects/#${projectAnchor(title)}`)} />}
        <span className="home-work-copy">
          <span className="home-work-period">{period}</span>
          <span className="home-work-title">{title}</span>
          <span className="home-work-description">{description}</span>
        </span>
      </a>
    </PointerSpotlightCard>
  )
}

function AboutPage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="standard" className="about-page" labelledBy="about-title">
          <section className="about-hero">
            <div className="home-identity">
              <img className="home-avatar" src={portrait} width="560" height="560" fetchPriority="high" decoding="async" alt="Portrait of Mohamed Karim Ben Boubaker" />
              <p className="home-name">
                Karim Ben Boubaker
                <span className="about-role">{currentRole?.title || 'AI Engineer'}</span>
              </p>
            </div>

            <h1 id="about-title">I build AI agents people can trust with their knowledge.</h1>

            <p className="about-intro">
              I’m exploring how humans and AI agents can collaborate, especially in knowledge work. I build reliable and transparent knowledge systems that help people find, understand, and use domain information with less friction. My work brings together LLMs, symbolic AI, information retrieval, and knowledge graphs.
            </p>

            <div className="home-actions">
              <a className="pill-button pill-button--primary" href={withBasePath('/projects/')}>View projects</a>
              <a className="pill-button pill-button--secondary" href={withBasePath('/blog/')}>Read the blog</a>
              <SocialLinks />
            </div>
          </section>

          <section className="home-work" aria-labelledby="home-work-title">
            <div className="projects-section-heading">
              <h2 className="section-label" id="home-work-title">Selected work</h2>
              <a className="home-section-link" href={withBasePath('/projects/')}>All projects <span aria-hidden="true">→</span></a>
            </div>
            <PointerSpotlightGroup as="ul" className="home-work-grid">
              {featuredProjects.map((project) => <FeaturedProjectCard key={project.title} {...project} />)}
            </PointerSpotlightGroup>
          </section>

          <section className="about-trajectory" aria-labelledby="trajectory-title">
            <div className="about-trajectory-copy">
              <h2 id="trajectory-title">One layer of abstraction at a time</h2>
              <p>
                I began my engineering journey in robotics and embedded systems, where I learned how software is built in layers of abstraction: each layer hides the complexity below it so we can focus on what matters. AI adds another layer to that stack, helping us handle more complexity and stay focused on the important questions. I began my career working on this layer in legal technology and regulatory compliance, and more recently in healthcare.
              </p>
              <a className="home-section-link" href={withBasePath('/experience/')}>Full experience <span aria-hidden="true">→</span></a>
            </div>

          </section>

          <section className="home-cta" aria-labelledby="home-cta-title">
            <h2 id="home-cta-title">Working on trustworthy AI for knowledge work?</h2>
            <p>I’m happy to talk about agents, knowledge graphs and evidence-grounded systems.</p>
            <div className="home-actions">
              <a className="pill-button pill-button--primary" href="mailto:karimbb2002@gmail.com">Email me</a>
              <a className="pill-button pill-button--secondary" href="https://www.linkedin.com/in/mohamed-karim-ben-boubaker/" target="_blank" rel="noopener noreferrer">Connect on LinkedIn</a>
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
            <h1 id="projects-title">Selected projects</h1>
            <p className="projects-lead">
              A startup MVP, research prototypes, hackathon builds and personal tools, from a GPT-2 model trained from scratch to speech recognition on a microcontroller.
            </p>
          </section>

          <section className="projects-selection" aria-label="Project list">
            <div className="projects-section-heading">
              <span className="section-count">01—07</span>
            </div>

            <PointerSpotlightGroup className="project-card-list">
              {projects.map((project, index) => <ProjectCard key={project.title} {...project} priority={index === 0} />)}
            </PointerSpotlightGroup>
          </section>
    </PageShell>
  )
}


function ExperienceEntry({ entry }) {
  return (
    <li className={`experience-entry${entry.current ? ' is-current' : ''}`}>
      <div className="experience-date">
        <span>{entry.period}</span>
        <span className="experience-duration">{entry.duration}</span>
      </div>
      <span className="experience-marker" aria-hidden="true" />
      <PointerSpotlightCard as="article" className="experience-card" aria-label={`${entry.title} at ${entry.organization}`}>
        <div className="experience-card-header">
          <div className="experience-logos" aria-hidden="true">
            {entry.logos.map(({ src, width, height }, index) => (
              <img className="experience-logo" key={`${entry.organization}-${index}`} src={src} width={width} height={height} loading="lazy" decoding="async" alt="" />
            ))}
          </div>
          <div className="experience-card-header-content">
            <h2>{entry.title}</h2>
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
      </PointerSpotlightCard>
    </li>
  )
}

function ExperiencePage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="standard" className="experience-page" labelledBy="experience-title">
          <section className="experience-intro">
            <p className="eyebrow">Experience</p>
            <h1 id="experience-title">Where I’ve worked</h1>
            <p className="experience-lead">From robotics software and embedded ML to LLM agents, knowledge graphs and clinical AI research.</p>
          </section>

          <section className="experience-history" aria-label="Work history">
            <div className="projects-section-heading">
              <span className="section-count">01—05</span>
            </div>

            <PointerSpotlightGroup as="ol" className="experience-timeline">
              {experienceEntries.map((entry) => <ExperienceEntry key={`${entry.period}-${entry.title}`} entry={entry} />)}
            </PointerSpotlightGroup>
          </section>

    </PageShell>
  )
}

function NotFoundPage({ currentPath }) {
  return (
    <PageShell currentPath={currentPath} variant="reading" className="not-found-page" labelledBy="not-found-title">
          <p className="eyebrow">Not found</p>
          <h1 id="not-found-title">This page does not exist.</h1>
          <p>The page you requested could not be found.</p>
          <a className="article-back-link" href={withBasePath('/')}>Back to home</a>
    </PageShell>
  )
}

/**
 * `pages` carries the blog page components (`BlogPage`, `ArticlePage`). They
 * are injected rather than imported so the client can code-split them (and
 * react-markdown/KaTeX) behind a dynamic import, while the server entry
 * passes them statically; see src/route-pages.js.
 */
export default function App({ pathname = typeof window !== 'undefined' ? window.location.pathname : '/', articles = [], pages = {} }) {
  const { BlogPage, ArticlePage } = pages
  const currentPath = normalizePath(pathname)

  if (currentPath === '/projects') return <ProjectsPage currentPath={currentPath} />
  if (currentPath === '/experience') return <ExperiencePage currentPath={currentPath} />
  if (currentPath === '/blog') return BlogPage && <BlogPage articles={articles} currentPath={currentPath} />

  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.slice('/blog/'.length)
    const article = articles.find((candidate) => candidate.slug === slug)
    return article && ArticlePage ? <ArticlePage article={article} currentPath={currentPath} /> : <NotFoundPage currentPath={currentPath} />
  }

  if (currentPath === '/') return <AboutPage currentPath={currentPath} />
  return <NotFoundPage currentPath={currentPath} />
}
