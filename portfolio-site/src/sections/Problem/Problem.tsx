import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './Problem.css'

/**
 * 01 / The problem — short editorial, no cards. One pull-quote carries the
 * insight; three lines of brief carry the evidence; one typographic figure
 * closes it. The whole chapter should read in under twenty seconds.
 */
export function Problem() {
  return (
    <section className="problem" id="problem" aria-labelledby="problem-title">
      <div className="container">
        <ChapterHeader no="01" title="The problem" />

        <Reveal standalone as="blockquote" className="problem__quote" amount={0.5}>
          <p id="problem-title">
            Artists don’t lack data. They lack the place where data becomes a
            decision.
          </p>
        </Reveal>

        <Reveal standalone className="problem__brief" amount={0.5}>
          <p>
            The research kept returning the same picture: five platform
            dashboards, each speaking its own language; a spreadsheet trying to
            reconcile them; and release decisions made from memory. By the time
            a spike was noticed, the moment to act on it had passed.
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
    </section>
  )
}
