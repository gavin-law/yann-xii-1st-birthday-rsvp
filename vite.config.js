import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' makes all asset paths relative, so the built site works both
// locally and under a GitHub Pages sub-path (https://user.github.io/repo/).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
})
