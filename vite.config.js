import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig(({ command }) => ({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['PerfectScrollbar', 'perfect-scrollbar'].includes(tag)
        }
      }
    }),
    visualizer({ open: command === 'build' }) 
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2022', 
    emptyOutDir: true,
    ssr: 'src/entry-server.js', 
    outDir: 'dist',
    rollupOptions: {
      input: {
        app: './index.html', 
        server: './src/entry-server.js' 
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lodash')) {
              return 'vendor-lodash'
            }
            const packageName = id.split('node_modules/')[1].split('/')[0]
            return `vendor-${packageName.replace('@', '')}`
          }
        }
      }
    }
  },
  ssr: {
    noExternal: ['lodash'] 
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true
  }
}))