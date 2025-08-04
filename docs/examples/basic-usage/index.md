---
outline: deep
prev: false
next:
  text: 'Array Object Schema'
  link: '/examples/array-object-schema'
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabZodV4 from './TabZodV4.vue'
import TabValibot from './TabValibot.vue'
</script>

# Basic Usage

このページでは、 [vue docs](https://vuejs.org/guide/essentials/forms.html) の Form Input Bindings を使ったフォームを使って、
`use-vue-validate-schema`の使用方法を紹介します。

:::tabs key:schema
== zod(v3)
<TabZod></TabZod>
== zod(v4)
<TabZodV4></TabZodV4>
== valibot
<TabValibot></TabValibot>
:::

::: details source
:::tabs key:schema
== zod(v3)
<<< ./TabZod.vue
== zod(v4)
<<< ./TabZodV4.vue
== valibot
<<< ./TabValibot.vue
:::
