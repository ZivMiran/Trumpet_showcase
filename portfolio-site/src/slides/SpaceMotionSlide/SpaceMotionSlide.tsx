import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import '../PaletteTypeSlide/dsys.css'

/**
 * 12 — Visual language, part two: the 8pt spacing scale, motion as three
 * numbers, and exactly ONE component rebuilt from the tokens.
 */
const SPACE_STEPS = [4, 8, 12, 16, 24, 32, 48, 64, 96]

export function SpaceMotionSlide() {
  return (
    <div className="container">
      <ChapterHeader
        no="12"
        title="Few numbers, held"
        lede="Space, motion and components all draw from the same short list of values."
      />

      <Reveal standalone className="dsys__block" amount={0.3}>
        <h3 className="dsys__block-title">Space — an 8-point rhythm, end to end</h3>
        <div className="dsys__scale" aria-label="Spacing scale, base-8">
          {SPACE_STEPS.map((s) => (
            <span className="dsys__tick" key={s}>
              <i style={{ width: `${s}px` }} />
              <span className="tnum">{s}</span>
            </span>
          ))}
        </div>
        <p className="dsys__motion">
          Motion holds three durations —
          <span className="tnum"> 100 / 150 / 250&nbsp;ms</span> — on one
          ease-out curve. Feedback is instant; decoration is not on the
          palette.
        </p>
      </Reveal>

      <Reveal standalone className="dsys__block" amount={0.3}>
        <h3 className="dsys__block-title">Specimen — a stat card, from tokens</h3>
        <div className="dsys__specimen">
          <div className="dsys__stat" aria-hidden="true">
            <span className="dsys__stat-label">Streams</span>
            <span className="dsys__stat-value tnum">5.4M</span>
            <span className="dsys__stat-delta tnum">▲ +6.4% vs last month</span>
          </div>
          <p className="dsys__specimen-note">
            Built from the same tokens as this page — surface{' '}
            <span className="tnum">#1d1f23</span>, 8pt padding steps, semibold
            tabular value, one accent nowhere in sight until it earns it.
          </p>
        </div>
      </Reveal>
    </div>
  )
}
