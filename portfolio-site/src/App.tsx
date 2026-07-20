import { Deck } from './deck/Deck'

/**
 * Trumpet — final course presentation, as an interactive slide deck.
 * Scroll advances the slides (and replays them backwards); the registry in
 * src/deck/slides.ts is the single source of slide order.
 */
function App() {
  return <Deck />
}

export default App
