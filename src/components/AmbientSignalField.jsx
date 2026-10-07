import { useEffect, useRef } from 'react'
import { getAmbientSignalProfile } from './ambient-signal-field'

const CHARACTERS = '.:·+*#01>/='
const FONT_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
const FRAME_INTERVAL = 1000 / 30
// rAF fires on vsync; accept a frame slightly early so 60 Hz displays really get 30 fps.
const FRAME_SLACK = 4
const MAX_TIME_STEP = 100
const RESIZE_DEBOUNCE = 150
const ALPHA_LEVELS = 24
const POINTER_RADIUS_SQ = 0.3

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

// Pre-renders every glyph at every quantised alpha (normal + accent colour) into one atlas,
// so a frame is plain drawImage calls instead of fillStyle string building + fillText.
function buildAtlas(profile, cellWidth, cellHeight, scale) {
  const spriteWidth = Math.ceil(cellWidth * scale) + 2
  const spriteHeight = Math.ceil(cellHeight * scale) + 2
  const maxAlpha = profile.opacity + profile.pointerOpacity
  const atlas = document.createElement('canvas')
  atlas.width = spriteWidth * ALPHA_LEVELS
  atlas.height = spriteHeight * CHARACTERS.length * 2
  const atlasContext = atlas.getContext('2d')
  if (!atlasContext) return null

  atlasContext.font = `${cellHeight * scale}px ${FONT_STACK}`
  atlasContext.textBaseline = 'top'

  for (let accent = 0; accent < 2; accent += 1) {
    for (let char = 0; char < CHARACTERS.length; char += 1) {
      const sy = (accent * CHARACTERS.length + char) * spriteHeight
      for (let level = 1; level < ALPHA_LEVELS; level += 1) {
        const alpha = (level / (ALPHA_LEVELS - 1)) * maxAlpha
        atlasContext.fillStyle = accent
          ? `rgba(245, 78, 0, ${alpha * 0.82})`
          : `rgba(215, 214, 213, ${alpha})`
        atlasContext.fillText(CHARACTERS[char], level * spriteWidth, sy)
      }
    }
  }

  return { atlas, spriteWidth, spriteHeight, maxAlpha }
}

