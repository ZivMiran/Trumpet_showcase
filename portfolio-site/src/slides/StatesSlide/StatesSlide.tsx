import { Reveal } from '../../components/shared/Reveal'
import { ChapterHeader } from '../../components/shared/ChapterHeader'
import { DecisionFigure } from '../../components/shared/DecisionFigure'
import { PendingSlot } from '../../components/shared/PendingSlot'
import { SCREENS, SCREEN_W, SCREEN_H } from '../../lib/screens'
import './StatesSlide.css'

/**
 * 16 — Edge cases & interactive states. Three beats: the open overlays a
 * session lives in, the empty state that proposes instead of apologizing,
 * and the feedback pair (error / success) — shown as designed slots until
 * the final artwork drops in.
 */
export function StatesSlide() {
  return (
    <div className="states-slide">
      <div className="container">
        <ChapterHeader
          no="13"
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

      {/* ---- Beat 3: feedback pair (pending artwork) ---- */}
      <div className="container states-slide__beat">
        <Reveal standalone className="states-slide__beat-text" amount={0.4}>
          <span className="states-slide__no tnum">03</span>
          <h3 className="states-slide__headline">Feedback, both directions</h3>
          <p className="states-slide__line">
            The error and success voices share one anatomy — same surface, same
            type, one tinted edge. The slots below hold their places until the
            final artwork lands.
          </p>
        </Reveal>
        <Reveal standalone className="states-slide__feedback" amount={0.3}>
          <PendingSlot
            kind="state"
            tone="error"
            label="Error state — pending"
            note="e.g. “Couldn’t connect to Spotify — data may be stale.”"
          />
          <PendingSlot
            kind="state"
            tone="success"
            label="Success state — pending"
            note="e.g. “Goal reached — After Dark crossed 1M streams.”"
          />
        </Reveal>
      </div>
    </div>
  )
}
