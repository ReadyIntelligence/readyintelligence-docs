---
title: MCP
description: Connect external AI apps to your tools via MCP endpoints, or let your agents call tools from external MCP servers — and how each is configured.
sidebar:
  order: 8
---

## Introduction

**MCP** (Model Context Protocol) is an open standard for connecting AI applications to tools
and data. ReadyIntelligence supports MCP in **both directions**:

- **Exposing your tools** — you can publish an **MCP endpoint** that external AI apps (such as Claude Desktop or ChatGPT) connect to, giving them access to selected tools from your platform, with proper authentication.
- **Consuming external tools** — your [agents](./agents.md) can connect to an external **MCP server** and call its tools during a conversation, through the MCP server tool.

This means your knowledge and capabilities aren't locked inside ReadyIntelligence's own chat
UI — they can be used by whatever AI app a member or staff member already works in, and your
agents can reach out to capabilities hosted elsewhere.

### MCP endpoints (exposing your tools)

An **MCP endpoint** is a connection point you publish for external AI clients. You choose which
tools the endpoint exposes and how clients authenticate. To the external app, each exposed tool
appears with a unique, descriptive name and a description that tells its model when to use it —
so naming and descriptions matter, because end users may see them in their own AI app.

Because the endpoint runs with your platform's authentication, external clients only ever get
access to what the connecting user is permitted to see and do.

### MCP servers (consuming external tools)

An **MCP server** registration points ReadyIntelligence at an external MCP service. Once
registered, its tools can be made available to an agent through the **MCP server tool**, so the
agent can call them just like any built-in [tool](./tools.md).

## Configuration options

### MCP endpoint settings

| Setting | Description |
|---------|-------------|
| **Endpoint name** | A label for the endpoint. |
| **Exposed tools** | The tools made available through this endpoint. Each gets a unique name/slug (e.g. `developer-knowledge-search`) and an optional description guiding the connecting AI on when to use it. |
| **Authentication** | How external clients authenticate — for example bearer tokens or an OAuth-based flow. |
| **Usage condition** *(per tool)* | An optional condition controlling when an exposed tool is available. |

Connection instructions can be surfaced to help users set up their external AI app against the
endpoint.

### MCP server settings

| Setting | Description |
|---------|-------------|
| **Server registration** | The external MCP service to connect to, and any credentials it requires. |
| **Tool exposure** | Making the server's tools callable by attaching the MCP server tool to an [agent](./agents.md). |

## Related reading

- [Tools](./tools.md) — how the MCP server tool fits among the agent's other capabilities.
- [Agents](./agents.md) — agents are what's exposed through, and what consumes, MCP.
