---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: UseVueValidateSchema
  text: Use Vue As Is, Simple Form Validation
  tagline: Little changes ･ Schema reuse ･ Developer experience
  image:
    src: /logo.svg
    alt: UseVueValidateSchema
  actions:
    - theme: brand
      text: Getting Started
      link: /getting-started
    - theme: alt
      text: Live Examples
      link: /complicated-schema

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

## Schema Based Validation

Validation is left to the Schema-based library.  
`UseVueValidateSchema` simply connects Vue and Schema.  
You can use with

- [zod(v3)](https://v3.zod.dev/)
- [valibot](https://valibot.dev/)

## Little Changes

If you are already using a schema-based library, the implementation takes just a few lines.

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod'; // [!code ++]
import { ref } from 'vue';
import { z } from 'zod';
import { schema } from '~/path/to/schema';

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue); // [!code ++]

function handleSubmit() { // [!code --]
const handleSubmit = validateSubmit(() => { // [!code ++]
  window.alert('success!');
}); // [!code ++]
} // [!code --]
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
      <ErrorMessage field="username" multiple></ErrorMessage> <!-- [!code ++] -->
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
      <ErrorMessage field="email" multiple></ErrorMessage> <!-- [!code ++] -->
    </div>

    <button type="submit">submit</button>
  </form>
</template>
```

== valibot
```vue
<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot'; // [!code ++]
import * as v from 'valibot';
import { ref } from 'vue';
import { schema } from '~/path/to/schema';

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue); // [!code ++]

function handleSubmit() { // [!code --]
const handleSubmit = validateSubmit(() => { // [!code ++]
  window.alert('success!');
}); // [!code ++]
} // [!code --]
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
      <ErrorMessage field="username" multiple></ErrorMessage> <!-- [!code ++] -->
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
      <ErrorMessage field="email" multiple></ErrorMessage> <!-- [!code ++] -->
    </div>

    <div>
      <button type="submit">submit</button>
    </div>
  </form>
</template>
```
:::

## Developer Experience

It is designed with typing safety in mind.  

![hint](/hint.png)


## Try it now!

<script setup lang="ts">
import TryItNow from './TryItNow.vue'
</script>

<TryItNow></TryItNow>
