import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ramp } from '../../lib/ramp'
import { SCREENS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import './ScreenSequence.css'

/**
 * The product, in motion — a sticky stage where four screens dissolve through
 * one frame as the reader scrolls, ordered as a use story: the daily check-in,
 * the catalog, one track opened, the audience behind it. Same scrub mechanics
 * as the Compare chapter: rAF-throttled scroll listener, getBoundingClientRect
 * each frame, CSS custom properties out. (Framer's useScroll caches bounds at
 * mount and goes stale here — do not migrate this back.)
 *
 * Mobile / reduced motion: no runway, the four screens stack as static figures.
 */
const FRAMES = [
  { src: SCREENS.overview, alt: 'Trumpet Overview — insight banner, five KPIs, streams chart, revenue by platform', caption: 'Overview — the daily check-in' },
  { src: SCREENS.music, alt: 'Trumpet Music — top performing tracks over a sortable catalog table', caption: 'Music — the catalog, ranked' },
  { src: SCREENS.trackDrawer, alt: 'Trumpet track detail drawer — engagement waveform with skip and save clusters', caption: 'Track detail — why a song performs' },
  { src: SCREENS.audience, alt: 'Trumpet Audience — world listeners map, top tracks, top cities, gender split', caption: 'Audience — who’s listening, and where' },
]

// Segment i ends (crossfade begins) at SEG_START + i * SEG_LEN; each
// crossfade lasts FADE. Tuned so the first and last screens get long holds.
const SEG_START = 0.26
const SEG_LEN = 0.24
const FADE = 0.08

/** Opacity/translate ramps per layer — incoming settles up, outgoing drifts off. */
function layerStops(i: number, last: number) {
  const fadeIn = SEG_START + (i - 1) * SEG_LEN
  const fadeOut = SEG_START + i * SEG_LEN
  const op: [number, number][] = []
  const y: [number, number][] = []
  if (i === 0) {
    op.push([0, 1], [fadeOut, 1], [fadeOut + FADE, 0])
    y.push([0, 0], [fadeOut, 0], [fadeOut + FADE, -12])
  } else if (i === last) {
    op.push([fadeIn, 0], [fadeIn + FADE, 1])
    y.push([fadeIn, 24], [fadeIn + FADE, 0])
  } else {
    op.push([fadeIn, 0], [fadeIn + FADE, 1], [fadeOut, 1], [fadeOut + FADE, 0])
    y.push([fadeIn, 24], [fadeIn + FADE, 0], [fadeOut, 0], [fadeOut + FADE, -12])
  }
  return { op, y }
}

const STOPS = FRAMES.map((_, i) => layerStops(i, FRAMES.length - 1))

export function ScreenSequence() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const on = () => setIsMobile(mql.matches)
    on()
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [])

  const compact = reduced || isMobile

  const runwayRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (compact) return
    const runway = runwayRef.current
    const frame = frameRef.current
    if (!runway || !frame) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = runway.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      if (range <= 0) return
      const v = Math.min(1, Math.max(0, -rect.top / range))

      const s = frame.style
      STOPS.forEach((stops, i) => {
        s.setProperty(`--op-${i}`, String(ramp(v, stops.op)))
        s.setProperty(`--y-${i}`, `${ramp(v, stops.y)}px`)
      })

      // Active caption flips at each crossfade midpoint.
      const mid = SEG_START + FADE / 2
      setActive(v < mid ? 0 : v < mid + SEG_LEN ? 1 : v < mid + SEG_LEN * 2 ? 2 : 3)
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [compact])

  if (compact) {
    return (
      <div className="container container--wide oseq__static">
        {FRAMES.map((f) => (
          <figure className="oseq__static-item" key={f.src}>
            <div className="oseq__frame">
              <img src={f.src} alt={f.alt} width={SCREEN_W} height={SCREEN_H} loading="lazy" decoding="async" />
            </div>
            <figcaption className="oseq__caption">{f.caption}</figcaption>
          </figure>
        ))}
      </div>
    )
  }

  return (
    <div className="oseq__runway" ref={runwayRef}>
      <div className="oseq__sticky">
        <div className="container container--wide oseq__stage">
          <div className="oseq__frame oseq__frame--stack" ref={frameRef}>
            {FRAMES.map((f, i) => (
              <img
                key={f.src}
                className="oseq__layer"
                style={{ opacity: `var(--op-${i}, ${i === 0 ? 1 : 0})`, translate: `0 var(--y-${i}, 0px)` }}
                src={f.src}
                alt={i === active ? f.alt : ''}
                width={SCREEN_W}
                height={SCREEN_H}
                loading="eager"
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            ))}
          </div>

          <div className="oseq__stepbar" aria-hidden="true">
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                className="oseq__caption"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              >
                <span className="oseq__caption-n tnum">
                  {active + 1} / {FRAMES.length}
                </span>
                {FRAMES[active].caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
