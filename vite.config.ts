import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [],
    exclude: [],
    force: true, // Force re-optimization of dependencies
  },
})
