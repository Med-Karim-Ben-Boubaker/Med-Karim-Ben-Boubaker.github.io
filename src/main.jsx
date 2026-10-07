import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadRouteData } from './route-pages.js'

async function start() {
  const rootElement = document.getElementById('root')
  const { pages, articles } = await loadRouteData(window.location.pathname)
  const app = (
    <StrictMode>
      <App pages={pages} articles={articles} />
    </StrictMode>
  )

  if (rootElement.hasChildNodes()) {
    hydrateRoot(rootElement, app)
  } else {
    createRoot(rootElement).render(app)
  }
}

start()
