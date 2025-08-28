# UseVueValidateSchema

> Use Vue As Is, Simple Form Validation.

Schema Based Validation ･ Little Changes ･ Developer experience

<p align="center">
  <a href="https://www.npmjs.com/package/use-vue-validate-schema" target="_blank" rel="noopener noreferrer" style="margin-right: 1rem">
    <img src="https://img.shields.io/npm/v/use-vue-validate-schema" alt="npm-version"/>
  </a>
</p>

<p align="center">
  Ready for
  <a href="https://zod.dev/" target="_blank" rel="noopener noreferrer" style="margin-right: 1rem">
    <img src="https://zod.dev/logo.svg" alt="zod" width="100" height="100"/>
  </a>
  <a href="https://valibot.dev/" target="_blank" rel="noopener noreferrer">
    <img src="https://valibot.dev/logo.svg" alt="valibot" width="100" height="100"/>
  </a>
</p>

## Features

- 💯 **Schema Based Validation**: Use powerful schema-based libraries for validation (e.g. Zod, Valibot) so you don't need to learn this library validation rules.
- 🤏 **Little Changes**: Use Vue as is, so need little changes. Making integration with custom components is easy.
- 🛠️ **Developer Experience**: It enhances your TypeScript development experience by being type-safe and type-hinting enabled.

## Installation

```sh
# pnpm
pnpm i use-vue-validate-schema zod
# or
pnpm i use-vue-validate-schema valibot

# npm
npm i use-vue-validate-schema zod
# or
npm i use-vue-validate-schema valibot

# yarn
yarn add use-vue-validate-schema zod
# or
yarn add use-vue-validate-schema valibot
```

## Usage

```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV4';
import { ref } from 'vue';
import { z } from 'zod/v4';

const schema = z.object({
  username: z.string().trim().min(1),
  email: z.string().email(),
});

const modelValue = ref({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  // Executed only when validation passes
  console.log(validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="modelValue.username" />
    <ErrorMessage field="username" />

    <input v-model="modelValue.email" />
    <ErrorMessage field="email" />

    <button type="submit">Submit</button>
  </form>
</template>
```
