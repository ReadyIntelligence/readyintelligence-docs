---
title: Assistants
description: The chat experiences that surface an agent to members, staff, or external sites — welcome messages, suggestions, theming, embedding, and access modes.
sidebar:
  order: 5
---

## Introduction

An **assistant** is the chat experience your users actually see and interact with. Where an
[agent](/guides/agents/) is the AI "brain", the assistant is the face: the chat window, its
welcome message, its suggested questions, its look and feel, and the rules about who can use it.

Each assistant points at a **default agent**, which does the actual thinking. This separation
means you can present the same underlying agent in different ways — a friendly public widget on
your website, and a staff-only assistant inside the admin interface, for example — without
duplicating its configuration.

When a user starts chatting, the assistant streams the agent's responses back in real time, and
can offer **saved prompts** and suggested questions to help people get started.

### Where an assistant lives

An assistant can be embedded in different contexts:

| Embed mode | Where it runs |
|------------|---------------|
| **Internal** | Embedded in a website hosted on this platform, with user accounts managed here. |
| **External** | Embedded in an external website, with user identity handled by that external site. |
| **Admin** | Embedded inside the admin interface, for staff. |

### Who can use it

Access is controlled by an **authentication mode**:

| Auth mode | Behaviour |
|-----------|-----------|
| **Authentication required** | Only logged-in users see the assistant. |
| **Mixed mode** | Guests can use it, but are prompted to log in to unlock all features. |
| **Anonymous mode** | Everyone is treated as an anonymous user; no authentication. |

## Configuration options

### Core configuration

| Setting | Description |
|---------|-------------|
| **Default agent** | The [agent](/guides/agents/) that powers the assistant's conversations. |
| **Welcome message** | An optional opening message shown when a new conversation starts, e.g. "Hi, I'm Clara and I can help you. Ask a question to get started!" |
| **Suggested prompts** | Up to three starter prompts offered to the user. |
| **Embed mode** | Internal, external, or admin — see [above](#where-an-assistant-lives). |
| **Authentication mode** | Who can access the assistant — see [above](#who-can-use-it). |

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

A floating trigger button (its shape, icon, size, position, and tooltip) can also be configured
for assistants that pop up over a website.

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
drop the elements straight into your markup. See [Web Components](/reference/web-components/overview/).

## Related reading

- [Agents](/guides/agents/) — the brain behind every assistant.
- [Tools](/guides/tools/) — what the backing agent can do during a conversation.
- [Web Components](/reference/web-components/overview/) — embed buttons, inputs, and prompt lists that launch the assistant.
- [MCP](/guides/mcp/) — exposing agents to external AI apps instead of (or as well as) an assistant UI.
