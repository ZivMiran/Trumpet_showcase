import { useEffect } from 'react'
import { getLenis } from './lenisRegistry'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Gentle proximity snap — the "natural stops" of the reading experience.
 * When scrolling settles NEAR a key frame (an annotated screen, or the start
 * of the Compare sequence), the page eases the small remaining distance so
 * the frame presents itself fully composed. Deliberately timid:
 *  - only fires once scrolling has settled (debounced), never mid-gesture;
 *  - only within a small window (±16% of the viewport) — it finishes your
 *    scroll, it never takes it over;
 *  - desktop + Lenis only; reduced-motion and mobile keep native scrolling.
 */
const TARGETS: { selector: string; align: 'center' | 'start' }[] = [
  { selector: '.screens__item', align: 'center' },
  { selector: '.cstudy__runway', align: 'start' },
]

const HEADER_H = 64

export function SnapStops() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    let timer = 0
    let unstick = 0
    let snapping = false

    const trySnap = () => {
      const lenis = getLenis()
      if (!lenis || snapping) return
      if (window.innerWidth < 1024) return

      const vh = window.innerHeight
      let bestDelta = Infinity
      for (const { selector, align } of TARGETS) {
        for (const el of document.querySelectorAll<HTMLElement>(selector)) {
          const r = el.getBoundingClientRect()
          if (align === 'center' && r.height > vh - HEADER_H) continue
          const desired =
            align === 'start'
              ? 0
              : Math.max(HEADER_H + 16, (vh - r.height) / 2)
          const delta = r.top - desired
          if (Math.abs(delta) < Math.abs(bestDelta)) bestDelta = delta
        }
      }

      if (
        Number.isFinite(bestDelta) &&
        Math.abs(bestDelta) < vh * 0.16 &&
        Math.abs(bestDelta) > 6
      ) {
        snapping = true
        // Safety valve: if the user interrupts the ease, onComplete never
        // fires — release the lock shortly after the ease should have ended.
        window.clearTimeout(unstick)
        unstick = window.setTimeout(() => {
          snapping = false
        }, 1100)
        lenis.scrollTo(window.scrollY + bestDelta, {
          duration: 0.8,
          onComplete: () => {
            window.clearTimeout(unstick)
            snapping = false
          },
        })
      }
    }

    const onScroll = () => {
      if (snapping) return
      window.clearTimeout(timer)
      timer = window.setTimeout(trySnap, 220)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(unstick)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])

  return null
}
