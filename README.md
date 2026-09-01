# Karim's personal website

This is a React project initialized with [Vite](https://vite.dev/).

## Initialize a new project

To recreate this setup in an empty directory:

```bash
npm create vite@latest . -- --template react
npm install
```

The `--template react` option selects the React starter. Vite also supports other templates, such as `vanilla`, `vue`, `svelte`, and `react-ts`.

## Development commands

```bash
# Start the development server
npm run dev

# Check the code with Oxlint
npm run lint

# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

## Articles

Create one Markdown file at `src/content/articles/<slug>.md`. The filename is the stable URL slug, so `reliable-knowledge-systems.md` becomes `/blog/reliable-knowledge-systems/`.

Published articles require `title`, `date` in `YYYY-MM-DD` format, and `summary`. Add `draft: true` while writing; drafts are visible with `npm run dev` and excluded from the static output of `npm run build`.

````md
---
title: Reliable knowledge systems
date: 2026-09-01
summary: Notes on building transparent AI systems.
draft: true
---

Inline math: $E = mc^2$

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

![System diagram](./diagram.png)

| Method | Result |
| --- | ---: |
| Retrieval | 0.82 |

```js
const answer = "grounded";
```
````

Articles support CommonMark, GFM tables/task lists/footnotes/strikethrough, fenced code, images, links, and inline or display LaTeX rendered with KaTeX. Store local images in `public/articles/<slug>/` and reference them relative to the article, for example `![System diagram](./diagram.png)`.

The blog index is latest-first. Markdown remains presentation-neutral: the article renderer owns semantic markup and applies the design-system tokens documented in `DESIGN.md`.

After adding or editing an article, validate it with `npm run dev`, `npm run lint`, `npm run build`, and `npm run preview`. Deployment automation for the generated static files is a future issue.
