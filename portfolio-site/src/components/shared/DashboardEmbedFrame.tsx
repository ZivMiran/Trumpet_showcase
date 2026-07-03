import { useEffect, useRef, useState } from 'react'
import './DashboardEmbedFrame.css'

/**
 * Shows the REAL Trumpet dashboard (its production `dist/` build, copied to
 * public/dashboard-embed) inside a cropped, scaled preview frame.
 *
 * The dashboard is a desktop layout; to show a crisp desktop view inside a
 * smaller frame we render the iframe oversized at a fixed logical size and
 * scale it down with a CSS transform, recomputing the scale from the frame's
 * measured width via ResizeObserver. It's a static showcase (pointer-events:
 * none, scrolling:no, tab-excluded) — a picture of the product, not an
 * operable embed. Presentation is flat: one hairline, no chrome.
 */
const IFRAME_W = 1440
const IFRAME_H = 900

export function DashboardEmbedFrame() {
  const frameRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.25)

  useEffect(() => {
    const el = frameRef.current
    if (!el) return
    const compute = () => setScale(el.clientWidth / IFRAME_W)
    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={frameRef}
      className="embed"
      style={{ aspectRatio: `${IFRAME_W} / ${IFRAME_H}` }}
    >
      <iframe
        className="embed__iframe"
        src="/dashboard-embed/index.html"
        title="Trumpet dashboard — Overview screen preview"
        aria-hidden="true"
        tabIndex={-1}
        scrolling="no"
        loading="lazy"
        style={{
          width: `${IFRAME_W}px`,
          height: `${IFRAME_H}px`,
          transform: `scale(${scale})`,
        }}
      />
    </div>
  )
}
