---
title: Assistants
description: The chat experiences that surface an agent on your websites or in admin — greetings, suggestions, forms, file uploads, theming, embedding, and access modes.
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
can offer **saved prompts** and suggested questions to help people get started. When the agent
uses a tool, the tool-use details in the chat **collapse** after the step finishes, so the
conversation stays readable.

### Where an assistant lives

An assistant can be embedded in different contexts:

| Embed mode | Where it runs |
|------------|---------------|
| **Internal** | Embedded in a website hosted alongside ReadyIntelligence, with user accounts managed there. |
| **External** | Embedded in an external website. User identity is typically handled by a [third-party identity provider](./third-party-auth.md). |
| **Admin** | The staff [admin assistant](./admin-assistant.md) in the admin header — not a website embed. |

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
| **Embed mode** | Internal, external, or admin — see [above](#where-an-assistant-lives). |
| **Authentication mode** | Who can access the assistant — see [above](#who-can-use-it). |
| **Identity provider** | Optional. The [third-party identity provider](./third-party-auth.md) used when the assistant authenticates external users. |

### Dashboard and chat intro

The **dashboard** is the first screen users see before a conversation is underway. The **chat
screen** is the conversation itself. Each has its own greeting.

| Setting | Description |
|---------|-------------|
| **Greeting text** (dashboard) | The main welcome line on the dashboard, e.g. "Hi, I'm Clara and I can help you." |
| **Sub-text** | An optional line shown beneath the dashboard greeting, e.g. "You can ask me about events and more." |
| **Dashboard greeting size / colour** | Size and colour of the dashboard greeting. |
| **Greeting text** (chat) | An optional greeting shown at the top of a new chat screen, separate from the dashboard. |
| **Chat greeting size / colour** | Size and colour of the chat-screen greeting. |
| **Disclaimer text** | An optional notice shown alongside the chat input wherever it appears. |

Suggested prompts (below) appear on a **new chat**. They hide once the user has recent threads.

### Prompts and follow-ups

| Setting | Description |
|---------|-------------|
| **Suggested prompts** | Up to three starter prompts offered to the user. Place each suggestion on a new line. |
| **Create follow-up suggestions** | When on, the assistant tries to suggest follow-up questions from the previous exchange. |
| **Prompt library** | When on, users can save personal prompts in the assistant. Administrators can manage prompts shared with everyone. |
| **Scheduled prompts** | When on, signed-in users can create and manage their own [scheduled agent](./automation.md) prompts from the assistant app. |

### File uploads

Signed-in users can upload files through **prompt forms** when file uploads are enabled.
Uploaded files appear in the **Files** area of the assistant app.

| Setting | Description |
|---------|-------------|
| **File uploads** | Allow signed-in users to attach files when the assistant asks for them. |
| **Allowed file types** | Which types users may upload. Leave all unchecked to allow every type the platform supports. |
| **Maximum file size (MB)** | Maximum size per uploaded file. Cannot exceed the system-wide limit. |

### Prompt forms

During a conversation the assistant can ask a **structured question** instead of waiting for
free-typed text — for example a short answer, a yes/no choice, or a file. The user fills in
the form in the chat, then the assistant continues with those answers.

When file uploads are enabled, files chosen in a form go to that user's file library. Attach
the [user files](./tools.md) tool to the agent if it should look those files up later.

### Display style

**Display style** controls how a website assistant appears on the page. It does not apply to
the [admin assistant](./admin-assistant.md).

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

- [Admin assistant](./admin-assistant.md) — the staff chat in the admin header.
- [Agents](./agents.md) — the brain behind every assistant.
- [Skills](./skills.md) — specialised instruction packs on the default agent.
- [Tools](./tools.md) — what the backing agent can do during a conversation.
- [Embedding the assistant](./embedding.md) — floating, inline, and fullscreen display styles.
- [Third-party authentication](./third-party-auth.md) — identity providers for external embeds.
- [Web Components](../reference/web-components/overview.mdx) — embed buttons, inputs, and prompt lists that launch the assistant.
- [MCP](./mcp.md) — exposing agents to external AI apps instead of (or as well as) an assistant UI.
- [Getting started: Embed an assistant](../start-here/getting-started.mdx) — end-to-end embed path.
