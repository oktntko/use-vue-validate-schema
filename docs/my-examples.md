---
outline: deep
---

# Runtime API Examples

## Basic Usage

```ts
const schema = z.object({
  text: z.string().trim().min(1).max(10),
  textarea: z.string().max(100),
  single_checkbox: z.boolean().default(false),
  multiple_checkbox: z.enum(multiple_checkbox_options).array().min(1),
  radio: z.enum(radio_options),
  single_select: z
    .string()
    .refine((val) => val !== '', {
      message: 'Please select one',
    })
    .pipe(z.enum(single_select_options)),
  multiple_select: z.enum(multiple_select_options).array().min(1),
});

const modelValue = ref<z.infer<typeof schema>>({
  text: '',
  textarea: '',
  single_checkbox: false,
  multiple_checkbox: [],
  radio: 'One',
  single_select: '',
  multiple_select: [],
});

const { validateSubmit, ErrorMessage } = useValidate(schema, modelValue);
```

<script setup>
import BasicUsage from './components/BasicUsage.vue'
</script>

<BasicUsage></BasicUsage>

- ポイント１．
  - zodスキーマと対象のRefオブジェクトに対してバリデーションをします
- ポイント２．
  - `ErrorMessage` を使うとその場にメッセージが表示されるよ
- ポイント３．
  - 既存のフォームに手を加える必要がほとんどないよ

## 複雑なスキーマ

パスワードの変更

## ネスト・アレイ・ネストアレイ

## トランスフォーム

## リファイン
