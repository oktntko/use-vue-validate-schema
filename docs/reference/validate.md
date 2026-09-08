---
outline: deep
---

# validate

## Overview

`validate` validates a value against the schema and returns the schema library's safe parse result. It can be used when validation needs to be triggered manually, without wrapping a submit callback.

## Signature

:::tabs key:schema
== zod
```ts
const { validate } = useVueValidateZod(schema, modelValue);

const result = await validate(
  value?: z.input<typeof schema>,
  options?: { diffOnly: boolean },
);
```
== valibot
```ts
const { validate } = useVueValidateValibot(schema, modelValue);

const result = await validate(
  value?: v.InferInput<typeof schema>,
  options?: { diffOnly: boolean },
);
```
:::

## Parameters

### value

- **Type**: Schema input type
- **Required**: No
- **Default**: `modelValue.value`
- **Description**: The value to validate. When omitted, the current form value is validated.

### options.diffOnly

- **Type**: `boolean`
- **Required**: No
- **Description**: When `true`, keep validation errors only for fields included in `diff`. This filtering is also used by the form's automatic validation watcher.

## Return Value

`validate` returns a promise containing the schema library's safe parse result.

:::tabs key:schema
== zod
```ts
Promise<z.SafeParseResult<z.output<typeof schema>>>
```
== valibot
```ts
Promise<v.SafeParseResult<typeof schema>>
```
:::

When `result.success` is `true`, the parsed value is available as `result.data` in Zod or `result.output` in Valibot. When it is `false`, the validation issues are available as `result.error` in Zod or `result.issues` in Valibot.

## Error State

After validation:

- Successful validation clears `error`.
- Failed validation updates `error` with field paths and their messages.
- With `diffOnly: true`, unchanged fields are excluded while `isSubmitted` is `false`.
- Calling `validate` directly does not change `isSubmitted`.

## Example

:::tabs key:schema
== zod
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { z } from 'zod';
import { useVueValidateZod } from 'use-vue-validate-schema';

const schema = z.object({
  email: z.string().email('Enter a valid email address'),
});

const modelValue = ref<z.input<typeof schema>>({
  email: '',
});

const { validate, error } = useVueValidateZod(schema, modelValue);

async function checkForm() {
  const result = await validate();

  if (result.success) {
    console.log('Valid value:', result.data);
  } else {
    console.log('Invalid value:', error.value);
  }
}
</script>

<template>
  <form @submit.prevent="checkForm">
    <input v-model="modelValue.email" type="email" />
    <p v-if="error.email">{{ error.email[0] }}</p>
    <button type="submit">Check</button>
  </form>
</template>
```
== valibot
```vue
<script setup lang="ts">
import * as v from 'valibot';
import { ref } from 'vue';
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  email: '',
});

const { validate, error } = useVueValidateValibot(schema, modelValue);

async function checkForm() {
  const result = await validate();

  if (result.success) {
    console.log('Valid value:', result.output);
  } else {
    console.log('Invalid value:', error.value);
  }
}
</script>

<template>
  <form @submit.prevent="checkForm">
    <input v-model="modelValue.email" type="email" />
    <p v-if="error.email">{{ error.email[0] }}</p>
    <button type="submit">Check</button>
  </form>
</template>
```
:::

## Notes

- `validate` is asynchronous because it uses the schema library's async safe parse function.
- Use [`validateSubmit()`](./validateSubmit.md) when validation should control whether a submit callback runs.
- Use `validate(value)` to validate a value without replacing `modelValue`.
