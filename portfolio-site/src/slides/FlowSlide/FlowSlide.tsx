import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { FlowDiagram } from './FlowDiagram'
import './FlowSlide.css'

/**
 * 06 — App flow. The whole architecture on one static frame: four pages, and
 * everything else an overlay on top of them. Pages solid, overlays dashed, and
 * the primary path (Overview → Music → Track detail → Compare) in gold.
 */
export function FlowSlide() {
  return (
    <div className="container container--wide flow-slide">
      <div className="container flow-slide__head">
        <ChapterHeader
          no="06"
          title="A flat map, one level deep"
          lede="Four pages; everything else an overlay on top. No metric is ever more than two clicks from entry — the answer to “digging through menus.”"
        />
      </div>

      <div className="flow-slide__stage">
        <FlowDiagram />
        <p className="flow-slide__legend">
          <span className="flow-slide__key flow-slide__key--page">Page</span>
          <span className="flow-slide__key flow-slide__key--overlay">Overlay</span>
          <span className="flow-slide__key flow-slide__key--gold">The compare path</span>
        </p>
      </div>
    </div>
  )
}