export default function AmbientSignalField({ route }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const profile = getAmbientSignalProfile(route)
    if (!canvas || !profile) return undefined
    const isInteractive = profile.interactive === true

    const context = canvas.getContext('2d')
    if (!context) return undefined

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointer = { active: false, x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }
    let width = 0
    let height = 0
    let columns = 0
    let rows = 0
    let cellWidth = 8
    let cellHeight = 15
    let devicePixelRatio = 1
    let sprites = null
    // Per-cell sin/cos of the static wave phases: sin(a + t) = sin(a)cos(t) + cos(a)sin(t),
    // so a frame needs only three sin/cos pairs instead of three Math.sin per cell.
    let phases = new Float32Array(0)
    let columnPositions = new Float32Array(0)
    // Last glyph code painted per cell (0 = empty), so a frame only repaints cells that changed.
    let cellCodes = new Int16Array(0)
    let columnEdges = new Int32Array(0)
    let rowEdges = new Int32Array(0)
    let frameId = null
    let resizeTimer = null
    let lastTimestamp = null
    let lastDraw = 0
    let animationTime = 0
    let isVisible = true

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      cellHeight = Math.max(13, Math.round(Math.min(15, width / 105)))
      cellWidth = cellHeight * 0.62
      columns = Math.ceil(width / cellWidth) + 1
      rows = Math.ceil(height / cellHeight) + 1

      canvas.width = Math.ceil(width * devicePixelRatio)
      canvas.height = Math.ceil(height * devicePixelRatio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      sprites = buildAtlas(profile, cellWidth, cellHeight, devicePixelRatio)

      phases = new Float32Array(columns * rows * 6)
      columnPositions = new Float32Array(columns)
      cellCodes = new Int16Array(columns * rows)
      columnEdges = new Int32Array(columns + 1)
      rowEdges = new Int32Array(rows + 1)
      for (let column = 0; column <= columns; column += 1) columnEdges[column] = Math.round(column * cellWidth * devicePixelRatio)
      for (let row = 0; row <= rows; row += 1) rowEdges[row] = Math.round(row * cellHeight * devicePixelRatio)
      for (let column = 0; column < columns; column += 1) columnPositions[column] = column / columns
      for (let row = 0; row < rows; row += 1) {
        const normalizedY = row / rows
        for (let column = 0; column < columns; column += 1) {
          const normalizedX = columnPositions[column]
          const one = (normalizedX * 13) + (normalizedY * 4) + profile.phase
          const two = (normalizedY * 31) + (Math.sin(normalizedX * 8) * 2.2) + profile.phase
          const three = (normalizedX * 9) - (normalizedY * 17)
          const index = ((row * columns) + column) * 6
          phases[index] = Math.sin(one)
          phases[index + 1] = Math.cos(one)
          phases[index + 2] = Math.sin(two)
          phases[index + 3] = Math.cos(two)
          phases[index + 4] = Math.sin(three)
          phases[index + 5] = Math.cos(three)
        }
      }
    }

    const draw = () => {
      if (!sprites) return
      const time = animationTime
      const isReducedMotion = reducedMotionQuery.matches
      const usePointer = isInteractive && pointer.active

      if (usePointer && !isReducedMotion) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12
        pointer.y += (pointer.targetY - pointer.y) * 0.12
      }

      const { atlas, spriteWidth, spriteHeight, maxAlpha } = sprites
      const levelScale = (ALPHA_LEVELS - 1) / maxAlpha
      const lastChar = CHARACTERS.length - 1

      // waveOne: sin(.. + time*0.9), waveTwo: sin(.. - time*0.68), waveThree: sin(.. + time*0.42)
      const t1 = time * 0.9
      const t2 = -time * 0.68
      const t3 = time * 0.42
      const sinT1 = Math.sin(t1)
      const cosT1 = Math.cos(t1)
      const sinT2 = Math.sin(t2)
      const cosT2 = Math.cos(t2)
      const sinT3 = Math.sin(t3)
      const cosT3 = Math.cos(t3)

      context.setTransform(1, 0, 0, 1, 0, 0)

      for (let row = 0; row < rows; row += 1) {
        const normalizedY = row / rows
        const dy = rowEdges[row]
        const dh = rowEdges[row + 1] - dy
        const distanceY = normalizedY - pointer.y
        const distanceYSq = distanceY * distanceY

        for (let column = 0; column < columns; column += 1) {
          const index = ((row * columns) + column) * 6
          const waveOne = (phases[index] * cosT1) + (phases[index + 1] * sinT1)
          const waveTwo = (phases[index + 2] * cosT2) + (phases[index + 3] * sinT2)
          const waveThree = (phases[index + 4] * cosT3) + (phases[index + 5] * sinT3)
          let intensity = clamp(0.04 + ((waveOne + 1) * 0.1) + ((waveTwo + 1) * 0.08) + ((waveThree + 1) * 0.05))
          let pointerInfluence = 0

          if (usePointer) {
            const distanceX = (columnPositions[column] - pointer.x) * 1.35
            const distanceSq = (distanceX * distanceX) + distanceYSq
            // Beyond this radius the gaussian falls below ~1e-4: skip exp/sqrt/sin.
            if (distanceSq < POINTER_RADIUS_SQ) {
              const influence = Math.exp(-(distanceSq * 32))
              const ripple = Math.sin((Math.sqrt(distanceSq) * 76) - (time * 4.5)) * influence
              pointerInfluence = influence
              intensity = clamp(intensity + (influence * profile.mouseInfluence * 0.72) + (ripple * profile.mouseInfluence * 0.14))
            }
          }

          const cell = (row * columns) + column
          if (intensity < 0.08) {
            if (cellCodes[cell] !== 0) {
              cellCodes[cell] = 0
              context.clearRect(columnEdges[column], dy, columnEdges[column + 1] - columnEdges[column], dh)
            }
            continue
          }

          const characterIndex = Math.min(lastChar, Math.floor(intensity * CHARACTERS.length))
          const alpha = (profile.opacity * (0.16 + (intensity * 0.84))) + (pointerInfluence * profile.pointerOpacity)
          const level = Math.min(ALPHA_LEVELS - 1, Math.max(1, Math.round(alpha * levelScale)))
          const accent = intensity > profile.accentThreshold && ((row + column) % 7 === 0) ? 1 : 0
          const code = (((accent * CHARACTERS.length) + characterIndex) * ALPHA_LEVELS) + level + 1
          if (code === cellCodes[cell]) continue
          cellCodes[cell] = code
          const dx = columnEdges[column]
          const dw = columnEdges[column + 1] - dx
          context.clearRect(dx, dy, dw, dh)
          context.drawImage(atlas, level * spriteWidth, ((accent * CHARACTERS.length) + characterIndex) * spriteHeight, dw, dh, dx, dy, dw, dh)
        }
      }
    }

    const shouldAnimate = () => !reducedMotionQuery.matches && isVisible && !document.hidden

    const render = (timestamp) => {
      frameId = window.requestAnimationFrame(render)
      if (lastTimestamp === null) {
        lastTimestamp = timestamp
        lastDraw = timestamp - FRAME_INTERVAL
      }
      animationTime += (Math.min(timestamp - lastTimestamp, MAX_TIME_STEP) / 1000) * profile.speed
      lastTimestamp = timestamp
      if (timestamp - lastDraw < FRAME_INTERVAL - FRAME_SLACK) return
      lastDraw = timestamp
      draw()
    }

    // Starts or stops the loop to match reduced-motion, tab and viewport visibility.
    const syncLoop = () => {
      if (shouldAnimate()) {
        if (frameId === null) frameId = window.requestAnimationFrame(render)
        return
      }
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
        frameId = null
      }
      lastTimestamp = null
    }

    const handleReducedMotionChange = () => {
      if (reducedMotionQuery.matches) pointer.active = false
      syncLoop()
      if (reducedMotionQuery.matches) draw()
    }

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch' || reducedMotionQuery.matches) return
      pointer.targetX = clamp(event.clientX / width)
      pointer.targetY = clamp(event.clientY / height)
      pointer.active = true
    }

    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(() => {
        resizeTimer = null
        resize()
        // Redraw at the current animation time so resizing never jumps the animation.
        draw()
      }, RESIZE_DEBOUNCE)
    }

    const handleVisibilityChange = () => syncLoop()

    const handlePointerLeave = () => {
      pointer.active = false
    }

    const handleFocusIn = (event) => {
      if (reducedMotionQuery.matches || !(event.target instanceof Element)) return
      const rect = event.target.getBoundingClientRect()
      pointer.targetX = clamp((rect.left + (rect.width / 2)) / width)
      pointer.targetY = clamp((rect.top + (rect.height / 2)) / height)
      pointer.active = true
    }

    const handleFocusOut = () => {
      if (!document.activeElement || document.activeElement === document.body) pointer.active = false
    }

    const intersectionObserver = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        const entry = entries[entries.length - 1]
        isVisible = entry.isIntersecting
        syncLoop()
      })
      : null

    resize()
    draw()
    syncLoop()
    intersectionObserver?.observe(canvas)
    window.addEventListener('resize', handleResize)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    reducedMotionQuery.addEventListener('change', handleReducedMotionChange)
    if (isInteractive) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      window.addEventListener('blur', handlePointerLeave)
      document.addEventListener('mouseleave', handlePointerLeave)
      document.addEventListener('focusin', handleFocusIn)
      document.addEventListener('focusout', handleFocusOut)
    }

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.clearTimeout(resizeTimer)
      intersectionObserver?.disconnect()
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      reducedMotionQuery.removeEventListener('change', handleReducedMotionChange)
      if (isInteractive) {
        window.removeEventListener('pointermove', handlePointerMove)
        window.removeEventListener('blur', handlePointerLeave)
        document.removeEventListener('mouseleave', handlePointerLeave)
        document.removeEventListener('focusin', handleFocusIn)
        document.removeEventListener('focusout', handleFocusOut)
      }
    }
  }, [route])

  if (!getAmbientSignalProfile(route)) return null

  return (
    <canvas
      className="ambient-signal-field"
      data-signal-route={route}
      aria-hidden="true"
      ref={canvasRef}
    />
  )
}
