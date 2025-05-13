<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zod';
import { ref } from 'vue';
import { z } from 'zod';

const multiple_checkbox_options = ['Jack', 'John', 'Mike'] as const;
const radio_options = ['One', 'Two', 'Three'] as const;
const single_select_options = ['Volvo', 'Saab', 'Mercedes'] as const;
const multiple_select_options = ['Dog', 'Cat', 'Hamster'] as const;

const schema = z.object({
  text: z.string().trim().min(1).max(10),
  textarea: z.string().max(100),
  single_checkbox: z.boolean().default(false),
  multiple_checkbox: z.enum(multiple_checkbox_options).array().min(1),
  radio: z.enum(radio_options),
  single_select: z
    .string()
    .refine((val) => val !== '', {
      message: 'Please select one',
    })
    .pipe(z.enum(single_select_options)),
  multiple_select: z.enum(multiple_select_options).array().min(1),
});

const modelValue = ref<z.input<typeof schema>>({
  text: '',
  textarea: '',
  single_checkbox: false,
  multiple_checkbox: [],
  radio: 'One',
  single_select: '',
  multiple_select: [],
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(() => {
  window.alert('success!');
});
</script>

<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-2">
      <div class="space-y-0.5">
        <label for="text" class="block text-sm font-medium" :class="['truncate']">
          text : {{ modelValue.text }}
        </label>
        <input
          id="text"
          v-model="modelValue.text"
          type="text"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="text" class="block text-sm text-red-400"></ErrorMessage>
        <div class="text-right text-xs text-gray-400">{{ modelValue.text.length }} / 10</div>
      </div>

      <div class="space-y-0.5">
        <label for="textarea" class="block text-sm font-medium" :class="['truncate']">
          textarea : {{ modelValue.textarea }}
        </label>
        <textarea
          id="textarea"
          v-model="modelValue.textarea"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          rows="3"
        />
        <ErrorMessage field="textarea" class="block text-sm text-red-400"></ErrorMessage>
        <div class="text-right text-xs text-gray-400">{{ modelValue.textarea.length }} / 100</div>
      </div>

      <div class="space-y-0.5">
        <span class="block text-sm font-medium" :class="['truncate']">
          single_checkbox : {{ modelValue.single_checkbox }}
        </span>
        <div class="inline-flex flex-col gap-1">
          <label for="single_checkbox" class="inline-flex items-center gap-1 text-sm font-medium">
            <input
              id="single_checkbox"
              v-model="modelValue.single_checkbox"
              type="checkbox"
              :true-value="true"
              :false-value="false"
              class=""
            />
            <span>YES</span>
          </label>
          <label
            for="single_checkbox-INVALID-VALUE"
            class="inline-flex items-center gap-1 text-sm font-medium"
          >
            <input
              id="single_checkbox-INVALID-VALUE"
              v-model="modelValue.single_checkbox"
              type="checkbox"
              true-value="INVALID-VALUE"
              class=""
            />
            <span>INVALID-VALUE</span>
          </label>
        </div>
        <ErrorMessage field="single_checkbox" class="block text-sm text-red-400"></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <span class="block text-sm font-medium" :class="['truncate']">
          multiple_checkbox : {{ modelValue.multiple_checkbox }}
        </span>
        <div class="inline-flex flex-col gap-1">
          <label
            v-for="value of multiple_checkbox_options"
            :key="value"
            :for="`multiple_checkbox-${value}`"
            class="inline-flex items-center gap-1 text-sm font-medium"
          >
            <input
              :id="`multiple_checkbox-${value}`"
              v-model="modelValue.multiple_checkbox"
              type="checkbox"
              :value="value"
              class=""
            />
            <span>{{ value }}</span>
          </label>
          <!-- INVALID-VALUE -->
          <label
            :for="`multiple_checkbox-${'INVALID-VALUE'}`"
            class="inline-flex items-center gap-1 text-sm font-medium"
          >
            <input
              :id="`multiple_checkbox-${'INVALID-VALUE'}`"
              v-model="modelValue.multiple_checkbox"
              type="checkbox"
              :value="'INVALID-VALUE'"
              class=""
            />
            <span>{{ 'INVALID-VALUE' }}</span>
          </label>
        </div>
        <ErrorMessage
          field="multiple_checkbox"
          nest
          class="block text-sm text-red-400"
        ></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <span class="block text-sm font-medium" :class="['truncate']">
          radio : {{ modelValue.radio }}
        </span>
        <div class="inline-flex flex-col gap-1">
          <label
            v-for="value of radio_options"
            :key="value"
            :for="`radio-${value}`"
            class="inline-flex items-center gap-1 text-sm font-medium"
          >
            <input
              :id="`radio-${value}`"
              v-model="modelValue.radio"
              type="radio"
              :value="value"
              class=""
            />
            <span>{{ value }}</span>
          </label>
          <!-- INVALID-VALUE -->
          <label
            :for="`radio-${'INVALID-VALUE'}`"
            class="inline-flex items-center gap-1 text-sm font-medium"
          >
            <input
              :id="`radio-${'INVALID-VALUE'}`"
              v-model="modelValue.radio"
              type="radio"
              :value="'INVALID-VALUE'"
              class=""
            />
            <span>{{ 'INVALID-VALUE' }}</span>
          </label>
        </div>
        <ErrorMessage field="radio" class="block text-sm text-red-400"></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <label for="single_select" class="block text-sm font-medium" :class="['truncate']">
          single_select : {{ modelValue.single_select }}
        </label>
        <select
          id="single_select"
          v-model="modelValue.single_select"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
        >
          <option value="" selected disabled>Please select one</option>
          <option v-for="value of single_select_options" :key="value" :value="value">
            {{ value }}
          </option>
          <!-- INVALID-VALUE -->
          <option :value="'INVALID-VALUE'">
            {{ 'INVALID-VALUE' }}
          </option>
        </select>
        <ErrorMessage field="single_select" class="block text-sm text-red-400"></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <label for="multiple_select" class="block text-sm font-medium" :class="['truncate']">
          multiple_select : {{ modelValue.multiple_select }}
        </label>
        <select
          id="multiple_select"
          v-model="modelValue.multiple_select"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          multiple
        >
          <option value="" disabled>Please select one or more</option>
          <option v-for="value of multiple_select_options" :key="value" :value="value">
            {{ value }}
          </option>
          <!-- INVALID-VALUE -->
          <option :value="'INVALID-VALUE'">
            {{ 'INVALID-VALUE' }}
          </option>
        </select>
        <ErrorMessage
          field="multiple_select"
          nest
          class="block text-sm text-red-400"
        ></ErrorMessage>
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
