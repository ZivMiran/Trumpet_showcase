import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './ResearchSlide.css'

/**
 * 03 — Research & the problem. Opens with the thesis the research kept
 * returning, then the three core pain points and the evidence behind them:
 * verbatim interview quotes and survey figures from 6 in-person interviews
 * and 14 survey responses with independent artists.
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

const QUOTES = [
  {
    text: 'Switching between apps is an exhausting ritual. In the end I still have to pull it all together by hand in Excel — a waste of time on pure logistics.',
    who: 'Independent artist',
  },
  {
    text: 'I feel like I have to dig through menus before I even reach the data that actually matters.',
    who: 'Independent artist',
  },
]

const STATS = [
  { value: '91%', label: 'want an insight sentence that explains the raw numbers' },
  { value: '84%', label: 'need to compare releases side by side' },
  { value: '50%', label: 'can’t explain a sudden jump in their own charts' },
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
            {QUOTES.map((q) => (
              <figure className="research-slide__quote" key={q.who + q.text.slice(0, 12)}>
                <blockquote>“{q.text}”</blockquote>
                <figcaption>— {q.who}</figcaption>
              </figure>
            ))}
          </div>

          <div className="research-slide__stats">
            {STATS.map((s) => (
              <div className="research-slide__stat" key={s.value}>
                <span className="research-slide__stat-value tnum">{s.value}</span>
                <span className="research-slide__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="research-slide__method">
            6 in-person interviews · 14 survey responses · all independent artists
          </p>
        </Reveal>
      </div>
    </div>
  )
}
