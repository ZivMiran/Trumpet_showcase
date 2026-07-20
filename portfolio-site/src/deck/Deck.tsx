import { SmoothScroll } from '../components/shared/SmoothScroll'
import { SnapStops } from '../components/shared/SnapStops'
import { DeckChrome } from './DeckChrome'
import { SLIDES } from './slides'
import { useActiveSlide } from './useActiveSlide'
import './Deck.css'

/**
 * The presentation shell. Every slide is a <section> generated from the
 * registry; the chrome floats above and tracks the active one. Navigation is
 * scroll — forward advances, backward replays — so the deck stays on the
 * proven Lenis + snap + scrub stack; keys and the index overlay are shortcuts
 * on top, never the only way through.
 */
export function Deck() {
  const activeId = useActiveSlide()

  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SnapStops />
      <DeckChrome activeId={activeId} />

      <main id="main">
        {SLIDES.map(({ id, kind, label, Component }) => (
          <section
            key={id}
            id={id}
            data-slide={kind}
            className={`slide slide--${kind}`}
            aria-label={label}
          >
            <Component />
          </section>
        ))}
      </main>
    </SmoothScroll>
  )
}
