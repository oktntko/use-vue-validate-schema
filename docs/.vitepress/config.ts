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
  head: [['link', { rel: 'icon', href: '/use-vue-validate-schema/favicon.ico' }]],
  themeConfig: {
    logo: '/logo.svg',

    search: {
      provider: 'local',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Introduction', link: '/getting-started' },
      { text: 'Reference', link: '/reference' },
      { text: 'Live Examples', link: '/basic-usage' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'xxx', link: '/xxx' },
          { text: 'xxx', link: '/xxx' },
        ],
      },
      {
        text: 'Reference',
        items: [{ text: 'Reference', link: '/reference' }],
      },
      {
        text: 'Live Examples',
        items: [
          { text: 'Basic Usage', link: '/basic-usage' },
          { text: 'Array Object Schema', link: '/array-object-schema' },
          { text: 'Complicated Schema', link: '/complicated-schema' },
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
