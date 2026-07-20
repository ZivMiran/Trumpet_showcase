import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { StepDots } from '../../deck/StepDots'
import { ramp } from '../../lib/ramp'
import {
  SCREENS,
  PROCESS,
  SCREEN_W,
  SCREEN_H,
  COMPARE_OLD_W,
  COMPARE_OLD_H,
} from '../../lib/screens'
import './IterationSlide.css'

/**
 * 09 — Iteration. Four before/after pairs on one sticky stage: within each
 * beat, scroll crossfades the lo-fi frame into the shipped screen in place —
 * the layout holds still while the paint arrives. Scrolling back undoes it.
 *
 * Screens with a sidebar are cropped to the shared content region so before
 * and after align pixel-for-pixel; the one off-size artifact (the earlier
 * Compare direction) letterboxes instead.
 */
const CONTENT_CROP = { x: 0.152, y: 0, w: 0.848, h: 1 }
const CROP_RATIO = `${Math.round(SCREEN_W * CONTENT_CROP.w)} / ${SCREEN_H}`

type Side = {
  src: string
  alt: string
  label: string
  width: number
  height: number
  crop?: typeof CONTENT_CROP
}

type Pair = { id: string; title: string; note: string; before: Side; after: Side }

const PAIRS: Pair[] = [
  {
    id: 'pair-overview',
    title: 'Overview',
    note: 'The lo-fi pass already had the answer-first banner and the five KPIs. What changed: “Reach” became “Listeners,” and the timeframes moved to match how artists actually check in.',
    before: { src: PROCESS.overviewWireframe, alt: 'Lo-fi Overview wireframe', label: 'Lo-fi', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
    after: { src: SCREENS.overview, alt: 'Final Overview screen in Trumpet', label: 'Final', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
  },
  {
    id: 'pair-track',
    title: 'Track detail',
    note: 'The drawer survived intact — retention framed as a waveform was the first sketch’s bet, and testing kept it. The final adds the skip/save clusters that make it legible.',
    before: { src: PROCESS.trackDrawerWireframe, alt: 'Lo-fi track detail drawer wireframe', label: 'Lo-fi', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
    after: { src: SCREENS.trackDrawer, alt: 'Final track detail drawer with the engagement waveform', label: 'Final', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
  },
  {
    id: 'pair-audience',
    title: 'Audience',
    note: 'The wireframe’s bubble map ranked cities by circle size; the final swapped it for a density map — bubbles overlapped exactly where the data mattered most.',
    before: { src: PROCESS.audienceWireframe, alt: 'Lo-fi Audience wireframe with a bubble map', label: 'Lo-fi', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
    after: { src: SCREENS.audience, alt: 'Final Audience screen with the listeners density map', label: 'Final', width: SCREEN_W, height: SCREEN_H, crop: CONTENT_CROP },
  },
  {
    id: 'pair-compare',
    title: 'Compare',
    note: 'An earlier direction spent two hues on decoration and dashed lines on everything. Killed. What survived into the shipped version: day-one alignment and the KPI strip.',
    before: { src: PROCESS.compareOldVersion, alt: 'Earlier Compare design in purple and green', label: 'Earlier direction', width: COMPARE_OLD_W, height: COMPARE_OLD_H },
    after: { src: SCREENS.compare, alt: 'Shipped Compare modal — two releases aligned to day one', label: 'Shipped', width: SCREEN_W, height: SCREEN_H },
  },
]

function sideStyle(side: Side): React.CSSProperties | undefined {
  if (!side.crop) return undefined
  const c = side.crop
  return {
    width: `${100 / c.w}%`,
    height: 'auto',
    left: `${(-c.x / c.w) * 100}%`,
    top: `${(-c.y / c.h) * 100}%`,
  }
}

export function IterationSlide() {
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
  const stageRef = useRef<HTMLDivElement>(null)
  const [beat, setBeat] = useState(0)
  const [afterOn, setAfterOn] = useState(false)

  const n = PAIRS.length

  useEffect(() => {
    if (compact) return
    const runway = runwayRef.current
    const stage = stageRef.current
    if (!runway || !stage) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = runway.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      if (range <= 0) return
      const v = Math.min(1, Math.max(0, -rect.top / range))
      const b = Math.min(n - 1, Math.floor(v * n))
      const sub = v * n - b
      const x = ramp(sub, [
        [0.3, 0],
        [0.62, 1],
      ])
      stage.style.setProperty('--iter-after', String(x))
      setBeat(b)
      setAfterOn(x > 0.5)
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
  }, [compact, n])

  if (compact) {
    return (
      <>
        <div className="container">
          <ChapterHeader
            no="09"
            title="What changed between versions, and why"
            lede="The finished screens hide the arguments — four of them, before and after."
          />
          <div className="iter__static-list">
            {PAIRS.map((p) => (
              <figure className="iter__static-pair" key={p.id}>
                <div className="iter__static-media">
                  {[p.before, p.after].map((side) => (
                    <div className="iter__static-side" key={side.label}>
                      <span className="iter__label">{side.label}</span>
                      <img src={side.src} alt={side.alt} width={side.width} height={side.height} loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <figcaption className="iter__caption">
                  <span className="iter__title">{p.title}</span>
                  <p className="iter__note">{p.note}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </>
    )
  }

  const p = PAIRS[beat]

  return (
    <>
      <div className="container">
        <ChapterHeader
          no="09"
          title="What changed between versions, and why"
          lede="Scroll melts each lo-fi frame into the shipped screen — the structure holds still while the paint arrives."
        />
      </div>

      <div className="iter__runway" ref={runwayRef} style={{ height: `${100 + n * 90}vh` }}>
        <div className="iter__sticky">
          <div className="container container--wide iter__stage" ref={stageRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="iter__frame"
                style={{ aspectRatio: CROP_RATIO }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              >
                <img
                  className={`iter__img${p.before.crop ? ' iter__img--crop' : ' iter__img--contain'}`}
                  src={p.before.src}
                  alt={p.before.alt}
                  width={p.before.width}
                  height={p.before.height}
                  style={sideStyle(p.before)}
                />
                <img
                  className={`iter__img iter__img--after${p.after.crop ? ' iter__img--crop' : ' iter__img--contain'}`}
                  src={p.after.src}
                  alt={p.after.alt}
                  width={p.after.width}
                  height={p.after.height}
                  style={sideStyle(p.after)}
                />
              </motion.div>
            </AnimatePresence>

            <div className="iter__stepbar">
              <StepDots count={n} active={beat} />
              <div className="iter__labels tnum" aria-hidden="true">
                <span className={afterOn ? '' : 'iter__label--on'}>{p.before.label}</span>
                <span className="iter__arrow">→</span>
                <span className={afterOn ? 'iter__label--on' : ''}>{p.after.label}</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={p.id}
                  className="iter__note"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                >
                  <span className="iter__title">{p.title}</span>
                  {p.note}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
