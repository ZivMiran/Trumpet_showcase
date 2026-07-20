import { Suspense, lazy } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import './TitleSlide.css'

// The deck's one WebGL moment — ambient constellation from the product's own
// world-map data. Lazy so three.js ships as its own chunk; never mounted for
// reduced-motion users.
const ConstellationField = lazy(() =>
  import('./ConstellationField').then((m) => ({ default: m.ConstellationField })),
)

/**
 * 01 — Title. The elevator pitch as a full-height typographic statement over
 * the ambient field. One quiet line at the bottom teaches the whole deck:
 * scroll to advance. Motion: masked line reveals on mount, nothing else.
 */
export function TitleSlide() {
  const reduced = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.12, delayChildren: 0.1 },
    },
  }
  // Masked rise: the parent line has overflow:hidden; the child slides up
  // into view. Under reduced motion it renders in place instantly.
  const line: Variants = {
    hidden: reduced ? { y: 0 } : { y: '110%' },
    show: {
      y: 0,
      transition: { duration: 0.85, ease: [0.25, 1, 0.5, 1] },
    },
  }

  return (
    <div className="container title-slide__stage">
      {!reduced && (
        <Suspense fallback={null}>
          <ConstellationField />
        </Suspense>
      )}

      <motion.div
        className="title-slide__statement"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <span className="title-slide__mask">
          <motion.p className="title-slide__kicker" variants={line}>
            Final project — UX/UI design course · 2026
          </motion.p>
        </span>

        <h1 className="title-slide__title" id="title-heading">
          <span className="title-slide__mask">
            <motion.span className="title-slide__title-line" variants={line}>
              Trumpet
            </motion.span>
          </span>
          <span className="title-slide__mask">
            <motion.span className="title-slide__subtitle" variants={line}>
              A music-analytics dashboard that turns scattered platform data
              into one clear artist decision.
            </motion.span>
          </span>
        </h1>

        <span className="title-slide__mask">
          <motion.dl className="title-slide__meta" variants={line}>
            <div>
              <dt>Role</dt>
              <dd>UX/UI product design — solo</dd>
            </div>
            <div>
              <dt>Scope</dt>
              <dd>4 screens, one design system</dd>
            </div>
            <div>
              <dt>Deliverable</dt>
              <dd>A working, clickable prototype</dd>
            </div>
          </motion.dl>
        </span>
      </motion.div>

      <p className="title-slide__hint" aria-hidden="true">
        scroll to advance <span className="title-slide__hint-arrow">↓</span>
      </p>
    </div>
  )
}
