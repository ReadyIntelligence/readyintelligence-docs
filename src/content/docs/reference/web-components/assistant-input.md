---
title: Assistant Input
description: The <ri-assistant-input> web component — a text input that opens the Assistant with the visitor's query already sent.
sidebar:
  label: Assistant Input
  order: 3
---

`<ri-assistant-input>` is a text input with a submit button. When the visitor submits their
question, the [Assistant](../../guides/assistants.md) opens with that query already sent.

Enable it on your assistant by ticking **Quick-ask input** in the assistant's
[Web components](./overview.mdx#enabling-and-using-web-components) section.

## Example use cases

- An **"Ask the assistant"** field embedded in a blog post.
- A contextual input box next to your product documentation, or in a hero section.

## Usage

```html
<ri-assistant-input input-placeholder-text="Ask a question..."></ri-assistant-input>
```

## Attributes

### Input

| Attribute | Description | Default |
|-----------|-------------|---------|
| `input-placeholder-text` | Placeholder text shown in the input field. | `Ask a question...` |
| `input-text-color` | Text colour inside the input field. | `inherit` |
| `background` | Background colour of the input container. | `#ffffff` |
| `border-color` | Border colour of the input container. | `#dddddd` |
| `border-radius` | Corner radius of the input container. | `8px` |

### Submit button

| Attribute | Description | Default |
|-----------|-------------|---------|
| `button-text` | Text on the submit button. | `Submit` |
| `button-background` | Background colour of the submit button. | The assistant theme's primary colour, or `#171123` |
| `button-text-color` | Colour of the button text. | `#ffffff` |

## Related reading

- [Web Components overview](./overview.mdx) — enabling components and embedding them.
- [Assistants](../../guides/assistants.md) — the chat experience this input launches.
