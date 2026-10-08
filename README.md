# Karim Ben Boubaker — personal website

Personal site of Karim Ben Boubaker (AI Engineer): about, projects, experience and a blog of technical articles.

## Stack

- React 19 + Vite 8, plain CSS (`src/App.css`, `src/index.css`, `src/styles/`)
- Markdown articles rendered with `react-markdown`, `remark-gfm`, `remark-math` and `rehype-katex`
- Icons from `@iconify-icons/*` (bundled offline, imported one by one)
- Linting with `oxlint`

## Commands

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:5173 (drafts are shown)
npm run build     # production build, see below
npm run preview   # serve the built site (vite preview)
npm run lint      # oxlint over src and scripts
```

## How the build works

`npm run build` runs three steps: a client build, an SSR build of `src/entry-server.jsx` into `.prerender/`, and `scripts/prerender.mjs`, which renders every public route to static HTML in `dist/`. The pages are then hydrated in the browser by `src/main.jsx`. The build also generates `sitemap.xml`, `robots.txt`, `llms.txt` and `404.html`.

The blog pages (`BlogPage`, `ArticlePage`), the article content and KaTeX are code-split: `src/route-pages.js` loads them with a dynamic `import()` only on `/blog` routes and awaits them before hydration, while the server entry imports them statically. The other routes do not download the Markdown/KaTeX chunk.

"Present" in the experience timeline and its durations are computed from the build date (`__BUILD_DATE__`, injected in `vite.config.js`), so rebuild to roll them forward.

## Where content lives

| Content | Location |
|---|---|
| Articles | `src/content/articles/<slug>.md` (kebab-case file name = URL slug) |
| Article images | `public/articles/<slug>/` |
| Article image sizes | `src/content/article-image-sizes.json` |
| Projects | `src/content/projects.js` |
| Experience | `src/content/experience.js` (start/end as `YYYY-MM`, `end: null` = Present) |
| Date formatting | `src/content/dates.js` |
| Résumé PDF | `public/karim-ben-boubaker-resume.pdf` (compiled from the LaTeX résumé kept outside this repo; replace the file to update it) |
| About copy | `AboutPage` in `src/App.jsx` |
| Home featured projects | `src/content/home.js` |

### Article front matter

```yaml
---
title: "Article title"
date: 2025-12-15          # ISO YYYY-MM-DD, required
summary: "One or two sentences used on the list page and as meta description."
author: "Karim Ben Boubaker"   # optional; metadata only, not shown on the page
cover: "cover.jpg"             # optional, file in public/articles/<slug>/
coverCaption: "Markdown caption"   # optional
draft: false                   # optional; drafts only show in `npm run dev`
---
```

Reference images in the body as `![alt text](./image-1.webp)`. Math uses `$inline$` and `$$block$$` (use regular spaces inside math, not U+00A0).

Tag fenced code blocks with their language (` ```python `). Highlighting runs at build time with highlight.js through `src/content/rehype-code-highlight.js`; registered languages are Python, JSON, Bash, Shell, JavaScript, TypeScript and YAML. To add one, import it in `src/content/code-languages.js`. `text`, `txt` and unregistered languages render unhighlighted.

Article pages also have a copy button on each code block, a full-screen button on each image (pinch, wheel or double-tap to zoom inside the viewer), and a "Copy as Markdown" button that copies the same text as `/blog/<slug>/index.md`.

## Image guidelines

- Use WebP, at about 2x the largest rendered size: portrait 560 px, experience logos 96-144 px, project images about 800 px wide, article inline images at most 1520 px wide.
- Article covers stay JPG (or PNG), at most 1200 px wide: they are used as `og:image`.
- Use kebab-case file names without spaces.
- Every `<img>` needs `width` and `height`. Project and experience images carry their size in the content files; article images are looked up in `src/content/article-image-sizes.json`, so add an entry when you add an image (`slug/filename` -> `[width, height]`).
- Below-the-fold images use `loading="lazy"`; hero images (portrait, article cover) use `fetchpriority="high"`.
