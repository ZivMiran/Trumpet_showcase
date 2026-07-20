import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { ramp } from '../../lib/ramp'
import { asset } from '../../lib/asset'
import { SCREENS } from '../../lib/screens'
import './CompareStudy.css'

/**
 * 03 / The hardest problem — the Compare engine, shown as it actually runs.
 * A screen recording of the real prototype is scroll-scrubbed inside a sticky
 * stage: the runway's progress drives video.currentTime, and narration beats
 * flip as the flow unfolds. Motion moment #3.
 *
 * Seeking has latency, so the scrub isn't event-driven like the Opening
 * sequence: an IntersectionObserver-gated rAF loop lerps toward the target
 * time and only writes currentTime when the gap exceeds a frame — fast
 * scrolls coalesce into one seek instead of queueing thirty. The encode
 * matters as much as the code: dense keyframes (-g 12), muted, faststart
 * (see scripts/encode-video.mjs).
 *
 * Mobile / reduced motion: the same video with native controls, no autoplay,
 * and the beats as a plain numbered list.
 */
const VIDEO_RATIO = '1440 / 810'

/** Narration beats — `at` is a fraction of video progress, tuned to the cut. */
const BEATS = [
  { at: 0, text: 'Compare starts where the question starts — on the track itself.' },
  { at: 0.18, text: 'Alone, a curve has no verdict. It needs a benchmark.' },
  { at: 0.35, text: 'Any release can be the baseline — one field, no setup.' },
  { at: 0.55, text: 'Pick a prior track; both curves align to the same day one.' },
  { at: 0.72, text: 'Now velocity reads instantly: first month, peak, average, lifetime.' },
]

// Small holds at both ends of the runway so the first and last frames get a
// beat of rest before/after the scrub.
const TIME_STOPS: [number, number][] = [
  [0.04, 0],
  [0.96, 1],
]

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
  const videoRef = useRef<HTMLVideoElement>(null)
  const [activeBeat, setActiveBeat] = useState(0)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Warm the video well before the stage scrolls in.
  useEffect(() => {
    if (compact) return
    const runway = runwayRef.current
    const video = videoRef.current
    if (!runway || !video) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          video.preload = 'auto'
          video.load()
          io.disconnect()
        }
      },
      { rootMargin: '200% 0px' },
    )
    io.observe(runway)
    return () => io.disconnect()
  }, [compact])

  // The scrub loop — runs only while the runway is on screen.
  useEffect(() => {
    if (compact) return
    const runway = runwayRef.current
    const video = videoRef.current
    if (!runway || !video) return

    // A cached video can be ready before the loadeddata listener attaches —
    // check once on mount so the poster never sticks.
    if (video.readyState >= 2) setReady(true)

    let raf = 0
    let current = 0

    const tick = () => {
      raf = requestAnimationFrame(tick)
      const dur = video.duration
      if (!dur || video.readyState < 2 /* HAVE_CURRENT_DATA */) return

      const rect = runway.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      if (range <= 0) return
      const v = Math.min(1, Math.max(0, -rect.top / range))

      const u = ramp(v, TIME_STOPS) // video progress 0–1
      const target = u * dur
      // Ease toward the target; skip sub-frame writes so we never queue seeks.
      current += (target - current) * 0.3
      if (Math.abs(target - current) < 0.01) current = target
      if (Math.abs(video.currentTime - current) > 1 / 30) {
        video.currentTime = current
      }

      let beat = 0
      for (let i = 0; i < BEATS.length; i++) if (u >= BEATS[i].at) beat = i
      setActiveBeat(beat)
    }

    const io = new IntersectionObserver((entries) => {
      const visible = entries.some((e) => e.isIntersecting)
      if (visible && !raf) {
        current = video.currentTime
        raf = requestAnimationFrame(tick)
      } else if (!visible && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    io.observe(runway)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [compact])

  const videoSrc = asset('/video/trumpet-compare-scrub.mp4')

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
            question that matters: is this one moving faster? Below, the flow
            as it runs in the prototype.
          </p>
        </Reveal>
      </div>

      {compact || failed ? (
        <div className="container container--wide cstudy__static">
          <div className="cstudy__frame" style={{ aspectRatio: VIDEO_RATIO }}>
            {failed ? (
              <img
                src={SCREENS.compare}
                alt="Trumpet Compare — two releases aligned to release day, with first-month, peak, average and lifetime KPIs"
                width={1440}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <video
                src={videoSrc}
                poster={SCREENS.compareEmpty}
                controls
                muted
                playsInline
                preload="metadata"
                disablePictureInPicture
                aria-label="Screen recording of the Compare flow in the Trumpet prototype"
                onError={() => setFailed(true)}
              />
            )}
          </div>
          <ol className="cstudy__steps-list">
            {BEATS.map((b) => (
              <li key={b.at}>{b.text}</li>
            ))}
          </ol>
        </div>
      ) : (
        <div className="cstudy__runway" ref={runwayRef}>
          <div className="cstudy__sticky">
            <div className="container container--wide">
              <div
                className={`cstudy__frame${ready ? ' cstudy__frame--ready' : ''}`}
                style={{ aspectRatio: VIDEO_RATIO }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  muted
                  playsInline
                  preload="metadata"
                  disablePictureInPicture
                  tabIndex={-1}
                  aria-label="Screen recording of the Compare flow, scrubbed by scroll"
                  onLoadedData={() => setReady(true)}
                  onCanPlay={() => setReady(true)}
                  onError={() => setFailed(true)}
                />
                {/* Poster overlay until the video can seek — also the CLS guard. */}
                <img
                  className="cstudy__poster"
                  src={SCREENS.compareEmpty}
                  alt=""
                  aria-hidden="true"
                  width={1440}
                  height={1024}
                  decoding="async"
                />
              </div>

              <div className="cstudy__stepbar" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeBeat}
                    className="cstudy__step"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <span className="cstudy__step-n tnum">
                      {activeBeat + 1} / {BEATS.length}
                    </span>
                    {BEATS[activeBeat].text}
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
