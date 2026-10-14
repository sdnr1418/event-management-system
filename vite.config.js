import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  envDir: "..",
  plugins: [react()],
  server: {
    proxy: {
      '/tm-api': {
        target: 'https://app.ticketmaster.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tm-api/, ''),
      },
    },
  },
})
