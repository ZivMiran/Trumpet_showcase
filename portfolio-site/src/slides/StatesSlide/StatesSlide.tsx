import type { ReactNode } from 'react'
import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { DecisionFigure } from '../../components/shared/DecisionFigure'
import { SCREENS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import './StatesSlide.css'

/**
 * 12 — Edge cases & interactive states. Three beats: the open overlays a
 * session lives in, the empty state that proposes instead of apologizing,
 * and the feedback toasts (error / success) — built from the app's own
 * tokens (--error / --success, the overlay shadow) so they read as real.
 */
const AlertIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
)

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
  </svg>
)

/** A transient toast, built from the app's tokens. Presentational only. */
function Toast({
  tone,
  icon,
  title,
  msg,
  action,
}: {
  tone: 'error' | 'success'
  icon: ReactNode
  title: string
  msg: string
  action: string
}) {
  return (
    <div className={`toast toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="toast__icon" aria-hidden="true">
        {icon}
      </span>
      <div className="toast__body">
        <p className="toast__title">{title}</p>
        <p className="toast__msg">{msg}</p>
      </div>
      <span className="toast__action" aria-hidden="true">
        {action}
      </span>
      <span className="toast__timer" aria-hidden="true" />
    </div>
  )
}

export function StatesSlide() {
  return (
    <div className="states-slide">
      <div className="container">
        <ChapterHeader
          no="12"
          title="The states nobody screenshots"
          lede="A design proves itself off the happy path — menus open, data missing, things failing. Three exhibits."
        />
      </div>

      {/* ---- Beat 1: open menus ---- */}
      <div className="container states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">01</span>
          <h3 className="states-slide__headline">Menus, open</h3>
          <p className="states-slide__line">
            The two overlays a session actually lives in — the artist switcher
            and the notifications feed — designed as first-class surfaces, not
            afterthoughts.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__menus" amount={0.3}>
          <figure className="states-slide__menu">
            <DecisionFigure
              src={SCREENS.overviewArtistSwitcher}
              alt="The artist switcher popover, open: Echo Theory selected, Nova Reign below, add-account and log-out actions"
              crop={{ x: 0.005, y: 0.6, w: 0.245, h: 0.34 }}
            />
            <figcaption>Artist switcher — popover</figcaption>
          </figure>
          <figure className="states-slide__menu">
            <DecisionFigure
              src={SCREENS.overviewNotificationsFlyout}
              alt="The notifications flyout, open: milestone, spillover and playlist items with plain-language explanations"
              crop={{ x: 0.71, y: 0.07, w: 0.28, h: 0.58 }}
            />
            <figcaption>Notifications — flyout</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ---- Beat 2: empty state ---- */}
      <div className="container states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">02</span>
          <h3 className="states-slide__headline">The empty state proposes</h3>
          <p className="states-slide__line">
            Compare, before a baseline is chosen. Instead of a blank stage, it
            suggests one — the empty state is the feature&rsquo;s first
            teacher.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__empty" amount={0.3}>
          <img
            src={SCREENS.compareEmpty}
            alt="Trumpet Compare in its empty state — one release charted, with a prompt suggesting a baseline release to compare against"
            width={SCREEN_W}
            height={SCREEN_H}
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>

      {/* ---- Beat 3: feedback toasts ---- */}
      <div className="container states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">03</span>
          <h3 className="states-slide__headline">Feedback, both directions</h3>
          <p className="states-slide__line">
            Two toasts, one anatomy — a status icon, a plain-language line, a
            single action. Only the color and the verb change.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__feedback" amount={0.3}>
          <figure className="states-slide__toast">
            <Toast
              tone="error"
              icon={<AlertIcon />}
              title="Couldn’t connect to Spotify"
              msg="Showing your last synced data from 2h ago."
              action="Retry"
            />
            <figcaption>Error toast</figcaption>
          </figure>
          <figure className="states-slide__toast">
            <Toast
              tone="success"
              icon={<CheckIcon />}
              title="Milestone reached"
              msg="After Dark just crossed 1M streams."
              action="View"
            />
            <figcaption>Success toast</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  )
}
