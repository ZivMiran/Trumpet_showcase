/**
 * Piecewise-linear mapping, clamped to the output range. Shared by every
 * scroll-scrubbed stage (Opening sequence, Compare) — progress in, styled
 * value out.
 */
export function ramp(v: number, stops: [number, number][]): number {
  if (v <= stops[0][0]) return stops[0][1]
  for (let i = 1; i < stops.length; i++) {
    const [x1, y1] = stops[i]
    const [x0, y0] = stops[i - 1]
    if (v <= x1) return y0 + ((v - x0) / (x1 - x0)) * (y1 - y0)
  }
  return stops[stops.length - 1][1]
}
