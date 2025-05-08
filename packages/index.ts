import microdiff from 'microdiff';
import * as R from 'remeda';
import type { Component, PropType, SlotsType, VNode } from 'vue';
import { computed, defineComponent, h, type Ref, ref, watch } from 'vue';
import { z } from 'zod';

export default function useValidate<T extends z.ZodRawShape>(
  schema: z.ZodEffects<z.ZodObject<T>> | z.ZodObject<T>,
  modelValue: Ref<z.infer<typeof schema>>,
) {
  // initial value
  const initialValue = ref(R.clone(modelValue.value));

  const diff = computed(() =>
    microdiff(initialValue.value, modelValue.value, { cyclesFix: false }).map((x) =>
      x.path.join('.'),
    ),
  );

  const isDirty = computed(() => diff.value.length > 0);

  // error object
  const error = ref<Map<string, string[]>>(new Map());

  // watch model & run validate
  watch(modelValue.value, validate);

  async function validate(value: z.infer<typeof schema>) {
    const validateResult = await schema.safeParseAsync(value);

    if (validateResult.success) {
      error.value.clear();
    } else {
      error.value = validateResult.error.issues.reduce((map, issue) => {
        const key = issue.path.join('.');
        const messages = map.get(key);
        if (messages) {
          messages.push(issue.message);
        } else {
          map.set(key, [issue.message]);
        }

        return map;
      }, new Map<string, string[]>());
    }

    return validateResult;
  }

  const isInvalid = computed(() => error.value.size !== 0);

  const submitCount = ref(0);

  // バリデーションする
  function validateSubmit(
    callback: (value: z.infer<typeof schema>) => void,
    onInvalidSubmit: (error: Map<string, string[]>) => void = handleInvalidSubmit,
  ) {
    return async () => {
      submitCount.value++;

      // 値が変更されていないこともあるのでバリデーションする
      const validateResult = await validate(modelValue.value);

      if (validateResult.success) {
        submitCount.value = 0;
        return callback(validateResult.data);
      } else {
        return onInvalidSubmit ? onInvalidSubmit(error.value) : undefined;
      }
    };
  }

  function revert() {
    modelValue.value = R.clone(initialValue.value);
  }

  function reset(resetValue: z.infer<typeof schema>) {
    modelValue.value = R.clone(resetValue);
    initialValue.value = resetValue;
  }

  // const dialog = useDialog();
  async function handleInvalidSubmit() {
    // return dialog.alert('入力値に誤りがあります。');
  }

  const ErrorMessage = defineComponent({
    name: 'ErrorMessage',
    inheritAttrs: false,
    props: {
      field: {
        type: String as unknown as PropType<StringPaths<z.infer<typeof schema>>>,
        required: true,
      },
      nest: {
        type: Boolean,
        default: false,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      tag: {
        type: [String, Object] as unknown as PropType<string | Component>,
        default: 'div',
      },
    },
    slots: Object as SlotsType<{
      default: (props: { messages: string | string[] }) => VNode[];
    }>,
    setup(props, { slots, attrs }) {
      const messages = computed<string[]>(() => {
        // サブミット済みならエラーメッセージを表示する
        // 差分がなければエラーメッセージを表示しない
        const nestKey = `${props.field}.`;

        if (
          submitCount.value === 0 &&
          !diff.value.includes(props.field as string) &&
          (!props.nest || (props.nest && !diff.value.some((key) => key.startsWith(nestKey))))
        ) {
          return [];
        }

        return getErrorMessages({
          field: props.field as StringPaths<z.infer<typeof schema>>,
          nest: props.nest,
        });
      });

      return (): VNode => {
        const { tag } = props;

        if (messages.value.length === 0) {
          return;
        }

        // slotが提供されている場合
        if (slots.default) {
          return h(
            tag,
            attrs,
            slots.default({ messages: props.multiple ? messages.value : messages.value[0] }),
          );
        }

        // slotがない場合：messages.length に応じて描画内容を変える
        return h(
          tag,
          attrs,
          props.multiple
            ? messages.value.map((message, i) => h(tag, { key: i }, message))
            : messages.value[0],
        );
      };
    },
  });

  function getErrorMessages({
    field,
    nest = false,
  }: {
    field: StringPaths<z.infer<typeof schema>>;
    nest?: boolean;
  }) {
    const nestKey = `${field}.`;

    return [
      ...(error.value.get(field) ?? []),
      ...(!nest
        ? []
        : Array.from(error.value.entries())
            .filter(([key]) => key.startsWith(nestKey))
            .map(([_, value]) => value)
            .flat()),
    ];
  }

  function hasError({
    fields,
    nest = false,
  }: {
    fields: StringPaths<z.infer<typeof schema>>[];
    nest?: boolean;
  }) {
    return fields.map((field) => getErrorMessages({ field, nest })).flat().length > 0;
  }

  return {
    initialValue,
    diff,
    error,
    isInvalid,
    isDirty,
    revert,
    reset,
    submitCount,
    validateSubmit,
    ErrorMessage,
    getErrorMessages,
    hasError,
  };
}

// https://zenn.dev/wintyo/articles/0f0e7e86a3361f
type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...never[]];

// Type instantiation is excessively deep and possibly infinite.
type Paths<T, D extends number = 4> = D extends never
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string | number ? K | Join<K, Paths<T[K], Prev[D]>> : never;
      }[keyof T]
    : '';

type StringPaths<T> = Extract<Paths<T>, string>;
