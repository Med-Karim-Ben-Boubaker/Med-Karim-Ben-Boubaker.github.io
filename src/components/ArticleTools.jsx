import { useEffect, useRef, useState } from 'react'

const iconPaths = {
  check: <path d="M20 6 9 17l-5-5" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  copy: (
    <>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </>
  ),
  expand: <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />,
}

export function ToolIcon({ name }) {
  return (
    <svg className="article-tool-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {iconPaths[name]}
    </svg>
  )
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Clipboard API unavailable (insecure context or denied): fall back to a hidden textarea.
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.cssText = 'position:fixed;top:0;left:0;opacity:0'
    document.body.append(textarea)
    textarea.select()
    let copied = false
    try {
      copied = document.execCommand('copy')
    } catch {
      copied = false
    }
    textarea.remove()
    return copied
  }
}

/** Button that copies `getText()` to the clipboard and briefly confirms it. */
export function CopyButton({ getText, label, copiedLabel = 'Copied', className = '' }) {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    if (status === 'idle') return undefined
    const timer = setTimeout(() => setStatus('idle'), 2000)
    return () => clearTimeout(timer)
  }, [status])

  async function handleClick() {
    const copied = await copyText(await getText())
    setStatus(copied ? 'copied' : 'failed')
  }

  const text = status === 'copied' ? copiedLabel : status === 'failed' ? 'Copy failed' : label

  return (
    <button type="button" className={`article-tool-button ${className}`.trim()} onClick={handleClick}>
      <ToolIcon name={status === 'copied' ? 'check' : 'copy'} />
      <span aria-live="polite">{text}</span>
    </button>
  )
}

/** Code block with a language label and a copy button. */
export function CodeBlock({ language, children, ...props }) {
  const preRef = useRef(null)
  const getCode = () => (preRef.current?.querySelector('code')?.textContent ?? '').replace(/\n$/, '')

  return (
    <div className="article-code">
      <div className="article-code-bar">
        <span className="article-code-language">{language}</span>
        <CopyButton getText={getCode} label="Copy" />
      </div>
      {/* Focusable so keyboard users can scroll overflowing code. */}
      <pre ref={preRef} className="article-code-block" tabIndex={0} {...props}>{children}</pre>
    </div>
  )
}

/** Image with a corner button that opens it full screen. */
export function ZoomableImage({ onZoom, className = '', ...imageProps }) {
  const open = (event) => onZoom?.({
    src: imageProps.src,
    alt: imageProps.alt,
    returnFocus: event.currentTarget.parentElement.querySelector('.article-zoom-button'),
  })

  return (
    <span className={`article-zoom ${className}`.trim()}>
      <img {...imageProps} onClick={open} />
      <button type="button" className="article-zoom-button" aria-label="View image full screen" onClick={open}>
        <ToolIcon name="expand" />
      </button>
    </span>
  )
}
