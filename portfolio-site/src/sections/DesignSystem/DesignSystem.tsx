import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './DesignSystem.css'

/**
 * 05 / The system — the tokens under everything above, spoken in spec.
 * Typography-led rows: palette with measured contrast, the type stack as a
 * live specimen, the 8pt scale, motion as three numbers, and exactly ONE
 * component rebuilt from the tokens. Values are mirrored manually from
 * src/styles/tokens.css (which mirrors the dashboard's own tokens) — keep
 * the three in sync by hand.
 */
const COLORS = [
  {
    hex: '#16171a',
    name: 'Charcoal',
    role: 'Surface',
    rule: 'Every layer of the UI sits on it — cards step up by two brightened variants, never by shadows alone.',
    contrast: null as string | null,
  },
  {
    hex: '#f0ede5',
    name: 'Warm off-white',
    role: 'Text',
    rule: 'All body copy, all values. Warmth keeps long dashboard sessions off pure-white glare.',
    contrast: '15.3:1 on charcoal — AAA',
  },
  {
    hex: '#e3b53a',
    name: 'Brass gold',
    role: 'Accent',
    rule: 'Annotation and action only: the current series, active states, one hairline per chapter. Never body text.',
    contrast: '9.3:1 on charcoal — AAA',
  },
]

const WEIGHTS = [
  { fw: 300, label: 'Light 300', sample: 'Pull quotes and display statements' },
  { fw: 400, label: 'Regular 400', sample: 'Body copy, fifteen pixels, 1.5 line height' },
  { fw: 500, label: 'Medium 500', sample: 'Headlines, labels, the working weight' },
  { fw: 600, label: 'Semibold 600', sample: 'KPI values that must win the glance' },
  { fw: 700, label: 'Bold 700', sample: 'Reserved — earned by almost nothing' },
]

const SPACE_STEPS = [4, 8, 12, 16, 24, 32, 48, 64, 96]

export function DesignSystem() {
  return (
    <section className="dsys" id="system" aria-labelledby="system-title">
      <div className="container">
        <ChapterHeader
          no="05"
          title="One system under every screen"
          lede="The same tokens drive the dashboard, the prototype, and this page. The numbers below are the spec, not a summary of it."
        />

        {/* ---- Palette ---- */}
        <Reveal standalone className="dsys__block" amount={0.3}>
          <h3 className="dsys__block-title" id="system-title">
            Palette — three colors, measured
          </h3>
          <div className="dsys__colors">
            {COLORS.map((c) => (
              <div className="dsys__color" key={c.hex}>
                <span
                  className="dsys__swatch"
                  style={{ background: c.hex }}
                  aria-hidden="true"
                />
                <div className="dsys__color-spec">
                  <p className="dsys__color-head">
                    <span className="dsys__color-name">{c.name}</span>
                    <span className="dsys__color-hex tnum">{c.hex}</span>
                    <span className="dsys__color-role">{c.role}</span>
                  </p>
                  <p className="dsys__color-rule">{c.rule}</p>
                  {c.contrast && (
                    <p className="dsys__color-contrast tnum">{c.contrast}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---- Type ---- */}
        <Reveal standalone className="dsys__block" amount={0.3}>
          <h3 className="dsys__block-title">
            Type — Space Grotesk, one family carries everything
          </h3>
          <div className="dsys__type">
            {WEIGHTS.map((w) => (
              <p
                className="dsys__weight"
                style={{ fontWeight: w.fw }}
                key={w.fw}
              >
                <span className="dsys__weight-label tnum">{w.label}</span>
                {w.sample}
              </p>
            ))}
            <p className="dsys__tnum-demo">
              <span className="dsys__weight-label">Tabular figures</span>
              <span className="tnum">
                5.4M → 5.5M — values change daily; columns never move.
              </span>
            </p>
          </div>
        </Reveal>

        {/* ---- Space & motion ---- */}
        <Reveal standalone className="dsys__block" amount={0.3}>
          <h3 className="dsys__block-title">Space &amp; motion — few numbers, held</h3>
          <div className="dsys__scale" aria-label="Spacing scale, base-8">
            {SPACE_STEPS.map((s) => (
              <span className="dsys__tick" key={s}>
                <i style={{ width: `${s}px` }} />
                <span className="tnum">{s}</span>
              </span>
            ))}
          </div>
          <p className="dsys__motion">
            An 8-point rhythm end to end. Motion holds three durations —
            <span className="tnum"> 100 / 150 / 250&nbsp;ms</span> — on one
            ease-out curve, and this page allows itself exactly four moments of
            it. Feedback is instant; decoration is not on the palette.
          </p>
        </Reveal>

        {/* ---- One specimen ---- */}
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
    </section>
  )
}
