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
import type { z } from 'zod/v4';
import { clone } from '../clone.js';
import type { PartialRecord, StringPaths, ToResolvedProps } from '../type.js';

export function useVueValidateZod<T extends z.ZodType<object, object>>(
  schema: T,
  modelValue: Ref<z.input<T>>,
): {
  validateSubmit: (
    callback: (value: z.output<typeof schema>) => void,
    options?: {
      handleValidateError?: (
        error: PartialRecord<StringPaths<z.infer<typeof schema>>, string[]>,
      ) => void;
    },
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
      default: (props: { messages: string[]; message: string }) => VNode[];
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
  isDirty: ComputedRef<boolean>;
  isSubmitted: Readonly<Ref<boolean>>;
  revert: () => void;
  reset: (value: z.input<typeof schema>) => void;
  diff: ComputedRef<string[]>;
  error: DeepReadonly<Ref<PartialRecord<StringPaths<z.infer<typeof schema>>, string[]>>>;
  errorNest: ComputedRef<PartialRecord<StringPaths<z.infer<typeof schema>>, string[]>>;
} {
  type Field = StringPaths<z.infer<typeof schema>>;

  let initialValue = clone(modelValue.value);

  const error = ref<PartialRecord<Field, string[]>>({});

  const isInvalid = computed(() => Object.keys(error.value).length > 0);

  const diff = computed(() =>
    microdiff(initialValue, modelValue.value, { cyclesFix: false }).map((x) => x.path.join('.')),
  );

  const isDirty = computed(() => diff.value.length > 0);

  const isSubmitted = ref(false);

  let validateResult: Awaited<ReturnType<typeof schema.safeParseAsync>> | undefined = undefined;

  watch(
    () => modelValue.value,
    (newValue) => validate(newValue, { diffOnly: true }),
    { deep: true },
  );

  async function validate(value: z.input<typeof schema>, options?: { diffOnly: boolean }) {
    validateResult = await schema.safeParseAsync(value);

    if (validateResult.success) {
      error.value = {};
      return validateResult;
    }

    error.value = validateResult.error.issues.reduce(
      (map, issue) => {
        const key = issue.path.join('.') as Field;
        if (options?.diffOnly && !isSubmitted.value && !diff.value.includes(key)) {
          return map;
        }

        const messages = map[key] as string[] | undefined;
        if (messages) {
          messages.push(issue.message);
        } else {
          map[key] = [issue.message];
        }

        return map;
      },
      {} as PartialRecord<Field, string[]>,
    );

    return validateResult;
  }

  const errorNest = computed(() => {
    return Object.entries(error.value).reduce(
      (map, [key, messages]) => {
        const parts = key.split('.');

        for (let i = 0; i < parts.length; i++) {
          const newkey = parts.slice(0, i + 1).join('.') as Field;

          const parent = map[newkey] as string[] | undefined;
          if (parent) {
            parent.push(...(messages as string[]));
          } else {
            map[newkey] = messages as string[];
          }
        }

        return map;
      },
      {} as PartialRecord<Field, string[]>,
    );
  });

  function validateSubmit(
    callback: (value: z.output<typeof schema>) => void,
    {
      handleValidateError = handleInvalidSubmit,
    }: { handleValidateError?: (error: PartialRecord<Field, string[]>) => void } = {},
  ) {
    return async () => {
      isSubmitted.value = true;

      const validateResult = await validate(modelValue.value);

      if (validateResult.success) {
        isSubmitted.value = false;
        return callback(validateResult.data);
      } else {
        return handleValidateError ? handleValidateError(error.value) : undefined;
      }
    };
  }

  function revert() {
    modelValue.value = clone(initialValue);
  }

  function reset(resetValue: z.input<typeof schema>) {
    initialValue = resetValue;
    modelValue.value = clone(resetValue);
    error.value = {};
    isSubmitted.value = false;
  }

  async function handleInvalidSubmit() {
    // TODO
  }

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
      default: (props: { messages: string[]; message: string }) => VNode[];
    }>,
    setup(props, { slots, attrs }) {
      const messages = computed<string[]>(() => {
        return [
          ...(error.value[props.field] ?? []),
          ...(props.nest
            ? Array.from(Object.entries(error.value))
                .filter(([key]) => key.startsWith(`${props.field}.`))
                .map(([_, value]) => value)
                .flat()
            : []),
        ];
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
            slots.default({ messages: messages.value, message: messages.value[0]! }),
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

  return {
    //# basic usage
    validateSubmit,
    ErrorMessage,
    //# form status
    isInvalid,
    isDirty,
    isSubmitted: readonly(isSubmitted),
    //# helper methods
    revert,
    reset,
    //# inner data for debug
    diff,
    // @ts-expect-error TODO
    error: readonly(error),
    errorNest,
  };
}
