import { SCREEN_W, SCREEN_H } from '../../lib/screens'
import './DecisionFigure.css'

/**
 * A design decision's evidence: a close-up crop of the real screen, done
 * entirely in CSS (one network copy per screen, oversized img positioned
 * inside an overflow-hidden box). `crop` is a fraction box of the 1440×1024
 * source; `marker` is a single gold dot placed as a fraction of the crop.
 *
 * The math: with left/top on an absolutely positioned child resolving against
 * the box's width/height, showing region {x,y,w,h} reduces to
 *   width: 100%/w · left: -x/w · top: -y/h
 */
export type CropBox = { x: number; y: number; w: number; h: number }

type Props = {
  src: string
  alt: string
  crop: CropBox
  marker?: { x: number; y: number }
}

export function DecisionFigure({ src, alt, crop, marker }: Props) {
  return (
    <div
      className="dfig"
      style={
        {
          aspectRatio: `${SCREEN_W * crop.w} / ${SCREEN_H * crop.h}`,
          '--crop-ar': (SCREEN_W * crop.w) / (SCREEN_H * crop.h),
        } as React.CSSProperties
      }
    >
      <img
        src={src}
        alt={alt}
        width={SCREEN_W}
        height={SCREEN_H}
        loading="lazy"
        decoding="async"
        style={{
          width: `${100 / crop.w}%`,
          left: `${(-crop.x / crop.w) * 100}%`,
          top: `${(-crop.y / crop.h) * 100}%`,
        }}
      />
      {marker && (
        <span
          className="dfig__marker"
          aria-hidden="true"
          style={{ left: `${marker.x * 100}%`, top: `${marker.y * 100}%` }}
        />
      )}
    </div>
  )
}
