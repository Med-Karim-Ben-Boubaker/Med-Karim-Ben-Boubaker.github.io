const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Injected by vite.config.js (`define`) so the server render and the client
// agree on what "Present" means. Falls back to the clock outside Vite.
const buildDate = typeof __BUILD_DATE__ === 'string' ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10)

function parseYearMonth(value) {
  const [year, month] = String(value).split('-').map(Number)
  return { year, month }
}

/** "2026-03" -> "Mar 2026" */
export function formatMonth(value) {
  const { year, month } = parseYearMonth(value)
  return `${MONTHS[month - 1]} ${year}`
}

/** "2025-12-15" -> "Dec 15, 2025" */
export function formatDate(isoDate) {
  const [year, month, day] = String(isoDate).split('-').map(Number)
  return `${MONTHS[month - 1]} ${day}, ${year}`
}

/** "2026-03" to "2026-10" -> "Mar 2026 — Oct 2026"; a null end means Present. */
export function formatPeriod(start, end) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Present'}`
}

/**
 * Plain month difference between two year-months (end month minus start
 * month), rendered as "7 mos" or "1 yr 2 mos". A null end uses the build date.
 */
export function formatDuration(start, end) {
  const from = parseYearMonth(start)
  const to = parseYearMonth(end || buildDate.slice(0, 7))
  const total = Math.max(0, (to.year - from.year) * 12 + (to.month - from.month))
  const years = Math.floor(total / 12)
  const months = total % 12
  const unit = (count, singular) => `${count} ${singular}${count === 1 ? '' : 's'}`

  if (years === 0) return unit(months, 'mo')
  return months === 0 ? unit(years, 'yr') : `${unit(years, 'yr')} ${unit(months, 'mo')}`
}
