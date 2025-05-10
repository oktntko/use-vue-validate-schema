<script setup lang="ts">
// Basic Usage
import useValidate from '@lib'; // ← エイリアス経由で読み込み
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  text_number: z.string().transform((val, ctx) => {
    const parsed = parseInt(val);
    if (isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Not a number',
      });

      return z.NEVER;
    }
    return parsed;
  }),
  text_date: z
    .string()
    .date()
    .transform((x) => new Date(x)),
});

const modelValue = ref<z.input<typeof schema>>({
  text_number: '',
  text_date: '',
});

const { validateSubmit, ErrorMessage, validateResult } = useValidate(schema, modelValue);

const handleSubmit = validateSubmit((value) => {
  window.alert(
    `success! typeof text_number [${typeof value.text_number}] typeof text_date [${typeof value.text_date}]`,
  );
});

defineExpose({
  validateResult,
});
</script>

<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-2">
      <div class="space-y-0.5">
        <label for="text_number" class="block text-sm font-medium" :class="['truncate']">
          text_number : {{ modelValue.text_number }}
        </label>
        <input
          id="text_number"
          v-model="modelValue.text_number"
          type="text"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="text_number" class="block text-sm text-red-400"></ErrorMessage>
      </div>
      <div class="space-y-0.5">
        <label for="text_date" class="block text-sm font-medium" :class="['truncate']">
          text_date : {{ modelValue.text_date }}
        </label>
        <input
          id="text_date"
          v-model="modelValue.text_date"
          type="text"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="text_date" class="block text-sm text-red-400"></ErrorMessage>
      </div>
    </section>

    <section>
      <button
        type="submit"
        :class="[
          'transition-colors',
          'me-2 mb-2 cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
          'disabled:cursor-not-allowed disabled:bg-green-700/50 disabled:hover:bg-green-800/50 disabled:dark:bg-green-600/50 disabled:dark:hover:bg-green-700/50',
        ]"
      >
        submit
      </button>
    </section>
  </form>
</template>
