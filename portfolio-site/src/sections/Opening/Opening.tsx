import { Suspense, lazy } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ScreenSequence } from './ScreenSequence'
import './Opening.css'

// The site's one WebGL moment — ambient constellation from the product's own
// world-map data. Lazy so three.js ships as its own chunk; never mounted for
// reduced-motion users.
const ConstellationField = lazy(() =>
  import('./ConstellationField').then((m) => ({ default: m.ConstellationField })),
)

/**
 * Opening — a full-height typographic statement over the ambient field, then
 * the product itself: four screens dissolving through one sticky frame as the
 * reader scrolls (ScreenSequence). Motion: masked line reveals on mount and
 * the sequence scrub; nothing else here animates.
 */
export function Opening() {
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
    <section className="opening" id="top" aria-labelledby="opening-title">
      <div className="container opening__stage">
        {!reduced && (
          <Suspense fallback={null}>
            <ConstellationField />
          </Suspense>
        )}

        <motion.div
          className="opening__statement"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <span className="opening__mask">
            <motion.p className="opening__kicker" variants={line}>
              Case study — 2026
            </motion.p>
          </span>

          <h1 className="opening__title" id="opening-title">
            <span className="opening__mask">
              <motion.span className="opening__title-line" variants={line}>
                Trumpet
              </motion.span>
            </span>
            <span className="opening__mask">
              <motion.span className="opening__subtitle" variants={line}>
                A music-analytics dashboard, designed end-to-end — from
                research to a working, clickable prototype.
              </motion.span>
            </span>
          </h1>

          <span className="opening__mask">
            <motion.dl className="opening__meta" variants={line}>
              <div>
                <dt>Role</dt>
                <dd>UX/UI product design — solo</dd>
              </div>
              <div>
                <dt>Scope</dt>
                <dd>4 screens, one design system</dd>
              </div>
              <div>
                <dt>Below</dt>
                <dd>The four screens, as designed</dd>
              </div>
            </motion.dl>
          </span>
        </motion.div>
      </div>

      <div className="opening__product">
        <ScreenSequence />
      </div>
    </section>
  )
}
