# Phase 2 Goal — Site-owned Hugo templates and article design

**Status:** Reset in progress; content and custom article work deferred.

## Objective

Create the first professional website revamp as a site-owned Hugo template system. The website will remain generated from Markdown and front matter, but the visual structure will be designed and controlled by this repository with no PaperMod dependency.

The long-term publishing workflow should be:

```text
Create or edit Markdown + front matter
        → Hugo content model
        → site-owned templates and partials
        → design-token CSS and purposeful JavaScript
        → consistent static HTML on GitHub Pages
```

After the initial template/design work, adding, editing, or removing articles should not require editing HTML or CSS. Markdown authors should provide content and structured metadata; the templates must determine the presentation consistently.

## Confirmed technical boundaries

- Keep Hugo as the static-site generator.
- Keep GitHub Pages and the existing GitHub Actions workflow.
- Do not introduce React, Tailwind, Radix, authentication, analytics, newsletter functionality, comments, or a contact form in the first prototype.
- Do not install or depend on PaperMod. Use templates and assets owned by this repository.
- The reset intentionally removes legacy content and routes. Define and test future content, route, metadata, feed, image, math, code, and audio contracts before reintroducing publishing surfaces.
- Use real, evidence-backed content only.

## Design source of truth

Read [`DESIGN.md`](../DESIGN.md) before implementation. It defines the current tokens, visual direction, content hierarchy, component rules, and accessibility boundaries.

The current direction is a calm editorial/technical system: warm canvas, near-black technical surfaces, warm readable text, one restrained orange action color, hairline borders, compact radii, precise typography, generous spacing, and no decorative elevation. It is light-first, with no theme dependency or theme toggle in the reset shell.

The Cursor and shadcn references are visual and compositional references only. Do not copy Cursor branding, wordmarks, product claims, or proprietary assets.

## Existing UI to preserve or deliberately redesign

The former PaperMod UI is documented in [`docs/phase-1-discovery.md`](./phase-1-discovery.md). It is reference material only; this reset removes the generated snapshot and legacy content before the new template is built.

### Global shell

- Header with the text logo/name “Karim Ben Boubaker”.
- Moon/sun theme toggle with keyboard access.
- Current `Posts` and `Archive` navigation.
- Footer containing author/copyright and Hugo attribution when the site shell is implemented.
- Scroll-to-top control.

### Homepage

- Current `home-info` block with title, introduction, and GitHub/LinkedIn links.
- Current vertical article cards with cover image, title, excerpt, date, reading time, word count, and author.
- New composition should evolve this into a professional hero, selected work, and latest writing while preserving the underlying article content and links.

### Article page

- Breadcrumbs: Home → Posts → Artificial Intelligence.
- Title, date, reading time, word count, and author metadata.
- Cover image and optional caption/source.
- Expandable table of contents.
- Long-form Markdown body with headings, links, images, code blocks, and math.
- Code-copy behavior and post navigation.
- Optional custom audio player from [`layouts/shortcodes/audio.html`](../layouts/shortcodes/audio.html).

### Archive/list page

- Current Archive heading and year-grouped chronological article list.
- Future Writing page should use the same content model and visual language without breaking `/archives/`.

## Proposed template architecture

The first implementation should establish repository-owned equivalents of the following roles:

```text
layouts/
├── _default/
│   ├── baseof.html          # document shell
│   ├── single.html          # default article detail
│   └── list.html            # default section/list page
├── home.html                # homepage composition
├── projects/
│   ├── list.html            # project index
│   └── single.html          # project detail
├── partials/
│   ├── site-header.html
│   ├── site-footer.html
│   ├── article-card.html
│   ├── article-header.html
│   ├── article-meta.html
│   ├── article-cover.html
│   ├── table-of-contents.html
│   ├── project-card.html
│   └── post-navigation.html
├── _markup/
│   ├── render-image.html
│   ├── render-link.html
│   └── render-codeblock.html
└── shortcodes/
    └── audio.html

assets/
├── css/main.css
└── js/main.js
```

The exact file names may follow Hugo’s lookup rules, but the principle is fixed: reusable visual elements belong in partials; page composition belongs in page templates; Markdown remains content.

## Content contract

Articles should use Markdown bodies and a small, stable front matter contract. Required and optional fields must be decided before bulk content migration.

Likely article fields:

```yaml
title: "..."
date: 2026-09-01
draft: false
description: "..."
summary: "..."
cover:
  image: "..."
  alt: "..."
  caption: "..."
tags: ["..."]
categories: ["..."]
math: false
toc: true
```

Likely project fields:

```yaml
title: "..."
description: "..."
featured: true
role: "..."
status: "..."
technologies: ["..."]
repository: "..."
demo: "..."
cover:
  image: "..."
```

These fields should drive templates; they should not contain HTML layout instructions. Use page bundles for content-specific images where practical, and use shortcodes only for intentional rich blocks such as the existing audio player.

## Implementation stages

### Stage 1 — Reset and template boundary

- Inspect `git status`, current configuration, content, layouts, and static assets.
- Remove the legacy content, generated output, theme declaration, submodule metadata, and theme-specific templates/assets.
- Reproduce the pinned Hugo build in a clean output directory with no theme installation.
- Leave a minimal home shell as the only presentation surface.

### Stage 2 — Custom article template (deferred)

- Build the global document shell and article detail template only after the content model is approved.
- Reproduce breadcrumbs, metadata, cover, TOC, body, code blocks, math, audio, and post navigation.
- Apply the tokens and reading-width rules from `DESIGN.md`.
- No article content or custom article template is included in the reset.

### Stage 3 — Custom homepage and lists

- Replace the current home-info presentation with the approved professional hero.
- Create reusable article cards for latest writing and related content.
- Create a custom archive/Writing list while preserving existing routes.

### Stage 4 — Projects and About

- Add structured project content only from verified source material.
- Create project index and detail templates using the same visual system.
- Add About only after its source content is confirmed.

### Stage 5 — Verification and refinement

- Inspect desktop and mobile renderings.
- Verify keyboard focus, contrast, semantic headings, alt text, reduced motion, and readable long-form content.
- Verify article URLs, feeds, sitemap, canonical metadata, image paths, math, code copy, TOC, and audio.
- Run `git diff --check` and preserve unrelated untracked documentation.

## Definition of done for the reset

The reset is complete when:

- The repository has a minimal, repository-owned Hugo shell and no legacy content.
- Hugo builds and runs in development mode without a theme installation.
- The new design direction is represented by the home shell and follows `DESIGN.md`.
- Custom article, project, archive, and other content templates remain deferred.
- GitHub Pages deployment infrastructure remains available.

## Out of scope for this goal

- React or a client-side application migration.
- Changing hosting from GitHub Pages.
- Rewriting all article content.
- Inventing project metrics, testimonials, client logos, or claims.
- Newsletter, analytics, comments, authentication, or interactive product features.
- Removing existing routes without a redirect decision.

## Related references

- [`DESIGN.md`](../DESIGN.md)
- [`AGENTS.md`](../AGENTS.md)
- [`docs/phase-1-discovery.md`](./phase-1-discovery.md)
- [`docs/professional-website-content.md`](./professional-website-content.md)
- [`hugo.yaml`](../hugo.yaml)
- [`.github/workflows/hugo.yaml`](../.github/workflows/hugo.yaml)
- [`layouts/`](../layouts/)
- [`content/`](../content/)
