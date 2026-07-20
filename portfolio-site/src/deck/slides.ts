import type { ComponentType } from 'react'
import { TitleSlide } from '../slides/TitleSlide/TitleSlide'
import { ContextSlide } from '../slides/ContextSlide/ContextSlide'
import { ProblemSlide } from '../slides/ProblemSlide/ProblemSlide'
import { ResearchSlide } from '../slides/ResearchSlide/ResearchSlide'
import { JourneySlide } from '../slides/JourneySlide/JourneySlide'
import { SolutionSlide } from '../slides/SolutionSlide/SolutionSlide'
import { FlowSlide } from '../slides/FlowSlide/FlowSlide'
import { WireframesSlide } from '../slides/WireframesSlide/WireframesSlide'
import { IterationSlide } from '../slides/IterationSlide/IterationSlide'
import { BrandingSlide } from '../slides/BrandingSlide/BrandingSlide'
import { PaletteTypeSlide } from '../slides/PaletteTypeSlide/PaletteTypeSlide'
import { SpaceMotionSlide } from '../slides/SpaceMotionSlide/SpaceMotionSlide'
import { ScreensSlide } from '../slides/ScreensSlide/ScreensSlide'
import { DecisionsSlide } from '../slides/DecisionsSlide/DecisionsSlide'
import { CompareSlide } from '../slides/CompareSlide/CompareSlide'
import { StatesSlide } from '../slides/StatesSlide/StatesSlide'
import { CloseSlide } from '../slides/CloseSlide/CloseSlide'

/**
 * The deck registry — single source of truth for slide order. The chrome
 * (counter, progress, index overlay), snap stops, hash deep-links and keyboard
 * navigation all derive from this list; slide components never know their own
 * position.
 *
 * `kind` decides the shell: a `static` slide is one full viewport; a `runway`
 * slide is taller than the viewport and scrubs its beats with scroll (the
 * ScreenSequence/CompareStudy pattern — scrolling back replays in reverse).
 */
export type SlideDef = {
  id: string
  no: string
  label: string
  kind: 'static' | 'runway'
  Component: ComponentType
}

export const SLIDES: SlideDef[] = [
  { id: 'title', no: '01', label: 'Trumpet', kind: 'static', Component: TitleSlide },
  { id: 'context', no: '02', label: 'Context', kind: 'static', Component: ContextSlide },
  { id: 'problem', no: '03', label: 'The problem', kind: 'static', Component: ProblemSlide },
  { id: 'research', no: '04', label: 'Research', kind: 'static', Component: ResearchSlide },
  { id: 'journey', no: '05', label: 'User journey', kind: 'static', Component: JourneySlide },
  { id: 'solution', no: '06', label: 'The solution', kind: 'static', Component: SolutionSlide },
  { id: 'flow', no: '07', label: 'App flow', kind: 'runway', Component: FlowSlide },
  { id: 'wireframes', no: '08', label: 'Wireframes', kind: 'runway', Component: WireframesSlide },
  { id: 'iteration', no: '09', label: 'Iteration', kind: 'runway', Component: IterationSlide },
  { id: 'branding', no: '10', label: 'Branding', kind: 'static', Component: BrandingSlide },
  { id: 'palette-type', no: '11', label: 'Color & type', kind: 'static', Component: PaletteTypeSlide },
  { id: 'space-motion', no: '12', label: 'Space & motion', kind: 'static', Component: SpaceMotionSlide },
  { id: 'screens', no: '13', label: 'The screens', kind: 'runway', Component: ScreensSlide },
  { id: 'decisions', no: '14', label: 'Decisions', kind: 'runway', Component: DecisionsSlide },
  { id: 'compare', no: '15', label: 'Compare', kind: 'runway', Component: CompareSlide },
  { id: 'states', no: '16', label: 'Edge cases', kind: 'runway', Component: StatesSlide },
  { id: 'close', no: '17', label: 'Close', kind: 'static', Component: CloseSlide },
]
