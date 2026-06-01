---
title: Agents
description: The configurable AI 'brain' behind every assistant — model, instructions, personality, memory, tools, and agent types, plus all the settings available.
sidebar:
  order: 4
---

## Introduction

An **agent** is the configurable AI "brain" that powers a conversation. When a user asks a
question through an [assistant](./assistants.md), it's the agent that decides how to
respond: it takes the conversation, adds its own instructions and personality, and sends it to
a **language model** along with the list of [tools](./tools.md) it's allowed to use. The
model then either answers directly or calls a tool to gather more information first.

You can think of an agent as a saved recipe for AI behaviour. The same agent can power several
assistants, be triggered by automations, or be exposed to external apps — its configuration
stays the same wherever it's used.

### Agent types

Every agent has a **type** (or "class") that reflects where it's meant to operate and which
tools make sense for it:

| Type | Purpose |
|------|---------|
| **Public agent** | For public-facing conversations. Has access to a limited, public-safe set of tools. |
| **Admin / automation agent** | For use in the admin interface, workflows, automations, and similar scenarios. Has access to all non-public tools, including ones that can read and change data. |

The type matters because [tools](./tools.md) declare which agent types they're appropriate
for — a tool that can edit records, for instance, will only be offered to admin/automation
agents, never to public ones.

### Memory and threads

Each conversation with an agent happens in a **thread**. Optionally, an agent can use **memory**
to carry learnings from previous conversations forward, so it gradually builds useful context
rather than starting cold every time.

Agents also have a **chat playground** in the admin UI for experimenting with their behaviour
before they go live.

## Configuration options

When you create or edit an agent, the following settings are available.

### Identity

| Setting | Description |
|---------|-------------|
| **Name** | An internal label for the agent, e.g. "Default agent". |
| **Description** | An internal note describing what the agent is for. |
| **Class** | The [agent type](#agent-types) — public, or admin/automation. |

### Language model

| Setting | Description |
|---------|-------------|
| **LLM credential** | Which set of model credentials to use, or the system default. |
| **Language model** | The specific model the agent runs on, or the system default. |
| **Max tokens** | The maximum length of the model's response. Smaller values keep answers concise. |
| **Temperature** | How "creative" or random the response is. `0` is the most deterministic; values are typically in the `0`–`2` range depending on the model. |
| **Top P** | An alternative randomness control used alongside temperature. Ranges from `0.0` to `1.0`; leave at `1` if unsure. |

### Behaviour

| Setting | Description |
|---------|-------------|
| **Instruction** | The core instructions guiding how the model responds. The default tells the agent to answer using its tools and to say so when it doesn't have enough information rather than making something up. |
| **Personality** | Optional guidance on tone of voice and persona, e.g. "You are a helpful assistant named Aika". |
| **Use memory** | Whether the agent stores and reuses learnings from previous conversations. |
| **Store large tool results** | When on, very large tool outputs are stored on the thread and exposed to the model as a compact reference it can read on demand, instead of being sent inline. This saves context space (experimental). |

### Tools

| Setting | Description |
|---------|-------------|
| **Tools** | The [tools](./tools.md) attached to this agent. Only tools appropriate to the agent's type can be added, and each tool can carry its own configuration. |

### Automation

| Setting | Description |
|---------|-------------|
| **Scheduled calls** | Recurring, automated runs of the agent. See [Automation & scheduling](./automation.md). |
| **Webhook triggers** | Runs of the agent triggered by incoming webhooks. See [Automation & scheduling](./automation.md). |

## Related reading

- [Assistants](./assistants.md) — how an agent is surfaced to users.
- [Tools](./tools.md) — the capabilities you attach to an agent.
- [Automation & scheduling](./automation.md) — running agents on a schedule or via webhooks.
