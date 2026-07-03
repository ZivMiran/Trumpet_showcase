import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import './AnnotatedFigure.css'

/**
 * A full-width product screenshot with numbered gold markers pinned to real
 * UI regions, and a note rail beneath. Hovering (or focusing) a marker or a
 * note highlights its pair — the reader's eye is walked through the design
 * decisions in place, instead of being told about them in prose.
 *
 * Marker coordinates are percentages of the image box. The figure gets the
 * page's motion moment #4: a single scale-settle on first view.
 */
export type AnnotationNote = {
  /** % from the left edge of the image */
  x: number
  /** % from the top edge of the image */
  y: number
  /** One-line design decision — a statement, not a feature name. */
  title: string
}

export function AnnotatedFigure({
  src,
  alt,
  width,
  height,
  notes,
}: {
  src: string
  alt: string
  /** Intrinsic image size — reserves layout space before lazy load (no CLS). */
  width: number
  height: number
  notes: AnnotationNote[]
}) {
  const [active, setActive] = useState<number | null>(null)
  const reduced = useReducedMotion()

  const pair = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(i),
    onBlur: () => setActive(null),
  })

  return (
    <figure
      className="afig"
      style={{ '--fig-ratio': String(width / height) } as React.CSSProperties}
    >
      <motion.div
        className="afig__stage"
        initial={reduced ? undefined : { opacity: 0, scale: 0.985, y: 24 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
        {notes.map((n, i) => (
          <button
            key={n.title}
            type="button"
            className={`afig__marker${active === i ? ' is-active' : ''}`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
            aria-label={`Note ${i + 1}: ${n.title}`}
            {...pair(i)}
          >
            {/* Inner face carries the visual so the staggered reveal never
                fights the button's centering transform. */}
            <motion.span
              className="afig__marker-face tnum"
              initial={reduced ? undefined : { opacity: 0, scale: 0.4 }}
              whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{
                delay: 0.4 + i * 0.09,
                duration: 0.35,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {i + 1}
            </motion.span>
          </button>
        ))}
      </motion.div>

      <figcaption className="afig__notes">
        {notes.map((n, i) => (
          <div
            key={n.title}
            className={`afig__note${
              active === i ? ' is-active' : active !== null ? ' is-dim' : ''
            }`}
            {...pair(i)}
          >
            <span className="afig__note-n tnum" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p>{n.title}</p>
          </div>
        ))}
      </figcaption>
    </figure>
  )
}
