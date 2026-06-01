---
title: Assistant Button
description: The <ri-assistant-button> web component — a customisable button that opens the Assistant, optionally with a specific prompt.
sidebar:
  label: Assistant Button
  order: 2
---

`<ri-assistant-button>` is a customisable button that opens the [Assistant](../../guides/assistants.md)
when clicked — optionally starting the conversation with a specific prompt.

Enable it on your assistant by ticking **Chat button** in the assistant's
[Web components](./overview.mdx#enabling-and-using-web-components) section.

## Example use cases

- A **"Need help?"** button on a support page.
- A **"Generate ideas"** call to action that starts a conversation with a predefined question.

## Usage

```html
<ri-assistant-button text="Ask the Assistant"></ri-assistant-button>
```

To open the Assistant with a message already sent, add a `prompt`:

```html
<ri-assistant-button
  text="Generate ideas"
  prompt="Give me three ideas for my next newsletter">
</ri-assistant-button>
```

## Attributes

### Content

| Attribute | Description | Default |
|-----------|-------------|---------|
| `prompt` | If provided, launch the Assistant with this message instead of just opening it. | `null` |
| `text` | Button text. | `Open assistant` |
| `icon` | Icon to show — `sparkle`, `sparkles`, `bot`, `bot-message-square`, or the URL of your own image. | The assistant's floating-trigger icon, or `sparkles` |
| `icon-size` | Size of the icon, in pixels. | `16` |
| `show-icon` | Show or hide the icon (`true` / `false`). | `true` |

### Appearance

| Attribute | Description | Default |
|-----------|-------------|---------|
| `background` | Background colour. | The assistant theme's primary colour, or `#171123` |
| `text-color` | Text colour. | `#ffffff` |
| `text-weight` | Font weight of the button text. | `bold` |
| `border-color` | Border colour. | `transparent` |
| `border-width` | Border width. | `0px` |
| `border-radius` | Corner radius. | `8px` |
| `padding` | Button padding. | `1em 1.5em` |

### Hover

| Attribute | Description | Default |
|-----------|-------------|---------|
| `hover-background` | Background colour on hover. | A darkened version of `background` |
| `hover-text-color` | Text colour on hover. | Same as `text-color` |
| `hover-border-color` | Border colour on hover. | Same as `border-color` |

## Related reading

- [Web Components overview](./overview.mdx) — enabling components and embedding them.
- [Assistants](../../guides/assistants.md) — the chat experience this button opens.
