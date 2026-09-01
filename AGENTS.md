# Repository instructions

## Design system

Before making visual, layout, template, or content-presentation changes, read [`DESIGN.md`](./DESIGN.md). Treat its tokens, component rules, content rules, accessibility requirements, and implementation boundaries as the source of truth for the first website revamp prototype.

The design system is inspired by the supplied Cursor reference but is adapted for Karim Ben Boubaker's personal website. Do not copy Cursor branding, wordmarks, product claims, or proprietary assets.

### Cursor palette audit

The current reference audit was performed against the live DOM of `https://cursor.com/` on 2026-09-01. The dark theme exposed these source tokens: canvas `#14120b`, foreground `#edecec`, secondary foreground `#d7d6d5`, card `#1b1913`, card levels `#1d1b15`, `#201e18`, `#26241e`, and `#2b2923`, warm card `#1c1713`, accent `#f54e00`, product green `#1f8a65`, product red `#cf2d56`, and warning `#c08532`.

The border hierarchy is derived from the same foreground: 2.5%, 10%, 20%, and 60% opacity. Use these values through the variables in `DESIGN.md`; do not substitute a generic black, blue-gray, or warm-paper palette. When changing the palette again, repeat a read-only DOM/style audit of the reference and record the observed values here and in `DESIGN.md`.

## Project boundaries

- Keep Hugo and GitHub Pages. This reset branch is a clean, site-owned Hugo project with no theme dependency.
- Prefer Hugo layouts, partials, CSS custom properties, and small purposeful JavaScript additions.
- Do not introduce React, Tailwind, Radix, authentication, analytics, newsletter functionality, comments, or a contact form as part of the first prototype.
- The reset intentionally removes legacy content and theme-specific behavior. Reintroduce publishing features only when the new content model requires them and the route contract is explicitly defined.
- Use real, evidence-backed content. Do not invent project outcomes, metrics, testimonials, client logos, or professional claims.

## Required checks before implementation

- Inspect `git status` and preserve unrelated work, including untracked documentation.
- Read [`docs/phase-1-discovery.md`](./docs/phase-1-discovery.md) and [`docs/professional-website-content.md`](./docs/professional-website-content.md) when changing information architecture or positioning.
- Inspect `hugo.yaml`, `.github/workflows/hugo.yaml`, `content/`, `layouts/`, and relevant `static/` assets.
- Build into a clean temporary output directory using the pinned Hugo Extended toolchain before relying on rendered output.
- Inspect desktop and mobile renderings when layout changes are in scope.
- For palette changes, verify the target background and foreground values from the live reference DOM, then check the rendered site's computed `body` background and interactive contrast.

## Change discipline

- Keep implementation slices narrow and explain deviations from `DESIGN.md`.
- Separate diagnosis from implementation when reviewing the current site.
- Never reset, delete, or overwrite unrelated user changes. The legacy site reset is explicitly in scope for this branch; preserve `AGENTS.md`, `DESIGN.md`, project notes, and deployment infrastructure unless the user says otherwise.
- Run `git diff --check` before handing off edits.
