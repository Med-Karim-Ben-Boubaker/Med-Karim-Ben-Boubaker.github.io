import { useEffect, useRef, useState } from 'react'
import { ToolIcon } from './ArticleTools'

const MAX_SCALE = 5
const DOUBLE_TAP_SCALE = 2.5
const TAP_SLOP = 10
const DOUBLE_TAP_MS = 300
const DOUBLE_TAP_DISTANCE = 30

const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y)
const midpoint = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 })
const clampScale = (scale) => Math.min(MAX_SCALE, Math.max(1, scale))

// Keep a zoomed image covering the viewport on an axis, or centred when it is smaller.
function clampOffset(offset, start, size, limit) {
  if (size <= limit) return (limit - size) / 2 - start
  return Math.min(-start, Math.max(limit - size - start, offset))
}

/**
 * Shared full-screen image viewer. Returns [openImage, dialogElement].
 * Inside the viewer: pinch or wheel to zoom, drag to pan, double-tap or
 * double-click to toggle zoom; tap the background, press Escape or use the
 * close button to leave.
 */
export function useImageLightbox() {
  const [image, setImage] = useState(null)
  const dialogRef = useRef(null)
  const imageRef = useRef(null)
  // Zoom state lives in refs and is written straight to the image style, so gestures do not re-render.
  const view = useRef({ scale: 1, x: 0, y: 0 })
  const gesture = useRef({ pointers: new Map(), pinch: null, moved: false, start: null, last: null, lastTap: null })

  // Untransformed image box in viewport coordinates (transform-origin is the top-left corner).
  function baseBox() {
    const rect = imageRef.current.getBoundingClientRect()
    const { scale, x, y } = view.current
    return { left: rect.left - x, top: rect.top - y, width: rect.width / scale, height: rect.height / scale }
  }

  function setView(scale, x, y, { animate = false } = {}) {
    const img = imageRef.current
    const dialog = dialogRef.current
    if (!img || !dialog) return

    const box = baseBox()
    const nextScale = clampScale(scale)
    const next = nextScale === 1
      ? { scale: 1, x: 0, y: 0 }
      : {
          scale: nextScale,
          x: clampOffset(x, box.left, box.width * nextScale, dialog.clientWidth),
          y: clampOffset(y, box.top, box.height * nextScale, dialog.clientHeight),
        }

    view.current = next
    img.style.transition = animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'transform 200ms ease' : ''
    img.style.transform = next.scale === 1 ? '' : `translate(${next.x}px, ${next.y}px) scale(${next.scale})`
    dialog.classList.toggle('is-zoomed', next.scale > 1)
  }

  // Zoom to `scale` while keeping the image point under (px, py) in place.
  function zoomAt(px, py, scale, options) {
    const box = baseBox()
    const { scale: current, x, y } = view.current
    const nextScale = clampScale(scale)
    const ux = (px - box.left - x) / current
    const uy = (py - box.top - y) / current
    setView(nextScale, px - box.left - ux * nextScale, py - box.top - uy * nextScale, options)
  }

  useEffect(() => {
    const dialog = dialogRef.current
    if (!image || !dialog) return undefined

    view.current = { scale: 1, x: 0, y: 0 }
    gesture.current = { pointers: new Map(), pinch: null, moved: false, start: null, last: null, lastTap: null }
    dialog.classList.remove('is-zoomed')
    if (!dialog.open) dialog.showModal()

    // Wheel and trackpad pinch (ctrlKey) zoom; registered non-passive so the page does not scroll.
    function handleWheel(event) {
      if (!imageRef.current) return
      event.preventDefault()
      const factor = Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.002))
      zoomAt(event.clientX, event.clientY, view.current.scale * factor)
    }

    dialog.addEventListener('wheel', handleWheel, { passive: false })
    return () => dialog.removeEventListener('wheel', handleWheel)
  }, [image])

  const close = () => dialogRef.current?.close()

  function handlePointerDown(event) {
    if (!imageRef.current || event.target.closest('.image-lightbox-close')) return
    const g = gesture.current
    event.currentTarget.setPointerCapture(event.pointerId)
    g.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (g.pointers.size === 1) {
      g.moved = false
      g.start = { x: event.clientX, y: event.clientY, onImage: event.target === imageRef.current }
      g.last = { x: event.clientX, y: event.clientY }
    } else if (g.pointers.size === 2) {
      const [a, b] = [...g.pointers.values()]
      const mid = midpoint(a, b)
      const box = baseBox()
      const { scale, x, y } = view.current
      g.moved = true
      g.pinch = {
        distance: distance(a, b) || 1,
        scale,
        ux: (mid.x - box.left - x) / scale,
        uy: (mid.y - box.top - y) / scale,
      }
    }
  }

  function handlePointerMove(event) {
    const g = gesture.current
    if (!g.pointers.has(event.pointerId)) return
    g.pointers.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (g.pinch && g.pointers.size >= 2) {
      const [a, b] = [...g.pointers.values()]
      const mid = midpoint(a, b)
      const box = baseBox()
      const scale = clampScale(g.pinch.scale * (distance(a, b) / g.pinch.distance))
      setView(scale, mid.x - box.left - g.pinch.ux * scale, mid.y - box.top - g.pinch.uy * scale)
      return
    }

    if (g.pointers.size === 1 && g.last) {
      if (distance(g.start, { x: event.clientX, y: event.clientY }) > TAP_SLOP) g.moved = true
      const { scale, x, y } = view.current
      if (scale > 1) setView(scale, x + event.clientX - g.last.x, y + event.clientY - g.last.y)
      g.last = { x: event.clientX, y: event.clientY }
    }
  }

  function handlePointerEnd(event) {
    const g = gesture.current
    if (!g.pointers.delete(event.pointerId)) return

    if (g.pointers.size === 1) {
      // Pinch ended with one finger still down: continue as a pan from its position.
      g.pinch = null
      g.last = [...g.pointers.values()][0]
      return
    }
    if (g.pointers.size > 0) return
    g.pinch = null

    if (g.moved || event.type !== 'pointerup' || !g.start) return

    if (!g.start.onImage) {
      close()
      return
    }

    const now = performance.now()
    const tap = { x: event.clientX, y: event.clientY, time: now }
    if (g.lastTap && now - g.lastTap.time < DOUBLE_TAP_MS && distance(g.lastTap, tap) < DOUBLE_TAP_DISTANCE) {
      g.lastTap = null
      if (view.current.scale > 1) setView(1, 0, 0, { animate: true })
      else zoomAt(tap.x, tap.y, DOUBLE_TAP_SCALE, { animate: true })
    } else {
      g.lastTap = tap
    }
  }

  const lightbox = (
    <dialog
      ref={dialogRef}
      className="image-lightbox"
      aria-label="Full-screen image"
      onClose={() => {
        // Return focus to the image's full-screen button, also when the image itself was clicked.
        image?.returnFocus?.focus()
        setImage(null)
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
    >
      {image && (
        <>
          <button type="button" className="image-lightbox-close" aria-label="Close full-screen image" onClick={close}>
            <ToolIcon name="close" />
          </button>
          <img ref={imageRef} src={image.src} alt={image.alt || ''} draggable={false} />
          <p className="image-lightbox-hint" aria-hidden="true">
            <span className="image-lightbox-hint-touch">Pinch or double-tap to zoom</span>
            <span className="image-lightbox-hint-mouse">Scroll or double-click to zoom</span>
          </p>
        </>
      )}
    </dialog>
  )

  return [setImage, lightbox]
}
