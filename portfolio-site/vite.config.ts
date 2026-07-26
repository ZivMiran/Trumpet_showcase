import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Trumpet_showcase/',
  plugins: [react()],
  // Honour an assigned PORT (preview tooling hands one over) and otherwise
  // keep Vite's own free-port fallback.
  server: { port: Number(process.env.PORT) || undefined },
})
