import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/React-Image-Converter/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true,
    host: true
  },
})