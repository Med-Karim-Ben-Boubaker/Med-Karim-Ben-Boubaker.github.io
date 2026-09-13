import { useEffect, useRef } from 'react'

const finePointerQuery = '(hover: hover) and (pointer: fine)'
const reducedMotionQuery = '(prefers-reduced-motion: reduce)'

function subscribeToMediaQuery(query, listener) {
  if (query.addEventListener) {
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }

  query.addListener(listener)
  return () => query.removeListener(listener)
}

function getSpotlightCards(group) {
  return [...group.querySelectorAll('.pointer-spotlight-card')]
}

function cancelScheduledUpdate(frameRef) {
  if (frameRef.current !== null) {
    window.cancelAnimationFrame(frameRef.current)
    frameRef.current = null
  }
}

export function PointerSpotlightGroup({ as: Component = 'div', className = '', children, ...props }) {
  const groupRef = useRef(null)
  const frameRef = useRef(null)
  const pointerRef = useRef({ clientX: 0, clientY: 0 })
  const trackingRef = useRef(false)
  const capabilitiesRef = useRef({ finePointer: false, reducedMotion: false })

  useEffect(() => {
    const group = groupRef.current
    const finePointer = window.matchMedia(finePointerQuery)
    const reducedMotion = window.matchMedia(reducedMotionQuery)

    const updateCapabilities = () => {
      const capabilities = {
        finePointer: finePointer.matches,
        reducedMotion: reducedMotion.matches,
      }

      capabilitiesRef.current = {
        ...capabilities,
      }

      if (!capabilities.finePointer || capabilities.reducedMotion) {
        trackingRef.current = false
        group?.removeAttribute('data-spotlight-active')
        cancelScheduledUpdate(frameRef)
      }
    }

    updateCapabilities()
    const unsubscribeFinePointer = subscribeToMediaQuery(finePointer, updateCapabilities)
    const unsubscribeReducedMotion = subscribeToMediaQuery(reducedMotion, updateCapabilities)

    return () => {
      unsubscribeFinePointer()
      unsubscribeReducedMotion()
      group?.removeAttribute('data-spotlight-active')
      cancelScheduledUpdate(frameRef)
    }
  }, [])

  const updateSpotlightPosition = (event) => {
    const { finePointer, reducedMotion } = capabilitiesRef.current
    if (!finePointer || reducedMotion || event.pointerType === 'touch') return

    const group = groupRef.current
    if (!group || getSpotlightCards(group).length === 0) return

    pointerRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    trackingRef.current = true
    group.dataset.spotlightActive = 'true'

    if (frameRef.current !== null) return

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null
      if (!trackingRef.current || !groupRef.current) return

      const { clientX, clientY } = pointerRef.current
      getSpotlightCards(groupRef.current).forEach((card) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--spotlight-x', `${clientX - rect.left}px`)
        card.style.setProperty('--spotlight-y', `${clientY - rect.top}px`)
      })
    })
  }

  const handlePointerLeave = () => {
    trackingRef.current = false
    groupRef.current?.removeAttribute('data-spotlight-active')
    cancelScheduledUpdate(frameRef)
  }

  const combinedClassName = ['pointer-spotlight-group', className].filter(Boolean).join(' ')

  return (
    <Component
      {...props}
      ref={groupRef}
      className={combinedClassName}
      onPointerEnter={updateSpotlightPosition}
      onPointerMove={updateSpotlightPosition}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </Component>
  )
}

export default function PointerSpotlightCard({ as: Component = 'div', className = '', children, ...props }) {
  const combinedClassName = ['pointer-spotlight-card', className].filter(Boolean).join(' ')

  return (
    <Component {...props} className={combinedClassName}>
      {children}
    </Component>
  )
}
