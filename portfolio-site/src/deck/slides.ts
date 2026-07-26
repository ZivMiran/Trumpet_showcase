import type { ComponentType } from 'react'
import { TitleSlide } from '../slides/TitleSlide/TitleSlide'
import { ContextSlide } from '../slides/ContextSlide/ContextSlide'
import { ResearchSlide } from '../slides/ResearchSlide/ResearchSlide'
import { JourneySlide } from '../slides/JourneySlide/JourneySlide'
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
 * The deck registry — single source of truth for slide ORDER. The chrome
 * (counter, progress, index overlay), snap stops, hash deep-links and keyboard
 * navigation all derive from this list.
 *
 * The one thing it does not own is the numeral printed on the slide: each slide
 * passes its own `no` to ChapterHeader. Reorder anything here and those have to
 * be renumbered by hand, in the slide and in its doc comment.
 *
 * `kind` decides the shell: a `static` slide is one full viewport; a `runway`
 * slide is taller than the viewport and scrubs its beats with scroll (the
 * SlideSequence pattern — scrolling back replays in reverse).
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
  { id: 'flow', no: '05', label: 'User flow', kind: 'static', Component: FlowSlide },
  { id: 'wireframes', no: '06', label: 'Wireframes', kind: 'static', Component: WireframesSlide },
  { id: 'branding', no: '07', label: 'Branding', kind: 'static', Component: BrandingSlide },
  { id: 'visual-language', no: '08', label: 'Design system', kind: 'static', Component: VisualLanguageSlide },
  { id: 'screens', no: '09', label: 'The screens', kind: 'runway', Component: ScreensSlide },
  { id: 'decisions', no: '10', label: 'The solution', kind: 'runway', Component: DecisionsSlide },
  { id: 'compare', no: '11', label: 'Compare', kind: 'static', Component: CompareSlide },
  { id: 'states', no: '12', label: 'Edge cases', kind: 'runway', Component: StatesSlide },
  { id: 'close', no: '13', label: 'Close', kind: 'static', Component: CloseSlide },
]
