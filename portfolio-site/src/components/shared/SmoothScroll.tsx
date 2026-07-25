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
      // Damped follow (frame-rate-normalized exponential), not duration+easing.
      // Two reasons, in order of weight:
      //   1. Feel. The old duration 1.1 + easeOutExpo trailed a continuous
      //      trackpad drag by ~140px and took ~1.0s to come to rest, which reads
      //      as floaty on a laptop. lerp 0.14 measures ~113px and ~0.84s — about
      //      20% tighter, still unmistakably smoothed. (Swapping mode alone was a
      //      wash; the number is what does the work. Higher than ~0.16 starts
      //      trading away the calm glide the deck is built on.)
      //   2. Shape. With a fixed duration, every wheel event restarts a fresh
      //      ease from zero — so a trackpad streaming dozens of deltas per
      //      gesture is continuously reset mid-curve. A damp has one target and
      //      one approach, so tuning is a single honest number instead of a
      //      curve fighting its own retriggers.
      lerp: 0.14,
      smoothWheel: true,
      wheelMultiplier: 1,
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
