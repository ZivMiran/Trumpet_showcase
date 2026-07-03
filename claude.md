# System Prompt for Claude / AI Builder
**Project:** Trumpet Portfolio Site (Showcase)
**Goal:** Generate a high-end, one-page case study website.
**Purpose:** Purely for presenting the 'Trumpet' music dashboard project to potential employers.

## Global Directives
- **Responsive First:** All sections MUST explicitly handle mobile layouts. Stack columns vertically on screens < 768px, reduce hero fonts to 40px, and ensure comfortable touch targets (min 44x44px).
- **Whitespace & Pacing:** Use generous padding (e.g., `py-24` on desktop, `py-16` on mobile) to let the sections breathe. Scrolling should feel like a narrative story.
- **Accessibility:** Never use Brass Gold (`#e3b53a`) for body text on Charcoal Black (`#16171a`). Keep body text Warm Off-White (`#f0ede5`) for readability. Gold is strictly for accents, borders, and interactive elements.
- **Narrative Focus:** Every section must be framed through the lens of a **professional case study**. Start with the human/business problem, then show the design/functional solution.

---

## 🟩 Section 1: Hero & Brand Reveal (The Core Identity)
**Layout:** 50/50 vertical split on desktop, stacked on mobile.
- **Left side:** A clean typographic stack. 
  - Headline: "Trumpet: Analytics for Creators, Not Analysts."
  - Subtitle: "A single, noise-free home for your music data. Transforming spreadsheet fatigue into actionable artist strategy."
- **Right side:** A beautiful, interactive preview frame displaying the music release dashboard interface. 
  - **Interaction:** Smoothly expands on hover, casting a soft gold glow overlay (`drop-shadow-lg` with gold tint) onto the background.

## 🟩 Section 2: The Core Chaos vs. The Solution
**Title:** "01 / The Creator Dilemma"
**Layout:** 2-column grid. (Mobile: stack left column first, right column second).
- **Left Column (The Pain Points - Scattered Chaos):** - Highlight the real human research: "Artists and managers are trapped in the Memory Trap, manually aggregating data across 5+ platforms, leading to Excel fatigue and missed opportunities."
- **Right Column (The Solution - Sleek Containers):** - Highlight the Trumpet value: "Trumpet replaces manual tracking with a unified, cross-platform aggregation engine."

## 🟩 Section 3: Flattening the Hierarchy
**Title:** "02 / Noise Reduction Architecture"
**Layout:** Asymmetrical grid.
- **Left Side:** Sticky explainer card (stays pinned while right side scrolls). 
  - Title: 'Stop Digging Through Menus'.
  - Text: 'Analytical tools often hide critical metrics. Trumpet surface-levels release strategy indicators, allowing users to build muscle memory.'
- **Right Side:** A wireframe grid map of the interface. 
  - Style: Minimal gold outlines on charcoal, showing the flat navigation structure.

## 🟩 Section 4: The Live Interactive Showcase (The Overlay Tool)
**Title:** "03 / Shifting from Guesswork to Visual Clarity"
**Layout:** Text left, Interactive widget right.
- **Context:** 'Showcase the Release Comparison Engine. Artists can overlay previous release benchmarks onto current trendlines to measure performance velocity.'
- **Widget:** Functional interactive chart. Include a toggle button labeled `[ Compare with Prior Track ]`.

## 🟩 Section 5: The Design System Shelf
**Title:** "04 / The Trumpet Spec Shelf"
**Layout:** Wrapping horizontal grid row.
- **Purpose:** Demonstrate visual craft and professional standard compliance.
- **Elements:**
  - Color Palette: Circles showing `#16171a`, `#e3b53a`, `#f0ede5`.
  - Type Stack: Showcase 'Space Grotesk' usage.
  - UI Component: A sample button and layout widget. Include a label: 'Snappy feedback, high-contrast, studio-optimized.'
