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
```

<script setup lang="ts">
import BasicUsage from './components/BasicUsage.vue'
import ComplicatedSchema from './components/ComplicatedSchema.vue'
import ArrayObjectSchema from './components/ArrayObjectSchema.vue'
import TransformSchema from './components/TransformSchema.vue'
</script>

<BasicUsage></BasicUsage>

- ポイント１．
  - zodスキーマと対象のRefオブジェクトに対してバリデーションをします
- ポイント２．
  - `ErrorMessage` を使うとその場にメッセージが表示されるよ
- ポイント３．
  - 既存のフォームに手を加える必要がほとんどないよ

## Complicated Schema

```ts
const schema = z
  .object({
    username: z.string().trim().min(1).max(10),
    email: z.string().email().endsWith('@example.com'),
    password: z
      .string()
      .min(8)
      .max(100)
      .regex(/^[\x20-\x7E]+$/, 'Use only standard English letters, numbers, and symbols')
      .regex(/[A-Z]/, 'Password must contain uppercase letters')
      .regex(/[a-z]/, 'Password must contain lowercase letters')
      .regex(/\d/, 'Password must contain numbers')
      .regex(/[^a-zA-Z0-9]/, 'Password must contain symbols'),
    confirm_password: z.string().min(8).max(100),
    securityQuestions: z
      .string()
      .refine((val) => val !== '', {
        message: 'Please select one',
      })
      .pipe(z.enum(securityQuestions))
      .array(),
    securityAnswers: z.string().trim().min(1).max(10).array(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
      ctx.addIssue({
        path: ['confirm_password'],
        code: z.ZodIssueCode.custom,
        message: `Password and confirmation do not match`,
      });
    }

    const questions = new Set<string>();
    val.securityQuestions.forEach((current, i) => {
      if (!current) {
        return;
      }

      if (questions.has(current)) {
        ctx.addIssue({
          path: [`securityQuestions.${i}`],
          code: z.ZodIssueCode.custom,
          message: `This question is a duplicate. Please choose a different question.`,
        });
      }
      questions.add(current);
    });
  });
```

<ComplicatedSchema></ComplicatedSchema>

## Array Object Schema

```ts
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
```

<ArrayObjectSchema></ArrayObjectSchema>

## Transform Schema

```ts
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
```

<TransformSchema></TransformSchema>
