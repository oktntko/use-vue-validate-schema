/* eslint-disable @typescript-eslint/no-empty-object-type */
import microdiff from 'microdiff';
import {
  type Component,
  type ComponentOptionsMixin,
  type ComponentProvideOptions,
  type ComputedRef,
  type DeepReadonly,
  type DefineComponent,
  type ExtractPropTypes,
  type PropType,
  type PublicProps,
  type Ref,
  type RendererElement,
  type RendererNode,
  type SlotsType,
  type VNode,
  computed,
  defineComponent,
  h,
  readonly,
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
    ExtractPropTypes<{
      field: {
        type: PropType<StringPaths<z.infer<typeof schema>>>;
        required: true;
      };
      nest: {
        type: BooleanConstructor;
        default: boolean;
      };
      multiple: {
        type: BooleanConstructor;
        default: boolean;
      };
      tag: {
        type: PropType<string | Component>;
        default: string;
      };
    }>,
    () =>
      | VNode<
          RendererNode,
          RendererElement,
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
          }
        >
      | undefined,
    {},
    {},
    {},
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    {},
    string,
    PublicProps,
    ToResolvedProps<
      ExtractPropTypes<{
        field: {
          type: PropType<StringPaths<z.infer<typeof schema>>>;
          required: true;
        };
        nest: {
          type: BooleanConstructor;
          default: boolean;
        };
        multiple: {
          type: BooleanConstructor;
          default: boolean;
        };
        tag: {
          type: PropType<string | Component>;
          default: string;
        };
      }>,
      {}
    >,
    {
      nest: boolean;
      multiple: boolean;
      tag: string | Component;
    },
    SlotsType<{
      default: (props: { messages: string | string[] }) => VNode[];
    }>,
    {},
    {},
    string,
    ComponentProvideOptions,
    true,
    {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any
  >;
  isInvalid: ComputedRef<boolean>;
  isDirty: DeepReadonly<Ref<boolean>>;
  isSubmitted: DeepReadonly<Ref<boolean>>;
  revert: () => void;
  reset: (value: z.input<typeof schema>) => void;
  getErrorMessages: (params: {
    field: StringPaths<z.infer<typeof schema>>;
    nest?: boolean;
  }) => string[];
  hasError: (params: { field: StringPaths<z.infer<typeof schema>>; nest?: boolean }) => boolean;
  diff: ComputedRef<string[]>;
  error: DeepReadonly<Ref<Map<string, string[]>>>;
} {
  let initialValue = clone(modelValue.value);

  const error = ref<Map<string, string[]>>(new Map());

  let validateResult: Awaited<ReturnType<typeof schema.safeParseAsync>> | undefined = undefined;

  watch(modelValue.value, validate);

  async function validate(value: z.input<typeof schema>) {
    validateResult = await schema.safeParseAsync(value);

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
    modelValue.value = clone(initialValue);
  }

  function reset(resetValue: z.input<typeof schema>) {
    initialValue = resetValue;
    modelValue.value = clone(resetValue);
    error.value.clear();
    isSubmitted.value = false;
  }

  async function handleInvalidSubmit() {
    // TODO
  }

  const diff = computed(() =>
    microdiff(initialValue, modelValue.value, { cyclesFix: false }).map((x) => x.path.join('.')),
  );

  const isDirty = computed(() => diff.value.length > 0);

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
      const messages = computed<string[]>(() =>
        getErrorMessages({
          field: props.field as Field,
          nest: props.nest,
        }),
      );

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

  function getErrorMessages(params: { field: Field; nest?: boolean }) {
    // サブミットを実行していなければエラーメッセージを表示しない
    // 差分がなければエラーメッセージを表示しない
    const nestKey = `${params.field}.`;

    if (
      !isSubmitted.value &&
      !diff.value.includes(params.field as string) &&
      (!params.nest || (params.nest && !diff.value.some((key) => key.startsWith(nestKey))))
    ) {
      return [];
    }

    return [
      ...(error.value.get(params.field) ?? []),
      ...(params.nest
        ? Array.from(error.value.entries())
            .filter(([key]) => key.startsWith(nestKey))
            .map(([_, value]) => value)
            .flat()
        : []),
    ];
  }

  function hasError(params: { field: Field; nest?: boolean }) {
    return getErrorMessages(params).length > 0;
  }

  return {
    //# basic usage
    validateSubmit,
    ErrorMessage,
    //# form status
    isInvalid,
    isDirty: readonly(isDirty),
    isSubmitted: readonly(isSubmitted),
    //# helper methods
    revert,
    reset,
    getErrorMessages,
    hasError,
    //# inner data for debug
    diff,
    error: readonly(error),
  };
}
