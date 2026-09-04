import { useEffect, useRef } from 'react'
import { getAmbientSignalProfile } from './ambient-signal-field'

const CHARACTERS = '.:·+*#01>/='
const FONT_STACK = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export default function AmbientSignalField({ route }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const profile = getAmbientSignalProfile(route)
    if (!canvas || !profile) return undefined

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
    let frameId = null
    let lastFrame = 0

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
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0)
    }

    const draw = (timestamp = 0) => {
      const time = (timestamp / 1000) * profile.speed
      const isReducedMotion = reducedMotionQuery.matches

      if (!isReducedMotion && pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12
        pointer.y += (pointer.targetY - pointer.y) * 0.12
      }

      context.clearRect(0, 0, width, height)
      context.font = `${cellHeight}px ${FONT_STACK}`
      context.textBaseline = 'top'

      for (let row = 0; row < rows; row += 1) {
        const normalizedY = row / rows
        const y = row * cellHeight

        for (let column = 0; column < columns; column += 1) {
          const normalizedX = column / columns
          const x = column * cellWidth
          const waveOne = Math.sin((normalizedX * 13) + (normalizedY * 4) + (time * 0.9) + profile.phase)
          const waveTwo = Math.sin((normalizedY * 31) - (time * 0.68) + (Math.sin(normalizedX * 8) * 2.2) + profile.phase)
          const waveThree = Math.sin(((normalizedX * 9) - (normalizedY * 17)) + (time * 0.42))
          let intensity = clamp(0.04 + ((waveOne + 1) * 0.1) + ((waveTwo + 1) * 0.08) + ((waveThree + 1) * 0.05))
          let pointerInfluence = 0

          if (pointer.active) {
            const distanceX = (normalizedX - pointer.x) * 1.35
            const distanceY = (normalizedY - pointer.y)
            const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY))
            const influence = Math.exp(-((distance * distance) * 32))
            const ripple = Math.sin((distance * 76) - (time * 4.5)) * influence
            pointerInfluence = influence
            intensity = clamp(intensity + (influence * profile.mouseInfluence * 0.72) + (ripple * profile.mouseInfluence * 0.14))
          }

          if (intensity < 0.08) continue

          const characterIndex = Math.min(CHARACTERS.length - 1, Math.floor(intensity * CHARACTERS.length))
          const alpha = (profile.opacity * (0.16 + (intensity * 0.84))) + (pointerInfluence * profile.pointerOpacity)
          const accent = intensity > profile.accentThreshold && ((row + column) % 7 === 0)
          context.fillStyle = accent
            ? `rgba(245, 78, 0, ${alpha * 0.82})`
            : `rgba(215, 214, 213, ${alpha})`
          context.fillText(CHARACTERS[characterIndex], x, y)
        }
      }
    }

    const render = (timestamp) => {
      if (timestamp - lastFrame >= 1000 / 30) {
        lastFrame = timestamp
        draw(timestamp)
      }
      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event) => {
      if (event.pointerType === 'touch' || reducedMotionQuery.matches) return
      pointer.targetX = clamp(event.clientX / width)
      pointer.targetY = clamp(event.clientY / height)
      pointer.active = true
    }

    const handleResize = () => {
      resize()
      draw()
    }

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

    resize()
    draw()
    if (!reducedMotionQuery.matches) frameId = window.requestAnimationFrame(render)
    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('blur', handlePointerLeave)
    document.addEventListener('mouseleave', handlePointerLeave)
    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('blur', handlePointerLeave)
      document.removeEventListener('mouseleave', handlePointerLeave)
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
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
