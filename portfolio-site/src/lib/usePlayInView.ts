import { useEffect, type RefObject } from 'react'

/**
 * Play a muted video only once the viewer actually reaches it, and pause it
 * again when it leaves — so a clip starts when scrolled to (not on load, off
 * screen) and several loops never decode at once.
 *
 * `enabled` gates the whole thing (pass `false` under reduced motion, where the
 * video should stay a still poster with native controls). `restart` seeks back
 * to 0 on each entry, so a narrative clip always begins from its first frame.
 */
export function usePlayInView(
  ref: RefObject<HTMLVideoElement | null>,
  { enabled = true, restart = false }: { enabled?: boolean; restart?: boolean } = {},
) {
  useEffect(() => {
    const el = ref.current
    if (!el || !enabled) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (restart) el.currentTime = 0
            el.play().catch(() => {})
          } else {
            el.pause()
          }
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, enabled, restart])
}
