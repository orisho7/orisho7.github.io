import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Deploying to https://orisho7.github.io/ → root path, no subfolder
  base: '/',
})
