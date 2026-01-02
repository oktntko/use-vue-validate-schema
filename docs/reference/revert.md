---
outline: deep
---

# revert

## Overview

`revert` is a function that discards all changes to the form and restores it to its initial state. It resets both the form values and the form state (errors, submitted flag).

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { revert } = useVueValidateZod(schema, modelValue);

function revert(): void
```
== zod(v4)
```ts
const { revert } = useVueValidateZod(schema, modelValue);

function revert(): void
```
== valibot
```ts
const { revert } = useVueValidateValibot(schema, modelValue);

function revert(): void
```
:::

## Parameters

None

## Return Value

`void` - Does not return a value

## Behavior

When `revert()` is called:
1. Restores form values to their initial state
2. Clears all validation errors
3. Resets `isSubmitted` to `false`
4. Makes `isDirty` return `false`
5. Clears the `diff` array

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'Original Title',
  content: 'Original Content',
});

const { revert, isDirty, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  // Successfully saved, could call revert here or reset
  console.log('Saved:', validValue);
});

const handleCancel = () => {
  if (isDirty.value) {
    const confirmed = window.confirm('Discard unsaved changes?');
    if (confirmed) {
      revert();
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.content"></textarea>
    </div>

    <div class="actions">
      <button type="submit">Save</button>
      <button v-if="isDirty" type="button" @click="handleCancel">
        Cancel
      </button>
    </div>

    <div v-if="isDirty" class="warning">
      You have unsaved changes
    </div>
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
  title: z.string().min(1),
  content: z.string().min(1),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'Original Title',
  content: 'Original Content',
});

const { revert, isDirty, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  // Successfully saved, could call revert here or reset
  console.log('Saved:', validValue);
});

const handleCancel = () => {
  if (isDirty.value) {
    const confirmed = window.confirm('Discard unsaved changes?');
    if (confirmed) {
      revert();
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.content"></textarea>
    </div>

    <div class="actions">
      <button type="submit">Save</button>
      <button v-if="isDirty" type="button" @click="handleCancel">
        Cancel
      </button>
    </div>

    <div v-if="isDirty" class="warning">
      You have unsaved changes
    </div>
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
  title: v.pipe(v.string(), v.minLength(1)),
  content: v.pipe(v.string(), v.minLength(1)),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  title: 'Original Title',
  content: 'Original Content',
});

const { revert, isDirty, validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit((validValue) => {
  // Successfully saved, could call revert here or reset
  console.log('Saved:', validValue);
});

const handleCancel = () => {
  if (isDirty.value) {
    const confirmed = window.confirm('Discard unsaved changes?');
    if (confirmed) {
      revert();
    }
  }
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="modelValue.title" />
    </div>
    <div>
      <textarea v-model="modelValue.content"></textarea>
    </div>

    <div class="actions">
      <button type="submit">Save</button>
      <button v-if="isDirty" type="button" @click="handleCancel">
        Cancel
      </button>
    </div>

    <div v-if="isDirty" class="warning">
      You have unsaved changes
    </div>
  </form>
</template>
```
:::

## Comparison with `reset`

- **`revert()`** - Restores form to its current initial state
- **`reset(newValue)`** - Updates the initial state AND restores form to that new state

Use `revert()` when you want to discard changes. Use `reset()` when you've loaded new data and want to set a new baseline.

## Use Cases

- **Cancel editing** - Discard changes and go back to original values
- **Unsaved changes warning** - Before navigating away, allow user to revert
- **Reset form after error** - Return to initial state if something goes wrong

## Notes

- Calling `revert()` when `isDirty` is `false` has no effect (form is already in initial state)
- This does not reload data from the server, only restores the in-memory initial value
- Safe to call at any time - doesn't trigger validation
