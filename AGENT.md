# Project Guidance and Design Decisions

## Scope

- Recreate the About page with React and Vite.
- Preserve the main content, navbar, and important assets from the existing reference implementation.
- Keep the page personal, direct, and authentic rather than making it look like a generic portfolio template.

## Architecture

- This is a frontend-only React/Vite site. There is no runtime backend, database, CMS, or article API.
- Markdown files in `src/content/articles/` are the source of truth for article metadata and body content.
- Vite's eager raw content glob loads the same Markdown module in the browser and in the SSR/prerender entry. Keep the loader browser-safe; do not add Node-only parsing dependencies to it.
- `npm run dev` uses the normal Vite development server and client hydration. It includes drafts so an article can be previewed at `/blog/<slug>/` before publication.
- `npm run build` creates the client bundle, creates a temporary SSR bundle in `.prerender/`, and prerenders the public blog index and every published article into `dist/` as nested `index.html` files.
- The generated HTML is the production deliverable. GitHub Pages or another static host should serve `dist/`; deployment automation is intentionally deferred.
- Public routes are derived from published article files. A draft must never be included in the production route list, article list, or prerendered HTML.
- The client and prerender entry must use the same published-article filter so hydration does not produce different markup between the server HTML and the browser.
- The current blog scope is deliberately small: one latest-first article list and one page per article. Do not introduce tags, search, pagination, comments, authentication, or an editor without a new design decision.

## Repository workflows

### Add or update an article

1. Create or edit `src/content/articles/<lowercase-kebab-case-slug>.md`.
2. Add any local images under `public/articles/<same-slug>/`.
3. Use the relative image convention described below.
4. Keep `draft: true` while writing or reviewing; remove it or set it to `false` when publishing.
5. Run the validation workflow before considering the article ready.

The filename is a public URL contract. Renaming a published file changes its URL, so preserve the slug unless a redirect/alias decision has been made explicitly.

### Development and preview

- Use `npm run dev` for fast authoring and to inspect drafts. Open `/blog/` for the list or `/blog/<slug>/` for an article.
- Use `npm run build` whenever checking production behavior. It is the only workflow that verifies the SSR/prerender output and draft exclusion.
- Use `npm run preview` after a successful build to inspect the generated static site locally. Test the nested paths, not only `/`.
- Do not edit files in `dist/` or `.prerender/`; both are generated artifacts and are ignored by Git.

### Required checks

For article, renderer, routing, or design-system changes, run:

```bash
npm run lint
npm run build
git diff --check
npm run preview
```

During browser verification, check at least the blog index and one article at desktop and narrow mobile widths. Confirm the article title, date, summary, navigation state, Markdown features, image loading, keyboard focus, and absence of page-level horizontal overflow. When a draft fixture is available, confirm it appears in development and is absent from the production build.

If the change affects the renderer or prerender script, inspect both the rendered browser DOM and the raw generated `dist/blog/**/index.html`; a successful JavaScript render alone is not proof that static hosting will work.

## Articles

- Author articles as `src/content/articles/<slug>.md`; the filename determines the stable `/blog/<slug>/` URL.
- Require front matter with `title`, `date` in `YYYY-MM-DD` format, and `summary`. `draft` is optional and defaults to published.
- Front matter uses the project's intentionally small parser: use one scalar value per line, with simple quoted strings, booleans, or `null`. Do not rely on nested YAML, arrays, multiline values, or arbitrary YAML features.
- Use a real calendar date. Article ordering is newest date first; articles with the same date use their slug as a deterministic tie-breaker.
- Draft articles are visible with `npm run dev` and excluded from the output of `npm run build`.
- Supported content is CommonMark plus GFM tables, task lists, footnotes, and strikethrough; fenced code blocks; images; links; and inline or display LaTeX rendered with KaTeX.
- Raw HTML is intentionally disabled. Use Markdown syntax and the supported renderer features rather than embedding custom HTML in an article.
- Store local article images in `public/articles/<slug>/` and reference them from the article, for example `![System diagram](./diagram.png)`.
- Relative image paths resolve to `/articles/<slug>/...` at render time. Keep image paths within the article's own public asset directory; use absolute URLs only for deliberate external assets.
- Keep article Markdown presentation-neutral. The article renderer owns semantic markup and styling through the design-system tokens.
- Example:

  ````md
  ---
  title: Reliable knowledge systems
  date: 2026-09-01
  summary: Notes on building transparent AI systems.
  draft: true
  ---

  Inline math: `$E = mc^2$`

  $$
  P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
  $$

  | Method | Result |
  | --- | ---: |
  | Retrieval | 0.82 |

  ```js
  const answer = "grounded";
  ```

  ![System diagram](./diagram.png)
  ````

- Do not import React components, CSS classes, or site-layout markup into Markdown. Reusable presentation belongs in `src/components/ArticleContent.jsx` and `src/styles/article-content.css`.
- Validate article changes with the repository workflow above: development preview, lint, production build, raw static output, and production preview.
- Deployment automation for the generated static output is a future issue, not part of the article implementation.

