import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { PendingSlot } from '../../components/shared/PendingSlot'
import './ResearchSlide.css'

/**
 * 04 — Research. The core pain points distilled on the left; the evidence
 * that produced them on the right. The evidence slots are designed vacancies
 * — shaped to receive the real interview quotes and survey numbers, which
 * drop in without touching the layout.
 */
const PAINS = [
  {
    name: 'The memory trap',
    line: 'Release decisions are made from recall — “last time this worked” — because no record exists to check against.',
  },
  {
    name: 'Blind data',
    line: 'Five dashboards, five vocabularies. The cross-platform total — the number that matters — exists nowhere.',
  },
  {
    name: 'The moment passes',
    line: 'Spikes surface days late, in a weekly spreadsheet session. The window to act closes before the artist knows it opened.',
  },
]

export function ResearchSlide() {
  return (
    <div className="container">
      <ChapterHeader
        no="04"
        title="What the research kept saying"
        lede="Interviews and a survey with independent artists and managers — distilled to three pain points that shaped every screen."
      />

      <div className="research-slide__grid">
        <RevealGroup className="research-slide__pains" stagger={0.1} amount={0.4}>
          {PAINS.map((p, i) => (
            <Reveal className="research-slide__pain" key={p.name}>
              <span className="research-slide__pain-no tnum">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="research-slide__pain-name">{p.name}</h3>
              <p className="research-slide__pain-line">{p.line}</p>
            </Reveal>
          ))}
        </RevealGroup>

        <Reveal standalone className="research-slide__evidence" amount={0.3}>
          <div className="research-slide__quotes">
            <PendingSlot kind="quote" label="Interview quote — pending" note="— participant __" />
            <PendingSlot kind="quote" label="Interview quote — pending" note="— participant __" />
          </div>
          <div className="research-slide__stats">
            <PendingSlot kind="stat" label="N = __ respondents" />
            <PendingSlot kind="stat" label="__ % track manually" />
          </div>
          <p className="research-slide__method">
            Method — interviews · n = __ &nbsp;·&nbsp; survey · n = __
          </p>
        </Reveal>
      </div>
    </div>
  )
}
