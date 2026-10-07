// Home page content: featured projects and the current role.
import experienceEntries from './experience'
import projects from './projects'

export function projectAnchor(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Shown in the "Selected work" grid, in this order.
const featuredTitles = ['GPT-2 from Scratch', 'Ckeeper: Agentic DevOps Platform', 'Personalized oncology education Q&A system']

export const featuredProjects = featuredTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter(Boolean)

export const currentRole = experienceEntries.find((entry) => entry.current) || null
