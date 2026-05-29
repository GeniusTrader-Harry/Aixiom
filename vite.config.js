import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // Allow the hosted preview proxy to reach the dev server. Without this,
    // Vite rejects proxied requests with "Blocked request. This host is not allowed."
    allowedHosts: true,
  },
  preview: {
    host: true,
    allowedHosts: true,
  },
})
