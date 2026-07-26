import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './dsys.css'

/**
 * 08 — Design system. The whole system as a bento: the foundations across the
 * top (palette, type), then what every screen is assembled from along the
 * bottom (the Overview KPI card, the control family, the icon set). Every
 * specimen is rebuilt from the prototype's own CSS (Trumpet_dashboard_source:
 * KpiRibbon, CompareReleases, NotificationDropdown, Settings, components/icons)
 * rather than captured, so it is live and exact. Values otherwise mirror
 * src/styles/tokens.css.
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

/**
 * The button family, as the prototype builds it: one height, one radius, one
 * weight, three surfaces. Each caption names where that weight is allowed —
 * the rule is what makes it a system rather than three buttons.
 */
const BUTTONS = [
  { kind: 'primary', label: 'Choose a release', caption: 'Primary' },
  { kind: 'secondary', label: 'Streams', caption: 'Secondary', chevron: true },
  { kind: 'ghost', label: 'Log out', caption: 'Ghost' },
] as const

/**
 * The app shell's icon set, transcribed from the prototype's own
 * components/icons — one 24 grid, one 1.9 stroke, round caps and joins. Shown
 * together because consistency is the only thing an icon set has to prove.
 */
const ICONS = [
  {
    name: 'search',
    path: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },
  {
    name: 'notifications',
    path: (
      <>
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </>
    ),
  },
  {
    name: 'release',
    path: (
      <>
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </>
    ),
  },
  {
    name: 'compare',
    path: (
      <>
        <rect x="3" y="8" width="7" height="12" rx="1.5" />
        <rect x="14" y="4" width="7" height="16" rx="1.5" />
      </>
    ),
  },
  {
    name: 'export',
    path: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </>
    ),
  },
  {
    name: 'add',
    path: <path d="M12 5v14M5 12h14" />,
  },
] as const

const ChevronIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
)

/** The settings switch, at the prototype's geometry: 42×24 track, 18px knob. */
const Toggle = ({ on = false }: { on?: boolean }) => (
  <span className={`dsys-toggle${on ? ' dsys-toggle--on' : ''}`} aria-hidden="true">
    <span className="dsys-toggle__knob" />
  </span>
)

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
        no="08"
        title="Design system"
        lede="One typeface, three colors, one component logic — shared by the prototype and this presentation."
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

        {/* Bottom row — three boxes sized to what they hold, so each one is
            filled. Every specimen is live, rebuilt from the prototype's CSS
            rather than captured. */}
        <section className="dsys__card dsys__card--component">
          <h3 className="dsys__card-title">Component — KPI card</h3>
          <div className="dsys__specimens">
            <span className="dsys__spec-body">
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
            </span>
          </div>
        </section>

        <section className="dsys__card dsys__card--controls">
          <h3 className="dsys__card-title">Controls — buttons and toggles</h3>
          <div className="dsys__specimens">
            {BUTTONS.map((b) => (
              <figure className="dsys__spec" key={b.kind}>
                <span className="dsys__spec-body">
                  <span className={`dsys-btn dsys-btn--${b.kind}`}>
                    {b.label}
                    {'chevron' in b && b.chevron && <ChevronIcon />}
                  </span>
                </span>
                <figcaption>{b.caption}</figcaption>
              </figure>
            ))}

            <span className="dsys__rule" aria-hidden="true" />

            <figure className="dsys__spec">
              <span className="dsys__spec-body">
                <Toggle on />
              </span>
              <figcaption>On</figcaption>
            </figure>
            <figure className="dsys__spec">
              <span className="dsys__spec-body">
                <Toggle />
              </span>
              <figcaption>Off</figcaption>
            </figure>
          </div>
        </section>

        <section className="dsys__card dsys__card--icons">
          <h3 className="dsys__card-title">Icons</h3>
          <div className="dsys__specimens dsys__icons">
            {ICONS.map((i) => (
              <svg
                key={i.name}
                className="dsys__icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.9}
                strokeLinecap="round"
                strokeLinejoin="round"
                role="img"
                aria-label={i.name}
              >
                {i.path}
              </svg>
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  )
}
