import './StepDots.css'

/**
 * In-runway beat indicator — hairline ticks, the active one gold. Purely
 * presentational (the caption text next to it carries the numbers for
 * screen readers via the stepbar's counter).
 */
export function StepDots({ count, active }: { count: number; active: number }) {
  return (
    <span className="stepdots" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <i
          key={i}
          className={`stepdots__tick${i === active ? ' stepdots__tick--on' : ''}`}
        />
      ))}
    </span>
  )
}
