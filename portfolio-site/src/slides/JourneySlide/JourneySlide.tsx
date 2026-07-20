import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { PendingSlot } from '../../components/shared/PendingSlot'
import './JourneySlide.css'

/**
 * 05 — User journey. A five-frame storyboard template: one release week,
 * before Trumpet. The frames are designed vacancies — each names the scene
 * that belongs in it (scene / action / feeling), ready to receive the drawn
 * storyboard without layout changes.
 */
const FRAMES = [
  'Frame 1 — release day, checking the first platform',
  'Frame 2 — five dashboards open, numbers disagree',
  'Frame 3 — the spreadsheet session, late at night',
  'Frame 4 — a spike noticed three days too late',
  'Frame 5 — the next release, planned from memory',
]

export function JourneySlide() {
  return (
    <div className="container container--wide journey-slide">
      <div className="container journey-slide__head">
        <ChapterHeader
          no="05"
          title="One release week, before Trumpet"
          lede="The storyboard maps when, where and why the artist opens their analytics — and where the frustration compounds."
        />
      </div>

      <RevealGroup className="journey-slide__frames" stagger={0.08} amount={0.25}>
        {FRAMES.map((label, i) => (
          <Reveal className="journey-slide__frame" key={label}>
            <span className="journey-slide__frame-no tnum">
              {String(i + 1).padStart(2, '0')}
            </span>
            <PendingSlot
              kind="frame"
              label="Storyboard scene — pending"
              aspect="16 / 12"
              note={label.replace(/^Frame \d — /, 'scene / action / feeling: ')}
            />
          </Reveal>
        ))}
      </RevealGroup>
    </div>
  )
}
