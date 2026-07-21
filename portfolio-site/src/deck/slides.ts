import type { ComponentType } from 'react'
import { TitleSlide } from '../slides/TitleSlide/TitleSlide'
import { ContextSlide } from '../slides/ContextSlide/ContextSlide'
import { ResearchSlide } from '../slides/ResearchSlide/ResearchSlide'
import { JourneySlide } from '../slides/JourneySlide/JourneySlide'
import { SolutionSlide } from '../slides/SolutionSlide/SolutionSlide'
import { FlowSlide } from '../slides/FlowSlide/FlowSlide'
import { WireframesSlide } from '../slides/WireframesSlide/WireframesSlide'
import { BrandingSlide } from '../slides/BrandingSlide/BrandingSlide'
import { VisualLanguageSlide } from '../slides/VisualLanguageSlide/VisualLanguageSlide'
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
  { id: 'research', no: '03', label: 'The problem', kind: 'static', Component: ResearchSlide },
  { id: 'journey', no: '04', label: 'User journey', kind: 'static', Component: JourneySlide },
  { id: 'solution', no: '05', label: 'The solution', kind: 'static', Component: SolutionSlide },
  { id: 'flow', no: '06', label: 'App flow', kind: 'runway', Component: FlowSlide },
  { id: 'wireframes', no: '07', label: 'Wireframes', kind: 'runway', Component: WireframesSlide },
  { id: 'branding', no: '08', label: 'Branding', kind: 'static', Component: BrandingSlide },
  { id: 'visual-language', no: '09', label: 'Visual language', kind: 'static', Component: VisualLanguageSlide },
  { id: 'screens', no: '10', label: 'The screens', kind: 'runway', Component: ScreensSlide },
  { id: 'decisions', no: '11', label: 'Decisions', kind: 'runway', Component: DecisionsSlide },
  { id: 'compare', no: '12', label: 'Compare', kind: 'runway', Component: CompareSlide },
  { id: 'states', no: '13', label: 'Edge cases', kind: 'runway', Component: StatesSlide },
  { id: 'close', no: '14', label: 'Close', kind: 'static', Component: CloseSlide },
]
