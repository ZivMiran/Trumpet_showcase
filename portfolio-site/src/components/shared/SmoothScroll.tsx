import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { registerLenis } from './lenisRegistry'

/**
 * Site-wide smooth ("eased") scroll: one Lenis instance on one rAF loop.
 *
 * Lenis is left in its default mode, where it moves the real window scroll
 * position rather than transforming a wrapper — so every scrub on the page can
 * keep listening to plain `scroll` events and reading getBoundingClientRect.
 *
 * (This used to run Lenis off GSAP's ticker with ScrollTrigger.update wired to
 * it. Nothing on the deck uses ScrollTrigger any more — the runways scrub from
 * their own scroll listeners — so GSAP was ~28kB gzipped spent on a
 * requestAnimationFrame call. Do not bring it back for a ticker.)
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

    registerLenis(lenis)

    // Dev-only: expose the instance so preview/E2E can drive real scrolling
    // (programmatic native scroll gets overridden by Lenis's own target).
    if (import.meta.env.DEV) {
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
    }

    // One loop, owned here. rAF hands us a DOMHighResTimeStamp in ms, which is
    // exactly what lenis.raf expects.
    let frame = requestAnimationFrame(function tick(time: number) {
      lenis.raf(time)
      frame = requestAnimationFrame(tick)
    })

    return () => {
      cancelAnimationFrame(frame)
      registerLenis(null)
      lenis.destroy()
    }
  }, [prefersReduced])

  return <>{children}</>
}
