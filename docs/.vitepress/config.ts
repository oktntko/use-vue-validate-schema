import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'use-vue-validate-schema',
  description: 'use-vue-validate-schema',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'use-vue-validate-schema': path.resolve(__dirname, '../../lib'),
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'my-examples', link: '/my-examples' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
          { text: 'my-examples', link: '/my-examples' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
});
