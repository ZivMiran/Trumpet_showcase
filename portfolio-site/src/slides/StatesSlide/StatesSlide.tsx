import type { ReactNode } from 'react'
import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { DecisionFigure } from '../../components/shared/DecisionFigure'
import {
  SCREENS,
  DETAILS,
  COMPARE_EMPTY_W,
  COMPARE_EMPTY_H,
} from '../../lib/screens'
import './StatesSlide.css'

/**
 * 12 — Edge cases & interactive states. Three beats, two exhibits each, so the
 * pairing is the point: the overlays a session lives in, the two screens with
 * nothing to show, and the two ends of a feedback toast. The toasts are built
 * from the app's own tokens (--error / --success, the overlay shadow) rather
 * than captured, so they read as real UI.
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
          lede="A design proves itself off the happy path — surfaces open, nothing to show, something failed. Three states, two exhibits each."
        />
      </div>

      {/* ---- Beat 1: open menus ---- */}
      <div className="container container--wide states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">01</span>
          <h3 className="states-slide__headline">Menus, open</h3>
          <p className="states-slide__line">
            The two overlays a session actually lives in. Each is a designed
            surface — grouped, scannable, one way out — not a list bolted onto
            the header.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__menus" amount={0.3}>
          <figure className="states-slide__menu">
            <DecisionFigure
              src={DETAILS.artistSwitch.src}
              srcW={DETAILS.artistSwitch.w}
              srcH={DETAILS.artistSwitch.h}
              alt="The artist switcher popover, open: Echo Theory selected, Nova Reign below, add-account and log-out actions"
              crop={{ x: 0, y: 0, w: 1, h: 1 }}
            />
            <figcaption>Artist switcher — popover</figcaption>
          </figure>
          <figure className="states-slide__menu">
            <DecisionFigure
              src={DETAILS.notificationFlyout.src}
              srcW={DETAILS.notificationFlyout.w}
              srcH={DETAILS.notificationFlyout.h}
              alt="The notifications flyout, open: milestone, spillover and playlist items with plain-language explanations"
              crop={{ x: 0, y: 0, w: 1, h: 1 }}
            />
            <figcaption>Notifications — flyout</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ---- Beat 2: nothing to show ---- */}
      <div className="container container--wide states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">02</span>
          <h3 className="states-slide__headline">Empty, but not blank</h3>
          <p className="states-slide__line">
            Neither screen strands the artist. Compare has no baseline yet, so
            it proposes one. Search has no match, so it repeats exactly what it
            looked for.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__empties" amount={0.3}>
          <figure className="states-slide__empty">
            <img
              src={SCREENS.compareEmpty}
              alt="Trumpet Compare in its empty state — one release charted, with a prompt suggesting a baseline release to compare against"
              width={COMPARE_EMPTY_W}
              height={COMPARE_EMPTY_H}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Compare — no baseline</figcaption>
          </figure>
          <figure className="states-slide__empty states-slide__empty--strip">
            <img
              src={DETAILS.searchEmpty.src}
              alt="The catalogue search field with “paranoid android” typed, and one line below it: no matches for “paranoid android”"
              width={DETAILS.searchEmpty.w}
              height={DETAILS.searchEmpty.h}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Search — no match</figcaption>
          </figure>
        </Reveal>
      </div>

      {/* ---- Beat 3: feedback toasts ---- */}
      <div className="container container--wide states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">03</span>
          <h3 className="states-slide__headline">Failure and success, one anatomy</h3>
          <p className="states-slide__line">
            A status icon, a plain-language line, a single action, a dismiss
            timer. Only the colour and the verb change, so the pattern is
            learned once.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__feedback" amount={0.3}>
          <figure className="states-slide__toast">
            <Toast
              tone="error"
              icon={<AlertIcon />}
              title="Couldn’t connect to Spotify"
              msg="Showing your last synced data."
              action="Retry"
            />
            <figcaption>Toast — failure</figcaption>
          </figure>
          <figure className="states-slide__toast">
            <Toast
              tone="success"
              icon={<CheckIcon />}
              title="Milestone reached"
              msg="After Dark just crossed 1M streams."
              action="View"
            />
            <figcaption>Toast — success</figcaption>
          </figure>
        </Reveal>
      </div>
    </div>
  )
}
