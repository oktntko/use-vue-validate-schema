<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot';
import * as v from 'valibot';
import { ref } from 'vue';

const schema = v.object({
  username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)),
  email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')),
});

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue);

// function handleSubmit() { // [!code --]
//   window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  ')); // [!code --]
// } // [!code --]
const handleSubmit = validateSubmit(
  // [!code ++]
  (validValue) => {
    // [!code ++]
    window.alert('success!\n' + JSON.stringify(validValue, null, '  ')); // [!code ++]
  }, // [!code ++]
  {
    // [!code ++]
    handleValidateError(error) {
      // [!code ++]
      window.alert('fail!\n' + JSON.stringify(error, null, '  ')); // [!code ++]
    }, // [!code ++]
  }, // [!code ++]
); // [!code ++]
</script>

<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-4">
      <div class="space-y-1">
        <div class="space-y-0.5">
          <label for="username" class="block text-sm font-medium" :class="['truncate']">
            username : {{ modelValue.username }}
          </label>
          <input
            id="username"
            v-model="modelValue.username"
            type="text"
            class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          />
          <ErrorMessage field="username" multiple class="block text-sm text-red-400"></ErrorMessage>
          <!-- [!code ++] -->
        </div>

        <div class="space-y-0.5">
          <label for="email" class="block text-sm font-medium" :class="['truncate']">
            email : {{ modelValue.email }}
          </label>
          <input
            id="email"
            v-model="modelValue.email"
            type="text"
            class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          />
          <ErrorMessage field="email" multiple class="block text-sm text-red-400"></ErrorMessage>
          <!-- [!code ++] -->
        </div>
      </div>
    </section>

    <section>
      <button
        type="submit"
        :class="[
          'me-2 mb-2 cursor-pointer rounded-lg px-5 py-2.5 text-sm font-medium capitalize transition-colors',
          'border-[var(--vp-button-brand-border)] bg-[var(--vp-button-brand-bg)] text-[var(--vp-button-brand-text)] hover:bg-[var(--vp-button-brand-hover-bg)]',
        ]"
      >
        submit
      </button>
    </section>
  </form>
</template>
