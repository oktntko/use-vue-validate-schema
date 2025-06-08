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
      { text: 'Introduction', link: '/introduction/getting-started' },
      { text: 'Reference', link: '/reference/validateSubmit' },
      { text: 'Examples', link: '/examples/basic-usage' },
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/introduction/getting-started' },
          { text: 'About', link: '/introduction/about' },
        ],
      },
      {
        text: 'Reference',
        items: [
          { text: 'validateSubmit', link: '/reference/validateSubmit' },
          { text: 'ErrorMessage', link: '/reference/ErrorMessage' },
          { text: 'isInvalid', link: '/reference/isInvalid' },
          { text: 'isDirty', link: '/reference/isDirty' },
          { text: 'isSubmitted', link: '/reference/isSubmitted' },
          { text: 'revert', link: '/reference/revert' },
          { text: 'reset', link: '/reference/reset' },
          { text: 'diff', link: '/reference/diff' },
          { text: 'error', link: '/reference/error' },
          { text: 'errorNest', link: '/reference/errorNest' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Basic Usage', link: '/examples/basic-usage' },
          { text: 'Array Object Schema', link: '/examples/array-object-schema' },
          { text: 'Complicated Schema', link: '/examples/complicated-schema' },
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
