// Rehype plugin: syntax-highlight fenced code blocks with lowlight (highlight.js).
// Unlike rehype-highlight, it imports only the languages in code-languages.js,
// so unused highlight.js grammars stay out of the article bundle.
import { toText } from 'hast-util-to-text'
import { createLowlight } from 'lowlight'
import { visit } from 'unist-util-visit'
import { codeLanguages, plainTextLanguages } from './code-languages'

const lowlight = createLowlight(codeLanguages)

function fenceLanguage(node) {
  const classes = Array.isArray(node.properties?.className) ? node.properties.className : []
  const languageClass = classes.find((name) => String(name).startsWith('language-'))
  return languageClass ? String(languageClass).slice('language-'.length).toLowerCase() : ''
}

export default function rehypeCodeHighlight() {
  return (tree) => {
    visit(tree, 'element', (node, _index, parent) => {
      if (node.tagName !== 'code' || parent?.type !== 'element' || parent.tagName !== 'pre') return

      const language = fenceLanguage(node)
      if (!language || plainTextLanguages.includes(language) || !lowlight.registered(language)) return

      const result = lowlight.highlight(language, toText(parent), { prefix: 'hljs-' })
      node.properties.className = [...node.properties.className, 'hljs']
      node.children = result.children
    })
  }
}
