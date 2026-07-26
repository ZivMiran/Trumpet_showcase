import { asset } from './asset'

/**
 * The final dashboard mockups are all exported at one 16:9 size (3456×1944).
 * Every consumer (sequence frames, decision crops, compare poster) derives its
 * geometry from these constants — never hardcode the dimensions or ratio again.
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
  overview: asset('/screens/overview.png'),
  music: asset('/screens/music.png'),
  trackDrawer: asset('/screens/track-drawer.png'),
  audience: asset('/screens/audience.png'),
  compareEmpty: asset('/screens/compare-empty.png'),
} as const

/**
 * Pre-cropped detail captures. Unlike the full screens these are NOT 16:9, so
 * each carries its own natural size — consumers (DecisionFigure) feed those
 * dims to the crop math instead of the global SCREEN_* constants.
 */
export const DETAILS = {
  insightBanner: { src: asset('/screens/detail-insight-banner.png'), w: 2346, h: 266 },
  artistSwitch: { src: asset('/screens/detail-artist-switch.png'), w: 632, h: 772 },
  notificationFlyout: { src: asset('/screens/detail-notification-flyout.png'), w: 824, h: 1418 },
  searchEmpty: { src: asset('/screens/detail-search-empty.png'), w: 506, h: 126 },
} as const

/** The Compare empty-state export is 2042×1282 (≈1.59:1), not the 16:9 ratio. */
export const COMPARE_EMPTY_W = 2042
export const COMPARE_EMPTY_H = 1282

export const PROCESS = {
  overviewWireframe: asset('/process/overview-wireframe.png'),
  musicWireframe: asset('/process/music-wireframe.png'),
  trackDrawerWireframe: asset('/process/track-drawer-wireframe.png'),
  audienceWireframe: asset('/process/audience-wireframe.png'),
} as const
