import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './Process.css'

/**
 * 04 / Process — real artifacts only. Each entry pairs an artifact with one
 * line on what changed and why. Entries without a `src` render as clearly
 * labeled placeholder slots; wire the user's images in as they arrive by
 * filling `src` (drop files into public/process/).
 */
type Artifact = {
  src?: string
  alt?: string
  title: string
  note: string
}

const ARTIFACTS: Artifact[] = [
  {
    // src: '/process/wireframe-overview.png',
    title: 'Early structure',
    note: 'Artifact incoming — what the first pass got wrong, and what survived.',
  },
  {
    // src: '/process/compare-iteration.png',
    title: 'Compare, before it worked',
    note: 'Artifact incoming — the iteration that led to day-one alignment.',
  },
]

export function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="container">
        <ChapterHeader
          no="04"
          title="The finished screens hide the arguments"
          lede="A few artifacts from getting there — what changed between versions, and why."
        />

        <div className="process__grid">
          {ARTIFACTS.map((a) => (
            <Reveal standalone as="figure" className="process__item" key={a.title} amount={0.3}>
              {a.src ? (
                <div className="process__media">
                  <img src={a.src} alt={a.alt ?? a.title} loading="lazy" decoding="async" />
                </div>
              ) : (
                <div className="process__media process__media--pending" aria-hidden="true">
                  <span>Artifact incoming</span>
                </div>
              )}
              <figcaption className="process__caption">
                <span className="process__title">{a.title}</span>
                <p className="process__note">{a.note}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
