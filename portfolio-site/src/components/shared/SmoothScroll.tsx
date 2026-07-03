import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { registerLenis } from './lenisRegistry'

gsap.registerPlugin(ScrollTrigger)

/**
 * Site-wide smooth ("eased") scroll, wired so Lenis and GSAP ScrollTrigger
 * cooperate instead of fighting:
 *   - Lenis's rAF is driven from GSAP's own ticker (one loop, not two).
 *   - gsap.ticker.lagSmoothing(0) stops GSAP from compensating for frame drops
 *     in a way that desyncs Lenis.
 *   - lenis.on('scroll', ScrollTrigger.update) keeps pin math frame-accurate.
 *
 * Under prefers-reduced-motion we deliberately DO NOT instantiate Lenis — the
 * page falls back to native scroll. Forced scroll inertia is a documented
 * motion-sickness anti-pattern, so reduced-motion users get the browser's own
 * scrolling untouched.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    // Dev/test escape hatch: `?nosmooth` disables Lenis so programmatic scroll
    // (screenshots, E2E) isn't overridden by Lenis's own scroll target.
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('nosmooth')) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      // ease-out expo — long, calm deceleration for that premium scroll feel
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    registerLenis(lenis)

    // Dev-only: expose the instance so preview/E2E can drive real scrolling
    // (programmatic native scroll gets overridden by Lenis's own target).
    if (import.meta.env.DEV) {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    const tick = (time: number) => {
      // GSAP ticker time is in seconds; Lenis expects milliseconds.
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Sections mount their own ScrollTriggers; refresh once wired up.
    ScrollTrigger.refresh()

    return () => {
      gsap.ticker.remove(tick)
      registerLenis(null)
      lenis.destroy()
    }
  }, [prefersReduced])

  return <>{children}</>
}
