import { Reveal } from './Reveal'
import './ChapterHeader.css'

/**
 * Chapter opener — the page's single recurring editorial pattern. An oversized
 * low-contrast numeral sets the pace; the title states a problem or a
 * decision (never a self-compliment); the optional lede is one tight
 * paragraph. One gold hairline per chapter lives here and nowhere else.
 */
export function ChapterHeader({
  no,
  title,
  lede,
}: {
  no: string
  title: string
  lede?: string
}) {
  return (
    <Reveal standalone className="chapter" amount={0.5}>
      <span className="chapter__rule" aria-hidden="true" />
      <div className="chapter__row">
        <span className="chapter__no tnum" aria-hidden="true">
          {no}
        </span>
        <div className="chapter__text">
          <h2 className="chapter__title">{title}</h2>
          {lede && <p className="chapter__lede">{lede}</p>}
        </div>
      </div>
    </Reveal>
  )
}
