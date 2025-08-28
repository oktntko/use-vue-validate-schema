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

This page demonstrates how to use `use-vue-validate-schema` with a form built using the Form Input Bindings from the [Vue documentation](https://vuejs.org/guide/essentials/forms.html).

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
