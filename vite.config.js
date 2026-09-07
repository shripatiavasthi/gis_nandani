import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { seoBuild } from './scripts/seo-build.js'

export default defineConfig({
  plugins: [react(), seoBuild()],
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