## Article rendering and URL rules

- `src/content/articles.js` owns discovery, front-matter validation, draft filtering, and deterministic sorting.
- `src/components/ArticleContent.jsx` owns Markdown-to-semantic-HTML rendering, KaTeX integration, safe URL handling, responsive tables, code blocks, and article image figures.
- `src/entry-server.jsx` owns the published route list and server-side HTML rendering used by the build.
- `scripts/prerender.mjs` owns insertion of rendered markup and page metadata into the Vite HTML template. Keep replacement logic safe for article text containing `$` characters.
- Use trailing-slash URLs for the blog index and articles: `/blog/` and `/blog/<slug>/`. Keep route normalization centralized in `src/site-url.js`.
- Article metadata must remain plain text and escaped when inserted into HTML. Never interpolate untrusted Markdown or front matter into raw HTML templates.

## Design-system workflow

- `DESIGN.md` is the visual source of truth. Read it before changing article, navigation, or page layout styles.
- Reuse the existing CSS custom properties from `src/index.css` (`--canvas`, `--ink`, `--body`, `--muted`, `--hairline`, `--primary`, and related tokens). Add a token to `DESIGN.md` and `src/index.css` together if a genuinely new semantic value is necessary.
- Preserve the dark editorial direction: warm near-black canvas, off-white hierarchy, restrained orange accent, hairline borders, flat surfaces, compact controls, and generous whitespace.
- Blog and article layouts use centered editorial columns: approximately 720px for the list and 760px for reading content, with responsive horizontal padding.
- Article styles must remain independent of individual Markdown files. Add semantic renderer classes and shared CSS rules instead of one-off content-specific selectors.
- Tables and long code/math expressions must be horizontally contained within the article surface. They must not create page-level horizontal overflow on mobile.
- Keep links visibly distinguishable, headings hierarchical, images supplied with meaningful alt text, and interactive controls keyboard-accessible. Preserve the skip link and visible `:focus-visible` treatment.
- Avoid gradients, decorative shadows, brand-color icon collections, arbitrary rounded cards, and new page chrome unless `DESIGN.md` is updated first.
- Verify visual changes in a real browser at representative desktop and mobile widths. A build passing is not sufficient for layout or accessibility changes.

## Content and structure

- Remove the AI Research Intern experience entry.
- Remove the Offenburg University and INSAT education lines.
- Remove the experience, projects, blog, GitHub, and LinkedIn links.
- Remove the section divider/fineline.
- Remove the footer.

## Navbar

- Preserve the minimalist navbar design.
- Do not modify the existing icon artwork or SVG paths.
- Spacing, padding, dimensions, and alignment may be adjusted.
- Keep the navbar horizontally centered.
- Use 40px square controls on desktop with increased horizontal spacing.
- Use 44px square controls on mobile for comfortable touch interaction.
- Keep the navbar responsive and prevent horizontal overflow at narrow phone widths.

## Layout and visual direction

- Use balanced whitespace and a clear vertical rhythm between the navbar, introduction, portrait, and content sections.
- Calibrate the navbar against the page content so it does not feel visually undersized or disconnected.
- Treat the personal image as part of the page’s overall visual balance and calibrate its size and placement accordingly.
- Maintain a minimal, quiet dark interface with clear typography hierarchy and no unnecessary page chrome.

## UX and accessibility standards

- Use WCAG 2.2 target-size guidance as a baseline: 24x24px minimum and 44x44px for enhanced touch targets.
- Follow Apple Human Interface Guidelines’ 44x44pt recommendation for touch controls where practical.
- Verify desktop and mobile layouts with rendered browser screenshots.
- Check comfortable margins, control spacing, keyboard/focus usability, and horizontal overflow at representative viewport sizes.

## Projects and Technologies

- Present concrete technologies and tools used in projects rather than abstract skills.
- Do not use concepts such as retrieval, provenance, evaluation, or transparency as technology badges.
- Keep project context in descriptions or plain text where necessary.
- Each project may show a compact `Technologies & tools` row with small icons and visible names.
- Icons must support the label and must never be the only way to identify a technology.
- Use Simple Icons for recognizable technology brands.
- Use Lucide only for generic interface or system icons, not as improvised technology logos.
- Discover selected icons through shadcn.io, but keep the chosen SVG/React components local and statically included.
- Use monochrome icons with `currentColor`, approximately 14–16px in size.
- Avoid brand-color logo collections, gradients, shadows, and decorative icon overload.
- Show no more than three or four technologies per card.
- Only display technologies that have actually been used or verified. Unknown technologies should remain text-only.
- Placeholder cards may use “Technologies to be documented” instead of inventing a stack.
- Technology rows must wrap cleanly on mobile and must not create horizontal overflow.
- Decorative icons should use `aria-hidden="true"` when the adjacent text provides the accessible name.
- If the Skills navigation item is replaced, preserve `/skills/` as an alias or redirect where necessary.
