import microdiff from 'microdiff';
import {
  type Component,
  type ComputedRef,
  type DefineComponent,
  type PropType,
  type Ref,
  type SlotsType,
  type UnwrapRef,
  type VNode,
  computed,
  defineComponent,
  h,
  ref,
  watch,
} from 'vue';
import type { z } from 'zod';
import { clone } from '../clone.js';

export function useVueValidateZod<T extends z.ZodRawShape>(
  schema: z.ZodEffects<z.ZodObject<T>> | z.ZodObject<T>,
  modelValue: Ref<z.input<typeof schema>>,
): {
  validateSubmit: (
    callback: (value: z.output<typeof schema>) => void,
    onInvalidSubmit?: (error: Map<string, string[]>) => void,
  ) => () => Promise<void>;
  ErrorMessage: DefineComponent<
    {
      field: StringPaths<z.infer<typeof schema>>;
      nest?: boolean;
      multiple?: boolean;
      tag?: string | Component;
    },
    {
      messages: ComputedRef<string[]>;
    },
    {
      default: (props: { messages: string | string[] }) => VNode[]; // slots
    }
  >;
  isInvalid: ComputedRef<boolean>;
  isDirty: Ref<boolean>;
  isSubmitted: Ref<boolean>;
  revert: () => void;
  reset: (value: UnwrapRef<typeof modelValue>) => void;
  diff: ComputedRef<string[]>;
  error: Ref<Map<string, string[]>>;
  initialValue: typeof modelValue;
  validateResult: Ref<Awaited<ReturnType<typeof schema.safeParseAsync>>>;
} {
  const initialValue = ref(clone(modelValue.value));

  const diff = computed(() =>
    microdiff(initialValue.value, modelValue.value, { cyclesFix: false }).map((x) =>
      x.path.join('.'),
    ),
  );

  const isDirty = computed(() => diff.value.length > 0);

  const error = ref<Map<string, string[]>>(new Map());

  watch(modelValue.value, validate);

  const validateResult = ref<Awaited<ReturnType<typeof schema.safeParseAsync>>>();

  async function validate(value: z.input<typeof schema>) {
    validateResult.value = await schema.safeParseAsync(value);

    if (validateResult.value.success) {
      error.value.clear();
    } else {
      error.value = validateResult.value.error.issues.reduce((map, issue) => {
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

    return validateResult.value;
  }

  const isInvalid = computed(() => error.value.size !== 0);

  const isSubmitted = ref(false);

  function validateSubmit(
    callback: (value: z.output<typeof schema>) => void,
    onInvalidSubmit: (error: Map<string, string[]>) => void = handleInvalidSubmit,
  ) {
    return async () => {
      isSubmitted.value = true;

      // 値が変更されていないこともあるのでバリデーションする
      const validateResult = await validate(modelValue.value);

      if (validateResult.success) {
        isSubmitted.value = false;
        return callback(validateResult.data);
      } else {
        return onInvalidSubmit ? onInvalidSubmit(error.value) : undefined;
      }
    };
  }

  function revert() {
    modelValue.value = clone(initialValue.value);
  }

  function reset(resetValue: z.input<typeof schema>) {
    modelValue.value = clone(resetValue);
    initialValue.value = resetValue;
  }

  async function handleInvalidSubmit() {
    // TODO
  }

  type Field = StringPaths<z.infer<typeof schema>>;

  const ErrorMessage = defineComponent({
    name: 'ErrorMessage',
    inheritAttrs: false,
    props: {
      field: {
        type: String as unknown as PropType<Field>,
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
        // サブミットを実行していなければエラーメッセージを表示しない
        // 差分がなければエラーメッセージを表示しない
        const nestKey = `${props.field}.`;

        if (
          !isSubmitted.value &&
          !diff.value.includes(props.field as string) &&
          (!props.nest || (props.nest && !diff.value.some((key) => key.startsWith(nestKey))))
        ) {
          return [];
        }
        return getErrorMessages({
          field: props.field as Field,
          nest: props.nest,
        });
      });

      return () => {
        const { tag } = props;

        if (messages.value.length === 0) {
          return;
        }

        if (slots.default) {
          return h(
            tag,
            attrs,
            slots.default({ messages: props.multiple ? messages.value : messages.value[0] }),
          );
        }

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

  function getErrorMessages({ field, nest = false }: { field: Field; nest?: boolean }) {
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

  return {
    //# basic usage
    validateSubmit,
    // @ts-expect-error typeof schema
    ErrorMessage,
    //# form status
    isInvalid,
    isDirty,
    isSubmitted,
    //# helper methods
    revert,
    reset,
    //# inner data for debug
    diff,
    error,
    // @ts-expect-error typeof schema
    initialValue,
    // @ts-expect-error typeof schema
    validateResult,
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
