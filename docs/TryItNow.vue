<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod';
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  use: z.string().pipe(z.literal('u')),
  vue: z.string().pipe(z.literal('v')),
  validate: z.string().pipe(z.literal('v')),
  schema: z.string().pipe(z.literal('s')),
});

const modelValue = ref<z.input<typeof schema>>({
  use: '',
  vue: '',
  validate: '',
  schema: '',
});

const { validateSubmit, error, isInvalid } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(
  () => {
    const a = document.getElementById('GettingStarted.vue-link');
    a?.click();
  },
  {
    handleValidateError() {
      window.alert(`Enter 'uvvs'!`);
    },
  },
);
</script>

<template>
  <form autocomplete="off" class="mx-auto my-16 max-w-sm" @submit.prevent="handleSubmit">
    <div class="my-4 flex items-center justify-center">
      <input
        id="use"
        v-model="modelValue.use"
        type="text"
        class="inline-block w-24 rounded-tl-lg rounded-bl-lg border border-gray-400/50 px-2 py-2.5 text-center text-8xl"
        :class="[{ 'border-red-400 bg-red-50 text-red-900': error.use }]"
        maxlength="1"
        placeholder="u"
      />
      <input
        id="vue"
        v-model="modelValue.vue"
        type="text"
        class="-ml-px inline-block w-24 border border-gray-400/50 px-2 py-2.5 text-center text-8xl"
        :class="[{ 'border-red-400 bg-red-50 text-red-900': error.vue }]"
        maxlength="1"
        placeholder="v"
      />
      <input
        id="validate"
        v-model="modelValue.validate"
        type="text"
        class="-ml-px inline-block w-24 border border-gray-400/50 px-2 py-2.5 text-center text-8xl"
        :class="[{ 'border-red-400 bg-red-50 text-red-900': error.validate }]"
        maxlength="1"
        placeholder="v"
      />
      <input
        id="schema"
        v-model="modelValue.schema"
        type="text"
        class="-ml-px inline-block w-24 rounded-tr-lg rounded-br-lg border border-gray-400/50 px-2 py-2.5 text-center text-8xl"
        :class="[{ 'border-red-400 bg-red-50 text-red-900': error.schema }]"
        maxlength="1"
        placeholder="s"
      />
    </div>

    <div class="my-6 text-center text-2xl">
      <button type="submit" class="text-center outline-none" tabindex="-1">
        <a
          id="GettingStarted.vue-link"
          href="/use-vue-validate-schema/getting-started/"
          type="submit"
          class="rounded-full px-5 py-2.5 text-center font-medium no-underline"
          :class="
            isInvalid
              ? ['bg-red-700 text-white hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700']
              : [
                  'border-[var(--vp-button-brand-border)] bg-[var(--vp-button-brand-bg)] text-[var(--vp-button-brand-text)] hover:bg-[var(--vp-button-brand-hover-bg)]',
                ]
          "
        >
          {{ isInvalid ? `Enter 'uvvs'!` : 'Getting Started' }}
        </a>
      </button>
    </div>
  </form>
</template>
