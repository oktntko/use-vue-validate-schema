---
outline: deep
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabZodV4 from './TabZodV4.vue'
import TabValibot from './TabValibot.vue'
</script>

# Basic Usage

:::tabs key:schema
== zod(v3)
<TabZod></TabZod>
== zod(v4)
<TabZodV4></TabZodV4>
== valibot
<TabValibot></TabValibot>
:::

- ポイント１．
  - zodスキーマと対象のRefオブジェクトに対してバリデーションをします
- ポイント２．
  - `ErrorMessage` を使うとその場にメッセージが表示されるよ
- ポイント３．
  - 既存のフォームに手を加える必要がほとんどないよ
