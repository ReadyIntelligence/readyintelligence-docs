---
title: Skills
description: Reusable instruction packs that agents and MCP endpoints load on demand — authoring, assignment, tools, resources, and progressive disclosure.
sidebar:
  order: 7
---

## Introduction

A **skill** is a reusable instruction pack that an [agent](./agents.md) (or [MCP endpoint](./mcp.md))
can discover and load when a conversation needs specialised guidance. Unlike the agent's always-on
instructions and [tools](./tools.md), skills use **progressive disclosure**: the model sees a short
discovery description first, then loads the full skill only when it decides the skill is relevant.

A skill can include:

- A **main instruction** (the guidance returned when the skill is loaded)
- Optional **instruction fragments** loaded on demand
- Optional **resources** (URLs, files, assets, or knowledge base documents)
- Optional **tools** that become available after the skill is loaded

Skills are **not** configured on [assistants](./assistants.md). Assistants inherit skills through
their default agent.

## Global and personal skills

| Kind | Who manages them | How they become available |
|------|------------------|---------------------------|
| **Global skills** | Skills library in the admin | Assigned to agents and MCP endpoints |
| **Personal skills** | Each admin user (when enabled for your site) | Available automatically in the admin assistant for that user only — not assignable to agents or MCP |

Global skills also have an **audience** — public or admin — that must match the agent type (or the
MCP endpoint's authentication audience) before they can be assigned.

When personal skills are enabled, users can **promote** a personal skill into the shared library
(directly, or by requesting review). Promoted skills keep their content and become global admin
skills.

## Authoring a skill

When you create a skill, the important fields are:

| Setting | Description |
|---------|-------------|
| **Identifier** | A lowercase slug (letters, numbers, hyphens). Used when the model loads the skill. |
| **Label** | A human-readable name shown in the admin and in discovery lists. |
| **Audience** | Public or admin — controls which agents and MCP auth types can use the skill. |
| **Description** | Required discovery text for the model. Write in the third person; say **what** the skill does and **when** to use it (include trigger terms). |
| **Instruction** | Required markdown body returned when the skill is loaded. |
| **Usage condition** | Optional rules that control when the skill appears in the discovery list at runtime. |

### Instruction fragments

Add fragments when you need supplementary content the agent should load only when needed. Each
fragment has its own identifier slug within the skill. Reference fragments from the main
instruction (or from other fragments).

### Resources

Attach supporting documents the agent can fetch on demand:

| Type | Use |
|------|-----|
| **URL** | An external link — fetched and converted to markdown for the model |
| **File** | An uploaded file — parsed to markdown |
| **Asset** | A platform asset — parsed to markdown (when assets are available) |
| **Knowledge base document** | An existing indexed document from your [knowledge base](./knowledge-base.md) |

Each resource has an identifier slug. File, asset, URL, and knowledge base resources are converted
to markdown so the model receives readable text.

### Inline references

From instructions you can point at fragments and resources:

```markdown
See [[instruction:advanced-options]] for edge cases.
Read the [[resource:membership-faq]] document for policy detail.
```

Markdown-link forms such as `[advanced options](instruction:advanced-options)` also work.

### Skill tools

Attach tools that should only be available while the agent is working within this skill. Use the
same tool catalogue as for agents. After the skill is **loaded** in a conversation:

- The skill's tools are merged into the agent's available tools for the rest of that thread
- Agent-level tools remain available independently

On MCP endpoints, skill-bundled tools are listed for reference but are **not** auto-activated —
expose those capabilities as ordinary endpoint tools if clients should call them. See [MCP](./mcp.md).

## Assigning skills

- On an **agent**, assign global skills whose audience matches the agent type. The agent then
  receives a skills lookup tool automatically.
- On an **MCP endpoint**, assign global skills appropriate to the endpoint's authentication type.
  The endpoint exposes a `skills` tool for progressive disclosure.

Personal skills never appear in these pickers.

## How skills run in a conversation

When an agent has one or more skills available:

1. The model sees a skills tool listing each skill's title, identifier, and discovery description.
2. It calls **load** for a skill to receive the main instruction plus indexes of fragments,
   resources, and tools — and to activate that skill's tools on the thread.
3. It can call **load instruction** for additional fragments and **load resource** for attached
   documents.
4. It uses activated skill tools alongside any always-on agent tools.

Personal skills are merged into the catalog only for the owning admin user in the admin
assistant. Frontend assistants, scheduled agents, and webhooks never expose personal skills.

## Skills on MCP endpoints

Global skills assigned to an MCP endpoint are exposed through a dedicated **skills** tool.
Which audiences are available depends on how clients authenticate (for example admin-only vs
public). Progressive disclosure works the same way (`load` / `load instruction` / `load resource`),
but skill-bundled tools do not activate automatically over MCP because there is no ReadyIntelligence
conversation thread.

## Related reading

- [Agents](./agents.md) — where global skills are assigned for chat and automation.
- [Tools](./tools.md) — always-on agent tools vs tools unlocked by a skill.
- [MCP](./mcp.md) — assigning skills to endpoints and the MCP skills tool.
- [Knowledge sources](./knowledge-base.md) — attaching knowledge base documents as skill resources.
