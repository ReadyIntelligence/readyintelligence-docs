---
title: Tools
description: The capabilities an agent can call during a conversation — the built-in tools, how they're configured per agent, and how they differ from skill tools.
sidebar:
  order: 6
---

## Introduction

A **tool** is a capability an [agent](./agents.md) can use during a conversation. On its
own, a language model can only generate text from what it already knows. Tools let it *do*
things — search your knowledge base, query data, fetch a metric, import a spreadsheet, or
reach an external system — and bring real, current information back into the answer.

During a conversation the model decides, based on each tool's description, whether a tool would
help. If so, it calls the tool with some arguments, ReadyIntelligence runs the tool, and the
result is handed back to the model to continue its answer. Many tools also return **sources**,
so answers can cite where the information came from.

Tools are attached to an agent one by one, and each attached tool can carry its own
**configuration** — for example, scoping the knowledge base search tool to particular sources.
Which tools an agent may use depends on its [type](./agents.md#agent-types): public-facing
agents are offered a safe subset, while admin/automation agents can use more powerful tools that
read or change data.

### Agent tools vs skill tools

| Kind | When available |
|------|----------------|
| **Agent tools** | Always available for the whole conversation once attached to the agent. |
| **Skill tools** | Bundled with a [skill](./skills.md). They appear only after the model **loads** that skill in the current thread. |

Use agent tools for capabilities the agent should always have (for example knowledge base search).
Use skill tools for specialised capabilities that only make sense inside a particular skill.

## Built-in tools

ReadyIntelligence ships with a range of tools you can attach to agents (and to skills):

| Tool | What it lets the agent do |
|------|---------------------------|
| **Knowledge base search** | Search your [knowledge base](./knowledge-base.md) sources to ground answers in your own content. |
| **Data querying** | Inspect data schemas, query records, and (for capable agents) add or edit records, respecting the user's data-access permissions. |
| **Data visualisation metrics** | Discover available metrics and query value or time-series figures about data in the system. |
| **CSV / spreadsheet import** | Upload a CSV, TSV, or Excel file in chat, inspect its columns, and import the rows in the background. Admin / automation agents only. |
| **User files** | Look up files in the signed-in user's private file library, including chat and prompt-form uploads. |
| **MCP server tool** | Call a tool on an external [MCP server](./mcp.md) to answer a question. |
| **Agent call** | Use another agent as a tool — useful for assistants, MCP endpoints, and composition. |
| **Scheduled agent management** | Let the agent create, query, and update the current user's [scheduled agent runs](./automation.md). |

:::note
Tools that read or modify data always operate within the current user's permissions. An agent
can never see or change something the user themselves isn't allowed to.
:::

### Knowledge base search: metadata only

When you attach **knowledge base search**, you can scope it to particular sources and, optionally,
turn on **Metadata only**.

With metadata only enabled, the assistant still searches those sources in the normal way, but
it only receives document **titles, summaries, and URLs** — never the document body or matched
text. Use this on a public assistant that should know private knowledge exists so it can
signpost or upsell access, without revealing the content itself.

### CSV / spreadsheet import

On an **admin / automation** agent (including the [admin assistant](./admin-assistant.md)), the
CSV import tool lets you bring tabular data in through chat:

1. You upload a spreadsheet when the assistant asks for it.
2. The assistant inspects the columns and a few sample rows, then agrees the import with you.
3. The import runs in the **background**. A progress card shows how it is going; you can stop
   it if needed.
4. For larger files, the assistant will typically import **a few rows first** so you can check
   the result before the rest of the file.

Talk to the assistant in ordinary language ("import this list of contacts"). You do not need
to describe columns as a script.

### User files

When [file uploads](./assistants.md#file-uploads) are enabled on an assistant, signed-in users
can attach files through prompt forms. Those files sit in that user's private library. Attach
**User files** if the agent should look them up later in the same conversation (or a later one).

## Configuration options

### Per-agent tool configuration

When you add a tool to an agent, the options depend on the tool, but commonly include:

- **Editorial description** — extra guidance, layered on top of the tool's built-in description, telling the model when and how to use this tool in this agent's context (for example, what a particular knowledge source contains).
- **Usage description** — a short label shown when the tool is used.
- **Tool-specific settings** — for example which knowledge sources the search tool may query, whether search is metadata only, or which data the data tools may touch.

The same tool can be attached to one agent more than once with different configuration, so a
single agent could, say, search two different knowledge bases as two distinct tools.

## Related reading

- [Agents](./agents.md) — attaching tools to an agent and how agent type gates them.
- [Skills](./skills.md) — tools that activate only after a skill is loaded.
- [Knowledge sources](./knowledge-base.md) — what the knowledge base search tool searches.
- [Assistants](./assistants.md) — prompt forms and file uploads that feed the user files tool.
- [Admin assistant](./admin-assistant.md) — staff chat that can use admin tools such as CSV import.
- [MCP](./mcp.md) — exposing tools to external apps, or calling external tools.
