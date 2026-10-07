import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // "Present" in the experience timeline resolves to this date. It is baked
    // in at build time so the prerendered HTML and the hydrating client agree.
    __BUILD_DATE__: JSON.stringify(new Date().toISOString().slice(0, 10)),
  },
})
