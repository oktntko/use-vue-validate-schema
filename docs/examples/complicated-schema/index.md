---
outline: deep
prev:
  text: 'Array Object Schema'
  link: '/examples/array-object-schema'
next: false
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabValibot from './TabValibot.vue'
</script>

# Complicated Schema

This example demonstrates advanced validation scenarios including conditional validation, custom error messages, and complex nested structures. It shows how to handle more sophisticated form requirements.

:::tabs key:schema
== zod
<TabZod></TabZod>
== valibot
<TabValibot></TabValibot>
:::

::: details source
:::tabs key:schema
== zod
<<< ./TabZod.vue
== valibot
<<< ./TabValibot.vue
:::
:::
