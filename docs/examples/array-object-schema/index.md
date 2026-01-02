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
import TabZodV4 from './TabZodV4.vue'
import TabValibot from './TabValibot.vue'
</script>

# Array Object Schema

This example demonstrates how to validate complex nested object schemas with arrays. It shows a real-world use case of an invoice form with multiple line items, each with their own validation rules.

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
:::
