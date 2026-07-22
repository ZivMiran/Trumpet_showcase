import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './ResearchSlide.css'

/**
 * 03 — Research & pain points. The five recurring pains from the field study
 * on the left; the qualitative and quantitative evidence behind them on the
 * right. Every pain is backed: quotes cover app-hopping and buried data; the
 * survey figures cover simplicity, the fan moment, and comparison.
 * Source: 6 in-person interviews + 14 survey responses, independent artists.
 */
const PAINS = [
  {
    name: 'Overwhelm over simplicity',
    line: 'Dense text and dry tables intimidate more than they inform.',
  },
  {
    name: 'Buried data',
    line: 'The numbers that matter sit several clicks deep.',
  },
  {
    name: 'App-hopping',
    line: 'Time and focus lost jumping across five platforms.',
  },
  {
    name: 'The fan moment, unseen',
    line: 'No way to pinpoint where a listener commits — the like, the save.',
  },
  {
    name: 'Comparison by hand',
    line: 'Measuring a new release against past ones means manual math.',
  },
]

const STATS = [
  { value: '91%', label: 'want an insight sentence over raw numbers' },
  { value: '84%', label: 'need to compare releases side by side' },
  { value: '58%', label: 'name save rate their top success metric' },
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

export function ResearchSlide() {
  return (
    <div className="container research-slide">
      <ChapterHeader
        no="03"
        title="What the research kept saying"
        lede="Six in-person interviews and fourteen survey responses with independent artists — distilled to five recurring pain points."
      />

      <div className="research-slide__grid">
        <div className="research-slide__col">
          <span className="research-slide__col-label">The pain points</span>
          <RevealGroup as="ol" className="research-slide__pains" stagger={0.08} amount={0.4}>
            {PAINS.map((p, i) => (
              <Reveal as="li" className="research-slide__pain" key={p.name}>
                <span className="research-slide__pain-no tnum" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="research-slide__pain-body">
                  <h3 className="research-slide__pain-name">{p.name}</h3>
                  <p className="research-slide__pain-line">{p.line}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>

        <div className="research-slide__col">
          <span className="research-slide__col-label">The evidence</span>

          <div className="research-slide__stats">
            {STATS.map((s) => (
              <div className="research-slide__stat" key={s.value}>
                <span className="research-slide__stat-value tnum">{s.value}</span>
                <span className="research-slide__stat-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="research-slide__quotes">
            {QUOTES.map((q) => (
              <figure className="research-slide__quote" key={q.text.slice(0, 16)}>
                <blockquote>{q.text}</blockquote>
                <figcaption>— {q.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
