import { Reveal, RevealGroup } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { asset } from '../../lib/asset'
import './BrandingSlide.css'

/**
 * 07 — Branding. A specimen sheet, not an essay: the lockup large on the
 * brand's own dot plate, the two secondary forms beside it, and the size ramp
 * underneath. One micro-label per cell and no body copy anywhere — the
 * artwork is the argument, and slide 08 is where the system gets explained.
 */

const RAMP = [64, 40, 32, 24] as const
/** The size the tile runs at in the product sidebar — where it is seen most. */
const SHIPPED = 32

export function BrandingSlide() {
  return (
    <div className="container brand">
      <ChapterHeader
        no="07"
        title="Branding"
        lede="One shape, three forms, one gold — down to the 32-pixel tile in the sidebar."
      />

      <RevealGroup className="brand__sheet" amount={0.25} stagger={0.07}>
        <Reveal className="brand__cell brand__cell--hero">
          <span className="brand__label">Primary lockup</span>
          <img
            className="brand__art brand__art--lockup"
            src={asset('/images/brand/lockup.svg')}
            alt="The Trumpet lockup — the gold mark on a charcoal tile beside the wordmark"
            width={733}
            height={233}
          />
        </Reveal>

        {/* The mark bare, not on its tile — the tile already carries the hero
            lockup and every step of the ramp. */}
        <Reveal className="brand__cell brand__cell--mark">
          <span className="brand__label">Mark</span>
          <img
            className="brand__art brand__art--mark"
            src={asset('/images/brand/mark.svg')}
            alt="The Trumpet mark — a trumpet in brass gold, tilted upward"
            width={200}
            height={200}
          />
        </Reveal>

        <Reveal className="brand__cell brand__cell--word">
          <span className="brand__label">Wordmark</span>
          <img
            className="brand__art brand__art--word"
            src={asset('/images/brand/wordmark.svg')}
            alt="The Trumpet wordmark, set in Space Grotesk"
            width={485}
            height={153}
          />
        </Reveal>

        <Reveal className="brand__cell brand__cell--scale">
          <span className="brand__label">Scale</span>
          <ul className="brand__ramp">
            {RAMP.map((s) => (
              <li
                className={`brand__step${s === SHIPPED ? ' brand__step--shipped' : ''}`}
                key={s}
              >
                <img
                  src={asset('/images/brand/icon.svg')}
                  alt=""
                  aria-hidden="true"
                  width={s}
                  height={s}
                />
                <span className="brand__step-size tnum">{s}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </RevealGroup>
    </div>
  )
}
