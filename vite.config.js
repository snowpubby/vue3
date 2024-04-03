import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js' // 将vue别名(alias)指向正确的Vue构建版本
    }
  },
  // 预编译
  optimizeDeps: {
    include: ['vue','vue-router','@/views/system/user/index.vue']
  }

})
