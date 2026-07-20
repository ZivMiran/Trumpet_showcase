import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './ContextSlide.css'

/**
 * 02 — Context. The detailed intro: what Trumpet is, the background it grew
 * from, and who it serves. Three tight columns of editorial copy — no cards,
 * no icons; the labels do the structuring.
 */
export function ContextSlide() {
  return (
    <div className="container">
      <ChapterHeader no="02" title="The context" />

      <RevealGroup className="context-slide__cols" stagger={0.1} amount={0.4}>
        <Reveal className="context-slide__col">
          <h3 className="context-slide__label">The product</h3>
          <p>
            Trumpet is a single dashboard that gathers streaming and social
            analytics — Spotify, Apple Music, TikTok, YouTube — into one
            noise-free home, and reads them the way an artist would ask:
            what changed, why, and what should I do next?
          </p>
        </Reveal>

        <Reveal className="context-slide__col">
          <h3 className="context-slide__label">The background</h3>
          <p>
            Every platform ships its own analytics, each scoped to its own
            walled garden. The cross-platform questions — did that TikTok clip
            drive Spotify? is this release outpacing the last one? — live in
            manually maintained spreadsheets, when they live anywhere at all.
          </p>
        </Reveal>

        <Reveal className="context-slide__col">
          <h3 className="context-slide__label">The audience</h3>
          <p>
            Independent artists reading their own numbers, and small-roster
            managers reading five artists&rsquo; numbers at once. Neither is an
            analyst; both make release decisions weekly, usually from a phone
            or between sessions.
          </p>
        </Reveal>
      </RevealGroup>
    </div>
  )
}
