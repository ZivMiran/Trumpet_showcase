import './PendingSlot.css'

/**
 * A designed vacancy — the shape of content that exists in the research but
 * hasn't been dropped in yet. Dashed hairline, ghost content per kind, an
 * eyebrow label naming exactly what belongs here. One 6px gold corner tick is
 * the only accent; the slot must read as art direction, not as a broken image.
 *
 * kinds: quote (interview evidence) · stat (survey number) · frame
 * (storyboard scene) · state (error/success message specimen).
 */
type Props = {
  kind: 'quote' | 'stat' | 'frame' | 'state'
  label: string
  /** CSS aspect-ratio for `frame` slots, e.g. '16 / 10'. */
  aspect?: string
  note?: string
  /** For `state` slots: which feedback tint the ghost toast carries. */
  tone?: 'error' | 'success'
}

export function PendingSlot({ kind, label, aspect, note, tone }: Props) {
  return (
    <div
      className={`pslot pslot--${kind}`}
      style={aspect ? { aspectRatio: aspect } : undefined}
      role="img"
      aria-label={`Placeholder — ${label}`}
    >
      <span className="pslot__tick" aria-hidden="true" />
      <span className="pslot__label">{label}</span>

      {kind === 'quote' && (
        <span className="pslot__ghost" aria-hidden="true">
          <i className="pslot__bar" style={{ width: '92%' }} />
          <i className="pslot__bar" style={{ width: '78%' }} />
          <i className="pslot__bar" style={{ width: '55%' }} />
          <i className="pslot__bar pslot__bar--attr" style={{ width: '34%' }} />
        </span>
      )}

      {kind === 'stat' && (
        <span className="pslot__ghost pslot__ghost--stat tnum" aria-hidden="true">
          __
        </span>
      )}

      {kind === 'frame' && (
        <span className="pslot__ghost pslot__ghost--frame" aria-hidden="true">
          <i className="pslot__scene" />
          <i className="pslot__bar" style={{ width: '85%' }} />
          <i className="pslot__bar" style={{ width: '60%' }} />
        </span>
      )}

      {kind === 'state' && (
        <span className="pslot__ghost pslot__ghost--state" aria-hidden="true">
          <i className={`pslot__toast pslot__toast--${tone ?? 'error'}`}>
            <i className="pslot__bar" style={{ width: '58%' }} />
            <i className="pslot__bar" style={{ width: '36%' }} />
          </i>
        </span>
      )}

      {note && <span className="pslot__note">{note}</span>}
    </div>
  )
}
