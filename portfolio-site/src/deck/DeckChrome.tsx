import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getLenis } from '../components/shared/lenisRegistry'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { SLIDES } from './slides'
import './DeckChrome.css'

/**
 * The deck's fixed chrome: identity left, slide counter + index toggle right,
 * a 1px gold reading-progress line along the bottom edge of the header.
 * The index overlay is the deck's table of contents — a typographic list, no
 * thumbnails. Keys: ← / → jump a slide, `i` toggles the index, Esc closes it.
 * All of it is shortcut chrome; plain scrolling is always enough.
 */
export function DeckChrome({ activeId }: { activeId: string }) {
  const [scrolled, setScrolled] = useState(false)
  const [indexOpen, setIndexOpen] = useState(false)
  const reduced = usePrefersReducedMotion()
  const progressRef = useRef<HTMLSpanElement>(null)

  const activeIdx = Math.max(0, SLIDES.findIndex((s) => s.id === activeId))
  const activeIdxRef = useRef(activeIdx)
  activeIdxRef.current = activeIdx
  const indexOpenRef = useRef(indexOpen)
  indexOpenRef.current = indexOpen

  // Reading progress — direct measurement + direct write (no bindings).
  useEffect(() => {
    let raf = 0
    const update = () => {
      raf = 0
      setScrolled(window.scrollY > 24)
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

  const goTo = (id: string, immediate = false) => {
    const el = document.getElementById(id)
    if (!el) return
    const lenis = getLenis()
    if (lenis) lenis.scrollTo(el, immediate ? { duration: 0.9 } : {})
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  // Keyboard shortcuts. Arrow up/down and space stay native so runway beats
  // remain finely scrubbable; left/right jump whole slides.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      if (e.key === 'Escape') {
        setIndexOpen(false)
        return
      }
      if (e.key === 'i' || e.key === 'I') {
        setIndexOpen((v) => !v)
        return
      }
      if (indexOpenRef.current) return
      // 'Right'/'Left' are legacy key values some engines still emit.
      if (e.key === 'ArrowRight' || e.key === 'Right') {
        e.preventDefault()
        const next = SLIDES[Math.min(SLIDES.length - 1, activeIdxRef.current + 1)]
        goTo(next.id, true)
      } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
        e.preventDefault()
        const prev = SLIDES[Math.max(0, activeIdxRef.current - 1)]
        goTo(prev.id, true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <header className={`deck-chrome${scrolled ? ' deck-chrome--scrolled' : ''}`}>
        <div className="deck-chrome__inner">
          <p className="deck-chrome__identity">
            Ziv Miran
            <span className="deck-chrome__role"> — Trumpet, a UX/UI case study</span>
          </p>

          <div className="deck-chrome__right">
            <span className="deck-chrome__counter tnum" aria-live="polite">
              {SLIDES[activeIdx].no}
              <span className="deck-chrome__counter-total"> / {SLIDES.length}</span>
            </span>
            <button
              type="button"
              className="deck-chrome__index-btn touch-target"
              aria-expanded={indexOpen}
              aria-controls="deck-index"
              onClick={() => setIndexOpen((v) => !v)}
            >
              Index
            </button>
          </div>
        </div>
        <span className="deck-chrome__progress" ref={progressRef} aria-hidden="true" />
      </header>

      <AnimatePresence>
        {indexOpen && (
          <motion.nav
            id="deck-index"
            className="deck-index"
            aria-label="Slide index"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          >
            <ol className="deck-index__list">
              {SLIDES.map(({ id, no, label }) => (
                <li key={id}>
                  <button
                    type="button"
                    className={`deck-index__item touch-target${
                      id === activeId ? ' deck-index__item--active' : ''
                    }`}
                    aria-current={id === activeId ? 'true' : undefined}
                    onClick={() => {
                      setIndexOpen(false)
                      goTo(id, true)
                    }}
                  >
                    <span className="tnum">{no}</span>
                    <span className="deck-index__label">{label}</span>
                  </button>
                </li>
              ))}
            </ol>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
