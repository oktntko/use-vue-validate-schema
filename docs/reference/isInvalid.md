---
outline: deep
---

# isInvalid

## Overview

`isInvalid` is a computed reference that indicates whether the form currently has any validation errors. It returns `true` if there are errors, `false` if the form is valid.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { isInvalid } = useVueValidateZod(schema, modelValue);

const isFormInvalid: ComputedRef<boolean> = isInvalid;
```
== zod(v4)
```ts
const { isInvalid } = useVueValidateZod(schema, modelValue);

const isFormInvalid: ComputedRef<boolean> = isInvalid;
```
== valibot
```ts
const { isInvalid } = useVueValidateValibot(schema, modelValue);

const isFormInvalid: ComputedRef<boolean> = isInvalid;
```
:::

## Type

`ComputedRef<boolean>` - A read-only computed reference that returns a boolean value.

## Value

- **`true`** - The form has validation errors
- **`false`** - The form is valid (no errors)

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const modelValue = ref<z.input<typeof schema>>({
  email: '',
  password: '',
});

const { isInvalid, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" placeholder="Email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" placeholder="Password" />
    </div>
    <!-- Disable submit button when form is invalid -->
    <button type="submit" :disabled="isInvalid">
      Submit
    </button>
  </form>
</template>
```
== zod(v4)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV4';
import { ref } from 'vue';
import { z } from 'zod/v4';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const modelValue = ref<z.input<typeof schema>>({
  email: '',
  password: '',
});

const { isInvalid, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" placeholder="Email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" placeholder="Password" />
    </div>
    <!-- Disable submit button when form is invalid -->
    <button type="submit" :disabled="isInvalid">
      Submit
    </button>
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
  email: v.pipe(v.string(), v.email()),
  password: v.pipe(v.string(), v.minLength(8)),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  email: '',
  password: '',
});

const { isInvalid, validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" placeholder="Email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" placeholder="Password" />
    </div>
    <!-- Disable submit button when form is invalid -->
    <button type="submit" :disabled="isInvalid">
      Submit
    </button>
  </form>
</template>
```
:::

## Use Cases

- **Disable submit button** - Prevent form submission when validation fails
- **Show/hide UI elements** - Conditionally display elements based on form validity
- **Real-time feedback** - Show visual indicators of form state

## Notes

- `isInvalid` is reactive and updates immediately as the form changes
- It's a computed value that checks if the `error` object has any keys
- Independent of `isSubmitted` - reflects actual validation state
