<script setup lang="ts">
import { useValidate } from '@lib'; // ← エイリアス経由で読み込み
import { ref } from 'vue';
import { z } from 'zod';

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  contact: z.object({
    email: z.string().email(),
  }),
});

const modelValue = ref<z.infer<typeof schema>>({
  firstName: '',
  lastName: '',
  contact: {
    email: '',
  },
});

const { validateSubmit, isDirty, ErrorMessage } = useValidate(schema, modelValue);

const hanldeSubmit = validateSubmit((validValue) => {
  window.alert('success!' + JSON.stringify(validValue));
});
</script>

<template>
  <form @submit.prevent="hanldeSubmit">
    <section>
      <div>
        <label for="firstName"> firstName </label>
        <input id="firstName" v-model="modelValue.firstName" type="text" />
        <ErrorMessage for="firstName"></ErrorMessage>
      </div>
      <div>
        <label for="lastName"> lastName </label>
        <input id="lastName" v-model="modelValue.lastName" type="text" />
        <ErrorMessage for="lastName"></ErrorMessage>
      </div>
      <div>
        contact
        <div>
          <label for="contact.email"> email </label>
          <input id="contact.email" v-model="modelValue.contact.email" type="text" />
          <ErrorMessage for="contact.email"></ErrorMessage>
        </div>
      </div>
    </section>
    <section>
      <button type="submit" :disabled="!isDirty">submit</button>
    </section>
  </form>
</template>
