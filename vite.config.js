import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // GitHub Pages serves from https://orisho7.github.io/portfolio/
  // Change 'portfolio' to match your exact GitHub repo name
  base: '/portfolio/',
})
