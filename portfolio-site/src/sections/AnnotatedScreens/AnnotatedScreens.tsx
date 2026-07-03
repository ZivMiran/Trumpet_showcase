import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import {
  AnnotatedFigure,
  type AnnotationNote,
} from '../../components/shared/AnnotatedFigure'
import './AnnotatedScreens.css'

/**
 * 02 / The screens — the centerpiece. Each screen is shown near-full-width
 * with numbered markers pinned to the actual UI decisions (all verified
 * against the dashboard's SPEC.md — nothing invented). Marker coordinates are
 * % of the image; tuned against the real screenshots.
 *
 * Audience.png / Settings.png join this list when the captures arrive.
 */
type Screen = {
  id: string
  src: string
  alt: string
  width: number
  height: number
  name: string
  question: string
  notes: AnnotationNote[]
}

const SCREENS: Screen[] = [
  {
    id: 'screen-overview',
    src: '/screens/Overview.png',
    alt: 'Trumpet Overview screen — pulse insight banner, five KPIs, streams chart with peak-event marker, revenue donut',
    width: 1536,
    height: 946,
    name: 'Overview',
    question: '“Am I okay — and what changed?”',
    notes: [
      {
        x: 40,
        y: 32,
        title:
          'Five KPIs set in tabular figures — the values change daily, the layout never moves.',
      },
      {
        x: 50.5,
        y: 65,
        title:
          'Peak-event markers explain spikes in plain language: “a TikTok clip went viral,” not an anonymous bump.',
      },
      {
        x: 28,
        y: 17,
        title:
          'The pulse banner leads with one insight in a sentence — the screen opens with an answer, not a chart.',
      },
      {
        x: 87,
        y: 56,
        title:
          'One saturated hue across all data viz. Emphasis is earned by weight and position, never by adding color.',
      },
    ],
  },
  {
    id: 'screen-music',
    src: '/screens/Music.png',
    alt: 'Trumpet Music screen — top performing tracks with sparklines above a sortable catalog table',
    width: 1544,
    height: 944,
    name: 'Music',
    question: '“Which releases carry the catalog?”',
    notes: [
      {
        x: 30,
        y: 22,
        title:
          'The top movers rank themselves — inline sparklines give each track a shape before a number.',
      },
      {
        x: 30,
        y: 74.5,
        title:
          'Albums and EPs expand in place inside one table. No sub-pages; nothing to dig for.',
      },
      {
        x: 52,
        y: 41,
        title:
          'Sort and format filters live in the header row, one click from every question about the catalog.',
      },
    ],
  },
  {
    id: 'screen-track',
    src: '/screens/Track_drawer.png',
    alt: 'Trumpet track-detail drawer — engagement waveform with skip and save clusters, growth, and top markets',
    width: 1542,
    height: 944,
    name: 'Track detail',
    question: '“Why does this song perform?”',
    notes: [
      {
        x: 74,
        y: 71,
        title:
          'The engagement waveform marks where listeners skip and where they save — down to the chorus that earns the replay.',
      },
      {
        x: 90,
        y: 39,
        title:
          'Growth is framed against the previous 28 days — a comparison you can act on, not an abstract total.',
      },
      {
        x: 62,
        y: 91,
        title:
          'Top markets sit under the waveform, so “what works” lands next to “where it works.”',
      },
    ],
  },
]

export function AnnotatedScreens() {
  return (
    <section className="screens" id="screens" aria-labelledby="screens-title">
      <div className="container">
        <ChapterHeader
          no="02"
          title="Every screen answers one question"
          lede="The numbered notes are the decisions doing the work — each marker shows where that decision lives in the interface."
        />
      </div>

      <div className="screens__list">
        {SCREENS.map((s) => (
          <article key={s.id} className="screens__item" aria-label={s.name}>
            <div className="container container--wide">
              <Reveal standalone className="screens__head" amount={0.6}>
                <h3 className="screens__name" id={`${s.id}-title`}>
                  {s.name}
                </h3>
                <p className="screens__question">{s.question}</p>
              </Reveal>
              <AnnotatedFigure
                src={s.src}
                alt={s.alt}
                width={s.width}
                height={s.height}
                notes={s.notes}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
