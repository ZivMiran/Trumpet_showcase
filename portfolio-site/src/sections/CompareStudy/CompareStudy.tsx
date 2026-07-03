import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { asset } from '../../lib/asset'
import './CompareStudy.css'

/**
 * 03 / The hardest problem — the Compare engine, shown exactly as built.
 * An editorial intro states the analytical problem; then a tall scroll block
 * with a sticky stage scrubs three beats over the REAL screenshots
 * (Compare_empty.png → Compare.png): a cursor glides to "Choose a release",
 * a click ripple crossfades to the filled comparison, and the stage zooms
 * into the KPI panel. Motion moment #3.
 *
 * The scrub is driven by a plain scroll listener that re-measures the runway
 * with getBoundingClientRect on every frame and writes CSS custom properties
 * directly. (Framer's useScroll caches target bounds at mount; lazy-loading
 * images above this section shift the layout afterwards and its scroll-linked
 * style bindings proved unreliable here — direct measurement can't go stale.)
 *
 * Mobile / reduced motion: the filled screenshot, static, with the beats as
 * a plain numbered list.
 */
const STEPS = [
  'Start with one release on the timeline.',
  'Add a prior release — its curve aligns to the same day one.',
  'Read velocity: first week, peak, average, lifetime.',
]

/** Piecewise-linear mapping, clamped to the output range. */
function ramp(v: number, stops: [number, number][]): number {
  if (v <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    const [x1, y1] = stops[i]
    const [x0, y0] = stops[i - 1]
    if (v <= x1) return y0 + ((v - x0) / (x1 - x0)) * (y1 - y0)
  }
  return stops[stops.length - 1][1]
}

export function CompareStudy() {
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
  const [activeStep, setActiveStep] = useState(0)

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
      s.setProperty('--empty-op', String(ramp(v, [[0, 1], [0.3, 1], [0.42, 0]])))
      s.setProperty('--filled-op', String(ramp(v, [[0.36, 0], [0.5, 1]])))
      s.setProperty('--zoom', String(ramp(v, [[0.52, 1], [1, 1.42]])))
      s.setProperty('--cx', `${ramp(v, [[0, 50], [0.32, 81]])}%`)
      s.setProperty('--cy', `${ramp(v, [[0, 44], [0.32, 69]])}%`)
      s.setProperty(
        '--cursor-op',
        String(ramp(v, [[0, 0], [0.05, 1], [0.5, 1], [0.58, 0]])),
      )
      s.setProperty(
        '--ripple-scale',
        String(ramp(v, [[0.3, 0.2], [0.36, 1.2], [0.42, 1.6]])),
      )
      s.setProperty(
        '--ripple-op',
        String(ramp(v, [[0.3, 0], [0.33, 0.55], [0.42, 0]])),
      )

      setActiveStep(v < 0.34 ? 0 : v < 0.58 ? 1 : 2)
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

  return (
    <section className="cstudy" id="compare" aria-labelledby="compare-title">
      <div className="container">
        <ChapterHeader no="03" title="The hardest problem" />

        <Reveal standalone as="p" className="cstudy__pull" amount={0.5}>
          Two releases never launch under the same conditions.
        </Reveal>

        <Reveal standalone className="cstudy__brief" amount={0.5}>
          <p id="compare-title">
            Different seasons, different follower counts, different luck — put
            two raw charts side by side and they mislead. Compare aligns every
            release to its own day one, so the trajectories answer the only
            question that matters: is this one moving faster?
          </p>
        </Reveal>
      </div>

      {compact ? (
        <div className="container container--wide cstudy__static">
          <div className="cstudy__frame">
            <img
              src={asset('/screens/Compare.png')}
              alt="Trumpet Compare — Velvet Hours against After Dark, aligned to release day, with first-week, peak, average and lifetime KPIs"
              width={1546}
              height={953}
              loading="lazy"
              decoding="async"
            />
          </div>
          <ol className="cstudy__steps-list">
            {STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="cstudy__runway" ref={runwayRef}>
          <div className="cstudy__sticky">
            <div className="container container--wide">
              <div className="cstudy__frame" ref={frameRef}>
                <div className="cstudy__zoom">
                  <div className="cstudy__layer cstudy__layer--base">
                    <img
                      src={asset('/screens/Compare_empty.png')}
                      alt="Compare, empty state — one release selected"
                      width={1551}
                      height={953}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="cstudy__layer cstudy__layer--overlay">
                    <img
                      src={asset('/screens/Compare.png')}
                      alt="Compare, filled — Velvet Hours against After Dark"
                      width={1546}
                      height={953}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                <div className="cstudy__cursor" aria-hidden="true">
                  <span className="cstudy__ripple" />
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 3l14 8-6 1.5L10 20 5 3z"
                      fill="#f0ede5"
                      stroke="#16171a"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className="cstudy__stepbar" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStep}
                    className="cstudy__step"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <span className="cstudy__step-n tnum">
                      {activeStep + 1} / 3
                    </span>
                    {STEPS[activeStep]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
