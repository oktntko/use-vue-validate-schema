import { dirname, resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'use-validate-zod-vue',
      // the proper extensions will be added
      fileName: 'index',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'microdiff', 'zod'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          microdiff: 'microdiff',
          zod: 'zod',
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./packages', import.meta.url)),
    },
  },
});
