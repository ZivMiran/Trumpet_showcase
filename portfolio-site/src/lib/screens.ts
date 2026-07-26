import { asset } from './asset'

/**
 * The final dashboard mockups are all one 16:9 shape. These constants carry
 * that RATIO, not the file size: the design-tool exports are 3456×1944 and the
 * shipped WebP is 2048×1152 (see scripts/optimize-images.mjs), but every
 * consumer — sequence frames, decision crops, the compare poster — only ever
 * needs the proportion. Never hardcode a dimension or a ratio again.
 */
export const SCREEN_W = 1920
export const SCREEN_H = 1080
export const SCREEN_RATIO = SCREEN_W / SCREEN_H // 1.7778 (16:9)

/**
 * The screens the deck actually shows. Full-screen captures of the overlay
 * states (artist switcher, notifications flyout) are deliberately absent: the
 * edge-cases slide shows the pre-cropped DETAILS instead, so the overlay reads
 * at its real size rather than as a detail lost in a whole page.
 */
export const SCREENS = {
  overview: asset('/screens/overview.webp'),
  music: asset('/screens/music.webp'),
  trackDrawer: asset('/screens/track-drawer.webp'),
  audience: asset('/screens/audience.webp'),
  compareEmpty: asset('/screens/compare-empty.webp'),
} as const

/**
 * Pre-cropped detail captures. Unlike the full screens these are NOT 16:9, so
 * each carries its own natural size — consumers (DecisionFigure) feed those
 * dims to the crop math instead of the global SCREEN_* constants.
 */
export const DETAILS = {
  insightBanner: { src: asset('/screens/detail-insight-banner.webp'), w: 2346, h: 266 },
  artistSwitch: { src: asset('/screens/detail-artist-switch.webp'), w: 632, h: 772 },
  notificationFlyout: { src: asset('/screens/detail-notification-flyout.webp'), w: 824, h: 1418 },
  searchEmpty: { src: asset('/screens/detail-search-empty.webp'), w: 506, h: 126 },
} as const

/** The Compare empty-state export is 2042×1282 (≈1.59:1), not the 16:9 ratio. */
export const COMPARE_EMPTY_W = 2042
export const COMPARE_EMPTY_H = 1282

export const PROCESS = {
  overviewWireframe: asset('/process/overview-wireframe.webp'),
  musicWireframe: asset('/process/music-wireframe.webp'),
  trackDrawerWireframe: asset('/process/track-drawer-wireframe.webp'),
  audienceWireframe: asset('/process/audience-wireframe.webp'),
} as const
