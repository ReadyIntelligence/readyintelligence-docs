---
title: Assistants
description: The chat experiences that surface an agent on your websites or in admin — welcome messages, suggestions, theming, embedding, and access modes.
sidebar:
  order: 5
---

## Introduction

An **assistant** is the chat experience your users actually see and interact with. Where an
[agent](./agents.md) is the AI "brain", the assistant is the face: the chat window, its
welcome message, its suggested questions, its look and feel, and the rules about who can use it.

Each assistant points at a **default agent**, which does the actual thinking. This separation
means you can present the same underlying agent in different ways — a friendly public widget on
your website, and a staff-only assistant inside the admin interface, for example — without
duplicating its configuration.

[Skills](./skills.md), [tools](./tools.md), and knowledge reach the assistant **through that
default agent**. You do not assign skills on the assistant itself.

When a user starts chatting, the assistant streams the agent's responses back in real time, and
can offer **saved prompts** and suggested questions to help people get started.

### Where an assistant lives

An assistant can be embedded in different contexts:

| Embed mode | Where it runs |
|------------|---------------|
| **Internal** | Embedded in a website hosted alongside ReadyIntelligence, with user accounts managed there. |
| **External** | Embedded in an external website. User identity is typically handled by a [third-party identity provider](./third-party-auth.md). |
| **Admin** | Embedded inside the admin interface, for staff. |

### Who can use it

Access is controlled by an **authentication mode**:

| Auth mode | Behaviour |
|-----------|-----------|
| **Authentication required** | Only logged-in users see the assistant. |
| **Mixed mode** | Guests can use it, but are prompted to log in to unlock all features. |
| **Anonymous mode** | Everyone is treated as an anonymous user; no authentication. |

For external embeds, pair required or mixed mode with an identity provider so users from your
own system are recognised. See [Third-party authentication](./third-party-auth.md).

## Configuration options

### Core configuration

| Setting | Description |
|---------|-------------|
| **Default agent** | The [agent](./agents.md) that powers the assistant's conversations (including its tools and skills). |
| **Welcome message** | An optional opening message shown when a new conversation starts, e.g. "Hi, I'm Clara and I can help you. Ask a question to get started!" |
| **Suggested prompts** | Up to three starter prompts offered to the user. |
| **Embed mode** | Internal, external, or admin — see [above](#where-an-assistant-lives). |
| **Authentication mode** | Who can access the assistant — see [above](#who-can-use-it). |
| **Identity provider** | Optional. The [third-party identity provider](./third-party-auth.md) used when the assistant authenticates external users. |

### Display style

**Display style** controls how the assistant appears on the page:

| Style | Behaviour |
|-------|-----------|
| **Floating** *(default)* | Floating trigger button and overlay chat window — flexible on any website with little host CSS. |
| **Inline** | Assistant fills a container in your layout (for example a sidebar). You own sizing, collapse behaviour, and surrounding CSS. |
| **Fullscreen** | Assistant fills the viewport — suited to a dedicated page or route. |

See [Embedding the assistant](./embedding.md) for when to use each style and what advanced
(inline / fullscreen) embeds require from the host site.

### Appearance

Assistants can either inherit your **site's theme** or use their own values. When themed
explicitly, the available settings include:

| Setting | Description |
|---------|-------------|
| **Base font size** | Should match your website's base font size (usually 16). |
| **Font** | A system font or the name of a Google Font. |
| **Background** | The assistant's main background colour. |
| **Borders** | Colour for borders around containers and buttons. |
| **Text** | Default text colour; keep it readable against the background. |
| **Primary colour** | Main colour for highlights, buttons, and active states — usually your brand colour. |
| **Secondary colour** | Supporting colour for subtle highlights and hover states. |
| **Links** | Colour for links inside the assistant. |

For **floating** assistants, a trigger button (shape, icon, colours, position, tooltip, and
related layout options) can also be configured. Those floating-only controls do not apply to
inline or fullscreen display styles.

### Saved prompts

Assistants can offer **saved prompts** — reusable starting messages. Saved prompts have a
visibility setting so you can control whether a prompt is private to a user or shared more
widely.

## Triggering the assistant from your site

Beyond the assistant's own window and floating trigger, you can place interactive elements
anywhere on your website that open or talk to the assistant — a button, a text input, or a list
of preset prompts. These are **web components**.

In the assistant's **Web components** section you tick which ones to make available — *Chat
button*, *Quick-ask input*, and/or *Preset prompts list*. The components you enable are bundled
into the assistant's embed script automatically, so once the embed snippet is on a page you can
drop the elements straight into your markup. See [Web Components](../reference/web-components/overview.mdx).

## Related reading

- [Agents](./agents.md) — the brain behind every assistant.
- [Skills](./skills.md) — specialised instruction packs on the default agent.
- [Tools](./tools.md) — what the backing agent can do during a conversation.
- [Embedding the assistant](./embedding.md) — floating, inline, and fullscreen display styles.
- [Third-party authentication](./third-party-auth.md) — identity providers for external embeds.
- [Web Components](../reference/web-components/overview.mdx) — embed buttons, inputs, and prompt lists that launch the assistant.
- [MCP](./mcp.md) — exposing agents to external AI apps instead of (or as well as) an assistant UI.
- [Getting started: Embed an assistant](../start-here/getting-started.mdx) — end-to-end embed path.
