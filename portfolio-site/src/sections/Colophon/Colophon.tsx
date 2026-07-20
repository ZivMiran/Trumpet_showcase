import { Reveal } from '../../components/shared/Reveal'
import './Colophon.css'

const DASHBOARD_URL = 'https://zivmiran.github.io/Trumpet_dashboard_prototype/'

/**
 * Footer — the quiet ending. A thanks, two large text links, sign-off.
 * (The facts table this section used to carry now lives as chapter 05,
 * the design system.)
 */
export function Colophon() {
  return (
    <footer className="colophon" id="colophon" aria-labelledby="colophon-title">
      <div className="container">
        <Reveal standalone className="colophon__close" amount={0.4}>
          <p className="colophon__thanks" id="colophon-title">
            Thanks for reading.
          </p>
          <div className="colophon__links">
            <a href="mailto:zivmiran@gmail.com">zivmiran@gmail.com ↗</a>
            <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer">
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
