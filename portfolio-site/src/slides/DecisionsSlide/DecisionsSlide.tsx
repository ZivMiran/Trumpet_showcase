import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import {
  DecisionFigure,
  type CropBox,
} from '../../components/shared/DecisionFigure'
import { DETAILS } from '../../lib/screens'
import { asset } from '../../lib/asset'
import './DecisionsSlide.css'

/**
 * 10 — How the design answers the pain (the Solution deliverable), shown as
 * annotated decisions where they live. Each entry is three things and nothing
 * else: the research pain it closes, the design call that closes it, and one
 * close-up of that call running in the real UI.
 *
 * The entries run in the order of the pain list on slide 03 — pains 01–04 close
 * here, one each; pain 05 (comparison by hand) is the whole of slide 11. That
 * mapping is the slide's argument, so the pain tag leads the text block and the
 * body copy carries the before/after in its own sentence.
 *
 * Two kinds of evidence: pre-cropped HQ detail captures (shown whole, with
 * their own `srcW/srcH`) and CSS crops of a 16:9 full screen (crop box + marker
 * as fractions of that screen, tuned visually).
 */
type Decision = {
  id: string
  /** The research pain (slide 03) this decision closes, by list position. */
  pain: { no: string; name: string }
  headline: string
  line: string
  src: string
  cropAlt: string
  crop: CropBox
  marker?: { x: number; y: number }
  /** Natural size of `src` when it isn't a 16:9 full screen. */
  srcW?: number
  srcH?: number
  /** A pre-framed screen recording shown in place of the still crop. */
  video?: string
  /**
   * Evidence far wider than it is tall (the insight banner is ~9:1) is starved
   * in a side-by-side column — it gets the full width with the text stacked
   * above instead, so the banner reads at close to its real size.
   */
  wide?: true
}

const DECISIONS: Decision[] = [
  {
    id: 'decision-sentence',
    pain: { no: '01', name: 'Overwhelm over simplicity' },
    headline: 'Open with a sentence, not a chart',
    line: 'Dense tables ask the artist to find the story. The insight banner states it in one line of plain language, and the chart underneath turns into the proof rather than the puzzle.',
    src: DETAILS.insightBanner.src,
    srcW: DETAILS.insightBanner.w,
    srcH: DETAILS.insightBanner.h,
    cropAlt:
      'The insight banner at the top of the Overview: “Your audience in Germany grew 12% this week on algorithmic playlists.”',
    crop: { x: 0, y: 0, w: 1, h: 1 },
    wide: true,
  },
  {
    id: 'decision-peaks',
    pain: { no: '02', name: 'Buried data' },
    headline: 'Spikes arrive with their reason attached',
    line: 'The cause of a jump normally sits several clicks deep, if it is reachable at all. Peak markers put it on the curve: open one and it names the New Music Friday refresh behind the climb.',
    src: asset('/video/solution-peak-poster.jpg'),
    video: asset('/video/solution-peak.mp4'),
    srcW: 3456,
    srcH: 2160,
    cropAlt:
      'The Overview streams chart with a peak-event marker opened — a tooltip names the cause: a New Music Friday refresh that re-added “Neon Tides” to the editorial list',
    crop: { x: 0, y: 0, w: 1, h: 1 },
  },
  {
    id: 'decision-metrics',
    pain: { no: '03', name: 'App-hopping' },
    headline: 'Switch the question, not the app',
    line: 'Streams, listeners, saves, followers; a day out to a lifetime. Every combination redraws in place on the same axis — no second tab, no export, nothing left to stitch together afterwards.',
    src: asset('/video/solution-metrics-poster.jpg'),
    video: asset('/video/solution-metrics.mp4'),
    srcW: 3456,
    srcH: 2160,
    cropAlt:
      'The Overview chart redrawing in place: the metric switches from streams to listeners, then the range from one month to one week and out to lifetime — the same chart answering each question',
    crop: { x: 0, y: 0, w: 1, h: 1 },
  },
  {
    id: 'decision-waveform',
    pain: { no: '04', name: 'The fan moment, unseen' },
    headline: 'The waveform shows where listeners decide',
    line: 'The moment a fan commits was previously a guess. Skip and save clusters now land on the track’s own timeline: a 9% drop-off before the first chorus, 17% saving it once they hear it.',
    src: asset('/video/solution-waveform-poster.jpg'),
    video: asset('/video/solution-waveform.mp4'),
    srcW: 3456,
    srcH: 1944,
    cropAlt:
      'The engagement waveform playing — a red “9% skipped here” cluster near 1:00 and a green “Chorus — 17% saved” cluster past 2:00',
    crop: { x: 0, y: 0, w: 1, h: 1 },
  },
]

export function DecisionsSlide() {
  return (
    <div className="decisions">
      <div className="container">
        <ChapterHeader
          no="10"
          title="How the design answers the pain"
          lede="Four of the five research pains close inside the product — one design call each, cropped to the pixels that carry it. The fifth, comparison by hand, was hard enough to earn its own chapter."
        />
      </div>

      <div className="decisions__list">
        {DECISIONS.map((d, i) => (
          <article
            key={d.id}
            className={[
              'decisions__item',
              d.wide ? 'decisions__item--wide' : '',
              !d.wide && i % 2 ? 'decisions__item--flip' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            aria-labelledby={`${d.id}-title`}
          >
            <div className="container container--wide decisions__grid">
              <Reveal standalone className="decisions__text" amount={0.4}>
                <p className="decisions__pain">
                  <span className="decisions__pain-no tnum">
                    Pain {d.pain.no}
                  </span>
                  <span className="decisions__pain-name">{d.pain.name}</span>
                </p>
                <h3 className="decisions__headline" id={`${d.id}-title`}>
                  {d.headline}
                </h3>
                <p className="decisions__line">{d.line}</p>
              </Reveal>

              <Reveal standalone className="decisions__evidence" amount={0.35}>
                <DecisionFigure
                  src={d.src}
                  alt={d.cropAlt}
                  crop={d.crop}
                  marker={d.marker}
                  srcW={d.srcW}
                  srcH={d.srcH}
                  video={d.video}
                />
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
