---
outline: deep
prev: false
next:
  text: 'About'
  link: '/introduction/about'
---

<script setup lang="ts">
import SimpleForm from './SimpleForm.vue'
import TabZod from './TabZod.vue'
import TabValibot from './TabValibot.vue'
</script>

# Getting Started

Get started with `use-vue-validate-schema` using a simple form!  

<SimpleForm></SimpleForm>

::: details source
```vue
<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref({
  username: '',
  email: '',
});

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
    </div>

    <button type="submit">submit</button>
  </form>
</template>
```
:::


## Pre-required

There are no validation rules in `use-vue-validate-schema`.
Validation depends on an external library.
What validation libraries are used in your project?

:::tabs key:schema
== zod(v3)
[zod(v3)](https://v3.zod.dev/)  
Zod is a TypeScript-first validation library. Using Zod, you can define schemas you can use to validate data, from a simple string to a complex nested object.

== zod(v4)
[zod(v4)](https://zod.dev/)  
TypeScript-first schema validation with static type inference. It's faster, slimmer, more `tsc`-efficient, and implements some long-requested features.

== valibot
[valibot](https://valibot.dev/)  
Validate unknown data with confidence. Valibot is the open source schema library for TypeScript with bundle size, type safety and developer experience in mind.
:::

## Installation

Install it using the project's package manager. For example, `npm`, `pnpm`, or `yarn`. `pnpm` is used in this example.

:::tabs key:schema
== zod(v3)
```sh
pnpm i use-vue-validate-schema zod
```
== zod(v4)
```sh
pnpm i use-vue-validate-schema zod
```
== valibot
```sh
pnpm i use-vue-validate-schema valibot
```
:::

## Define your schema

First, define your schema.

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod'; // [!code ++]

const schema = z.object({ // [!code ++]
  username: z.string().trim().min(1).max(10), // [!code ++]
  email: z.string().email().endsWith('@example.com'), // [!code ++]
}); // [!code ++]

const modelValue = ref<z.input<typeof schema>>({ // [!code ++]
  username: '',
  email: '',
});

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```
== zod(v4)
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod'; // [!code ++]

const schema = z.object({ // [!code ++]
  username: z.string().trim().min(1).max(10), // [!code ++]
  email: z.string().email().endsWith('@example.com'), // [!code ++]
}); // [!code ++]

const modelValue = ref<z.input<typeof schema>>({ // [!code ++]
  username: '',
  email: '',
});

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```
== valibot
```vue
<script setup lang="ts">
import { ref } from 'vue';
import * as v from 'valibot'; // [!code ++]

const schema = v.object({ // [!code ++]
  username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)), // [!code ++]
  email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')), // [!code ++]
}); // [!code ++]

const modelValue = ref<v.InferInput<typeof schema>>({ // [!code ++]
  username: '',
  email: '',
});

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```
:::

## Use `use-vue-validate-schema`

Now it's time to `use-vue-validate-schema`. Here we introduce the basic `validateSubmit` and `ErrorMessage`.

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod'; // [!code ++]
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({ 
  username: z.string().trim().min(1).max(10), 
  email: z.string().email().endsWith('@example.com'), 
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue); // [!code ++]

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```
== zod(v4)
```vue
<script setup lang="ts">
import { useVueValidateZodV4 } from 'use-vue-validate-schema/zodV4'; // [!code ++]
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({ 
  username: z.string().trim().min(1).max(10), 
  email: z.string().email().endsWith('@example.com'), 
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZodV4(schema, modelValue); // [!code ++]

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```

== valibot
```vue
<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot'; // [!code ++]
import * as v from 'valibot';
import { ref } from 'vue';

const schema = v.object({
  username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)),
  email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue); // [!code ++]

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
</script>
```
:::

### `validateSubmit`

Functions wrapped in `validateSubmit` will only be executed if the schema passes validation.  

::: tip
You can provide feedback to the user when validation fails by passing the optional `handleValidateError`.
`handleValidateError` is verbose and is intended to be used with `useVueValidateSchema` wrapped around it.
:::

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod';
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({ 
  username: z.string().trim().min(1).max(10),
  email: z.string().email().endsWith('@example.com'),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

function handleSubmit() { // [!code --]
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  ')); // [!code --]
} // [!code --]
const handleSubmit = validateSubmit( // [!code ++]
  (validValue) => { // [!code ++]
    window.alert('success!\n' + JSON.stringify(validValue, null, '  ')); // [!code ++]
  }, // [!code ++]
  { // [!code ++]
    handleValidateError(error) { // [!code ++]
      window.alert('fail!\n' + JSON.stringify(error, null, '  ')); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
); // [!code ++]
</script>
```
== zod(v4)
```vue
<script setup lang="ts">
import { useVueValidateZodV4 } from 'use-vue-validate-schema/zodV4';
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({ 
  username: z.string().trim().min(1).max(10),
  email: z.string().email().endsWith('@example.com'),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZodV4(schema, modelValue);

function handleSubmit() { // [!code --]
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  ')); // [!code --]
} // [!code --]
const handleSubmit = validateSubmit( // [!code ++]
  (validValue) => { // [!code ++]
    window.alert('success!\n' + JSON.stringify(validValue, null, '  ')); // [!code ++]
  }, // [!code ++]
  { // [!code ++]
    handleValidateError(error) { // [!code ++]
      window.alert('fail!\n' + JSON.stringify(error, null, '  ')); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
); // [!code ++]
</script>
```
== valibot
```vue
<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot';
import * as v from 'valibot';
import { ref } from 'vue';

const schema = v.object({
  username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)),
  email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue);

function handleSubmit() { // [!code --]
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  ')); // [!code --]
} // [!code --]
const handleSubmit = validateSubmit( // [!code ++]
  (validValue) => { // [!code ++]
    window.alert('success!\n' + JSON.stringify(validValue, null, '  ')); // [!code ++]
  }, // [!code ++]
  { // [!code ++]
    handleValidateError(error) { // [!code ++]
      window.alert('fail!\n' + JSON.stringify(error, null, '  ')); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
); // [!code ++]
</script>
```
:::

### `ErrorMessage`

`ErrorMessage` is a component that displays an error message when a `field` validation fails.

::: tip
It will not display an error message if the value is an initial value, even if the value fails validation.
The initial value is the value passed when declaring `useVueValidateSchema`.
You can use `reset` to update the initial value.

Even if it matches the initial value, an error message will be displayed after Submit.
:::

:::tabs key:schema
== zod(v3)
```vue
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
== zod(v4)
```vue
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
:::

## Complete

With just a few lines, we were able to integrate the Vue and validation schemas!

<TabZod></TabZod>

::: details source
:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod';
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  username: z.string().trim().min(1).max(10),
  email: z.string().email().endsWith('@example.com'),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    window.alert('success!\n' + JSON.stringify(validValue, null, '  '));
  },
  {
    handleValidateError(error) {
      window.alert('fail!\n' + JSON.stringify(error, null, '  '));
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
      <ErrorMessage field="username" multiple></ErrorMessage>
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
      <ErrorMessage field="email" multiple></ErrorMessage>
    </div>

    <button type="submit">submit</button>
  </form>
</template>
```
== zod(v4)
```vue
<script setup lang="ts">
import { useVueValidateZodV4 } from 'use-vue-validate-schema/zodV4';
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  username: z.string().trim().min(1).max(10),
  email: z.string().email().endsWith('@example.com'),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZodV4(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    window.alert('success!\n' + JSON.stringify(validValue, null, '  '));
  },
  {
    handleValidateError(error) {
      window.alert('fail!\n' + JSON.stringify(error, null, '  '));
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
      <ErrorMessage field="username" multiple></ErrorMessage>
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
      <ErrorMessage field="email" multiple></ErrorMessage>
    </div>

    <button type="submit">submit</button>
  </form>
</template>
```
== valibot
```vue
<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot';
import * as v from 'valibot';
import { ref } from 'vue';

const schema = v.object({
  username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)),
  email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    window.alert('success!\n' + JSON.stringify(validValue, null, '  '));
  },
  {
    handleValidateError(error) {
      window.alert('fail!\n' + JSON.stringify(error, null, '  '));
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username"> username : {{ modelValue.username }} </label>
      <input id="username" v-model="modelValue.username" type="text" />
      <ErrorMessage field="username" multiple></ErrorMessage>
    </div>

    <div>
      <label for="email"> email : {{ modelValue.email }} </label>
      <input id="email" v-model="modelValue.email" type="email" />
      <ErrorMessage field="email" multiple></ErrorMessage>
    </div>

    <button type="submit">submit</button>
  </form>
</template>
```
:::
