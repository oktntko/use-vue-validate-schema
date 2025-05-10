<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';
import { ref } from 'vue';

// https://ja.vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
defineOptions({ inheritAttrs: false });

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends /* @vue-ignore */ InputHTMLAttributes {}
defineProps<Props>();

const modelValue = defineModel<string>({ default: '' });

const show = ref(false);
</script>

<template>
  <div class="relative">
    <input
      v-model="modelValue"
      :type="show ? 'text' : 'password'"
      v-bind="
        (() => {
          const { type, ...attrs } = $attrs;
          return attrs;
        })()
      "
    />
    <div
      class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-sm leading-5"
      @click="show = !show"
    >
      <span :class="show ? 'icon-[fa6-solid--eye-slash]' : 'icon-[fa6-solid--eye]'"></span>
    </div>
  </div>
</template>
