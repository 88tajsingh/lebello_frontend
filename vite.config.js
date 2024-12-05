import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0];
            return `npm.${packageName.replace('@', '')}`;
          }
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => 
        [ 'PerfectScrollbar', 'perfect-scrollbar', 'v-card'].includes(tag),
    },
  },
});
