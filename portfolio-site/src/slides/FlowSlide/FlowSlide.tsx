import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { ramp } from '../../lib/ramp'
import { FlowDiagram } from './FlowDiagram'
import './FlowSlide.css'

/**
 * 07 — App flow. A short runway: the page architecture is on stage first;
 * scrolling on fades in the overlay layer (drawers, modals, popovers) — the
 * flat structure reads before the depth does. Compact mode shows everything
 * at once.
 */
export function FlowSlide() {
  const reduced = useReducedMotion()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia('(max-width: 767px)')
    const on = () => setIsMobile(mql.matches)
    on()
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [])

  const compact = reduced || isMobile

  const runwayRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (compact) return
    const runway = runwayRef.current
    const stage = stageRef.current
    if (!runway || !stage) return

    let raf = 0
    const update = () => {
      raf = 0
      const rect = runway.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      if (range <= 0) return
      const v = Math.min(1, Math.max(0, -rect.top / range))
      stage.style.setProperty(
        '--flow-overlays',
        String(
          ramp(v, [
            [0.3, 0],
            [0.6, 1],
          ]),
        ),
      )
    }
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [compact])

  const stage = (
    <div className="flow-slide__stage" ref={stageRef}>
      <FlowDiagram />
      <p className="flow-slide__legend" aria-hidden="true">
        solid = page&nbsp;&nbsp;·&nbsp;&nbsp;dashed = overlay&nbsp;&nbsp;·&nbsp;&nbsp;
        <span className="flow-slide__legend-gold">gold = the compare path</span>
      </p>
    </div>
  )

  return (
    <>
      <div className="container">
        <ChapterHeader
          no="07"
          title="A flat map, one level deep"
          lede="Four pages, and everything else an overlay on top of them — no metric is ever more than two clicks from entry. This answers the “digging through menus” complaint directly."
        />
      </div>

      {compact ? (
        <div className="container container--wide flow-slide__static">{stage}</div>
      ) : (
        <div className="flow-slide__runway" ref={runwayRef}>
          <div className="flow-slide__sticky">
            <div className="container container--wide">{stage}</div>
          </div>
        </div>
      )}
    </>
  )
}
