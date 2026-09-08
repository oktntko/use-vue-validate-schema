---
outline: deep
prev:
  text: 'Basic Usage'
  link: '/examples/basic-usage'
next:
  text: 'Complicated Schema'
  link: '/examples/complicated-schema'
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabValibot from './TabValibot.vue'
</script>

# Array Object Schema

This example demonstrates how to validate complex nested object schemas with arrays. It shows a real-world use case of an invoice form with multiple line items, each with their own validation rules.

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
