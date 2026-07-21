import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import {
  DecisionFigure,
  type CropBox,
} from '../../components/shared/DecisionFigure'
import { SCREENS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import './DecisionsSlide.css'

/**
 * 11 — The decisions, annotated where they live. Each entry leads with one
 * design call, shows it close-up in the real UI, and keeps the full screen as
 * a dim contextual thumbnail. The gentle snap centers each entry as scroll
 * passes through — four beats inside one slide. Crop boxes and marker
 * positions are fractions of the 1440×1024 mockups, tuned visually.
 */
type Decision = {
  id: string
  headline: string
  line: string
  src: string
  cropAlt: string
  crop: CropBox
  marker?: { x: number; y: number }
  context: { src: string; alt: string; label: string }
}

const DECISIONS: Decision[] = [
  {
    id: 'decision-sentence',
    headline: 'Open with a sentence, not a chart',
    line: 'The pulse banner turns the week’s most important change into plain language — the reader gets the answer before the evidence.',
    src: SCREENS.overview,
    cropAlt:
      'Close-up of the Overview pulse banner: “Your audience in Germany grew 12% this week on algorithmic playlists.”',
    crop: { x: 0.17, y: 0.095, w: 0.63, h: 0.135 },
    marker: { x: 0.08, y: 0.52 },
    context: {
      src: SCREENS.overview,
      alt: 'Trumpet Overview screen, full view',
      label: 'Overview — full screen',
    },
  },
  {
    id: 'decision-peaks',
    headline: 'Spikes arrive with their reason attached',
    line: 'Peak-event markers sit on the curve itself — “a TikTok clip drove the jump,” not an anonymous bump to decode.',
    src: SCREENS.overview,
    cropAlt:
      'Close-up of the Overview streams chart with a peak-event marker pinned to the spike and the average line tag',
    crop: { x: 0.31, y: 0.46, w: 0.38, h: 0.32 },
    marker: { x: 0.58, y: 0.42 },
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
    src: SCREENS.overviewArtistSwitcher,
    cropAlt:
      'Close-up of the artist switcher popover: Echo Theory selected, Nova Reign below, add-account and log-out actions',
    crop: { x: 0.005, y: 0.6, w: 0.245, h: 0.34 },
    marker: { x: 0.85, y: 0.3 },
    context: {
      src: SCREENS.overviewArtistSwitcher,
      alt: 'Trumpet Overview with the artist switcher open, full view',
      label: 'Overview — switcher open',
    },
  },
  {
    id: 'decision-waveform',
    headline: 'The waveform shows where listeners decide',
    line: 'Skip and save clusters land on the track’s own timeline — down to the chorus that earns the replay.',
    src: SCREENS.trackDrawer,
    cropAlt:
      'Close-up of the engagement waveform: a red skip cluster at 1:00, a green “Chorus — 13% saved” cluster at 2:00',
    crop: { x: 0.495, y: 0.5, w: 0.49, h: 0.31 },
    marker: { x: 0.58, y: 0.28 },
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
          no="11"
          title="Four decisions, shown where they live"
          lede="Not a screen tour. Each call is cropped to the pixels that carry it — the full screen stays in the margin, for context."
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
                />
              </Reveal>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
