---
outline: deep
---

# isSubmitted

## Overview

`isSubmitted` is a readonly reference that indicates whether the form submission has been attempted. It's set to `true` during validation and reset to `false` after successful submission.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { isSubmitted } = useVueValidateZod(schema, modelValue);

const submitted: Readonly<Ref<boolean>> = isSubmitted;
```
== zod(v4)
```ts
const { isSubmitted } = useVueValidateZod(schema, modelValue);

const submitted: Readonly<Ref<boolean>> = isSubmitted;
```
== valibot
```ts
const { isSubmitted } = useVueValidateValibot(schema, modelValue);

const submitted: Readonly<Ref<boolean>> = isSubmitted;
```
:::

## Type

`Readonly<Ref<boolean>>` - A read-only ref that returns a boolean value.

## Value

- **`true`** - Form submission was attempted
- **`false`** - Form has not been submitted, or submission succeeded

## Behavior

- Set to `true` when `validateSubmit` starts validation
- Set to `false` when:
  - Validation succeeds and callback executes
  - Form is reset with `reset()`
  - Form is reverted with `revert()`

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { isSubmitted, validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted successfully:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="modelValue.username" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="username" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" type="email" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="email" />
    </div>

    <button type="submit">
      {{ isSubmitted ? 'Please fix errors' : 'Submit' }}
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
  username: z.string().min(1),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { isSubmitted, validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted successfully:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="modelValue.username" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="username" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" type="email" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="email" />
    </div>

    <button type="submit">
      {{ isSubmitted ? 'Please fix errors' : 'Submit' }}
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
  username: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { isSubmitted, validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  console.log('Form submitted successfully:', validValue);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="username">Username</label>
      <input id="username" v-model="modelValue.username" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="username" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" type="email" />
      <!-- Show error only after first submit attempt -->
      <ErrorMessage v-if="isSubmitted" field="email" />
    </div>

    <button type="submit">
      {{ isSubmitted ? 'Please fix errors' : 'Submit' }}
    </button>
  </form>
</template>
```
:::

## Use Cases

- **Show errors only on submit** - Avoid showing errors while user is typing
- **Dynamic button text** - Change button label based on submission state
- **Focus management** - Focus first error field after failed submission
- **Loading state** - Show loading indicator during async submission

## Connection with ErrorMessage

The [`ErrorMessage`](./ErrorMessage.md) component uses `isSubmitted` internally:
- Shows error when field is modified AND either `isSubmitted` is true OR field differs from initial value
- This prevents showing errors on untouched fields until form submission

## Notes

- `isSubmitted` is a ref (not a computed), making it a simple boolean flag
- It's read-only to prevent external mutations
- It's automatically managed by the validation system
- Use with `ErrorMessage` for smart error display timing
