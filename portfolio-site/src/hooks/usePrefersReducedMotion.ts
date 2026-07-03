import { useEffect, useState } from 'react'

/**
 * Tracks the `prefers-reduced-motion` media query, reactively.
 *
 * Framer Motion ships its own `useReducedMotion`, but the smooth-scroll layer
 * (Lenis) and the GSAP ScrollTrigger pin need the same signal in plain effects,
 * and we want a single source of truth that also reacts to the user toggling
 * the OS setting mid-session. Defaults to `true` on the server / first paint so
 * we never flash heavy motion before the query resolves.
 */
const QUERY = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return true
    return window.matchMedia(QUERY).matches
  })

  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia(QUERY)
    const onChange = () => setReduced(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return reduced
}
