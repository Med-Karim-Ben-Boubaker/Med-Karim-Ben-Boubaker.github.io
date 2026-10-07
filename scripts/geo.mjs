// Build-time GEO outputs: llms.txt, llms-full.txt and per-article markdown copies.
// Articles and projects come from the content modules; About and Experience are
// defined inside App.jsx, so they are read from the prerendered HTML.

import { PERSON_NAME, PERSON_ALTERNATE_NAME, JOB_TITLE, PROFILES, absoluteUrl, articleAssetUrl } from './seo.mjs'

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' }

export function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&(?:#x([0-9a-f]+)|#(\d+)|([a-z]+));/gi, (match, hex, dec, name) => {
      if (hex) return String.fromCodePoint(parseInt(hex, 16))
      if (dec) return String.fromCodePoint(Number(dec))
      return ENTITIES[name.toLowerCase()] ?? match
    })
    .replace(/\s+/g, ' ')
    .trim()
}

function firstText(html, pattern) {
  const match = html.match(pattern)
  return match ? htmlToText(match[1]) : ''
}

export function parseAbout(html) {
  return {
    role: firstText(html, /<p class="about-role">([\s\S]*?)<\/p>/) || JOB_TITLE,
    intro: firstText(html, /<p class="about-intro">([\s\S]*?)<\/p>/),
    trajectoryTitle: firstText(html, /<section class="about-trajectory"[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/),
    trajectory: firstText(html, /<div class="about-trajectory-copy">[\s\S]*?<\/h2>\s*<p>([\s\S]*?)<\/p>/),
  }
}

export function parseExperience(html) {
  const entries = []
  const pattern = /<li class="experience-entry([^"]*)">([\s\S]*?)(?=<li class="experience-entry|<\/ol>)/g

  for (const [, classes, body] of html.matchAll(pattern)) {
    const spans = [...body.matchAll(/<div class="experience-date">([\s\S]*?)<\/div>/g)][0]?.[1] ?? ''
    const [period = '', duration = ''] = [...spans.matchAll(/<span[^>]*>([\s\S]*?)<\/span>/g)].map((m) => htmlToText(m[1]))
    const organizationHtml = body.match(/<p class="experience-organization">([\s\S]*?)<\/p>/)?.[1] ?? ''
    const [organization = '', ...rest] = organizationHtml.split(/<span aria-hidden="true">\s*·\s*<\/span>/).map(htmlToText)
    const highlightsHtml = body.match(/<ul class="experience-highlights">([\s\S]*?)<\/ul>/)?.[1] ?? ''
    const metaHtml = body.match(/<ul class="project-meta-list[^"]*"[^>]*>([\s\S]*?)<\/ul>/)?.[1] ?? ''

    entries.push({
      current: classes.includes('is-current'),
      period,
      duration,
      title: firstText(body, /<h2>([\s\S]*?)<\/h2>/),
      organization,
      details: rest.filter(Boolean),
      description: firstText(body, /<p class="experience-description">([\s\S]*?)<\/p>/),
      highlights: [...highlightsHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => htmlToText(m[1])),
      focus: [...metaHtml.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((m) => htmlToText(m[1])),
    })
  }

  return entries
}

/** Rewrite relative Markdown image/link targets to absolute URLs. */
export function absolutizeMarkdown(markdown, slug) {
  return markdown.replace(/(!?)\[([^\]]*)\]\(\s*(<[^>]*>|[^)\s]+)((?:\s+"[^"]*")?)\s*\)/g, (match, bang, text, target, title) => {
    const raw = target.replace(/^<|>$/g, '')
    if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(raw)) return match
    if (raw.startsWith('/')) return `${bang}[${text}](${absoluteUrl(raw)}${title})`
    if (!bang) return match
    let decoded = raw
    try { decoded = decodeURIComponent(raw) } catch { /* keep raw */ }
    return `${bang}[${text}](${articleAssetUrl(slug, decoded)}${title})`
  })
}

