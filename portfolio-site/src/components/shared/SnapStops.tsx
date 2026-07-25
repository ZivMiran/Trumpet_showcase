import { useEffect } from 'react'
import { getLenis } from './lenisRegistry'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Gentle proximity settle — it FINISHES a scroll, it never takes one over.
 *
 * The contract, in order of importance:
 *  1. Forward only. The assist may carry you the last stretch in the direction
 *     you were already travelling; it never drags you back to a frame you
 *     deliberately scrolled past. (Slides here are ~1 viewport tall, so a
 *     direction-agnostic pull means half of every slide is a trapdoor — stop to
 *     read 200px in and the page yanks you back up.)
 *  2. Only after a navigational gesture. A fling toward the next slide earns the
 *     assist; nudging two lines to finish a paragraph does not. Intent is
 *     measured from wheel delta, not from scroll position, so our own eased
 *     scrolls can never re-trigger it.
 *  3. Only once everything has come to rest — the debounce waits out both the
 *     input and Lenis's own inertia.
 *  4. Never mid-scrub. While a sticky runway is dissolving between beats, a jump
 *     would tear the animation; the assist stands down entirely.
 *  5. Desktop + Lenis only; reduced-motion and small screens keep native scroll.
 */
const TARGETS: { selector: string; align: 'center' | 'start'; window: number }[] = [
  { selector: '[data-slide]', align: 'start', window: 0.28 },
  { selector: '.decisions__item', align: 'center', window: 0.14 },
]

/** A sticky runway mid-dissolve — no snapping while one is on stage. */
const SCRUB_SELECTOR = '.sseq__runway'

/** Fixed-chrome clearance, measured rather than assumed. The header declares
 *  64px and measures 65 with its progress hairline; browser zoom and fractional
 *  DPI scaling land it on non-integer values. Centering math shouldn't carry a
 *  guess that is already a pixel off. */
const HEADER_FALLBACK = 64
const headerHeight = () =>
  document.querySelector('.deck-chrome')?.getBoundingClientRect().height ??
  HEADER_FALLBACK

/** Wheel deltas arrive in three units. Lenis normalizes them internally
 *  (LINE_HEIGHT = 100/6, pages = viewport height); the intent gate has to use
 *  the same scale or it measures a different quantity than the page scrolls.
 *  Firefox/Windows in particular sends deltaMode 1 with deltaY ~3 per notch —
 *  read raw, a genuine fling looks like a 3px twitch and the assist never fires. */
const LINE_HEIGHT = 100 / 6
function normalizeDelta(e: WheelEvent): number {
  if (e.deltaMode === 1) return e.deltaY * LINE_HEIGHT
  if (e.deltaMode === 2) return e.deltaY * window.innerHeight
  return e.deltaY
}
/** Debounce after the last scroll event — long enough to outlast Lenis's tail. */
const SETTLE_MS = 320
/** The gesture must be over: no wheel input for this long. */
const INPUT_QUIET_MS = 180
/** Minimum wheel travel, as a fraction of the viewport, to count as "going somewhere". */
const MIN_GESTURE = 0.2
/** Corrections smaller than this aren't worth a visible move. */
const DEAD_ZONE = 28
/** Quiet period after an assisted move before another can be considered. */
const COOLDOWN_MS = 800

export function SnapStops() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    let timer = 0
    let unstick = 0
    let snapping = false
    /** Signed wheel travel for the current gesture; resets on reversal. */
    let gesture = 0
    let lastWheel = 0
    let blockedUntil = 0

    /** True while a sticky runway is between its first and last beat. */
    const midScrub = () => {
      const vh = window.innerHeight
      for (const el of document.querySelectorAll<HTMLElement>(SCRUB_SELECTOR)) {
        const r = el.getBoundingClientRect()
        if (r.top < -8 && r.bottom > vh + 8) return true
      }
      return false
    }

    const trySnap = () => {
      const lenis = getLenis()
      if (!lenis || snapping) return
      if (window.innerWidth < 1024) return

      const now = performance.now()
      // Cooling down, still moving, or the gesture hasn't ended — wait for real
      // rest rather than deciding on a moving target.
      if (
        now < blockedUntil ||
        now - lastWheel < INPUT_QUIET_MS ||
        lenis.isScrolling
      ) {
        window.clearTimeout(timer)
        timer = window.setTimeout(trySnap, SETTLE_MS)
        return
      }

      // Everything is at rest, so this gesture is spent whatever we decide
      // below. Intent must never outlive the scroll that expressed it —
      // otherwise a later unrelated move (a hash jump, an anchor, a reflow)
      // inherits it and snaps on someone else's behalf.
      const travel = gesture
      gesture = 0

      const vh = window.innerHeight
      const dir = Math.sign(travel)
      if (!dir || Math.abs(travel) < vh * MIN_GESTURE) return
      if (midScrub()) return

      const headerH = headerHeight()
      let bestDelta = Infinity
      for (const { selector, align, window: win } of TARGETS) {
        for (const el of document.querySelectorAll<HTMLElement>(selector)) {
          const r = el.getBoundingClientRect()
          // Taller than the space available — centering it would crop it, so
          // leave it alone and let the reader scroll through.
          if (align === 'center' && r.height > vh - headerH) continue
          const desired =
            align === 'start' ? 0 : Math.max(headerH + 16, (vh - r.height) / 2)
          const delta = r.top - desired
          // Forward only: the target has to lie ahead, along the way we were going.
          if (Math.sign(delta) !== dir) continue
          if (Math.abs(delta) > vh * win) continue
          if (Math.abs(delta) < Math.abs(bestDelta)) bestDelta = delta
        }
      }

      if (!Number.isFinite(bestDelta) || Math.abs(bestDelta) < DEAD_ZONE) return

      snapping = true
      // Short hops finish quickly; a full-window carry gets the longer ease.
      const duration = 0.34 + Math.min(1, Math.abs(bestDelta) / (vh * 0.28)) * 0.36
      const release = () => {
        window.clearTimeout(unstick)
        snapping = false
        blockedUntil = performance.now() + COOLDOWN_MS
      }
      // Safety valve: if the user interrupts the ease, onComplete never fires.
      window.clearTimeout(unstick)
      unstick = window.setTimeout(release, duration * 1000 + 300)
      lenis.scrollTo(window.scrollY + bestDelta, { duration, onComplete: release })
    }

    const onWheel = (e: WheelEvent) => {
      lastWheel = performance.now()
      if (snapping) return
      const delta = normalizeDelta(e)
      // A reversal starts a new gesture — back-and-forth must not accumulate
      // into something that reads as a fling.
      if (gesture !== 0 && Math.sign(delta) !== Math.sign(gesture)) gesture = 0
      gesture += delta
    }

    const onScroll = () => {
      if (snapping) return
      window.clearTimeout(timer)
      timer = window.setTimeout(trySnap, SETTLE_MS)
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(unstick)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  return null
}
