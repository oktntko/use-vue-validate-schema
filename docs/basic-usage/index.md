---
outline: deep
---

<script setup lang="ts">
import TabZod from './TabZod.vue'
import TabValibot from './TabValibot.vue'
</script>

# Basic Usage

:::tabs key:schema
== zod(v3)
<TabZod></TabZod>
== valibot
<TabValibot></TabValibot>
:::

- ポイント１．
  - zodスキーマと対象のRefオブジェクトに対してバリデーションをします
- ポイント２．
  - `ErrorMessage` を使うとその場にメッセージが表示されるよ
- ポイント３．
  - 既存のフォームに手を加える必要がほとんどないよ
