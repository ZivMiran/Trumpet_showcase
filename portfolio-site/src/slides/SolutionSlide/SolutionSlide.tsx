import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './SolutionSlide.css'

/**
 * 06 — The solution. Each research pain answered by a named design decision —
 * stated as three tight pairs, before any screen is shown. The screens
 * themselves follow as chapters 13–15; this slide is the argument.
 */
const ANSWERS = [
  {
    pain: 'The memory trap',
    answer: 'Every release keeps its record.',
    line: 'Compare aligns any two release histories to the same day one — “last time” becomes a measurable baseline, not a feeling.',
  },
  {
    pain: 'Blind data',
    answer: 'One aggregation layer, one vocabulary.',
    line: 'Streams, saves, followers and revenue from every platform, reconciled into a single home with a single set of definitions.',
  },
  {
    pain: 'The moment passes',
    answer: 'The dashboard opens with the answer.',
    line: 'The pulse banner leads with what changed and why — the spike finds the artist while it can still be acted on.',
  },
]

export function SolutionSlide() {
  return (
    <div className="container">
      <ChapterHeader
        no="05"
        title="Three pains, three design answers"
        lede="The shape of the product is the research inverted — each pain point maps to one structural decision."
      />

      <RevealGroup className="solution-slide__rows" stagger={0.12} amount={0.35}>
        {ANSWERS.map((a) => (
          <Reveal className="solution-slide__row" key={a.pain}>
            <span className="solution-slide__pain">{a.pain}</span>
            <span className="solution-slide__arrow" aria-hidden="true" />
            <div className="solution-slide__answer">
              <h3>{a.answer}</h3>
              <p>{a.line}</p>
            </div>
          </Reveal>
        ))}
      </RevealGroup>
    </div>
  )
}
