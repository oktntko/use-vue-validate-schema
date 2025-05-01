import microdiff from 'microdiff';
import * as R from 'remeda';
import type { HTMLAttributes } from 'vue';
import { computed, h, type Ref, ref, watch } from 'vue';
import { z } from 'zod';

export function useValidate<T extends z.ZodRawShape>(
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
    onInvalidSubmit: (eroor: Map<string, string[]>) => void = handleInvalidSubmit,
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

  function reset(resetlValue: z.infer<typeof schema>) {
    modelValue.value = R.clone(resetlValue);
    initialValue.value = resetlValue;
  }

  // const dialog = useDialog();
  async function handleInvalidSubmit() {
    // return dialog.alert('入力値に誤りがあります。');
  }

  const ErrorMessage = (props: Props<z.infer<typeof schema>>) => {
    const message = computed<string | undefined>(() => {
      // サブミット済みならエラーメッセージを表示する
      // 差分がなければエラーメッセージを表示しない
      if (submitCount.value === 0 && !diff.value.includes(props.for)) {
        return undefined;
      }

      const errorMessages = error.value.get(props.for);
      if (errorMessages && errorMessages.length > 0) {
        return errorMessages[0];
      }

      return undefined;
    });

    if (message.value) {
      return h('div', message.value);
    } else {
      return h('div');
    }
  };

  return {
    diff,
    error,
    isInvalid,
    isDirty,
    revert,
    reset,
    submitCount,
    validateSubmit,
    ErrorMessage,
  };
}

// https://zenn.dev/wintyo/articles/0f0e7e86a3361f
type Join<K, P> = K extends string
  ? P extends string
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...never[]];

type Paths<T, D extends number = 10> = D extends never
  ? never
  : T extends object
    ? {
        [K in keyof T]-?: K extends string ? K | Join<K, Paths<T[K], Prev[D]>> : never;
      }[keyof T]
    : '';

interface Props<T> extends /* @vue-ignore */ HTMLAttributes {
  for: Paths<T>;
}
