import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/React-Image-Converter/',
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    open: true,
  },
})
