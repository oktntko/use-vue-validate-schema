<script setup lang="ts">
import { ref } from 'vue';

const modelValue = ref({
  username: '',
  email: '',
});

function handleSubmit() {
  window.alert('success!\n' + JSON.stringify(modelValue.value, null, '  '));
}
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
