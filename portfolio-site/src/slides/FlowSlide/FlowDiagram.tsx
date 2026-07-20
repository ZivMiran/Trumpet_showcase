import './FlowDiagram.css'

/**
 * The app-flow diagram, drawn from the prototype's real navigation model
 * (Trumpet_dashboard_source/src): a persistent sidebar + header, four pages,
 * and the overlay layer of drawers/modals/popovers. Inline SVG so every
 * color is a design token. Visual grammar: solid = page, dashed = overlay,
 * gold = the primary path Overview → Music → Track detail → Compare.
 *
 * The overlay layer's opacity is driven by the slide's scroll progress via
 * --flow-overlays (set on a parent by FlowSlide).
 */

const NODE_W = 150
const NODE_H = 56

function Node({
  x,
  y,
  label,
  sub,
  kind = 'page',
  gold = false,
  w = NODE_W,
  h = NODE_H,
}: {
  x: number
  y: number
  label: string
  sub?: string
  kind?: 'page' | 'overlay'
  gold?: boolean
  w?: number
  h?: number
}) {
  return (
    <g className={`flowd__node flowd__node--${kind}${gold ? ' flowd__node--gold' : ''}`}>
      <rect x={x} y={y} width={w} height={h} rx={8} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 4)} textAnchor="middle" className="flowd__label">
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 16} textAnchor="middle" className="flowd__sub">
          {sub}
        </text>
      )}
    </g>
  )
}

function Edge({ d, gold = false }: { d: string; gold?: boolean }) {
  return (
    <path
      className={`flowd__edge${gold ? ' flowd__edge--gold' : ''}`}
      d={d}
      markerEnd={gold ? 'url(#flowd-arrow-gold)' : 'url(#flowd-arrow)'}
    />
  )
}

export function FlowDiagram() {
  return (
    <svg
      className="flowd"
      viewBox="0 0 1200 640"
      role="img"
      aria-label="App flow: from the persistent sidebar and header into the four pages — Overview, Music, Audience, Settings — and their overlays: notifications, artist switcher, track and album drawers, city and KPI drawers, ending at the Compare modal. The primary path runs Overview to Music to Track detail to Compare."
    >
      <defs>
        <marker id="flowd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0.5 L7.5,4 L0,7.5" className="flowd__arrowhead" />
        </marker>
        <marker id="flowd-arrow-gold" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0.5 L7.5,4 L0,7.5" className="flowd__arrowhead flowd__arrowhead--gold" />
        </marker>
      </defs>

      {/* ---- Base layer: entry, persistent chrome, pages ---- */}
      <circle className="flowd__entry" cx={40} cy={330} r={5} />
      <text x={40} y={308} textAnchor="middle" className="flowd__sub">
        entry
      </text>

      <Node x={110} y={280} w={130} h={100} label="Sidebar" sub="persistent nav" />
      <Node x={110} y={80} w={130} h={72} label="Header" sub="search · bell" />

      <Node x={340} y={120} label="Overview" sub="default page" gold />
      <Node x={340} y={250} label="Music" gold />
      <Node x={340} y={380} label="Audience" />
      <Node x={340} y={510} label="Settings" />

      {/* Entry + sidebar fan-out */}
      <Edge d="M 45,330 H 105" />
      <Edge d="M 240,300 C 300,290 300,160 335,149" />
      <Edge d="M 240,320 C 290,315 300,282 335,278" />
      <Edge d="M 240,345 C 290,350 300,404 335,408" />
      <Edge d="M 240,362 C 300,372 300,530 335,538" />

      {/* Primary path spine (gold): Overview → Music */}
      <Edge d="M 415,176 V 245" gold />

      {/* ---- Overlay layer (revealed on scroll) ---- */}
      <g className="flowd__overlays">
        {/* Header → notifications */}
        <Node x={620} y={64} w={190} label="Notifications flyout" kind="overlay" />
        <Node x={920} y={64} w={190} label="All notifications" sub="modal" kind="overlay" h={64} />
        <Edge d="M 240,100 C 400,80 480,92 615,92" />
        <Edge d="M 810,92 H 915" />

        {/* Sidebar → artist switcher */}
        <Node x={110} y={440} w={170} label="Artist switcher" sub="popover" kind="overlay" h={64} />
        <Edge d="M 175,380 V 435" />

        {/* Music → track drawer → compare; album drawer second entry */}
        <Node x={620} y={200} w={190} label="Track detail" sub="drawer" kind="overlay" h={64} gold />
        <Node x={620} y={330} w={190} label="Album breakdown" sub="drawer" kind="overlay" h={64} />
        <Node x={920} y={244} w={200} h={76} label="Compare releases" sub="modal — any baseline" kind="overlay" gold />
        <Edge d="M 490,268 C 550,260 560,238 615,234" gold />
        <Edge d="M 490,286 C 550,295 560,358 615,362" />
        <Edge d="M 810,232 C 870,232 880,270 915,276" gold />
        <Edge d="M 810,362 C 880,360 880,296 915,292" />

        {/* Audience → city / KPI drawers */}
        <Node x={620} y={440} w={190} label="City detail" sub="drawer" kind="overlay" h={64} />
        <Node x={620} y={548} w={190} label="Audience KPI" sub="drawer" kind="overlay" h={64} />
        <Edge d="M 490,398 C 550,392 560,466 615,470" />
        <Edge d="M 490,416 C 560,428 560,572 615,578" />
      </g>
    </svg>
  )
}
