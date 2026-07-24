import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import {
  DecisionFigure,
  type CropBox,
} from '../../components/shared/DecisionFigure'
import { SCREENS, DETAILS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import { asset } from '../../lib/asset'
import './DecisionsSlide.css'

/**
 * 10 — How the design answers the pain (the Solution deliverable), shown as
 * annotated decisions where they live. Each entry leads with one
 * design call, shows it close-up in the real UI, and keeps the full screen as
 * a dim contextual thumbnail. The gentle snap centers each entry as scroll
 * passes through — four beats inside one slide.
 *
 * Two kinds of evidence: pre-cropped HQ detail captures (shown whole, with
 * their own `srcW/srcH`) and CSS crops of a 16:9 full screen (crop box + marker
 * as fractions of that screen, tuned visually).
 */
type Decision = {
  id: string
  headline: string
  line: string
  /** The research pain this decision closes, when it maps to one directly. */
  answers?: string
  src: string
  cropAlt: string
  crop: CropBox
  marker?: { x: number; y: number }
  /** Natural size of `src` when it isn't a 16:9 full screen. */
  srcW?: number
  srcH?: number
  /** A pre-framed screen recording shown in place of the still crop. */
  video?: string
  context: { src: string; alt: string; label: string }
}

const DECISIONS: Decision[] = [
  {
    id: 'decision-sentence',
    headline: 'Open with a sentence, not a chart',
    line: 'The pulse banner turns the week’s most important change into plain language — the reader gets the answer before the evidence.',
    answers: 'Overwhelm over simplicity',
    src: DETAILS.insightBanner.src,
    srcW: DETAILS.insightBanner.w,
    srcH: DETAILS.insightBanner.h,
    cropAlt:
      'Close-up of the Overview pulse banner: “Your audience in Germany grew 12% this week on algorithmic playlists.”',
    crop: { x: 0, y: 0, w: 1, h: 1 },
    context: {
      src: SCREENS.overview,
      alt: 'Trumpet Overview screen, full view',
      label: 'Overview — full screen',
    },
  },
  {
    id: 'decision-peaks',
    headline: 'Spikes arrive with their reason attached',
    line: 'Peak-event markers sit on the curve itself — open one and the cause is right there: a New Music Friday refresh, not an anonymous bump to decode.',
    src: asset('/video/solution-peak-poster.jpg'),
    video: asset('/video/solution-peak.mp4'),
    srcW: 3456,
    srcH: 2160,
    cropAlt:
      'The Overview streams chart with a peak-event marker opened — a tooltip names the cause: a New Music Friday refresh that re-added “Neon Tides” to the editorial list',
    crop: { x: 0, y: 0, w: 1, h: 1 },
    context: {
      src: SCREENS.overview,
      alt: 'Trumpet Overview screen, full view',
      label: 'Overview — full screen',
    },
  },
  {
    id: 'decision-switcher',
    headline: 'Switching artists never leaves the page',
    line: 'Managers juggle rosters. The account switcher lives where the identity lives — bottom of the sidebar, one click, whole workspace swaps.',
    src: DETAILS.artistSwitch.src,
    srcW: DETAILS.artistSwitch.w,
    srcH: DETAILS.artistSwitch.h,
    cropAlt:
      'Close-up of the artist switcher popover: Echo Theory selected, Nova Reign below, add-account and log-out actions',
    crop: { x: 0, y: 0, w: 1, h: 1 },
    context: {
      src: SCREENS.overview,
      alt: 'Trumpet Overview screen, full view — the account switcher lives at the foot of the sidebar',
      label: 'Overview — sidebar foot',
    },
  },
  {
    id: 'decision-waveform',
    headline: 'The waveform shows where listeners decide',
    line: 'Skip and save clusters land on the track’s own timeline — down to the chorus that earns the replay.',
    answers: 'The fan moment, unseen',
    src: asset('/video/solution-waveform-poster.jpg'),
    video: asset('/video/solution-waveform.mp4'),
    srcW: 3456,
    srcH: 1944,
    cropAlt:
      'The engagement waveform playing — a red “9% skipped here” cluster near 1:00 and a green “Chorus — 17% saved” cluster past 2:00',
    crop: { x: 0, y: 0, w: 1, h: 1 },
    context: {
      src: SCREENS.trackDrawer,
      alt: 'Trumpet Music screen with the track detail drawer open, full view',
      label: 'Track detail — full screen',
    },
  },
]

export function DecisionsSlide() {
  return (
    <div className="decisions">
      <div className="container">
        <ChapterHeader
          no="10"
          title="How the design answers the pain"
          lede="The solution, shown where it lives — each decision cropped to the pixels that carry it. The calls that close a research pain directly are tagged."
        />
      </div>

      <div className="decisions__list">
        {DECISIONS.map((d, i) => (
          <article
            key={d.id}
            className={`decisions__item${i % 2 ? ' decisions__item--flip' : ''}`}
            aria-labelledby={`${d.id}-title`}
          >
            <div className="container container--wide decisions__grid">
              <Reveal standalone className="decisions__text" amount={0.4}>
                <span className="decisions__no tnum">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="decisions__headline" id={`${d.id}-title`}>
                  {d.headline}
                </h3>
                <p className="decisions__line">{d.line}</p>
                {d.answers && (
                  <p className="decisions__answers">
                    <span className="decisions__answers-label">Answers</span>
                    <span className="decisions__answers-pain">{d.answers}</span>
                  </p>
                )}
                <figure className="decisions__context">
                  <img
                    src={d.context.src}
                    alt={d.context.alt}
                    width={SCREEN_W}
                    height={SCREEN_H}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{d.context.label}</figcaption>
                </figure>
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
