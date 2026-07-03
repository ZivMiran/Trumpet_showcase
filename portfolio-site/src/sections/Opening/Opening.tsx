import { Suspense, lazy } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { DashboardEmbedFrame } from '../../components/shared/DashboardEmbedFrame'
import './Opening.css'

// The site's one WebGL moment — ambient constellation from the product's own
// world-map data. Lazy so three.js ships as its own chunk; never mounted for
// reduced-motion users.
const ConstellationField = lazy(() =>
  import('./ConstellationField').then((m) => ({ default: m.ConstellationField })),
)

/**
 * Opening — a full-height typographic statement over the ambient field, then
 * the product itself at near-full width. Motion: masked line reveals on mount
 * and one scale-settle on the product figure; nothing else here animates.
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
                <dd>The real build, running live</dd>
              </div>
            </motion.dl>
          </span>
        </motion.div>
      </div>

      <div className="container container--wide opening__product">
        <motion.div
          initial={reduced ? undefined : { opacity: 0, scale: 0.985, y: 28 }}
          whileInView={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        >
          <DashboardEmbedFrame />
          <div className="opening__caption">
            <span>The live build — real interface, not a mockup.</span>
            <a
              href="/dashboard-embed/index.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open it full-screen ↗
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
