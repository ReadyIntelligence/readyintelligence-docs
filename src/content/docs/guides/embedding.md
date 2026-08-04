---
title: Embedding the assistant
description: Floating, inline, and fullscreen display styles — when to use each, and what your website must provide for advanced embeds.
sidebar:
  order: 5
---

## Introduction

Every [assistant](./assistants.md) has a **display style** that controls how the chat UI appears
on the page. The same embed script is used in all cases; the style you choose in the assistant
settings changes what ReadyIntelligence renders inside the mount container.

| Display style | What the user sees | Who owns the surrounding layout |
|---------------|--------------------|---------------------------------|
| **Floating** *(default)* | A floating trigger button that opens a chat window over the page | ReadyIntelligence — works on almost any website with little or no host CSS |
| **Inline** | The assistant UI fills a container you place in the page | **You** — size, position, collapse/expand, and page CSS |
| **Fullscreen** | The assistant fills the viewport | **You** — page/route chrome around a full-viewport experience |

Choose the style under the assistant's layout / appearance settings (**Display style**).

## Floating (default)

Floating is the usual embed for public websites. After you add the embed snippet, ReadyIntelligence:

- Mounts a container on the page
- Shows a **floating trigger** (icon button) in a corner
- Expands into a resizable chat window when opened

You can configure floating-only options such as:

| Setting | Description |
|---------|-------------|
| **Hidden on first load** | When on, the chat starts closed until the user opens it. |
| **Position on screen** | Where the floating button sits (for example bottom-right). |
| **Initial window size** | Starting size of the chat window (users can still resize). |
| **Stacking order** | CSS z-index if other page elements cover the assistant. |
| **Keyboard shortcut** | Optional shortcut to open or close (for example `ctrl+space`). |

Trigger appearance (shape, colours, icon, tooltip) is also configured on the assistant and applies
to this style.

Floating is the most flexible option when you want a chatbot that does not require changes to
your site's layout or CSS.

:::tip[Web components]
[Web components](../reference/web-components/overview.mdx) (buttons, inputs, prompt lists) work
especially well with floating assistants: they call into the embed to open the window or send a
prompt.
:::

## Inline and fullscreen (advanced)

**Inline** and **fullscreen** are for hosts who want the assistant built into a specific place
in the site — for example a collapsible sidebar, a dedicated `/assistant` route, or a panel in
an app shell.

ReadyIntelligence still provides the chat UI. **You** own everything around it:

- Where the assistant sits in the DOM / layout
- Width, height, and responsive behaviour
- Collapse / expand, drawers, tabs, or modal wrappers
- Any CSS needed so the assistant fits your design

Floating-only settings (trigger button, corner position, floating z-index, and so on) do **not**
apply to these styles.

### Inline

The assistant renders **as part of the page**, filling its mount container (`#ri-assistant` /
`.ri-assistant-container`) at 100% width and height of that container.

Typical uses:

- A fixed or collapsible **sidebar** that contains the assistant
- A panel in a dashboard layout
- An embedded chat area beside other content

You must give the container a real size (for example a sidebar with `width` and `height`, or a
flex/grid child that stretches). If the container has no height, the assistant will not appear
usefully on the page.

Collapse behaviour is entirely yours — ReadyIntelligence does not ship a sidebar toggle. Your
site's button or breakpoint logic shows or hides the panel; the assistant simply fills whatever
space you give it.

### Fullscreen

The assistant takes over the **viewport** (full viewport height). Typical uses:

- A dedicated assistant page or SPA route
- An immersive help experience with minimal surrounding chrome

Your site still owns routing, headers, and any exit/navigation controls outside the assistant.
Use this when the assistant *is* the main content of the view, not a widget over another page.

## Adding the embed to your site

For **external** assistants, copy the embed snippet from the assistant's embedding instructions
in the admin (allowed domains must be set first). It loads a script that mounts the assistant
container and application.

For JWT-based [third-party authentication](./third-party-auth.md), register your token provider
before or as the embed initialises, as shown in the admin snippet.

The display style is read from the assistant configuration when the app loads — you do not pass
floating / inline / fullscreen in the embed markup. Change the style in the admin, then refresh
the host page.

## Choosing a style

| If you want… | Prefer… |
|--------------|---------|
| Drop-in chatbot on any marketing or content site | **Floating** |
| Chat inside a sidebar, split view, or custom panel | **Inline** |
| A page that is only (or mostly) the assistant | **Fullscreen** |

You can keep the same agent, theming, and auth settings and only change display style when your
layout needs change.

## Related reading

- [Assistants](./assistants.md) — theming, auth modes, and core settings.
- [Third-party authentication](./third-party-auth.md) — identity for external embeds.
- [Web Components](../reference/web-components/overview.mdx) — page-level triggers and prompts (best with floating).
- [Getting started: Embed an assistant](../start-here/getting-started.mdx) — end-to-end embed path.
