import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './ProblemSlide.css'

/**
 * 03 — The problem. Short editorial, no cards. One pull-quote carries the
 * insight; three lines of brief carry the evidence; one typographic figure
 * closes it. The whole slide should read in under twenty seconds.
 */
export function ProblemSlide() {
  return (
    <div className="container">
      <ChapterHeader no="03" title="The problem" />

      <Reveal standalone as="blockquote" className="problem__quote" amount={0.5}>
        <p id="problem-title">
          Artists don&rsquo;t lack data. They lack the place where data becomes
          a decision.
        </p>
      </Reveal>

      <Reveal standalone className="problem__brief" amount={0.5}>
        <p>
          The research kept returning the same picture: five platform
          dashboards, each speaking its own language; a spreadsheet trying to
          reconcile them; and release decisions made from memory. By the time a
          spike was noticed, the moment to act on it had passed.
        </p>
      </Reveal>

      <Reveal standalone className="problem__figure" amount={0.5}>
        <span className="tnum">5</span> dashboards
        <span className="problem__sep" aria-hidden="true" />
        <span className="tnum">1</span> spreadsheet
        <span className="problem__sep" aria-hidden="true" />
        <span className="tnum">0</span> answers
      </Reveal>
    </div>
  )
}
