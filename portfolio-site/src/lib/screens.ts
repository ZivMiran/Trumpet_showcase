import { asset } from './asset'

/**
 * The final dashboard mockups are all exported at one size. Every consumer
 * (sequence frames, decision crops, compare poster) derives its geometry from
 * these constants — never hardcode the dimensions or ratio again.
 */
export const SCREEN_W = 1440
export const SCREEN_H = 1024
export const SCREEN_RATIO = SCREEN_W / SCREEN_H // 1.40625

export const SCREENS = {
  overview: asset('/screens/overview.png'),
  overviewArtistSwitcher: asset('/screens/overview-artist-switcher.png'),
  overviewNotificationsFlyout: asset('/screens/overview-notifications-flyout.png'),
  notificationsOverlay: asset('/screens/notifications-overlay.png'),
  music: asset('/screens/music.png'),
  trackDrawer: asset('/screens/track-drawer.png'),
  audience: asset('/screens/audience.png'),
  compare: asset('/screens/compare.png'),
  compareEmpty: asset('/screens/compare-empty.png'),
} as const

export const PROCESS = {
  overviewWireframe: asset('/process/overview-wireframe.png'),
  trackDrawerWireframe: asset('/process/track-drawer-wireframe.png'),
  audienceWireframe: asset('/process/audience-wireframe.png'),
} as const
