import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/global.css'
import './styles/motion.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // NOTE: StrictMode intentionally omitted. Framer Motion's useScroll double-
  // mounts under StrictMode in dev and leaves a stale scroll source driving the
  // Compare crossfade (a dev-only quirk). Prod already runs a single mount; this
  // keeps dev behavior identical to prod so what we verify is what ships.
  <App />,
)
