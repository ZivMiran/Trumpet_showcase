import { useEffect, useState } from 'react'
import { getLenis } from '../components/shared/lenisRegistry'
import { SLIDES } from './slides'

/**
 * Tracks which slide owns the viewport and mirrors it into the URL hash
 * (`#/flow`) so any slide can be deep-linked from an email. replaceState keeps
 * the back button clean; on load, a recognized hash jumps straight there.
 * Works under the GitHub Pages subpath because it never touches the pathname.
 */
export function useActiveSlide(): string {
  const [active, setActive] = useState(SLIDES[0].id)

  // Deep-link entry — after first layout so section offsets are real (every
  // image declares width/height, so layout is stable before images load).
  // scrollRestoration must be manual: the browser's restored position lands
  // AFTER our jump and would silently win over the hash target.
  useEffect(() => {
    const m = window.location.hash.match(/^#\/([\w-]+)/)
    if (!m) return
    const el = document.getElementById(m[1])
    if (!el) return
    window.history.scrollRestoration = 'manual'
    requestAnimationFrame(() => {
      const lenis = getLenis()
      if (lenis) lenis.scrollTo(el, { immediate: true })
      else el.scrollIntoView()
    })
  }, [])

  // "Current" = the slide crossing a thin band at mid-viewport. Runways are
  // taller than the viewport, so the band keeps them active for their whole
  // scrub, not just their opening frame.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    for (const { id } of SLIDES) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    window.history.replaceState(null, '', `#/${active}`)
  }, [active])

  return active
}
