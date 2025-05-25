---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'UseVueValidateSchema'
  text: 'Use Vue As Is, Simple Form Validation'
  tagline: Little changes ･ Schema reuse ･ Developer experience
  image:
    src: /logo.svg
    alt: use-vue-validate-schema
  actions:
    - theme: brand
      text: Getting Started
      link: /basic-usage
    - theme: alt
      text: Live Examples
      link: /complicated-schema

features:
  - icon: 🤏
    title: Little Changes
    details: Use Vue as is, so need little changes. So making integration with custom components easy.
  - icon: 💡
    title: Schema Reuse
    details: Use powerful schema-based libraries for validation (e.g. Zod, Valibot) so you don't need to learn your own validation rules.
  - icon: 🛠️
    title: Developer Experience
    details: It enhances your TypeScript development experience by being type-safe and type-hinting enabled.
---

<script setup lang="ts">
import GettingStarted from './GettingStarted.vue'
</script>

<GettingStarted></GettingStarted>
