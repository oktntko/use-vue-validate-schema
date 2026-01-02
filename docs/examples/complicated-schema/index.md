---
outline: deep
prev:
  text: 'Array Object Schema'
  link: '/examples/array-object-schema'
next: false
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabZodV4 from './TabZodV4.vue'
import TabValibot from './TabValibot.vue'
</script>

# Complicated Schema

This example demonstrates advanced validation scenarios including conditional validation, custom error messages, and complex nested structures. It shows how to handle more sophisticated form requirements.

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
