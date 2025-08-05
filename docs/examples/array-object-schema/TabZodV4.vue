<script setup lang="ts">
import { useVueValidateZod } from 'use-vue-validate-schema/zodV4';
import { ref } from 'vue';
import { z } from 'zod/v4';
import InputCommaNumber from '../components/InputCommaNumber.vue';

const ItemSchema = z.object({
  id: z.string().uuid(),
  item: z.string().min(1).max(50),
  cost: z.number().int().min(-10_000).max(10_000),
  quantity: z.number().int().positive().max(100),
  price: z
    .number()
    .int()
    .min(-10_000 * 100)
    .max(10_000 * 100 * 100),
});
const schema = z.object({
  issue_date: z.string().date(),
  due_date: z.string().date(),
  invoice_to: z.string().trim().min(1).max(50),
  details: ItemSchema.array().min(1),
});

const modelValue = ref<z.infer<typeof schema>>({
  issue_date: '',
  due_date: '',
  invoice_to: '',
  details: [newItem()],
});

const { validateSubmit, ErrorMessage } = useVueValidateZod(schema, modelValue);

const handleSubmit = validateSubmit(() => {
  window.alert('success!');
});
function removeItem(id: string) {
  modelValue.value.details = modelValue.value.details.filter((x) => x.id !== id);
}
function newItem() {
  return {
    id: crypto.randomUUID(),
    item: '',
    cost: 0,
    quantity: 0,
    price: 0,
  } satisfies z.input<typeof ItemSchema>;
}
</script>

<template>
  <form class="mx-auto max-w-sm space-y-4" @submit.prevent="handleSubmit">
    <section class="space-y-2">
      <div class="space-y-0.5">
        <label for="issue_date" class="block text-sm font-medium" :class="['truncate']">
          issue_date : {{ modelValue.issue_date }}
        </label>
        <input
          id="issue_date"
          v-model="modelValue.issue_date"
          type="date"
          class="block rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="issue_date" class="block text-sm text-red-400"></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <label for="due_date" class="block text-sm font-medium" :class="['truncate']">
          due_date : {{ modelValue.due_date }}
        </label>
        <input
          id="due_date"
          v-model="modelValue.due_date"
          type="date"
          class="block rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="due_date" class="block text-sm text-red-400"></ErrorMessage>
      </div>

      <div class="space-y-0.5">
        <label for="due_date" class="block text-sm font-medium" :class="['truncate']">
          invoice_to : {{ modelValue.invoice_to }}
        </label>
        <input
          id="invoice_to"
          v-model="modelValue.invoice_to"
          type="text"
          class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
        />
        <ErrorMessage field="invoice_to" class="block text-sm text-red-400"></ErrorMessage>
      </div>
    </section>

    <section class="space-y-2">
      <div>
        <span class="block text-sm font-medium">details: </span>
        <ErrorMessage field="details" class="block text-sm text-red-400"> </ErrorMessage>
      </div>
      <div
        v-for="(one, i) of modelValue.details"
        :key="one.id"
        class="relative space-y-2 rounded-md border border-gray-400 p-2"
      >
        <div class="relative">
          <label
            :for="`details.${i}.item`"
            class="absolute -top-2 left-1 bg-white px-1 text-xs dark:bg-[#1b1b1f]"
          >
            item
          </label>
          <input
            :id="`details.${i}.item`"
            v-model="modelValue.details[i].item"
            type="text"
            class="block w-full rounded-lg border border-gray-400 p-2.5 text-sm"
          />
        </div>

        <button
          type="button"
          class="absolute -top-2 -right-2 inline-flex h-6 w-6 items-center rounded-full border border-gray-400 bg-white p-1 text-center text-sm font-medium text-gray-500 transition-colors hover:bg-gray-500 hover:text-white"
          @click="removeItem(one.id)"
        >
          <span class="icon-[heroicons--x-mark-16-solid]"></span>
        </button>

        <div class="flex gap-1">
          <div class="relative space-y-0.5">
            <label
              :for="`details.${i}.cost`"
              class="absolute -top-2 left-1 bg-white px-1 text-xs dark:bg-[#1b1b1f]"
            >
              cost
            </label>
            <InputCommaNumber
              :id="`details.${i}.cost`"
              v-model.number="modelValue.details[i].cost"
              type="number"
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-right font-mono text-sm"
            />
          </div>

          <div class="relative space-y-0.5">
            <label
              :for="`details.${i}.quantity`"
              class="absolute -top-2 left-1 bg-white px-1 text-xs dark:bg-[#1b1b1f]"
            >
              quantity
            </label>
            <InputCommaNumber
              :id="`details.${i}.quantity`"
              v-model.number="modelValue.details[i].quantity"
              type="number"
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-right font-mono text-sm"
            />
          </div>

          <div class="relative space-y-0.5">
            <label
              :for="`details.${i}.price`"
              class="absolute -top-2 left-1 bg-white px-1 text-xs dark:bg-[#1b1b1f]"
            >
              price
            </label>
            <InputCommaNumber
              :id="`details.${i}.price`"
              v-model.number="modelValue.details[i].price"
              type="number"
              class="block w-full rounded-lg border border-gray-400 p-2.5 text-right font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <ErrorMessage #="{ message }" :field="`details.${i}.item`">
            <span class="text-sm">item : </span>
            <div class="inline-block text-sm text-red-400">
              {{ message }}
            </div>
          </ErrorMessage>
          <ErrorMessage #="{ message }" :field="`details.${i}.cost`">
            <span class="text-sm">cost : </span>
            <div class="inline-block text-sm text-red-400">
              {{ message }}
            </div>
          </ErrorMessage>
          <ErrorMessage #="{ message }" :field="`details.${i}.quantity`">
            <span class="text-sm">quantity : </span>
            <div class="inline-block text-sm text-red-400">
              {{ message }}
            </div>
          </ErrorMessage>
          <ErrorMessage #="{ message }" :field="`details.${i}.price`">
            <span class="text-sm">price : </span>
            <div class="inline-block text-sm text-red-400">
              {{ message }}
            </div>
          </ErrorMessage>
        </div>
      </div>

      <button
        type="button"
        :class="[
          'transition-all',
          'block w-full cursor-pointer rounded-lg border border-blue-400 py-1 text-sm font-medium',
          'hover:bg-blue-100',
        ]"
        @click="
          () => {
            modelValue.details.push(newItem());
          }
        "
      >
        add
      </button>
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
