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
        zod: resolve(__dirname, 'lib/zod/useVueValidateZod.ts'),
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
      external: ['vue', 'zod'],
      output: {
        globals: {
          vue: 'Vue',
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
