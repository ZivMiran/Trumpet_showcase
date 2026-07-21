import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './dsys.css'

/**
 * 09 — Visual language. The whole design system as a balanced bento: palette
 * and type share the top row; a live component — the exact Overview KPI card,
 * reproduced from the prototype's own values (Trumpet_dashboard_source
 * KpiRibbon) — spans the bottom. Values mirror src/styles/tokens.css.
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

// The Streams glyph, lifted verbatim from the prototype's KpiRibbon.
const StreamsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 10v3" />
    <path d="M6 6v11" />
    <path d="M10 3v18" />
    <path d="M14 8v7" />
    <path d="M18 5v13" />
    <path d="M22 10v3" />
  </svg>
)

export function VisualLanguageSlide() {
  return (
    <div className="container dsys">
      <ChapterHeader
        no="09"
        title="One system under every screen"
        lede="One typeface, three colors, one component logic — the same tokens across the dashboard, the prototype, and this deck."
      />

      <Reveal standalone className="dsys__bento" amount={0.25}>
        {/* Palette — top left. */}
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

        {/* Component — full-width footer. The real KPI card. */}
        <section className="dsys__card dsys__card--component">
          <h3 className="dsys__card-title">Component — the Overview KPI card, as built</h3>
          <div className="dsys__specimen">
            <div className="dsys-kpi" aria-label="Streams: 5.4M, up 6.4% versus last month">
              <div className="dsys-kpi__top">
                <span className="dsys-kpi__label">Streams</span>
                <span className="dsys-kpi__icon" aria-hidden="true">
                  <StreamsIcon />
                </span>
              </div>
              <div className="dsys-kpi__value">5.4M</div>
              <div className="dsys-kpi__delta-row">
                <span className="dsys-kpi__delta">▲ +6.4%</span>
                <span className="dsys-kpi__delta-label">vs last month</span>
              </div>
            </div>
            <p className="dsys__specimen-note">
              Reproduced from the prototype’s own values — <span className="tnum">#2c2e31</span>{' '}
              surface, a 300-weight value, one muted metric glyph, a single green delta.
              Every screen is assembled from parts like this.
            </p>
          </div>
        </section>
      </Reveal>
    </div>
  )
}
