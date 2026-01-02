---
outline: deep
---

# About

## What is use-vue-validate-schema?

**use-vue-validate-schema** is a small Vue composable that connects
**schema-based validation** with **form submission** in a simple and predictable way.

It is designed for developers who want to:

* Use schema validators like **Zod** or **Valibot**
* Keep forms **type-safe**
* Avoid large, UI-coupled form frameworks
* Explicitly control validation and submission flow

This library focuses on doing *one thing well*:
**validating form data with a schema before submitting it.**

---

## Motivation

When building forms in Vue, validation logic often becomes scattered:

* Validation rules live separately from TypeScript types
* Error handling is duplicated across components
* `submit`, `validate`, and `parse` logic are mixed together

Schema validators already solve many of these problems, but integrating them cleanly
into Vue forms usually requires repetitive boilerplate.

**use-vue-validate-schema** was created to reduce that friction.

---

## Core Concepts

### Schema as the Single Source of Truth

The schema defines everything:

* Validation rules
* Input data shape
* TypeScript types

```ts
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
```

No duplicated type definitions.
No mismatch between validation and runtime behavior.

---

### UI-Agnostic by Design

This library does **not** provide any UI components.

You are free to use:

* Native HTML inputs
* Custom components
* Headless UI
* Any design system

`use-vue-validate-schema` only handles validation logic and submission flow.

---

### Explicit Validation Flow

Nothing happens magically.

Validation and submission are always explicit and easy to follow:

```ts
const { validateSubmit } = useValidateSchema(schema, onSubmit);
```

* Validation runs before submission
* Submission only receives validated data
* Errors are exposed in a predictable way

This makes the control flow clear and debuggable.

---

## What This Library Is — and Isn’t

### ✔ What it is

* A lightweight Vue composable
* A bridge between schema validators and Vue forms
* A helper for consistent validation + submit logic

### ✖ What it is not

* A full form framework
* A UI component library
* A form builder or auto-generated solution

If you want a fully managed form system with built-in UI, this library may not be a good fit.

---

## Who Is This For?

### This library is a good fit if you:

* Prefer schema-driven development
* Care about strict type safety
* Want minimal abstractions
* Build your own form UI

### This library may not be ideal if you:

* Want a zero-configuration form solution
* Need UI components included
* Prefer declarative form definitions over composables

---

## Philosophy

> **Small, explicit, and predictable.**

use-vue-validate-schema aims to stay focused and composable,
so it can fit naturally into many different Vue projects without taking control away from you.

---

## Next Steps

* 👉 Get started with a basic example in **Getting Started**
* 👉 See practical patterns in **Examples**
* 👉 Explore detailed APIs in **Reference**
