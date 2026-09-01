import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadArticles } from './content/articles.js'

const rootElement = document.getElementById('root')
const app = (
  <StrictMode>
    <App articles={loadArticles({ includeDrafts: import.meta.env.DEV })} />
  </StrictMode>
)

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}
