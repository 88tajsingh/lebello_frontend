import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['PerfectScrollbar', 'perfect-scrollbar'].includes(tag),
        },
      },
    }),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks(id) {
        //   if (id.includes('node_modules')) {
        //     const packageName = id.split('node_modules/')[1].split('/')[0];
        //     return `npm.${packageName.replace('@', '')}`;
        //   }
        // },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true,
  },
});
