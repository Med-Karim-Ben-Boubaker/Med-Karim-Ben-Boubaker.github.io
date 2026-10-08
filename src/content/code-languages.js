// Languages available for syntax highlighting in article code blocks.
// To support a new language, import it from highlight.js/lib/languages and add
// it to `codeLanguages`; fences tagged with an unregistered language render as
// plain text. Only registered languages are bundled.
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import python from 'highlight.js/lib/languages/python'
import shell from 'highlight.js/lib/languages/shell'
import typescript from 'highlight.js/lib/languages/typescript'
import yaml from 'highlight.js/lib/languages/yaml'

export const codeLanguages = { bash, javascript, json, python, shell, typescript, yaml }

// Fence tags that are shown without highlighting.
export const plainTextLanguages = ['text', 'txt', 'plaintext']

const labels = {
  bash: 'Bash',
  javascript: 'JavaScript',
  js: 'JavaScript',
  json: 'JSON',
  plaintext: 'Text',
  py: 'Python',
  python: 'Python',
  sh: 'Shell',
  shell: 'Shell',
  text: 'Text',
  ts: 'TypeScript',
  txt: 'Text',
  typescript: 'TypeScript',
  yaml: 'YAML',
  yml: 'YAML',
}

export function codeLanguageLabel(language) {
  if (!language) return ''
  return labels[language] || language.charAt(0).toUpperCase() + language.slice(1)
}
