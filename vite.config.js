import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true,
    port: 5173,
    host: '0.0.0.0',
    allowedHosts: [
      'ws.a3-507.top',
      '.a3-507.top'  // 允许所有子域名
    ]
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})
