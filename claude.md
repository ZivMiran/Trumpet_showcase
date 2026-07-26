# Trumpet — project instructions

**What this repo is:** the final presentation of the **Trumpet** music-analytics
dashboard, made for a UX/UI design course. It is emailed to the lecturer as a
link and read unattended — nobody presents it live. It is *not* a
recruiter-facing portfolio site, and not a marketing page. (It began as one; if
you find copy or a doc comment describing a five-section marketing page with a
hero and a "Compare with Prior Track" button, that is a v1 artifact — delete it.)

**Layout**

- `portfolio-site/` — the presentation itself. React + Vite, deployed to GitHub
  Pages on every push to `main` (`.github/workflows/deploy.yml`), base
  `/Trumpet_showcase/`.
- `Trumpet_dashboard_source/` — source of the clickable prototype the deck links
  to. Deployed from its own repo; `node_modules/` and `dist/` are ignored here.
- `Images/` — the high-resolution source exports (mockups, wireframes,
  storyboards, screen recordings) the deck's shipped assets are generated from.

---

## The deck

Thirteen scroll-driven slides. `portfolio-site/src/deck/slides.ts` is the single
source of slide **order**; the chrome, snap assist, hash links and keyboard
navigation all derive from it. Each slide passes its own `no` to `ChapterHeader`,
so reordering means renumbering by hand — in the slide and in its doc comment.

01 title · 02 context · 03 research · 04 journey · 05 user flow ·
06 wireframes · 07 branding · 08 design system · 09 screens · 10 solution ·
11 compare · 12 edge cases · 13 close

A slide is `static` (one viewport) or `runway` (taller, scrubbed by scroll).
Slides 09, 10 and 12 are runways.

## Voice — the part that is easy to get wrong

Two rounds of feedback shaped it: **emphasize value and challenges solved**, and
a v2 that was rejected as *"slop, very junior."* Copy that *claims* qualities
("System Craft", proof cards) or reaches for template patterns reads junior.
Senior work shows the decision in place and lets the reader conclude.

- Never: icon-card grids, self-praise headlines, particle heroes, fake browser
  chrome, hover-lift tiles, decorative animation.
- Always: chapters, annotated figures with a one-line decision note, editorial
  pull-quotes. One tight line per point.
- Every claim is backed by something visible on the same slide. The research
  spine (five numbered pains) is cross-referenced by the journey, the solution
  and the compare chapters — keep those tags in sync.
- US spelling throughout ("color", "catalog", "gray").

## Non-negotiables

**Accessibility.** Brass gold `#e3b53a` is for annotation, active states, links
and one hairline per chapter — **never body text**. Body copy is warm off-white
`#f0ede5` on charcoal `#16171a`. Touch targets ≥ 44×44px.

**Spacing.** Tokens own slide rhythm, in `src/styles/tokens.css`:
`--slide-pad-top/bottom` (on `.slide`, both kinds), `--chapter-gap-below` and
its wider sibling `--chapter-gap-exhibit` (header → content; the exhibit slides
10–12 use the wider one), and `--runway-beat-gap`. Never hand-pick another value
or stack one on top of the header's own margin.

**Motion.** Scroll scrub is a plain scroll listener + `getBoundingClientRect` +
CSS custom properties (`src/lib/ramp.ts`). Framer's `useScroll` is banned for
scrub — it caches bounds at mount and goes stale. **GSAP is removed; do not
reintroduce it**, least of all as a rAF ticker. Reduced motion and screens
≤767px collapse every runway to a static stack.

**Assets.** Design-tool exports are 3456×1944 — far more pixels than any layout
asks for, and enough decode work to stall a good connection for minutes.
Everything ships as WebP at display size via `npm run optimize:images`. Screen
geometry comes from `src/lib/screens.ts` (its constants carry the *ratio*, not
the file size), and every URL goes through `asset()`. Filenames stay lowercase
kebab-case: GitHub Pages is case-sensitive, Windows dev is not, and that has
bitten this project before.

**Responsive.** Columns stack below 768px, hero type drops to 40px, generous
vertical padding. Slide 04 is the one accepted exception to one-slide-one-screen.

## Working here

- Work on `main`; do not branch. "Commit" means local, "push" means deploy.
- `npm run build` runs `tsc -b` — it must pass, and `npm run lint` (oxlint) must
  be clean before pushing, because a push deploys.
- The browser preview pane runs hidden, so `requestAnimationFrame` never fires
  there: Lenis, the snap assist, the constellation and in-view video autoplay
  **cannot** be verified from it. Layout measurement works fine. Verify motion in
  a real browser.
