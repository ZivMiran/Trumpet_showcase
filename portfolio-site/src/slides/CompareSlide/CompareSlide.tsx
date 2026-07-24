import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { asset } from '../../lib/asset'
import { SCREENS, COMPARE_EMPTY_W, COMPARE_EMPTY_H } from '../../lib/screens'
import { usePlayInView } from '../../lib/usePlayInView'
import './CompareSlide.css'

/**
 * 11 — The hardest problem: the Compare engine, shown as it actually runs.
 * A screen recording of the real prototype plays on a muted loop inside the
 * stage while the flow's beats sit beside it as a numbered read. No scroll
 * hijack — the deck scrolls past normally.
 *
 * Reduced motion: the same recording with native controls and no autoplay,
 * so nothing moves until the reader asks.
 */
const VIDEO_RATIO = '1440 / 810'

/** The flow, as numbered beats — a static read alongside the looping clip. */
const BEATS = [
  'Compare starts where the question starts — on the track itself.',
  'Alone, a curve has no verdict. It needs a benchmark.',
  'Any release can be the baseline — one field, no setup.',
  'Pick a prior track; both curves align to the same day one.',
  'Now velocity reads instantly: first month, peak, average, lifetime.',
]

export function CompareSlide() {
  const reduced = !!useReducedMotion()
  const videoSrc = asset('/video/compare-loop.mp4')
  const videoRef = useRef<HTMLVideoElement>(null)

  // Begin the walkthrough from its first frame when the viewer reaches it.
  usePlayInView(videoRef, { enabled: !reduced, restart: true })

  return (
    <div className="cstudy">
      <div className="container">
        <ChapterHeader no="11" title="The hardest problem" />

        <Reveal standalone as="p" className="cstudy__pull" amount={0.5}>
          Two releases never launch under the same conditions.
        </Reveal>

        <Reveal standalone className="cstudy__brief" amount={0.5}>
          <p id="compare-title">
            Different seasons, different follower counts, different luck — put
            two raw charts side by side and they mislead. Compare aligns every
            release to its own day one, so the trajectories answer the only
            question that matters: is this one moving faster? Below, the flow as
            it runs in the prototype.
          </p>
        </Reveal>
      </div>

      <div className="container container--wide cstudy__static">
        <div className="cstudy__frame" style={{ aspectRatio: VIDEO_RATIO }}>
          <video
            ref={videoRef}
            src={videoSrc}
            poster={SCREENS.compareEmpty}
            width={COMPARE_EMPTY_W}
            height={COMPARE_EMPTY_H}
            muted
            loop
            playsInline
            controls={reduced}
            preload="metadata"
            disablePictureInPicture
            aria-label="Screen recording of the Compare flow in the Trumpet prototype, looping"
          />
        </div>
        <ol className="cstudy__steps-list">
          {BEATS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ol>
      </div>
    </div>
  )
}