export function articleMarkdown(article) {
  const url = absoluteUrl(`/blog/${article.slug}/`)
  const header = [
    `# ${article.title}`,
    '',
    `- Author: ${article.author || PERSON_ALTERNATE_NAME}`,
    `- Published: ${article.date}`,
    `- Canonical URL: ${url}`,
    `- Summary: ${article.summary}`,
  ]
  if (article.cover) header.push(`- Cover image: ${articleAssetUrl(article.slug, article.cover)}`)
  return `${header.join('\n')}\n\n---\n\n${absolutizeMarkdown(article.content, article.slug)}\n`
}

function currentRoleSentence(experience) {
  const current = experience.find((entry) => entry.current)
  return current ? `Currently working as ${current.title} at ${current.organization}.` : ''
}

export function buildLlmsTxt({ articles, about, experience, description }) {
  const lines = [
    `# ${PERSON_ALTERNATE_NAME}`,
    '',
    `> ${description}`,
    '',
    [`${PERSON_NAME} is an ${about.role}.`, about.intro, currentRoleSentence(experience)].filter(Boolean).join(' '),
    '',
    '## Pages',
    '',
    `- [About](${absoluteUrl('/')}): Background, focus areas and profile links`,
    `- [Projects](${absoluteUrl('/projects/')}): Selected projects on agents, RAG, embedded ML and robotics`,
    `- [Experience](${absoluteUrl('/experience/')}): Roles from robotics software and embedded ML to LLM agents, knowledge graphs and clinical AI research`,
    `- [Blog](${absoluteUrl('/blog/')}): Articles on AI agents and knowledge systems`,
    '',
    '## Articles',
    '',
    ...articles.map((article) => `- [${article.title}](${absoluteUrl(`/blog/${article.slug}/index.md`)}): ${article.summary}`),
    '',
    '## Profiles',
    '',
    ...PROFILES.map((profile) => `- [${profile.label}](${profile.href})`),
    '',
    '## Optional',
    '',
    `- [Full site content](${absoluteUrl('/llms-full.txt')}): About, experience, projects and all articles in one file`,
    '',
  ]
  return lines.join('\n')
}

export function buildLlmsFullTxt({ articles, projects, about, experience, description }) {
  const out = [
    `# ${PERSON_NAME}`,
    '',
    `> ${description}`,
    '',
    `Website: ${absoluteUrl('/')}`,
    ...PROFILES.map((profile) => `${profile.label}: ${profile.href}`),
    '',
    '## About',
    '',
    `${about.role}`,
    '',
    about.intro,
    '',
    `### ${about.trajectoryTitle}`,
    '',
    about.trajectory,
    '',
    `## Experience (${absoluteUrl('/experience/')})`,
    '',
  ]

  for (const entry of experience) {
    out.push(`### ${entry.title}, ${entry.organization}`, '')
    out.push(`- Period: ${entry.period}${entry.duration ? ` (${entry.duration})` : ''}`)
    for (const detail of entry.details) out.push(`- ${detail}`)
    out.push('', entry.description, '')
    for (const highlight of entry.highlights) out.push(`- ${highlight}`)
    if (entry.focus.length) out.push('', `Focus areas: ${entry.focus.join(', ')}`)
    out.push('')
  }

  out.push(`## Projects (${absoluteUrl('/projects/')})`, '')
  for (const project of projects) {
    out.push(`### ${project.title}`, '', `- Period: ${project.period}`)
    if (project.meta?.length) out.push(`- Topics: ${project.meta.join(', ')}`)
    if (project.technologies?.length) out.push(`- Technologies: ${project.technologies.map((tech) => tech.name).join(', ')}`)
    out.push('', project.description, '')
    for (const link of project.links ?? []) out.push(`- [${link.label}](${link.href})`)
    if (project.links?.length) out.push('')
  }

  out.push(`## Articles (${absoluteUrl('/blog/')})`, '')
  for (const article of articles) {
    out.push('---', '', articleMarkdown(article).replace(/^# /, '### '), '')
  }

  return `${out.join('\n').replace(/\n{3,}/g, '\n\n')}\n`
}
