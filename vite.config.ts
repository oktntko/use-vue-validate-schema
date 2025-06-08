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
      entry: {
        index: resolve(__dirname, 'lib/index.ts'),
        valibot: resolve(__dirname, 'lib/valibot/index.ts'),
        zod: resolve(__dirname, 'lib/zod/index.ts'),
        zodV4: resolve(__dirname, 'lib/zodV4/index.ts'),
      },
      name: 'use-vue-validate-schema',
      fileName: (format, entryName) => {
        if (entryName === 'index') {
          return `index.${format}.js`;
        } else {
          return `${entryName}/index.${format}.js`;
        }
      },
    },
    rollupOptions: {
      external: ['vue', 'valibot', 'zod'],
      output: {
        globals: {
          vue: 'Vue',
          valibot: 'valibot',
          zod: 'zod',
        },
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./lib', import.meta.url)),
    },
  },
});
