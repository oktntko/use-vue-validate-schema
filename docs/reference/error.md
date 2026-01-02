---
outline: deep
---

# error

## Overview

`error` is a readonly reference that contains all validation error messages. It maps field paths to arrays of error messages. This is useful for accessing raw error data for advanced use cases or logging.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { error } = useVueValidateZod(schema, modelValue);

const errors: DeepReadonly<Ref<PartialRecord<string, string[]>>> = error;
```
== zod(v4)
```ts
const { error } = useVueValidateZod(schema, modelValue);

const errors: DeepReadonly<Ref<PartialRecord<string, string[]>>> = error;
```
== valibot
```ts
const { error } = useVueValidateValibot(schema, modelValue);

const errors: DeepReadonly<Ref<PartialRecord<string, string[]>>> = error;
```
:::

## Type

`DeepReadonly<Ref<PartialRecord<string, string[]>>>` - A read-only deep ref that maps field paths to error message arrays.

## Value Format

An object where:
- **Keys** are field paths (using dot notation: `"name"`, `"user.email"`, `"items.0.price"`)
- **Values** are arrays of error messages for that field

```ts
// Example error object
{
  "email": ["Must be a valid email"],
  "password": ["Must be at least 8 characters"],
  "profile.bio": ["Must be at most 500 characters"]
}
```

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

const modelValue = ref<z.input<typeof schema>>({
  email: 'invalid-email',
  password: 'short',
});

const { error, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Success:', validValue);
  },
  {
    handleValidateError() {
      // Log all errors for debugging
      console.log('All errors:', error.value);
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" />
    </div>

    <!-- Display raw error object for debugging -->
    <pre v-if="Object.keys(error).length > 0">
{{ error }}
    </pre>

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
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

const modelValue = ref<z.input<typeof schema>>({
  email: 'invalid-email',
  password: 'short',
});

const { error, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Success:', validValue);
  },
  {
    handleValidateError() {
      // Log all errors for debugging
      console.log('All errors:', error.value);
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" />
    </div>

    <!-- Display raw error object for debugging -->
    <pre v-if="Object.keys(error).length > 0">
{{ error }}
    </pre>

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
  email: v.pipe(v.string(), v.email('Invalid email format')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  email: 'invalid-email',
  password: 'short',
});

const { error, validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit(
  (validValue) => {
    console.log('Success:', validValue);
  },
  {
    handleValidateError() {
      // Log all errors for debugging
      console.log('All errors:', error.value);
    },
  },
);
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.password" type="password" />
    </div>

    <!-- Display raw error object for debugging -->
    <pre v-if="Object.keys(error).length > 0">
{{ error }}
    </pre>

    <button type="submit">Submit</button>
  </form>
</template>
```
:::

## Common Patterns

### Access specific field errors

:::tabs key:schema
== zod(v3)
```ts
// Get all error messages for a field
const emailErrors = error.value['email']; // string[]

// Check if a field has errors
const hasEmailError = 'email' in error.value;
```
== zod(v4)
```ts
// Get all error messages for a field
const emailErrors = error.value['email']; // string[]

// Check if a field has errors
const hasEmailError = 'email' in error.value;
```
== valibot
```ts
// Get all error messages for a field
const emailErrors = error.value['email']; // string[]

// Check if a field has errors
const hasEmailError = 'email' in error.value;
```
:::

### Get first error message

:::tabs key:schema
== zod(v3)
```ts
const firstError = error.value['email']?.[0] ?? null;
```
== zod(v4)
```ts
const firstError = error.value['email']?.[0] ?? null;
```
== valibot
```ts
const firstError = error.value['email']?.[0] ?? null;
```
:::

### Log all errors

:::tabs key:schema
== zod(v3)
```ts
Object.entries(error.value).forEach(([field, messages]) => {
  console.log(`${field}: ${messages.join(', ')}`);
});
```
== zod(v4)
```ts
Object.entries(error.value).forEach(([field, messages]) => {
  console.log(`${field}: ${messages.join(', ')}`);
});
```
== valibot
```ts
Object.entries(error.value).forEach(([field, messages]) => {
  console.log(`${field}: ${messages.join(', ')}`);
});
```
:::

## Advanced Use Case: Custom Error Display

For displaying errors in a way not supported by [`ErrorMessage`](./ErrorMessage.md), you can work directly with the `error` object:

```vue
<script setup>
const { error } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <!-- Custom error toast notification -->
  <div v-for="(messages, field) in error" :key="field" class="toast error">
    <strong>{{ field }}:</strong>
    {{ messages.join('; ') }}
  </div>
</template>
```

## Relationship with ErrorMessage

The [`ErrorMessage`](./ErrorMessage.md) component is built on top of the `error` object:
- It reads from `error.value` and `errorNest`
- It handles display timing based on `isDirty` and `isSubmitted`
- You can use `error` directly for full control over error rendering

## Comparison with errorNest

- **`error`** - Contains errors for exact field paths only
- **`errorNest`** - Includes errors from all nested sub-fields as well

## Notes

- `error` is read-only to prevent accidental mutations
- It's reactive - updates immediately during validation
- Empty object `{}` means no errors
- Use `.value` to access the actual error object
- For displaying errors in UI, use [`ErrorMessage`](./ErrorMessage.md) component instead
