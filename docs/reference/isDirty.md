---
outline: deep
---

# isDirty

## Overview

`isDirty` is a computed reference that indicates whether the form has been modified from its initial state. It returns `true` if any field differs from the initial value.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { isDirty } = useVueValidateZod(schema, modelValue);

const isFormModified: ComputedRef<boolean> = isDirty;
```
== zod(v4)
```ts
const { isDirty } = useVueValidateZod(schema, modelValue);

const isFormModified: ComputedRef<boolean> = isDirty;
```
== valibot
```ts
const { isDirty } = useVueValidateValibot(schema, modelValue);

const isFormModified: ComputedRef<boolean> = isDirty;
```
:::

## Type

`ComputedRef<boolean>` - A read-only computed reference that returns a boolean value.

## Value

- **`true`** - The form has been modified from its initial state
- **`false`** - The form matches its initial state

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  title: z.string(),
  description: z.string(),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'My Post',
  description: 'A great post',
});

const { isDirty, revert, reset } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.description"></textarea>
    </div>
    
    <!-- Show unsaved changes indicator -->
    <div v-if="isDirty" class="bg-yellow-100 p-2">
      You have unsaved changes
    </div>

    <!-- Only show revert button when there are changes -->
    <button v-if="isDirty" type="button" @click="revert">
      Discard Changes
    </button>
    
    <button v-if="isDirty" type="submit">
      Save Changes
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
  title: z.string(),
  description: z.string(),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'My Post',
  description: 'A great post',
});

const { isDirty, revert, reset } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.description"></textarea>
    </div>
    
    <!-- Show unsaved changes indicator -->
    <div v-if="isDirty" class="bg-yellow-100 p-2">
      You have unsaved changes
    </div>

    <!-- Only show revert button when there are changes -->
    <button v-if="isDirty" type="button" @click="revert">
      Discard Changes
    </button>
    
    <button v-if="isDirty" type="submit">
      Save Changes
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
  title: v.pipe(v.string()),
  description: v.pipe(v.string()),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  title: 'My Post',
  description: 'A great post',
});

const { isDirty, revert, reset } = useVueValidateValibot(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.description"></textarea>
    </div>
    
    <!-- Show unsaved changes indicator -->
    <div v-if="isDirty" class="bg-yellow-100 p-2">
      You have unsaved changes
    </div>

    <!-- Only show revert button when there are changes -->
    <button v-if="isDirty" type="button" @click="revert">
      Discard Changes
    </button>
    
    <button v-if="isDirty" type="submit">
      Save Changes
    </button>
  </form>
</template>
```
:::

## Use Cases

- **Unsaved changes warning** - Warn users before navigating away with unsaved changes
- **Disable save button** - Only enable save when form is modified
- **Compare with original** - Show user what was changed in the form
- **Auto-save detection** - Trigger auto-save only when form is modified

## Comparison with `diff`

- `isDirty` returns a boolean
- [`diff`](./diff.md) returns an array of field paths that have changed

## Notes

- `isDirty` is reactive and updates immediately as the form changes
- It uses deep object comparison to detect changes
- Use [`revert()`](./revert.md) to reset the form to the initial state
- Use [`reset()`](./reset.md) to update the initial state to a new value
