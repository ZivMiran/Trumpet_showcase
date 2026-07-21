import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { PROCESS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import './WireframesSlide.css'

/**
 * 07 — Wireframes. The lo-fi passes, shown as a slow auto-scrolling carousel
 * that drifts the pages across the screen (no scroll hijack — the deck scrolls
 * normally past it). Each frame is cropped to the content region where the
 * layout bets live; the persistent sidebar is covered by the flow slide.
 * Hovering pauses the drift so a frame can be read; reduced motion swaps the
 * drift for a plain scrollable row.
 */
const CONTENT_CROP = { x: 0.152, y: 0, w: 0.848, h: 1 }
const CROP_RATIO = `${Math.round(SCREEN_W * CONTENT_CROP.w)} / ${SCREEN_H}`

const CROP_STYLE: React.CSSProperties = {
  width: `${100 / CONTENT_CROP.w}%`,
  left: `${(-CONTENT_CROP.x / CONTENT_CROP.w) * 100}%`,
  top: 0,
}

type Frame = { src: string; alt: string; label: string; note: string }

const FRAMES: Frame[] = [
  {
    src: PROCESS.overviewWireframe,
    alt: 'Lo-fi Overview wireframe — insight banner over five KPI cards and a streams chart',
    label: 'Overview',
    note: 'Answer-first banner, five KPIs — set before any styling.',
  },
  {
    src: PROCESS.trackDrawerWireframe,
    alt: 'Lo-fi track detail wireframe — a drawer over the catalog with a retention chart',
    label: 'Track detail',
    note: 'Retention as a waveform — the first sketch’s bet, and it held.',
  },
  {
    src: PROCESS.audienceWireframe,
    alt: 'Lo-fi Audience wireframe — a bubble map of listeners with source and city rankings',
    label: 'Audience',
    note: 'A bubble map ranked cities by size — later cut for a density map.',
  },
]

// Two copies back to back make the marquee loop seamless.
const TRACK = [...FRAMES, ...FRAMES]

export function WireframesSlide() {
  return (
    <div className="wf-slide">
      <div className="container">
        <ChapterHeader
          no="07"
          title="Structure, before style"
          lede="Every layout decision was made in low fidelity first. The three pages drift past below — hover to hold one still."
        />
      </div>

      <div
        className="wf-marquee"
        role="group"
        aria-label="Low-fidelity wireframes: Overview, Track detail, Audience"
      >
        <div className="wf-marquee__track">
          {TRACK.map((f, i) => (
            <figure className="wf-frame" key={`${f.src}-${i}`} aria-hidden={i >= FRAMES.length}>
              <div className="wf-frame__crop" style={{ aspectRatio: CROP_RATIO }}>
                <img
                  src={f.src}
                  alt={i < FRAMES.length ? f.alt : ''}
                  width={SCREEN_W}
                  height={SCREEN_H}
                  style={CROP_STYLE}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="wf-frame__cap">
                <span className="wf-frame__label">{f.label}</span>
                <span className="wf-frame__note">{f.note}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
