import { SmoothScroll } from './components/shared/SmoothScroll'
import { SnapStops } from './components/shared/SnapStops'
import { SiteHeader } from './sections/SiteHeader/SiteHeader'
import { Opening } from './sections/Opening/Opening'
import { Problem } from './sections/Problem/Problem'
import { AnnotatedScreens } from './sections/AnnotatedScreens/AnnotatedScreens'
import { CompareStudy } from './sections/CompareStudy/CompareStudy'
import { Process } from './sections/Process/Process'
import { Colophon } from './sections/Colophon/Colophon'
import './App.css'

/**
 * v3 — "The annotated design review". Chapter order:
 * Opening → 01 Problem → 02 Screens (annotated) → 03 Compare →
 * 04 Process → 05 Colophon.
 */
function App() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SnapStops />
      <SiteHeader />

      <main id="main">
        <Opening />
        <Problem />
        <AnnotatedScreens />
        <CompareStudy />
        <Process />
      </main>
      <Colophon />
    </SmoothScroll>
  )
}

export default App
