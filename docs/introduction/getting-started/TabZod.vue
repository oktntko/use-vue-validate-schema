<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV4'; // [!code ++]
import { ref } from 'vue';
import { z } from 'zod/v4';

const schema = z.object({
  username: z.string().trim().min(1).max(10),
  email: z.string().email().endsWith('@example.com'),
});

const modelValue = ref<z.input<typeof schema>>({
  username: '',
  email: '',
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue); // [!code ++]

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
          <label for="TabZod-username" class="block text-sm font-medium" :class="['truncate']">
            username : {{ modelValue.username }}
          </label>
          <input
            id="TabZod-username"
            v-model="modelValue.username"
            type="text"
            class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          />
          <ErrorMessage field="username" multiple class="block text-sm text-red-400"></ErrorMessage>
          <!-- [!code ++] -->
        </div>

        <div class="space-y-0.5">
          <label for="TabZod-email" class="block text-sm font-medium" :class="['truncate']">
            email : {{ modelValue.email }}
          </label>
          <input
            id="TabZod-email"
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
