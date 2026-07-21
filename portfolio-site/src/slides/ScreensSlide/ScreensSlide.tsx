import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { SlideSequence, type SeqFrame } from '../shared/SlideSequence'
import { SCREENS, SCREEN_W, SCREEN_H } from '../../lib/screens'

/**
 * 13 — The screens. The polished happy path, ordered as a use story: the
 * daily check-in, the catalog, one track opened, the audience behind it.
 * Scroll dissolves one screen into the next through a single frame.
 */
const FRAMES: SeqFrame[] = [
  {
    src: SCREENS.overview,
    alt: 'Trumpet Overview — insight banner, five KPIs, streams chart, revenue by platform',
    caption: 'Overview — the daily check-in. The pulse banner answers before the charts do.',
    width: SCREEN_W,
    height: SCREEN_H,
  },
  {
    src: SCREENS.music,
    alt: 'Trumpet Music — top performing tracks over a sortable catalog table',
    caption: 'Music — the catalog, ranked. This week’s movers float above the full table.',
    width: SCREEN_W,
    height: SCREEN_H,
  },
  {
    src: SCREENS.trackDrawer,
    alt: 'Trumpet track detail drawer — engagement waveform with skip and save clusters',
    caption: 'Track detail — one click deep. The waveform shows where listeners decide.',
    width: SCREEN_W,
    height: SCREEN_H,
  },
  {
    src: SCREENS.audience,
    alt: 'Trumpet Audience — world listeners map, top tracks, top cities, gender split',
    caption: 'Audience — who’s listening, and where. The density map ends the guesswork.',
    width: SCREEN_W,
    height: SCREEN_H,
  },
]

export function ScreensSlide() {
  return (
    <>
      <div className="container">
        <ChapterHeader
          no="10"
          title="The happy path, in full fidelity"
          lede="Four screens, one working session. Scroll to walk it."
        />
      </div>
      <SlideSequence frames={FRAMES} ratio="1440 / 1024" />
    </>
  )
}
