---
title: Assistant Prompts
description: The <ri-assistant-prompts> web component — a list or button group of preset prompts that launch the Assistant when clicked.
sidebar:
  label: Assistant Prompts
  order: 4
---

`<ri-assistant-prompts>` displays a set of preset prompts as a button group or a list. Clicking
one opens the [Assistant](/guides/assistants/) and launches that prompt.

Enable it on your assistant by ticking **Preset prompts list** in the assistant's
[Web components](/reference/web-components/overview/#enabling-and-using-web-components) section.

## Example use cases

- A set of **"starter questions"** at the top of a support page.
- A list of suggested prompts alongside a knowledge base article.

## Usage

Provide the prompts as a JSON array of strings in the `prompts` attribute:

```html
<ri-assistant-prompts
  layout="buttons"
  prompts='["How do I renew my membership?", "What are the benefits of being a member?", "How do I access my member portal?"]'>
</ri-assistant-prompts>
```

## Attributes

### Common

| Attribute | Description | Default |
|-----------|-------------|---------|
| `prompts` | JSON array of prompt strings. | `[]` |
| `layout` | Display style — `buttons` or `list`. | `buttons` |

### `buttons` layout

| Attribute | Description | Default |
|-----------|-------------|---------|
| `layout-buttons-alignment` | Alignment of the buttons — `left`, `center`, or `right`. | `left` |
| `layout-buttons-button-background` | Background colour of each button. | `#ffffff` |
| `layout-buttons-button-text-color` | Text colour. | `inherit` |
| `layout-buttons-button-text-weight` | Font weight of the button text. | `bold` |
| `layout-buttons-button-border-color` | Border colour. | `#dddddd` |
| `layout-buttons-button-border-width` | Border width. | `1px` |
| `layout-buttons-button-border-radius` | Corner radius. | `24px` |
| `layout-buttons-button-padding` | Button padding. | `1em 1.5em` |
| `layout-buttons-button-show-icon` | Show or hide the arrow icon (`true` / `false`). | `true` |
| `layout-buttons-button-icon-color` | Arrow icon colour. | The assistant theme's primary colour, or `#171123` |
| `layout-buttons-button-icon-size` | Arrow icon size, in pixels. | `16` |
| `layout-buttons-button-hover-background` | Background colour on hover. | A darkened version of the button background |
| `layout-buttons-button-hover-text-color` | Text colour on hover. | Same as `layout-buttons-button-text-color` |
| `layout-buttons-button-hover-border-color` | Border colour on hover. | Same as `layout-buttons-button-border-color` |
| `layout-buttons-button-hover-icon-color` | Icon colour on hover. | Same as `layout-buttons-button-icon-color` |

### `list` layout

| Attribute | Description | Default |
|-----------|-------------|---------|
| `layout-list-item-border-color` | Colour of the divider between list items. | `#dddddd` |
| `layout-list-button-text-color` | Text colour of each item. | `inherit` |
| `layout-list-button-icon-color` | Arrow icon colour. | The assistant theme's primary colour, or `#171123` |
| `layout-list-button-hover-text-color` | Text colour on hover. | Same as `layout-list-button-text-color` |
| `layout-list-button-hover-icon-color` | Icon colour on hover. | Same as `layout-list-button-icon-color` |

## Related reading

- [Web Components overview](/reference/web-components/overview/) — enabling components and embedding them.
- [Assistants](/guides/assistants/) — the chat experience these prompts launch.
