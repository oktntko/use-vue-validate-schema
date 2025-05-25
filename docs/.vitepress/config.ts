import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig } from 'vitepress';
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'UseVueValidateSchema',
  description: 'Use Vue As Is, Simple Form Validation',
  base: '/use-vue-validate-schema/',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        'use-vue-validate-schema': path.resolve(__dirname, '../../lib'),
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'basic-usage', link: '/basic-usage' },
      { text: 'complicated-schema', link: '/complicated-schema' },
      { text: 'array-object-schema', link: '/array-object-schema' },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'basic-usage', link: '/basic-usage' },
          { text: 'complicated-schema', link: '/complicated-schema' },
          { text: 'array-object-schema', link: '/array-object-schema' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/oktntko/use-vue-validate-schema' }],
  },
  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },
});
