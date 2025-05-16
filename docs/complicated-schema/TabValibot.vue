<script setup lang="ts">
import { useVueValidateValibot } from 'use-vue-validate-schema/valibot';
import * as v from 'valibot';
import { ref } from 'vue';
import InputPassword from '../components/InputPassword.vue';

const securityQuestions = [
  "What was your FIRST PET'S NAME?",
  'What is your FAVORITE COLOR?',
  'What is your FAVORITE FOOD?',
  'What TOWN WERE YOU BORN IN?',
  'What is your FAVORITE MOVIE TITLE?',
  'What is your FAVORITE BOOK TITLE?',
] as const;

const schema = v.pipe(
  v.object({
    username: v.pipe(v.string(), v.trim(), v.minLength(1), v.maxLength(10)),
    email: v.pipe(v.string(), v.email(), v.endsWith('@example.com')),
    password: v.pipe(
      v.string(),
      v.minLength(8),
      v.maxLength(100),
      v.regex(/^[\x20-\x7E]+$/, 'Use only standard English letters, numbers, and symbols'),
      v.regex(/[A-Z]/, 'Password must contain uppercase letters'),
      v.regex(/[a-z]/, 'Password must contain lowercase letters'),
      v.regex(/\d/, 'Password must contain numbers'),
      v.regex(/[^a-zA-Z0-9]/, 'Password must contain symbols'),
    ),
    confirm_password: v.pipe(v.string(), v.minLength(8), v.maxLength(100)),
    securityQuestions: v.pipe(
      v.array(
        v.pipe(
          v.pipe(
            v.string(),
            v.check((val) => val !== '', 'Please select one'),
          ),
          v.picklist(securityQuestions),
        ),
      ),
      v.length(3),
    ),
    securityAnswers: v.pipe(
      v.array(v.pipe(v.string(), v.minLength(1), v.maxLength(10))),
      v.length(3),
    ),
  }),
  v.rawCheck(({ dataset, addIssue }) => {
    if (!dataset.typed) {
      return;
    }
    const val = dataset.value;
    if (val.password !== val.confirm_password) {
      addIssue({
        path: [
          {
            type: 'object',
            origin: 'value',
            input: dataset.value,
            key: 'confirm_password',
            value: dataset.value.confirm_password,
          },
        ],
        message: `Password and confirmation do not match`,
      });
    }

    const questions = new Set<string>();
    val.securityQuestions.forEach((current, i) => {
      if (!current) {
        return;
      }

      if (questions.has(current)) {
        addIssue({
          path: [
            {
              type: 'object',
              origin: 'value',
              input: dataset.value,
              key: `securityQuestions.${i}`,
              value: current,
            },
          ],
          message: `This question is a duplicate. Please choose a different question.`,
        });
      }
      questions.add(current);
    });
  }),
);

const modelValue = ref<v.InferInput<typeof schema>>({
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  securityQuestions: ['', '', ''],
  securityAnswers: ['', '', ''],
});

const { validateSubmit, ErrorMessage } = useVueValidateValibot(schema, modelValue);

const handleSubmit = validateSubmit((output) => {
  window.alert('success!' + JSON.stringify(output));
});
</script>

<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-4">
      <section class="space-y-2">
        <p class="text-base font-bold">Public Identity</p>
        <div class="ml-2 space-y-1">
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
            <ErrorMessage
              field="username"
              multiple
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
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
            />
            <ErrorMessage field="email" multiple class="block text-sm text-red-400"></ErrorMessage>
          </div>
        </div>
      </section>

      <section class="space-y-2">
        <p class="text-base font-bold">Password</p>
        <div class="ml-2 space-y-1">
          <div class="space-y-0.5">
            <label for="password" class="block text-sm font-medium" :class="['truncate']">
              password : {{ modelValue.password }}
            </label>
            <InputPassword
              id="password"
              v-model="modelValue.password"
              type="password"
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
            />
            <ErrorMessage
              field="password"
              multiple
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
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
            />
            <ErrorMessage
              field="confirm_password"
              multiple
              class="block text-sm text-red-400"
            ></ErrorMessage>
          </div>
        </div>
      </section>

      <section class="space-y-2">
        <p class="text-base font-bold">Security Questions</p>

        <div class="ml-2 space-y-1">
          <div v-for="i of [0, 1, 2]" :key="i" class="space-y-0.5">
            <div class="flex items-center gap-1">
              <label :for="`securityQuestions.${i}`" class="shrink-0">Q{{ i + 1 }} :</label>
              <select
                :id="`securityQuestions.${i}`"
                v-model="modelValue.securityQuestions[i]"
                class="block w-full rounded-lg border border-gray-400 px-2.5 py-1.5 text-sm"
                :class="['grow']"
              >
                <option value="" selected disabled>Please select one</option>
                <option v-for="value of securityQuestions" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </div>
            <ErrorMessage
              :field="`securityQuestions.${i}`"
              multiple
              class="block text-sm text-red-400"
            ></ErrorMessage>
            <input
              :id="`securityAnswers.${i}`"
              v-model="modelValue.securityAnswers[i]"
              type="text"
              :placeholder="modelValue.securityQuestions[i]"
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
            />
            <ErrorMessage
              :field="`securityAnswers.${i}`"
              multiple
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
          'me-2 mb-2 cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800',
          'disabled:cursor-not-allowed disabled:bg-green-700/50 disabled:hover:bg-green-800/50 disabled:dark:bg-green-600/50 disabled:dark:hover:bg-green-700/50',
        ]"
      >
        submit
      </button>
    </section>
  </form>
</template>
