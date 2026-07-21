import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { SlideSequence, type SeqFrame } from '../shared/SlideSequence'
import { PROCESS, SCREEN_W, SCREEN_H } from '../../lib/screens'

/**
 * 08 — Wireframes. The lo-fi passes, cropped to the content region where the
 * fundamental layout bets live (the persistent sidebar is covered by the flow
 * slide). Each caption names the structural decision the frame committed to.
 */
const CONTENT_CROP = { x: 0.152, y: 0, w: 0.848, h: 1 }
// 1440 × 0.848 ≈ 1221 — the cropped region's aspect.
const CROP_RATIO = `${Math.round(SCREEN_W * CONTENT_CROP.w)} / ${SCREEN_H}`

const FRAMES: SeqFrame[] = [
  {
    src: PROCESS.overviewWireframe,
    alt: 'Lo-fi Overview wireframe — insight banner over five KPI cards and a streams chart',
    caption:
      'Overview, lo-fi — the answer-first banner and the five KPIs were committed before any styling.',
    width: SCREEN_W,
    height: SCREEN_H,
    crop: CONTENT_CROP,
  },
  {
    src: PROCESS.trackDrawerWireframe,
    alt: 'Lo-fi track detail wireframe — a drawer over the catalog with a retention chart',
    caption:
      'Track detail, lo-fi — retention framed as a waveform was the first sketch’s bet, and it held.',
    width: SCREEN_W,
    height: SCREEN_H,
    crop: CONTENT_CROP,
  },
  {
    src: PROCESS.audienceWireframe,
    alt: 'Lo-fi Audience wireframe — a bubble map of listeners with source and city rankings',
    caption:
      'Audience, lo-fi — a bubble map ranked cities by circle size. It didn’t survive testing.',
    width: SCREEN_W,
    height: SCREEN_H,
    crop: CONTENT_CROP,
  },
]

export function WireframesSlide() {
  return (
    <>
      <div className="container">
        <ChapterHeader
          no="07"
          title="The layout, before the paint"
          lede="Three lo-fi frames carry every structural decision the final screens stand on."
        />
      </div>
      <SlideSequence frames={FRAMES} ratio={CROP_RATIO} />
    </>
  )
}
