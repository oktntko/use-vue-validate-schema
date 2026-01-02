---
outline: deep
---

# errorNest

## Overview

`errorNest` is a computed reference that returns all validation error messages for a field and its nested sub-fields. It's useful for displaying errors from parent fields that contain child fields with their own validation errors.

## Signature

:::tabs key:schema
== zod(v3)
```ts
const { errorNest } = useVueValidateZod(schema, modelValue);

const nestedErrors: ComputedRef<PartialRecord<string, string[]>> = errorNest;
```
== zod(v4)
```ts
const { errorNest } = useVueValidateZod(schema, modelValue);

const nestedErrors: ComputedRef<PartialRecord<string, string[]>> = errorNest;
```
== valibot
```ts
const { errorNest } = useVueValidateValibot(schema, modelValue);

const nestedErrors: ComputedRef<PartialRecord<string, string[]>> = errorNest;
```
:::

## Type

`ComputedRef<PartialRecord<string, string[]>>` - A read-only computed reference that maps field paths to error message arrays.

## Behavior

For each field path, `errorNest` includes:
1. Direct errors for that field
2. All errors from fields that start with this path (nested fields)

### Example Structure

Given a form with errors:
```ts
error.value = {
  'items.0.name': ['Name is required'],
  'items.0.price': ['Price must be positive'],
  'items.1.name': ['Name is required'],
}
```

Then `errorNest.value['items']` would include all three error messages:
```ts
errorNest.value = {
  'items': ['Name is required', 'Price must be positive', 'Name is required']
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

const ItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

const schema = z.object({
  title: z.string(),
  items: ItemSchema.array().min(1),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'Invoice',
  items: [
    { name: '', price: 0 },
    { name: '', price: -10 },
  ],
});

const { ErrorMessage, error, errorNest } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>

    <!-- Show errors for the entire items array -->
    <div v-if="errorNest['items']">
      <p class="error">Issues with items:</p>
      <ul>
        <li v-for="msg in errorNest['items']" :key="msg">{{ msg }}</li>
      </ul>
    </div>

    <!-- Iterate through items -->
    <div v-for="(item, index) in modelValue.items" :key="index" class="item">
      <input v-model="modelValue.items[index].name" />
      <ErrorMessage :field="`items.${index}.name`" multiple />

      <input v-model.number="modelValue.items[index].price" type="number" />
      <ErrorMessage :field="`items.${index}.price`" multiple />
    </div>

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

const ItemSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});

const schema = z.object({
  title: z.string(),
  items: ItemSchema.array().min(1),
});

const modelValue = ref<z.input<typeof schema>>({
  title: 'Invoice',
  items: [
    { name: '', price: 0 },
    { name: '', price: -10 },
  ],
});

const { ErrorMessage, error, errorNest } = useVueValidateZod(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>

    <!-- Show errors for the entire items array -->
    <div v-if="errorNest['items']">
      <p class="error">Issues with items:</p>
      <ul>
        <li v-for="msg in errorNest['items']" :key="msg">{{ msg }}</li>
      </ul>
    </div>

    <!-- Iterate through items -->
    <div v-for="(item, index) in modelValue.items" :key="index" class="item">
      <input v-model="modelValue.items[index].name" />
      <ErrorMessage :field="`items.${index}.name`" multiple />

      <input v-model.number="modelValue.items[index].price" type="number" />
      <ErrorMessage :field="`items.${index}.price`" multiple />
    </div>

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

const ItemSchema = v.object({
  name: v.pipe(v.string(), v.minLength(1)),
  price: v.pipe(v.number(), v.positive()),
});

const schema = v.object({
  title: v.pipe(v.string()),
  items: v.pipe(ItemSchema, v.array(ItemSchema), v.minLength(1)),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  title: 'Invoice',
  items: [
    { name: '', price: 0 },
    { name: '', price: -10 },
  ],
});

const { ErrorMessage, error, errorNest } = useVueValidateValibot(schema, modelValue);
</script>

<template>
  <form>
    <div>
      <input v-model="modelValue.title" />
    </div>

    <!-- Show errors for the entire items array -->
    <div v-if="errorNest['items']">
      <p class="error">Issues with items:</p>
      <ul>
        <li v-for="msg in errorNest['items']" :key="msg">{{ msg }}</li>
      </ul>
    </div>

    <!-- Iterate through items -->
    <div v-for="(item, index) in modelValue.items" :key="index" class="item">
      <input v-model="modelValue.items[index].name" />
      <ErrorMessage :field="`items.${index}.name`" multiple />

      <input v-model.number="modelValue.items[index].price" type="number" />
      <ErrorMessage :field="`items.${index}.price`" multiple />
    </div>

    <button type="submit">Submit</button>
  </form>
</template>
```
:::

## Using with ErrorMessage

The [`ErrorMessage`](./ErrorMessage.md) component has a `nest` prop that automatically uses `errorNest`:

```vue
<!-- This is equivalent to using errorNest -->
<ErrorMessage field="items" nest multiple />
```

## Use Cases

- **Show parent field errors** - Display all errors from an array of items under the array label
- **Hierarchical error display** - Show summary of errors at parent level with details at child level
- **Array validation** - When validating arrays of objects, show aggregate errors
- **Nested form sections** - Display errors from sub-forms under a parent heading

## Comparison with error

- **`error`** - Contains errors for exact field paths only
- **`errorNest`** - Includes errors from all nested sub-fields as well

### Example

```ts
// Given these errors:
error.value = {
  'address.street': ['Street is required'],
  'address.city': ['City is required'],
  'address.zip': ['Invalid zip code'],
}

// Then:
error.value['address']        // undefined
errorNest.value['address']    // ['Street is required', 'City is required', 'Invalid zip code']
```

## Notes

- `errorNest` is a computed value, calculated from `error`
- It's reactive - updates immediately during validation
- Useful for showing aggregate errors for parent fields
- The `nest` prop on `ErrorMessage` uses this under the hood
- Only parent-child relationships are included (using dot notation prefix matching)
