import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { StepDots } from '../../deck/StepDots'
import { ramp } from '../../lib/ramp'
import './SlideSequence.css'

/**
 * The deck's shared runway stage — n frames dissolving through one sticky
 * frame as the reader scrolls, generalized from the v3 ScreenSequence. Same
 * settled scrub mechanics: rAF-throttled scroll listener, getBoundingClientRect
 * each frame, CSS custom properties out. (Framer's useScroll caches bounds at
 * mount and goes stale here — do not migrate this back.)
 *
 * Mobile / reduced motion: no runway, the frames stack as static figures.
 */
export type SeqFrame = {
  src: string
  alt: string
  caption: string
  width?: number
  height?: number
  /** Optional fraction crop of the source (DecisionFigure math) — the frame's
   *  `ratio` prop must match the cropped region's aspect. */
  crop?: { x: number; y: number; w: number; h: number }
}

/** width 100%/w · left −x/w · top −y/h — shows region {x,y,w,h} of the img. */
function cropStyle(crop: NonNullable<SeqFrame['crop']>): React.CSSProperties {
  return {
    width: `${100 / crop.w}%`,
    height: 'auto',
    left: `${(-crop.x / crop.w) * 100}%`,
    top: `${(-crop.y / crop.h) * 100}%`,
  }
}

// Crossfade i runs at SEG_START + i * segLen over FADE; long holds at both
// ends so the first and last frames get a beat of rest.
const SEG_START = 0.26
const SEG_END = 0.82
const FADE = 0.08

function layerStops(i: number, last: number, segLen: number) {
  const fadeIn = SEG_START + (i - 1) * segLen
  const fadeOut = SEG_START + i * segLen
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

export function SlideSequence({
  frames,
  ratio,
  frameHeightBudget = 220,
}: {
  frames: SeqFrame[]
  /** CSS aspect-ratio of the stage, e.g. '1440 / 1024'. */
  ratio: string
  /** Vertical px reserved for chrome + caption when capping the frame width. */
  frameHeightBudget?: number
}) {
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

  const n = frames.length
  const segLen = n > 2 ? (SEG_END - FADE - SEG_START) / (n - 2) : SEG_END - FADE - SEG_START
  const stops = frames.map((_, i) => layerStops(i, n - 1, segLen))

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
      stops.forEach((st, i) => {
        s.setProperty(`--op-${i}`, String(ramp(v, st.op)))
        s.setProperty(`--y-${i}`, `${ramp(v, st.y)}px`)
      })

      // Active caption flips at each crossfade midpoint.
      const mid = SEG_START + FADE / 2
      let a = 0
      for (let i = 1; i < n; i++) if (v >= mid + (i - 1) * segLen) a = i
      setActive(a)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, n])

  const ratioValue = ratio.includes('/')
    ? Number(ratio.split('/')[0]) / Number(ratio.split('/')[1])
    : Number(ratio)

  const frameWidth = `min(100%, calc((100svh - ${frameHeightBudget}px) * ${ratioValue.toFixed(4)}))`

  if (compact) {
    return (
      <div className="container container--wide sseq__static">
        {frames.map((f) => (
          <figure className="sseq__static-item" key={f.src}>
            <div
              className={`sseq__frame${f.crop ? ' sseq__frame--crop' : ''}`}
              style={{ aspectRatio: ratio }}
            >
              <img
                src={f.src}
                alt={f.alt}
                width={f.width}
                height={f.height}
                style={f.crop ? cropStyle(f.crop) : undefined}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="sseq__caption">{f.caption}</figcaption>
          </figure>
        ))}
      </div>
    )
  }

  return (
    <div
      className="sseq__runway"
      ref={runwayRef}
      style={{ height: `${100 + (n - 1) * 80}vh` }}
    >
      <div className="sseq__sticky">
        <div className="container container--wide sseq__stage">
          <div
            className="sseq__frame sseq__frame--stack"
            ref={frameRef}
            style={{ aspectRatio: ratio, width: frameWidth }}
          >
            {frames.map((f, i) => (
              <img
                key={f.src}
                className={`sseq__layer${f.crop ? ' sseq__layer--crop' : ''}`}
                style={{
                  opacity: `var(--op-${i}, ${i === 0 ? 1 : 0})`,
                  translate: `0 var(--y-${i}, 0px)`,
                  ...(f.crop ? cropStyle(f.crop) : {}),
                }}
                src={f.src}
                alt={i === active ? f.alt : ''}
                width={f.width}
                height={f.height}
                loading="eager"
                decoding="async"
                fetchPriority={i === 0 ? 'high' : 'auto'}
              />
            ))}
          </div>

          <div className="sseq__stepbar" style={{ width: frameWidth }} aria-hidden="true">
            <StepDots count={n} active={active} />
            <AnimatePresence mode="wait">
              <motion.p
                key={active}
                className="sseq__caption"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              >
                <span className="sseq__caption-n tnum">
                  {active + 1} / {n}
                </span>
                {frames[active].caption}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
