import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './dsys.css'

/**
 * 09 — Visual language. The whole design system as a bento: palette, type, and
 * a live component, each in its own panel. Values mirrored manually from
 * src/styles/tokens.css (which mirrors the dashboard's own tokens).
 */
const COLORS = [
  {
    hex: '#16171a',
    name: 'Charcoal',
    role: 'Surface',
    rule: 'Every layer sits on it. Depth comes from brightened variants, not shadows.',
    contrast: null as string | null,
  },
  {
    hex: '#f0ede5',
    name: 'Warm off-white',
    role: 'Text',
    rule: 'All copy and values — warmth over pure-white glare.',
    contrast: '15.3:1 — AAA',
  },
  {
    hex: '#e3b53a',
    name: 'Brass gold',
    role: 'Accent',
    rule: 'Annotation and action only. Never body text.',
    contrast: '9.3:1 — AAA',
  },
]

const WEIGHTS = [
  { fw: 300, label: 'Light 300', sample: 'Display statements' },
  { fw: 400, label: 'Regular 400', sample: 'Body copy, 16px, 1.5 line height' },
  { fw: 500, label: 'Medium 500', sample: 'Headlines and labels' },
  { fw: 600, label: 'Semibold 600', sample: 'KPI values that win the glance' },
]

export function VisualLanguageSlide() {
  return (
    <div className="container">
      <ChapterHeader
        no="09"
        title="One system under every screen"
        lede="One typeface, three colors, one component logic — the same tokens across the dashboard, the prototype, and this deck."
      />

      <Reveal standalone className="dsys__bento" amount={0.25}>
        {/* Palette — the tall panel on the left. */}
        <section className="dsys__card dsys__card--palette">
          <h3 className="dsys__card-title">Palette — three colors, measured</h3>
          <div className="dsys__colors">
            {COLORS.map((c) => (
              <div className="dsys__color" key={c.hex}>
                <span className="dsys__swatch" style={{ background: c.hex }} aria-hidden="true" />
                <div className="dsys__color-spec">
                  <p className="dsys__color-head">
                    <span className="dsys__color-name">{c.name}</span>
                    <span className="dsys__color-hex tnum">{c.hex}</span>
                    <span className="dsys__color-role">{c.role}</span>
                  </p>
                  <p className="dsys__color-rule">{c.rule}</p>
                  {c.contrast && <p className="dsys__color-contrast tnum">{c.contrast}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type — top right. */}
        <section className="dsys__card dsys__card--type">
          <h3 className="dsys__card-title">Type — one family, Space Grotesk</h3>
          <div className="dsys__type">
            {WEIGHTS.map((w) => (
              <p className="dsys__weight" style={{ fontWeight: w.fw }} key={w.fw}>
                <span className="dsys__weight-label tnum">{w.label}</span>
                {w.sample}
              </p>
            ))}
            <p className="dsys__tnum-demo">
              <span className="dsys__weight-label">Tabular</span>
              <span className="tnum">5.4M → 5.5M — columns never move.</span>
            </p>
          </div>
        </section>

        {/* Component — bottom right, a live sample. */}
        <section className="dsys__card dsys__card--component">
          <h3 className="dsys__card-title">Component — a stat card, from tokens</h3>
          <div className="dsys__specimen">
            <div className="dsys__stat" aria-hidden="true">
              <span className="dsys__stat-label">Streams</span>
              <span className="dsys__stat-value tnum">5.4M</span>
              <span className="dsys__stat-delta tnum">▲ +6.4% vs last month</span>
            </div>
            <p className="dsys__specimen-note">
              Surface <span className="tnum">#1d1f23</span>, 8-point padding, a
              semibold tabular value, one accent held in reserve. Every screen is
              built from parts like this.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
