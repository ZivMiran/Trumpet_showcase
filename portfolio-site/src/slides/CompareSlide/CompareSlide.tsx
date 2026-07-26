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
 * This slide is where research pain 05 (comparison by hand) closes, so it
 * carries the same pain tag as the four decisions on slide 10 — the four that
 * close there, the fifth that needed a chapter.
 *
 * Layout is the same argument/evidence split as slide 10: the read on the left
 * (statement, then explanation, then the flow as numbered beats), the real
 * prototype looping on the right. Sized so the whole slide is one viewport —
 * a static slide that overflows makes the deck scroll inside itself. No scroll
 * hijack; the deck scrolls past normally.
 *
 * Reduced motion: the same recording with native controls and no autoplay,
 * so nothing moves until the reader asks.
 */
const VIDEO_RATIO = '1440 / 810'

/**
 * The flow, as numbered beats — a static read alongside the looping clip.
 * Each beat names something visible in the recording, in its order.
 */
const BEATS = [
  'Compare opens on the track itself — nothing to assemble first.',
  'One field adds the benchmark: any release in the catalogue.',
  'Both curves restart at their own day one.',
  'Four verdicts stack beside them: first week, peak, average, lifetime.',
  'Metric and range still switch underneath; every number recomputes.',
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
      </div>

      <div className="container container--wide cstudy__stage">
        <Reveal standalone className="cstudy__lead" amount={0.4}>
          <p className="cstudy__pain">
            <span className="cstudy__pain-no tnum">Pain 05</span>
            <span className="cstudy__pain-name">Comparison by hand</span>
          </p>
          <p className="cstudy__pull">
            Two releases never launch under the same conditions.
          </p>
          <p className="cstudy__brief">
            Different seasons, different follower counts, different luck — two
            raw charts side by side mislead. Compare restarts both releases at
            their own day one, so the curves answer one question: is this one
            moving faster?
          </p>

          <div className="cstudy__beats">
            <span className="cstudy__beats-label">
              The flow, in the prototype
            </span>
            <ol className="cstudy__steps-list">
              {BEATS.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal standalone className="cstudy__evidence" amount={0.35}>
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
        </Reveal>
      </div>
    </div>
  )
}
