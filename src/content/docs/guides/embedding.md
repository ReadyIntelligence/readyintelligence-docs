---
title: Embedding the assistant
description: Floating, omnibar, inline, and fullscreen display styles — when to use each, and what your website must provide for advanced embeds.
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
| **Omnibar** | A search-style bar docked to the bottom of the page that opens a chat window when a question is asked | ReadyIntelligence — moves clear of your page's own bottom bars and banners |
| **Inline** | The assistant UI fills a container you place in the page | **You** — size, position, collapse/expand, and page CSS |
| **Fullscreen** | The assistant fills the viewport | **You** — page/route chrome around a full-viewport experience |

Choose the style on the assistant's **Theming** tab, under **Layout** (**Display style**).

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
especially well with floating and omnibar assistants: they call into the embed to open the window
or send a prompt.
:::

## Omnibar

The omnibar is a search-style bar docked to the bottom of the page. Visitors type a question
straight into the bar; asking it opens the chat window over the page and starts a new
conversation. While the bar is focused it also shows the assistant's suggested prompts and a
button that opens the assistant's home view.

Like floating, the omnibar works on almost any website with no host CSS. Its own options are on
the assistant's **Theming** tab, under **Layout - Omnibar**:

| Setting | Description |
|---------|-------------|
| **Placeholder text** | Prompt text shown in the empty bar (for example "Ask us anything about our services..."). |
| **Bottom offset (px)** | How far the bar sits above the bottom of the page. Leave blank *(default)* to have it move clear of your page's own bottom UI automatically — see below. |

**Corner rounding**, **Stacking order**, and **Keyboard shortcut** under **Layout** apply too.
With the omnibar, the shortcut focuses the bar and is shown as a hint inside it.

### Staying clear of your page

Many pages fix their own UI to the bottom of the screen — a payment or checkout bar, a cookie
banner, a sticky basket summary. The omnibar keeps out of their way:

- It finds page elements fixed (or stuck) to the bottom of the screen that span at least half its
  width, and sits above them. Bars stacked on top of each other, bars floating a little above the
  edge, and banners drawn by web components (as many consent tools are) are all found.
- Narrow floats such as chat bubbles or language pickers, full-screen overlays such as modals, and
  toast notifications are ignored, so the bar does not jump around for them.
- It checks again as the page changes — a banner appearing or being dismissed, the page
  scrolling, the window resizing — and moves to match.
- Space is reserved at the end of the page, so its last content can always be scrolled clear of
  the bar.

This needs nothing from your site. If it does not suit a site, enter a number in
**Bottom offset (px)** to always use that offset instead; `0` keeps the bar at the very bottom.
The setting applies to every page the assistant is embedded on — for control page by page, use
the options below.

### Controlling the omnibar from your page

When automatic placement is not enough, your page can take over.

**Marking an element to avoid.** Add the `data-ri-assistant-avoid` attribute to an element and the
bar sits above it whenever it is showing near the bottom of the screen, whatever its width:

```html
<div class="help-widget" data-ri-assistant-avoid>…</div>
```

Use it for elements the bar would otherwise ignore, such as a narrow widget in the bar's path.

**JavaScript API.** `window.RIAssistant` has these methods for the omnibar:

| Method | Description |
|--------|-------------|
| `setOmnibarOffset( pixels )` | Sits the bar a fixed number of pixels above the bottom of the page, overriding both automatic placement and the **Bottom offset (px)** setting. Pass `null` to hand back to them. |
| `setOmnibarHidden( hidden )` | `true` hides the bar and `false` shows it again. While it is hidden, `openAssistant()` and [web components](../reference/web-components/overview.mdx) can still open the assistant. |
| `setOmnibarPlaceholder( text )` | Replaces the bar's placeholder text. Pass `null` to restore the configured text. |
| `setOmnibarPrompts( prompts )` | Replaces the suggested prompts with an array of strings. Pass `null` to restore the assistant's own. |

Anything set through the API lasts until the page is reloaded, so call it on each page that needs
it. The API is ready once the application fires a `RIAssistantApiReady` event on `window`;
trying straight away and again on that event covers both orderings, wherever your script sits
relative to the embed:

```js title="your page — hide the omnibar on this page"
function hideOmnibar() {
  if ( !window.RIAssistant || !window.RIAssistant.setOmnibarHidden ) {
    return false;
  }

  window.RIAssistant.setOmnibarHidden( true );

  return true;
}

if ( !hideOmnibar() ) {
  window.addEventListener( "RIAssistantApiReady", hideOmnibar );
}
```

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

Set a **Mount target** on the assistant (**Theming → Layout**) — a CSS selector for the element
the container should be added to (for example `#assistant-dock`). Leave it blank and the container
is added to the end of the page body. The selector is resolved as the page finishes parsing; if it matches nothing, the
assistant does not render at all, so the target must be present in your markup.

You must give the container a real size (for example a sidebar with `width` and `height`, or a
flex/grid child that stretches). If the container has no height, the assistant will not appear
usefully on the page.

Collapse behaviour is entirely yours — ReadyIntelligence does not ship a sidebar toggle. Your
site's button or breakpoint logic shows or hides the panel; the assistant simply fills whatever
space you give it. Where the assistant shows its own close button, what that button does is also
yours: register a handler with `window.RIAssistant.registerCloseHandler()`.

:::tip[Worked example]
[Docking the assistant as a sidebar panel](../tutorials/docked-sidebar-assistant.mdx) walks
through the container placement, CSS, and toggle logic for an inline embed end to end.
:::

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
floating / omnibar / inline / fullscreen in the embed markup. Change the style in the admin, then refresh
the host page.

## Choosing a style

| If you want… | Prefer… |
|--------------|---------|
| Drop-in chatbot on any marketing or content site | **Floating** |
| An "ask anything" bar always in view at the bottom of the page | **Omnibar** |
| Chat inside a sidebar, split view, or custom panel | **Inline** |
| A page that is only (or mostly) the assistant | **Fullscreen** |

You can keep the same agent, theming, and auth settings and only change display style when your
layout needs change.

## Related reading

- [Assistants](./assistants.md) — theming, auth modes, and core settings.
- [Third-party authentication](./third-party-auth.md) — identity for external embeds.
- [Web Components](../reference/web-components/overview.mdx) — page-level triggers and prompts (best with floating or omnibar).
- [Getting started: Embed an assistant](../start-here/getting-started.mdx) — end-to-end embed path.
- [Docking the assistant as a sidebar panel](../tutorials/docked-sidebar-assistant.mdx) — a full inline embed worked through.
