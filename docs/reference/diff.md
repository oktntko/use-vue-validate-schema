---
outline: deep
---

# diff

## Overview

`diff` is a computed reference that returns an array of field paths that have been modified from their initial values. It uses deep object comparison to detect changes.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { diff } = useVueValidateZod(schema, modelValue);

const changedFields: ComputedRef<string[]> = diff;
```
== zod(v4)
```ts
const { diff } = useVueValidateZod(schema, modelValue);

const changedFields: ComputedRef<string[]> = diff;
```
== valibot
```ts
const { diff } = useVueValidateValibot(schema, modelValue);

const changedFields: ComputedRef<string[]> = diff;
```
:::

## Type

`ComputedRef<string[]>` - A read-only computed reference that returns an array of strings.

## Value

An array of field paths that differ from their initial values. Uses dot notation for nested fields (e.g., `"user.email"`, `"items.0.price"`).

Returns an empty array `[]` when no fields have changed.

## Example

:::tabs key:schema
== zod(v3)
```vue
<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV3';
import { ref } from 'vue';
import { z } from 'zod/v3';

const schema = z.object({
  name: z.string(),
  email: z.string(),
  profile: z.object({
    bio: z.string(),
    avatar: z.string(),
  }),
});

const modelValue = ref<z.input<typeof schema>>({
  name: 'John Doe',
  email: 'john@example.com',
  profile: {
    bio: 'Developer',
    avatar: 'avatar.jpg',
  },
});

const { diff } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.name" />
    </div>
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.profile.bio" />
    </div>
    <div>
      <input v-model="modelValue.profile.avatar" />
    </div>

    <!-- Show which fields have been modified -->
    <div v-if="diff.length > 0" class="changes">
      <p>Changed fields:</p>
      <ul>
        <li v-for="field in diff" :key="field">
          {{ field }}
        </li>
      </ul>
    </div>

    <!-- Show only specific changed fields -->
    <div v-if="diff.includes('profile.bio')">
      Bio has been updated
    </div>

    <button type="submit" :disabled="diff.length === 0">
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
  name: z.string(),
  email: z.string(),
  profile: z.object({
    bio: z.string(),
    avatar: z.string(),
  }),
});

const modelValue = ref<z.input<typeof schema>>({
  name: 'John Doe',
  email: 'john@example.com',
  profile: {
    bio: 'Developer',
    avatar: 'avatar.jpg',
  },
});

const { diff } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.name" />
    </div>
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.profile.bio" />
    </div>
    <div>
      <input v-model="modelValue.profile.avatar" />
    </div>

    <!-- Show which fields have been modified -->
    <div v-if="diff.length > 0" class="changes">
      <p>Changed fields:</p>
      <ul>
        <li v-for="field in diff" :key="field">
          {{ field }}
        </li>
      </ul>
    </div>

    <!-- Show only specific changed fields -->
    <div v-if="diff.includes('profile.bio')">
      Bio has been updated
    </div>

    <button type="submit" :disabled="diff.length === 0">
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
  name: v.pipe(v.string()),
  email: v.pipe(v.string()),
  profile: v.object({
    bio: v.pipe(v.string()),
    avatar: v.pipe(v.string()),
  }),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  name: 'John Doe',
  email: 'john@example.com',
  profile: {
    bio: 'Developer',
    avatar: 'avatar.jpg',
  },
});

const { diff } = useVueValidateValibot(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.name" />
    </div>
    <div>
      <input v-model="modelValue.email" type="email" />
    </div>
    <div>
      <input v-model="modelValue.profile.bio" />
    </div>
    <div>
      <input v-model="modelValue.profile.avatar" />
    </div>

    <!-- Show which fields have been modified -->
    <div v-if="diff.length > 0" class="changes">
      <p>Changed fields:</p>
      <ul>
        <li v-for="field in diff" :key="field">
          {{ field }}
        </li>
      </ul>
    </div>

    <!-- Show only specific changed fields -->
    <div v-if="diff.includes('profile.bio')">
      Bio has been updated
    </div>

    <button type="submit" :disabled="diff.length === 0">
      Save Changes
    </button>
  </form>
</template>
```
:::

## Use Cases

- **Show changed fields** - Display which fields the user has modified
- **Partial API updates** - Send only changed fields to the server
- **Sync tracking** - Log which fields have been changed for audit trails
- **Smart save** - Only process changed fields in your save handler
- **Conditional validation** - Validate only fields that have changed

## Comparison with `isDirty`

- **`isDirty`** returns a boolean: `true` if anything changed, `false` otherwise
- **`diff`** returns an array of field paths that have changed

Use `isDirty` for simple "has anything changed?" checks. Use `diff` when you need to know specifically which fields changed.

## Dot Notation

Field paths use dot notation for nested objects and numeric indices for arrays:
- `"name"` - Simple field
- `"profile.bio"` - Nested object field
- `"items.0.price"` - Array item field
- `"items.0.tags.2"` - Deeply nested field

## Notes

- `diff` is reactive and updates immediately as the form changes
- Empty array means no changes from initial state
- Uses deep comparison, so detects changes in nested objects and arrays
- Changes are tracked against the initial state set by `useVueValidateSchema()`
- Use [`reset()`](./reset.md) to update the baseline for comparison
