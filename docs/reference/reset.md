---
outline: deep
---

# reset

## Overview

`reset` is a function that updates the initial form state and restores the form to match that new state. It also clears all validation errors and resets the submitted flag. Use this when you load new data into the form.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { reset } = useVueValidateZod(schema, modelValue);

function reset(value: z.input<typeof schema>): void
```
== zod(v4)
```ts
const { reset } = useVueValidateZod(schema, modelValue);

function reset(value: z.input<typeof schema>): void
```
== valibot
```ts
const { reset } = useVueValidateValibot(schema, modelValue);

function reset(value: v.InferInput<typeof schema>): void
```
:::

## Parameters

### value
- **Type**: Form input type (inferred from schema)
- **Required**: Yes
- **Description**: The new initial state for the form

## Return Value

`void` - Does not return a value

## Behavior

When `reset(newValue)` is called:
1. Sets the new initial state to `newValue`
2. Updates form values to match `newValue`
3. Clears all validation errors
4. Resets `isSubmitted` to `false`
5. Makes `isDirty` return `false`
6. Clears the `diff` array

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  id: 0,
  name: '',
  email: '',
});

const { reset, isDirty, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(async (validValue) => {
  // Save to server
  const response = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(validValue),
  });
  
  if (response.ok) {
    const savedData = await response.json();
    // Update initial state to the saved data
    reset(savedData);
  }
});

const loadUser = async (userId: number) => {
  const response = await fetch(`/api/user/${userId}`);
  const userData = await response.json();
  // Load user data and reset form
  reset(userData);
};

onMounted(() => {
  loadUser(1);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="modelValue.name" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" />
    </div>

    <div class="actions">
      <button type="submit" :disabled="!isDirty">
        Save
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
import { onMounted, ref } from 'vue';
import { z } from 'zod/v4';

const schema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
});

const modelValue = ref<z.input<typeof schema>>({
  id: 0,
  name: '',
  email: '',
});

const { reset, isDirty, validateSubmit } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(async (validValue) => {
  // Save to server
  const response = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(validValue),
  });
  
  if (response.ok) {
    const savedData = await response.json();
    // Update initial state to the saved data
    reset(savedData);
  }
});

const loadUser = async (userId: number) => {
  const response = await fetch(`/api/user/${userId}`);
  const userData = await response.json();
  // Load user data and reset form
  reset(userData);
};

onMounted(() => {
  loadUser(1);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="modelValue.name" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" />
    </div>

    <div class="actions">
      <button type="submit" :disabled="!isDirty">
        Save
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
import { onMounted, ref } from 'vue';

const schema = v.object({
  id: v.pipe(v.number()),
  name: v.pipe(v.string(), v.minLength(1)),
  email: v.pipe(v.string(), v.email()),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  id: 0,
  name: '',
  email: '',
});

const { reset, isDirty, validateSubmit } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit(async (validValue) => {
  // Save to server
  const response = await fetch('/api/user', {
    method: 'PUT',
    body: JSON.stringify(validValue),
  });
  
  if (response.ok) {
    const savedData = await response.json();
    // Update initial state to the saved data
    reset(savedData);
  }
});

const loadUser = async (userId: number) => {
  const response = await fetch(`/api/user/${userId}`);
  const userData = await response.json();
  // Load user data and reset form
  reset(userData);
};

onMounted(() => {
  loadUser(1);
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" v-model="modelValue.name" />
    </div>

    <div>
      <label for="email">Email</label>
      <input id="email" v-model="modelValue.email" />
    </div>

    <div class="actions">
      <button type="submit" :disabled="!isDirty">
        Save
      </button>
    </div>

    <div v-if="isDirty" class="warning">
      You have unsaved changes
    </div>
  </form>
</template>
```
:::

## Comparison with `revert`

- **`revert()`** - Restores form to its current initial state (no parameters)
- **`reset(newValue)`** - Updates the initial state to `newValue` AND restores form to match

## Use Cases

- **Load data from server** - After fetching user data, reset form to that data
- **Save successful** - After saving changes, update initial state to the new saved values
- **Switch records** - When switching between different records/items to edit
- **Clear initial state** - Reset to empty state by calling `reset(emptyObject)`

## Notes

- The value passed to `reset()` must match the schema input type
- This clears all form state (errors, dirty flag, submitted flag)
- If you want to reload data from the server, fetch it first, then call `reset()`
- This is different from [`revert()`](./revert.md), which only restores to the existing initial state
