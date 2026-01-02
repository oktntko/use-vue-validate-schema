---
outline: deep
---

# validateSubmit

## Overview

`validateSubmit` is a function that wraps your submission callback with validation logic. It validates the form data against the schema before executing your callback, and optionally handles validation errors.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  callback: (value: z.output<typeof schema>) => void,
  options?: {
    handleValidateError?: (
      error: PartialRecord<StringPaths<z.infer<typeof schema>>, string[]>,
    ) => void;
  },
) => () => Promise<void>
```
== zod(v4)
```ts
const { validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  callback: (value: z.output<typeof schema>) => void,
  options?: {
    handleValidateError?: (
      error: PartialRecord<StringPaths<z.infer<typeof schema>>, string[]>,
    ) => void;
  },
) => () => Promise<void>
```
== valibot
```ts
const { validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit(
  callback: (value: v.InferOutput<typeof schema>) => void,
  options?: {
    handleValidateError?: (
      error: PartialRecord<StringPaths<v.InferInput<typeof schema>>, string[]>,
    ) => void;
  },
) => () => Promise<void>
```
:::

## Parameters

### callback
- **Type**: `(value: OutputType) => void`
- **Required**: Yes
- **Description**: Function to be executed if validation succeeds. Receives the validated data.

### options.handleValidateError
- **Type**: `(error: ErrorMap) => void`
- **Required**: No
- **Description**: Callback executed if validation fails. Receives an object mapping field paths to error message arrays.

## Behavior

1. Validates the current form data against the schema
2. Sets `isSubmitted` to `true`
3. If validation succeeds:
   - Calls your `callback` with the validated data
   - Resets `isSubmitted` to `false`
4. If validation fails:
   - Calls `handleValidateError` if provided
   - Does not call your callback

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  username: z.string().min(1).max(10),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Submission successful:', validValue);
    // Send data to server
  },
  {
    handleValidateError(errors) {
      console.log('Validation failed:', errors);
      // Show error message to user
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="modelValue.username" />
    <input v-model="modelValue.email" />
    <button type="submit">Submit</button>
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
  username: z.string().min(1).max(10),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Submission successful:', validValue);
    // Send data to server
  },
  {
    handleValidateError(errors) {
      console.log('Validation failed:', errors);
      // Show error message to user
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="modelValue.username" />
    <input v-model="modelValue.email" />
    <button type="submit">Submit</button>
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
  username: v.pipe(v.string(), v.minLength(1), v.maxLength(10)),
  email: v.pipe(v.string(), v.email()),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Submission successful:', validValue);
    // Send data to server
  },
  {
    handleValidateError(errors) {
      console.log('Validation failed:', errors);
      // Show error message to user
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="modelValue.username" />
    <input v-model="modelValue.email" />
    <button type="submit">Submit</button>
  </form>
</template>
```
:::

## Notes

- The returned function is `async` and can be awaited
- `isSubmitted` is set to `true` during validation, which affects when `ErrorMessage` displays errors
- After successful submission, `isSubmitted` is reset to `false`
- Validation runs even if the form hasn't been modified
