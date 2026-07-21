import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { asset } from '../../lib/asset'
import './BrandingSlide.css'

/**
 * 10 — Branding. The mark and the wordmark, specimen-style: the lockup large,
 * the icon at app sizes, two lines of usage. No mood boards — the identity is
 * one shape and one weight of one typeface.
 */
export function BrandingSlide() {
  return (
    <div className="container">
      <ChapterHeader no="08" title="Branding" />

      <div className="branding-slide__grid">
        <Reveal standalone className="branding-slide__lockup" amount={0.4}>
          <img
            className="branding-slide__icon"
            src={asset('/images/TrumpetLogo.png')}
            alt="The Trumpet mark — a simplified brass-gold trumpet, tilted upward"
            width={200}
            height={200}
          />
          <img
            className="branding-slide__wordmark"
            src={asset('/images/TrumpetTypeLogo.png')}
            alt="The Trumpet wordmark, set in Space Grotesk"
            width={227}
            height={85}
          />
        </Reveal>

        <Reveal standalone className="branding-slide__spec" amount={0.4}>
          <div className="branding-slide__spec-row">
            <h3 className="branding-slide__label">The mark</h3>
            <p>
              A trumpet reduced to five strokes, tilted upward — the instrument
              announcing something. Brass gold, the same token that marks every
              “current release” in the data.
            </p>
          </div>
          <div className="branding-slide__spec-row">
            <h3 className="branding-slide__label">Usage</h3>
            <p>
              One color on charcoal, never outlined, never gradiented. Clear
              space equals the bell&rsquo;s height; below 24px the wordmark
              drops and the mark stands alone.
            </p>
          </div>
          <div className="branding-slide__sizes" aria-label="The app icon at product sizes">
            {[64, 40, 24].map((s) => (
              <span className="branding-slide__tile" key={s}>
                <img
                  src={asset('/images/TrumpetLogo.png')}
                  alt=""
                  aria-hidden="true"
                  width={s}
                  height={s}
                />
                <span className="tnum">{s}</span>
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
