---
title: Markdown is the source of truth
date: 2026-09-01
summary: A private fixture that demonstrates the article renderer's supported Markdown features.
draft: true
---

This draft is a small integration fixture. It is visible during development and excluded from the production build.

## Equations

Inline math works with $E = mc^2$.

Display math is rendered with KaTeX:

$$
P(A \mid B) = \frac{P(B \mid A)P(A)}{P(B)}
$$

## CommonMark and GFM

- [x] headings and paragraphs
- [x] tables and footnotes
- [ ] publish a real article

| Feature | Status |
| --- | :---: |
| Tables | supported |
| Code | supported |
| Images | supported |

This sentence has a footnote.[^renderer]

[^renderer]: Footnotes are provided by the GFM plugin.

~~Raw HTML is intentionally not enabled.~~

## Code and links

```js
const article = { source: 'Markdown', output: 'static HTML' }
console.log(article)
```

Read the [React Markdown documentation](https://github.com/remarkjs/react-markdown) for the underlying renderer.

## Images

![A small article system diagram](./diagram.svg "Article source to static page")
