import type Lenis from 'lenis'

/**
 * Module-level handle to the active Lenis instance so anchor navigation
 * (SiteHeader) can drive the same scroll engine the wheel uses. Null when
 * Lenis isn't running (reduced motion, ?nosmooth) — callers fall back to
 * native scrolling.
 */
let instance: Lenis | null = null

export function registerLenis(lenis: Lenis | null) {
  instance = lenis
}

export function getLenis(): Lenis | null {
  return instance
}
