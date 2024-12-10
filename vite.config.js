import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['PerfectScrollbar', 'perfect-scrollbar'].includes(tag),
        },
      },
    }),
    visualizer({ open: true }), 
  ],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      lodash: fileURLToPath(new URL('./node_modules/lodash', import.meta.url)), 
    },
  },
  build: {
    rollupOptions: {
      external: ['lodash'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0];
            if (['lodash', '@lodash'].includes(packageName)) {
              return 'shared-libs';
            }
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
});
