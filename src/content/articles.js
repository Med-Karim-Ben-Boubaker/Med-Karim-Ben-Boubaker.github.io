const ARTICLE_FILE_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const FRONT_MATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/

// Keep the glob eager and raw so the same content module can be bundled for
// both the browser and a Vite SSR/prerender entry.
const articleModules = import.meta.glob('./articles/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function fail(filePath, message) {
  throw new Error(`Invalid article ${filePath}: ${message}`)
}

function getArticleSlug(filePath) {
  const fileName = filePath.split('/').pop() || ''

  if (!ARTICLE_FILE_PATTERN.test(fileName)) {
    fail(filePath, 'filename must be a lowercase kebab-case slug ending in .md')
  }

  return fileName.slice(0, -'.md'.length)
}

function requiredText(value, fieldName, filePath) {
  if (typeof value !== 'string' || value.trim() === '') {
    fail(filePath, `${fieldName} must be a non-empty string`)
  }

  return value.trim()
}

function parseScalar(value) {
  const normalizedValue = value.trim()

  if (
    normalizedValue.length >= 2
    && normalizedValue.startsWith('"')
    && normalizedValue.endsWith('"')
  ) {
    try {
      return JSON.parse(normalizedValue)
    } catch {
      return normalizedValue.slice(1, -1)
    }
  }

  if (
    normalizedValue.length >= 2
    && normalizedValue.startsWith("'")
    && normalizedValue.endsWith("'")
  ) {
    return normalizedValue.slice(1, -1).replaceAll("''", "'")
  }

  if (normalizedValue === 'true') return true
  if (normalizedValue === 'false') return false
  if (normalizedValue === 'null') return null
  return normalizedValue
}

function parseFrontMatter(source, filePath) {
  const match = source.match(FRONT_MATTER_PATTERN)

  if (!match) {
    fail(filePath, 'front matter must be enclosed by --- delimiters')
  }

  const data = {}

  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim()) continue

    const field = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/)

    if (!field) {
      fail(filePath, `front matter line is not a key/value pair: ${line}`)
    }

    const [, key, rawValue] = field

    if (Object.hasOwn(data, key)) {
      fail(filePath, `front matter field "${key}" is duplicated`)
    }

    data[key] = parseScalar(rawValue)
  }

  return { data, content: source.slice(match[0].length) }
}

function normalizeDate(value, filePath) {
  let date

  if (typeof value === 'string') {
    date = value.trim()
  } else if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    date = value.toISOString().slice(0, 10)
  } else {
    fail(filePath, 'date must use the ISO YYYY-MM-DD format')
  }

  if (!ISO_DATE_PATTERN.test(date)) {
    fail(filePath, 'date must use the ISO YYYY-MM-DD format')
  }

  const calendarDate = new Date(`${date}T00:00:00.000Z`)

  if (
    Number.isNaN(calendarDate.valueOf())
    || calendarDate.toISOString().slice(0, 10) !== date
  ) {
    fail(filePath, 'date must be a real calendar date')
  }

  return date
}

function parseArticle(filePath, source) {
  const slug = getArticleSlug(filePath)
  const parsed = parseFrontMatter(source, filePath)
  const data = parsed.data

  if (data.draft !== undefined && typeof data.draft !== 'boolean') {
    fail(filePath, 'draft must be a boolean when provided')
  }

  return {
    slug,
    title: requiredText(data.title, 'title', filePath),
    date: normalizeDate(data.date, filePath),
    summary: requiredText(data.summary, 'summary', filePath),
    draft: data.draft ?? false,
    content: parsed.content.trim(),
  }
}

function compareArticles(first, second) {
  if (first.date !== second.date) {
    return first.date < second.date ? 1 : -1
  }

  if (first.slug === second.slug) return 0
  return first.slug < second.slug ? -1 : 1
}

/**
 * Load Markdown articles from the Vite content glob.
 *
 * @param {{includeDrafts?: boolean}} options
 * @returns {Array<{slug: string, title: string, date: string, summary: string, draft: boolean, content: string}>}
 */
export function loadArticles({ includeDrafts = false } = {}) {
  const articles = Object.entries(articleModules).map(([filePath, source]) => {
    if (typeof source !== 'string') {
      fail(filePath, 'could not load the Markdown source as text')
    }

    return parseArticle(filePath, source)
  })

  const slugs = new Set()

  for (const article of articles) {
    if (slugs.has(article.slug)) {
      fail(article.slug, `duplicate slug "${article.slug}"`)
    }

    slugs.add(article.slug)
  }

  return articles
    .filter((article) => includeDrafts || !article.draft)
    .sort(compareArticles)
}

export { ARTICLE_FILE_PATTERN }
