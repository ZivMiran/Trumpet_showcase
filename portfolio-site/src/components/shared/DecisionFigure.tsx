import { useRef } from 'react'
import { SCREEN_W, SCREEN_H } from '../../lib/screens'
import { usePlayInView } from '../../lib/usePlayInView'
import './DecisionFigure.css'

/**
 * A design decision's evidence: a close-up of the real screen inside an
 * overflow-hidden box. Two forms:
 *
 *  - A CSS crop of a still: one oversized `<img>` positioned by the `crop`
 *    fraction box (`marker` places a single gold dot as a fraction of it).
 *  - A pre-framed screen recording: pass `video` and the clip autoplays,
 *    muted and looping, only while it is on screen (an IntersectionObserver
 *    gates play/pause so four loops never decode at once). The still `src`
 *    stays as the poster / no-JS fallback.
 *
 * The source's natural size defaults to the 16:9 full-screen constants, but a
 * pre-cropped detail (its own aspect ratio) passes explicit `srcW`/`srcH` so
 * the box geometry matches the real media — feed such a source
 * `crop={{ x:0, y:0, w:1, h:1 }}` to show it whole.
 *
 * The crop math: with left/top on an absolutely positioned child resolving
 * against the box's width/height, showing region {x,y,w,h} reduces to
 *   width: 100%/w · left: -x/w · top: -y/h
 */
export type CropBox = { x: number; y: number; w: number; h: number }

type Props = {
  src: string
  alt: string
  crop: CropBox
  marker?: { x: number; y: number }
  /** Natural size of the source media; defaults to the full-screen constants. */
  srcW?: number
  srcH?: number
  /** A pre-framed screen recording; when set it replaces the still crop. */
  video?: string
}

export function DecisionFigure({
  src,
  alt,
  crop,
  marker,
  srcW = SCREEN_W,
  srcH = SCREEN_H,
  video,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Start when the viewer reaches it; pause when it leaves.
  usePlayInView(videoRef, { enabled: !!video })

  const cropStyle = {
    width: `${100 / crop.w}%`,
    left: `${(-crop.x / crop.w) * 100}%`,
    top: `${(-crop.y / crop.h) * 100}%`,
  }

  return (
    <div
      className="dfig"
      style={
        {
          aspectRatio: `${srcW * crop.w} / ${srcH * crop.h}`,
          '--crop-ar': (srcW * crop.w) / (srcH * crop.h),
        } as React.CSSProperties
      }
    >
      {video ? (
        <video
          ref={videoRef}
          className="dfig__video"
          poster={src}
          muted
          loop
          playsInline
          preload="metadata"
          disablePictureInPicture
          aria-label={alt}
          style={cropStyle}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img
          src={src}
          alt={alt}
          width={srcW}
          height={srcH}
          loading="lazy"
          decoding="async"
          style={cropStyle}
        />
      )}
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
