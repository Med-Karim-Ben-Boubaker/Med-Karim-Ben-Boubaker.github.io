# Karim Ben Boubaker

A fresh Hugo site under construction. The legacy content and theme dependency
have been removed so the information architecture and presentation can be
rebuilt deliberately from the design system.

## Development

Install Hugo, then start the local development server:

```bash
hugo server --buildDrafts
```

Open `http://localhost:1313`.

Build the site locally with:

```bash
hugo --minify
```

## Configuration

The site is intentionally empty of content and has no theme dependency.
Design decisions are recorded in [`DESIGN.md`](./DESIGN.md).

## Deployment

The site is configured to deploy to GitHub Pages when changes are pushed to the
`main` branch.
