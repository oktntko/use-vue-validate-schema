<script setup lang="ts">
import * as R from 'remeda';
import type { InputHTMLAttributes } from 'vue';
import { computed, ref, useTemplateRef } from 'vue';

// https://ja.vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
defineOptions({ inheritAttrs: false });

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props extends /* @vue-ignore */ InputHTMLAttributes {}
defineProps<Props>();

const modelValue = defineModel<number>({ required: true });

const input = useTemplateRef<HTMLInputElement>('input');

const isInput = ref(false);

const innerValue = computed({
  get() {
    return modelValue.value;
  },
  set(newValue) {
    if (typeof newValue === 'number') {
      modelValue.value = newValue;
    } else {
      modelValue.value = 0;
    }
  },
});
</script>

<template>
  <input
    v-if="isInput"
    v-bind="$attrs"
    ref="input"
    v-model.number="innerValue"
    @blur="
      {
        isInput = false;
      }
    "
  />
  <input
    v-else
    v-bind="R.omit($attrs, ['type'])"
    type="text"
    :value="innerValue.toLocaleString()"
    @focus="
      () => {
        isInput = true;
        $nextTick(() => input?.focus());
      }
    "
  />
</template>
