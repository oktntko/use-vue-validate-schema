<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod';
import { ref, useTemplateRef } from 'vue';
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
    const a = document.createElement('a');
    a.href = '/use-vue-validate-schema/introduction/getting-started/';
    a.click();
  },
  {
    handleValidateError() {
      window.alert(`Enter 'uvvs'!`);
    },
  },
);

const keyList = ['use', 'vue', 'validate', 'schema'] satisfies (keyof typeof modelValue.value)[];

const refButton = useTemplateRef<HTMLButtonElement>('refButton');
const refInputList = useTemplateRef<HTMLInputElement[]>('refInputList');

function handleKeyDown(e: KeyboardEvent) {
  if (e.key !== 'Backspace') {
    return;
  }

  const inputList = refInputList.value ?? [];
  const index = e.target ? inputList.indexOf(e.target as HTMLInputElement) : -1;
  if (index <= 0) {
    // index === 0 => Previous element does not exist.
    return;
  }

  const cur = inputList[index];
  if (!cur.value) {
    const pre = inputList[index - 1];
    pre.focus();
  }
}

function handleInput(e: Event) {
  const inputList = refInputList.value ?? [];
  const index = e.target ? inputList.indexOf(e.target as HTMLInputElement) : -1;
  if (index < 0) {
    return;
  }

  const cur = inputList[index];
  if (!cur.value) {
    return;
  }

  if (index < inputList.length - 1) {
    inputList[index + 1].focus();
  } else {
    refButton.value?.focus();
  }
}
</script>

<template>
  <form autocomplete="off" class="mx-auto my-16 max-w-sm" @submit.prevent="handleSubmit">
    <div class="my-4 flex items-center justify-center">
      <input
        v-for="(key, i) of keyList"
        :id="key"
        :key="key"
        ref="refInputList"
        v-model="modelValue[key]"
        type="text"
        class="inline-block w-24 border border-gray-400/50 px-2 py-2.5 text-center text-8xl"
        :class="[
          {
            'rounded-tl-lg rounded-bl-lg': i === 0,
            'rounded-tr-lg rounded-br-lg': i === keyList.length - 1,
            '-ml-px': i > 0,
            'border-red-400 bg-red-50 text-red-900': error[key],
          },
        ]"
        maxlength="1"
        :placeholder="key.charAt(0)"
        @keydown="handleKeyDown"
        @input="handleInput"
      />
    </div>

    <div class="my-6 text-center text-2xl">
      <button
        ref="refButton"
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
      </button>
    </div>
  </form>
</template>
