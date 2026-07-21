import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { PendingSlot } from '../../components/shared/PendingSlot'
import './ResearchSlide.css'

/**
 * 03 — Research & the problem. Opens with the thesis the research kept
 * returning, made concrete by the fragmentation figure; then the three core
 * pain points and the evidence behind them. The evidence slots are designed
 * vacancies — shaped to receive the real interview quotes and survey numbers,
 * which drop in without touching the layout.
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
    <div className="container research-slide">
      <ChapterHeader no="03" title="What the research kept saying" />

      <Reveal standalone className="research-slide__statement" amount={0.4}>
        <blockquote className="research-slide__thesis">
          <p>
            Artists don’t lack data. They lack the place where data becomes a
            decision.
          </p>
        </blockquote>
      </Reveal>

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
          <span className="research-slide__evidence-label">The evidence</span>
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
