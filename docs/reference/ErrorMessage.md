---
outline: deep
---

# ErrorMessage

## Overview

`ErrorMessage` is a component that renders validation error messages for a specific form field. It automatically displays error messages when validation fails, with smart timing to avoid showing errors on initial values.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { ErrorMessage } = useVueValidateZod(schema, modelValue);
```
== zod(v4)
```ts
const { ErrorMessage } = useVueValidateZod(schema, modelValue);
```
== valibot
```ts
const { ErrorMessage } = useVueValidateValibot(schema, modelValue);
```
:::

## Props

### field
- **Type**: `string` (field path)
- **Required**: Yes
- **Description**: The field path to display error messages for. Supports dot notation for nested fields (e.g., `user.email`, `details.0.name`).

### nest
- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, also includes error messages from nested fields that start with this field path.

### multiple
- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, displays all error messages. When `false`, displays only the first error message.

### tag
- **Type**: `string | Component`
- **Default**: `'div'`
- **Description**: The HTML tag or Vue component to render as the wrapper element.

## Slots

### default
- **Scope**: `{ messages: string[]; message: string }`
- **Description**: Custom slot for rendering error messages. Provides both `messages` (array) and `message` (first message string).

## Display Behavior

`ErrorMessage` intelligently decides when to display errors:

- **Does NOT display** if the field matches its initial value (even if invalid)
- **Does display** if:
  - The field has been modified from its initial value
  - The form has been submitted (`isSubmitted` is `true`)

This prevents showing errors to users for untouched fields while still validating them on submit.

## Examples

### Basic Usage

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  username: z.string().min(1).max(10),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
});

const { ErrorMessage } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username" />
  </div>
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
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
});

const { ErrorMessage } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username" />
  </div>
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
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
});

const { ErrorMessage } = useVueValidateValibot(schema, modelValue);
</script>

<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username" />
  </div>
</template>
```
:::

### Multiple Errors

:::tabs key:schema
== zod(v3)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <!-- Display all error messages -->
    <ErrorMessage field="username" multiple />
  </div>
</template>
```
== zod(v4)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <!-- Display all error messages -->
    <ErrorMessage field="username" multiple />
  </div>
</template>
```
== valibot
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <!-- Display all error messages -->
    <ErrorMessage field="username" multiple />
  </div>
</template>
```
:::

### Custom Styling

:::tabs key:schema
== zod(v3)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage 
      field="username" 
      class="text-red-500 text-sm mt-1"
      tag="p"
    />
  </div>
</template>
```
== zod(v4)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage 
      field="username" 
      class="text-red-500 text-sm mt-1"
      tag="p"
    />
  </div>
</template>
```
== valibot
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage 
      field="username" 
      class="text-red-500 text-sm mt-1"
      tag="p"
    />
  </div>
</template>
```
:::

### Custom Rendering with Slot

:::tabs key:schema
== zod(v3)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username">
      <template #default="{ messages }">
        <ul class="text-red-500 text-sm">
          <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
      </template>
    </ErrorMessage>
  </div>
</template>
```
== zod(v4)
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username">
      <template #default="{ messages }">
        <ul class="text-red-500 text-sm">
          <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
      </template>
    </ErrorMessage>
  </div>
</template>
```
== valibot
```vue
<template>
  <div>
    <input v-model="modelValue.username" />
    <ErrorMessage field="username">
      <template #default="{ messages }">
        <ul class="text-red-500 text-sm">
          <li v-for="msg in messages" :key="msg">{{ msg }}</li>
        </ul>
      </template>
    </ErrorMessage>
  </div>
</template>
```
:::

### Nested Field Errors

:::tabs key:schema
== zod(v3)
```vue
<template>
  <div>
    <!-- Shows errors from details field and all nested sub-fields -->
    <ErrorMessage field="details" nest multiple />
  </div>
</template>
```
== zod(v4)
```vue
<template>
  <div>
    <!-- Shows errors from details field and all nested sub-fields -->
    <ErrorMessage field="details" nest multiple />
  </div>
</template>
```
== valibot
```vue
<template>
  <div>
    <!-- Shows errors from details field and all nested sub-fields -->
    <ErrorMessage field="details" nest multiple />
  </div>
</template>
```
:::

## Notes

- `ErrorMessage` is a renderless component (no default styling)
- Always specify the `field` prop - it's required
- Use `tag="span"` for inline error messages
- Use slot for complete control over error message rendering
- When using custom components for the `tag` prop, make sure they accept HTML attributes
