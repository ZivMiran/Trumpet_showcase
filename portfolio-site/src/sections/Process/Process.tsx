import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import {
  SCREENS,
  PROCESS,
  SCREEN_W,
  SCREEN_H,
  COMPARE_OLD_W,
  COMPARE_OLD_H,
} from '../../lib/screens'
import './Process.css'

/**
 * 04 / Process — real artifacts, shown as restrained before/after pairs.
 * The wireframes still carry the project's working title (PulseBeat), which
 * is left visible on purpose: the process was real, name included. No
 * sliders, no toggles — static evidence with one line on what changed.
 */
type Side = {
  src: string
  alt: string
  label: string
  width?: number
  height?: number
}

type Pair = {
  id: string
  title: string
  note: string
  before: Side
  after: Side
}

const PAIRS: Pair[] = [
  {
    id: 'pair-overview',
    title: 'Overview',
    note: 'The lo-fi pass already had the answer-first banner and the five KPIs. What changed: “Reach” became “Listeners,” and the timeframes moved to match how artists actually check in.',
    before: {
      src: PROCESS.overviewWireframe,
      alt: 'Lo-fi Overview wireframe under the working title PulseBeat',
      label: 'Wireframe — PulseBeat',
    },
    after: {
      src: SCREENS.overview,
      alt: 'Final Overview screen in Trumpet',
      label: 'Final — Trumpet',
    },
  },
  {
    id: 'pair-track',
    title: 'Track detail',
    note: 'The drawer survived intact — retention framed as a waveform was the first sketch’s bet, and testing kept it. The final adds the skip/save clusters that make it legible.',
    before: {
      src: PROCESS.trackDrawerWireframe,
      alt: 'Lo-fi track detail drawer wireframe with a retention chart',
      label: 'Wireframe — PulseBeat',
    },
    after: {
      src: SCREENS.trackDrawer,
      alt: 'Final track detail drawer with the engagement waveform',
      label: 'Final — Trumpet',
    },
  },
  {
    id: 'pair-audience',
    title: 'Audience',
    note: 'The wireframe’s bubble map ranked cities by circle size; the final swapped it for a density map — bubbles overlapped exactly where the data mattered most.',
    before: {
      src: PROCESS.audienceWireframe,
      alt: 'Lo-fi Audience wireframe with a bubble map of listeners',
      label: 'Wireframe — PulseBeat',
    },
    after: {
      src: SCREENS.audience,
      alt: 'Final Audience screen with the listeners density map',
      label: 'Final — Trumpet',
    },
  },
  {
    id: 'pair-compare',
    title: 'Compare',
    note: 'An earlier direction spent two hues on decoration and dashed lines on everything. Killed. What survived into the shipped version: day-one alignment and the KPI strip.',
    before: {
      src: PROCESS.compareOldVersion,
      alt: 'Earlier Compare design in purple and green with dashed curves',
      label: 'Earlier direction',
      width: COMPARE_OLD_W,
      height: COMPARE_OLD_H,
    },
    after: {
      src: SCREENS.compare,
      alt: 'Shipped Compare modal — two releases aligned to day one',
      label: 'Shipped',
    },
  },
]

export function Process() {
  return (
    <section className="process" id="process" aria-labelledby="process-title">
      <div className="container">
        <ChapterHeader
          no="04"
          title="The finished screens hide the arguments"
          lede="It started as PulseBeat — lo-fi frames, a different name, and a Compare that took three tries. What changed between versions, and why."
        />

        <div className="process__list">
          {PAIRS.map((p) => (
            <Reveal
              standalone
              as="figure"
              className="process__pair"
              key={p.id}
              amount={0.25}
            >
              <div className="process__media">
                {[p.before, p.after].map((side) => (
                  <div className="process__side" key={side.label}>
                    <span className="process__label">{side.label}</span>
                    <img
                      src={side.src}
                      alt={side.alt}
                      width={side.width ?? SCREEN_W}
                      height={side.height ?? SCREEN_H}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="process__caption">
                <span className="process__title">{p.title}</span>
                <p className="process__note">{p.note}</p>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
