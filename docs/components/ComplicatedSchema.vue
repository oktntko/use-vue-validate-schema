<script setup lang="ts">
// Basic Usage
import useValidate from '@lib'; // ← エイリアス経由で読み込み
import { ref } from 'vue';
import { z } from 'zod';
import InputPassword from './InputPassword.vue';

const securityQuestions = [
  "What was your FIRST PET'S NAME?",
  'What is your FAVORITE COLOR?',
  'What is your FAVORITE FOOD?',
  'What TOWN WERE YOU BORN IN?',
  'What is your FAVORITE MOVIE TITLE?',
  'What is your FAVORITE BOOK TITLE?',
] as const;

const schema = z
  .object({
    username: z.string().trim().min(1).max(10),
    email: z.string().email().endsWith('@example.com'),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(/^[\x20-\x7E]+$/, 'Use only standard English letters, numbers, and symbols')
      .regex(/[A-Z]/, 'Password must contain uppercase letters')
      .regex(/[a-z]/, 'Password must contain lowercase letters')
      .regex(/\d/, 'Password must contain numbers')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain symbols'),
    confirm_password: z.string().min(8).max(100),
    securityQuestions: z
      .string()
      .refine((val) => val !== '', {
        message: 'Please select one',
      })
      .pipe(z.enum(securityQuestions))
      .array(),
    securityAnswers: z.string().trim().min(1).max(10).array(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        code: z.ZodIssueCode.custom,
        message: `Password and confirmation do not match`,
      });
    }

    const questions = new Set<string>();
    val.securityQuestions.forEach((current, i) => {
      if (!current) {
        return;
      }

      if (questions.has(current)) {
        ctx.addIssue({
          path: [`securityQuestions.${i}`],
          code: z.ZodIssueCode.custom,
          message: `This question is a duplicate. Please choose a different question.`,
        });
      }
      questions.add(current);
    });
  });

const modelValue = ref<z.infer<typeof schema>>({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  // @ts-expect-error 初期値のため空文字を許容する
  securityQuestions: ['', '', ''],
  securityAnswers: ['', '', ''],
});

const { validateSubmit, ErrorMessage } = useValidate(schema, modelValue);

const handleSubmit = validateSubmit(() => {
  window.alert('success!');
});
</script>

<template>
  <form class="max-w-sm mx-auto space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-4">
      <section class="space-y-2">
        <p class="text-base font-bold">Public Identity</p>
        <div class="space-y-1 ml-2">
          <div class="space-y-0.5">
            <label for="username" class="block text-sm font-medium" :class="['truncate']">
              username : {{ modelValue.username }}
            </label>
            <input
              id="username"
              v-model="modelValue.username"
              type="text"
              class="border border-gray-400 text-sm rounded-lg block w-full p-2.5"
            />
            <ErrorMessage
              for="username"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>

          <div class="space-y-0.5">
            <label for="email" class="block text-sm font-medium" :class="['truncate']">
              email : {{ modelValue.email }}
            </label>
            <input
              id="email"
              v-model="modelValue.email"
              type="text"
              class="border border-gray-400 text-sm rounded-lg block w-full p-2.5"
            />
            <ErrorMessage
              for="email"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>
        </div>
      </section>

      <section class="space-y-2">
        <p class="text-base font-bold">Password</p>
        <div class="space-y-1 ml-2">
          <div class="space-y-0.5">
            <label for="password" class="block text-sm font-medium" :class="['truncate']">
              password : {{ modelValue.password }}
            </label>
            <InputPassword
              id="password"
              v-model="modelValue.password"
              type="password"
              class="border border-gray-400 text-sm rounded-lg block w-full p-2.5"
            />
            <ErrorMessage
              for="password"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>
          <div class="space-y-0.5">
            <label for="confirm_password" class="block text-sm font-medium" :class="['truncate']">
              confirm : {{ modelValue.confirm_password }}
            </label>
            <InputPassword
              id="confirm_password"
              v-model="modelValue.confirm_password"
              type="password"
              class="border border-gray-400 text-sm rounded-lg block w-full p-2.5"
            />
            <ErrorMessage
              for="confirm_password"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>
        </div>
      </section>

      <section class="space-y-2">
        <p class="text-base font-bold">Security Questions</p>

        <div class="space-y-1 ml-2">
          <div v-for="i of [0, 1, 2]" :key="i" class="space-y-0.5">
            <div class="flex items-center gap-1">
              <label :for="`securityQuestions.${i}`" class="shrink-0">Q{{ i + 1 }} :</label>
              <select
                :id="`securityQuestions.${i}`"
                v-model="modelValue.securityQuestions[i]"
                class="border border-gray-400 text-sm rounded-lg block w-full px-2.5 py-1.5"
                :class="['grow']"
              >
                <option value="" selected disabled>Please select one</option>
                <option v-for="value of securityQuestions" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
            <ErrorMessage
              :for="`securityQuestions.${i}`"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
            <input
              :id="`securityAnswers.${i}`"
              v-model="modelValue.securityAnswers[i]"
              type="text"
              :placeholder="modelValue.securityQuestions[i]"
              class="border border-gray-400 text-sm rounded-lg block w-full p-2.5"
            />
            <ErrorMessage
              :for="`securityAnswers.${i}`"
              :multiple="true"
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>
        </div>
      </section>
    </section>

    <section>
      <button
        type="submit"
        :class="[
          'transition-colors',
          'focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
          'disabled:cursor-not-allowed disabled:bg-green-700/50 disabled:hover:bg-green-800/50 disabled:dark:bg-green-600/50 disabled:dark:hover:bg-green-700/50',
        ]"
      >
        submit
      </button>
    </section>
  </form>
</template>
