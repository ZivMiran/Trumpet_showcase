import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import './Colophon.css'

/**
 * 05 / Colophon — the quiet ending. A designer's colophon (facts, set small),
 * then two large text links. No buttons, no cards, no restated pitch.
 */
const ROWS: [string, React.ReactNode][] = [
  ['Role', 'UX/UI product design — research, flows, UI, design system'],
  ['Prototype', 'A real working build (React · TypeScript · Vite)'],
  ['Data viz', 'Custom-drawn to spec — no chart-library defaults'],
  ['Type', 'Space Grotesk 300–700, tabular figures'],
  [
    'Palette',
    <span className="colophon__palette" key="palette">
      <i style={{ background: '#16171a' }} /> #16171a
      <i style={{ background: '#e3b53a' }} /> #e3b53a
      <i style={{ background: '#f0ede5' }} /> #f0ede5
    </span>,
  ],
  ['Motion', '100–250 ms, one ease-out curve'],
  ['Year', '2026'],
]

export function Colophon() {
  return (
    <footer className="colophon" id="colophon" aria-labelledby="colophon-title">
      <div className="container">
        <ChapterHeader no="05" title="Colophon" />

        <Reveal standalone as="dl" className="colophon__table" amount={0.3}>
          {ROWS.map(([term, detail]) => (
            <div className="colophon__row" key={term}>
              <dt>{term}</dt>
              <dd className="tnum">{detail}</dd>
            </div>
          ))}
        </Reveal>

        <Reveal standalone className="colophon__close" amount={0.4}>
          <p className="colophon__thanks" id="colophon-title">
            Thanks for reading.
          </p>
          <div className="colophon__links">
            <a href="mailto:zivmiran@gmail.com">zivmiran@gmail.com ↗</a>
            <a
              href="/dashboard-embed/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the live dashboard ↗
            </a>
          </div>
        </Reveal>

        <div className="colophon__signoff">
          <span>Designed by Ziv Miran</span>
          <span className="tnum">© 2026</span>
        </div>
      </div>
    </footer>
  )
}
