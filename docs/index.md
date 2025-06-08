---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: UseVueValidateSchema
  text: Use Vue As Is, Simple Form Validation
  tagline: Schema Based Validation ･ Little Changes ･ Developer experience
  image:
    src: /logo.svg
    alt: UseVueValidateSchema
  actions:
    - theme: brand
      text: Getting Started
      link: /introduction/getting-started
    - theme: alt
      text: Examples
      link: /examples/basic-usage

features:
  - icon: 💯
    title: Schema Based Validation
    details: Use powerful schema-based libraries for validation (e.g. Zod, Valibot) so you don't need to learn this library validation rules.
  - icon: 🤏
    title: Little Changes
    details: Use Vue as is, so need little changes. Making integration with custom components is easy.
  - icon: 🛠️
    title: Developer Experience
    details: It enhances your TypeScript development experience by being type-safe and type-hinting enabled.
---


## Try it now!

<script setup lang="ts">
import TryItNow from './TryItNow.vue'
</script>

<TryItNow></TryItNow>
