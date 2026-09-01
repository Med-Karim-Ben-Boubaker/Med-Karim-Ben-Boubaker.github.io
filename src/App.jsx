import Navbar from './components/Navbar'
import portrait from './assets/karim-portrait.png'
import './App.css'

function App() {
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
              <p className="about-meta">
                AI Research Intern @ Hochschule Offenburg <span aria-hidden="true">·</span> Building Agents for Knowledge Workers<br />
                Offenburg, Baden-Württemberg, Germany
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
              <p className="about-institutions">
                Offenburg University of Applied Sciences<br />
                INSAT – Institut National des Sciences Appliquées et de Technologie
              </p>
            </div>
          </section>

          <nav className="about-links" aria-label="About page links">
            <a className="about-link about-link-primary" href="/experience/">Explore experience</a>
            <span aria-hidden="true">·</span>
            <a className="about-link" href="/projects/">View projects</a>
            <span aria-hidden="true">·</span>
            <a className="about-link" href="/blog/">Read the blog</a>
            <span aria-hidden="true">·</span>
            <a className="about-link" href="https://github.com/Med-Karim-Ben-Boubaker" target="_blank" rel="noreferrer">GitHub</a>
            <span aria-hidden="true">·</span>
            <a className="about-link" href="https://www.linkedin.com/in/med-karim-ben-boubaker/" target="_blank" rel="noreferrer">LinkedIn</a>
          </nav>
        </article>
      </main>

      <footer className="site-footer">
        <span>Karim Ben Boubaker</span>
        <span>React · {new Date().getFullYear()}</span>
      </footer>
    </>
  )
}

export default App
