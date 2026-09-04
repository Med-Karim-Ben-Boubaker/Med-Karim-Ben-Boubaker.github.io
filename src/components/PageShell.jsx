import { useRef } from 'react'
import AmbientSignalField from './AmbientSignalField'
import { getAmbientSignalRoute } from './ambient-signal-field'
import Navbar from './Navbar'
import Footer from './Footer'

const variantClasses = {
  standard: 'page-shell--standard',
  wide: 'page-shell--wide',
  reading: 'page-shell--reading',
  article: 'page-shell--article',
}

export default function PageShell({ currentPath, variant = 'standard', className = '', labelledBy, children }) {
  const variantClass = variantClasses[variant] || variantClasses.standard
  const pageClassName = `page-shell ${variantClass}${className ? ` ${className}` : ''}`
  const signalRoute = getAmbientSignalRoute(currentPath)
  const pageRef = useRef(null)

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar currentPath={currentPath} />
      <main id="main-content">
        <AmbientSignalField route={signalRoute} />
        <article
          className={pageClassName}
          aria-labelledby={labelledBy}
          ref={pageRef}
        >
          {children}
        </article>
      </main>
      <Footer />
    </>
  )
}
