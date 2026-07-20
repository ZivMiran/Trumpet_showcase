import { useEffect, useRef, useState } from 'react'
import { getLenis } from '../../components/shared/lenisRegistry'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import './SiteHeader.css'

/**
 * Fixed minimal header: identity left, chapter index center, contact right.
 * Transparent over the opening; gains a surface + hairline once scrolled.
 * The chapter index tracks the current section via IntersectionObserver and
 * drives Lenis for anchor scrolling (native fallback under reduced motion).
 */
const CHAPTERS = [
  { id: 'problem', no: '01', label: 'Problem' },
  { id: 'decisions', no: '02', label: 'Decisions' },
  { id: 'compare', no: '03', label: 'Compare' },
  { id: 'process', no: '04', label: 'Process' },
  { id: 'system', no: '05', label: 'System' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()

  const progressRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 24)
      // Reading progress — direct measurement + direct write (no bindings).
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0
      progressRef.current?.style.setProperty('transform', `scaleX(${p})`)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      // A slim band across the upper-middle of the viewport decides "current".
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const { id } of CHAPTERS) {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  const goTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, { offset: -32 })
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className="site-header__inner">
        <a className="site-header__identity" href="#top" onClick={goTo('top')}>
          Ziv Miran
          <span className="site-header__role"> — UX/UI Product Designer</span>
        </a>

        <nav className="site-header__nav" aria-label="Chapters">
          {CHAPTERS.map(({ id, no, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={goTo(id)}
              className={`site-header__link${active === id ? ' site-header__link--active' : ''}`}
              aria-current={active === id ? 'true' : undefined}
            >
              <span className="tnum">{no}</span>
              <span className="site-header__link-label">{label}</span>
            </a>
          ))}
        </nav>

        <a className="site-header__contact" href="mailto:zivmiran@gmail.com">
          Contact
        </a>
      </div>
      <span className="site-header__progress" ref={progressRef} aria-hidden="true" />
    </header>
  )
}
