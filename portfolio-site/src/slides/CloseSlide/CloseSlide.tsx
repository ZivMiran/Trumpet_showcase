import { Reveal } from '../../components/shared/Reveal'
import './CloseSlide.css'

const DASHBOARD_URL = 'https://zivmiran.github.io/Trumpet_dashboard_prototype/'

/**
 * 17 — Close. The quiet ending, with the payoff up front: everything shown
 * here runs — the live prototype link is the dominant element.
 */
export function CloseSlide() {
  return (
    <div className="container close-slide">
      <Reveal standalone className="close-slide__body" amount={0.4}>
        <p className="close-slide__thanks">Thanks for reading.</p>
        <p className="close-slide__note">
          Everything in this presentation runs. The prototype is live,
          clickable, and built on the same tokens you just saw.
        </p>
        <div className="close-slide__links">
          <a
            className="close-slide__cta"
            href={DASHBOARD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open the live prototype ↗
          </a>
          <a className="close-slide__mail" href="mailto:zivmiran@gmail.com">
            zivmiran@gmail.com ↗
          </a>
        </div>
      </Reveal>

      <div className="close-slide__signoff">
        <span>Designed by Ziv Miran</span>
        <span className="tnum">© 2026</span>
      </div>
    </div>
  )
}
