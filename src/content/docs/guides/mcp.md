---
title: MCP
description: Connect external AI apps to your tools via MCP endpoints, or let your agents call tools from external MCP servers — including skills and claim passthrough.
sidebar:
  order: 8
---

## Introduction

**MCP** (Model Context Protocol) is an open standard for connecting AI applications to tools
and data. ReadyIntelligence supports MCP in **both directions**:

- **Exposing your capabilities** — publish an **MCP endpoint** that external AI apps (such as Claude Desktop or ChatGPT) connect to. Endpoints can expose knowledge tools, other MCP tools, agents as tools, and assigned [skills](./skills.md), with authentication you control.
- **Consuming external tools** — register an external **MCP server** so your [agents](./agents.md) can call its tools during a conversation (including from embedded assistants), through the MCP server tool.

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

You can also assign **global skills** to an endpoint. Clients then get a dedicated skills tool
for progressive disclosure (`load` / load instruction / load resource). Skill-bundled tools are
**not** auto-activated over MCP — if clients should call those capabilities, expose them as
ordinary endpoint tools as well. See [Skills](./skills.md#skills-on-mcp-endpoints).

### MCP servers (consuming external tools)

An **MCP server** registration points ReadyIntelligence at an external MCP service. Once
registered, its tools can be made available to an agent through the **MCP server tool**, so the
agent can call them just like any built-in [tool](./tools.md).

For assistants that use [third-party authentication](./third-party-auth.md), MCP server
registrations can set **custom HTTP headers** that include placeholders such as `${user.email}`.
Matching claim fields from the current user are substituted when the agent calls the server.

## Configuration options

### MCP endpoint settings

| Setting | Description |
|---------|-------------|
| **Endpoint name** | A label for the endpoint. |
| **Exposed tools** | The tools made available through this endpoint — for example knowledge search, data tools, or agents as tools. Each gets a unique name/slug (e.g. `developer-knowledge-search`) and an optional description guiding the connecting AI on when to use it. |
| **Skills** | Global [skills](./skills.md) assigned to this endpoint (audience filtered by authentication type). |
| **Authentication** | How external clients authenticate — for example bearer tokens or an OAuth-based flow. |
| **Usage condition** *(per tool)* | An optional condition controlling when an exposed tool is available. |

Connection instructions can be surfaced to help users set up their external AI app against the
endpoint.

### MCP server settings

| Setting | Description |
|---------|-------------|
| **Server registration** | The external MCP service to connect to, and any credentials it requires. |
| **Custom HTTP headers** | Optional headers on outbound calls — including `${user.*}` placeholders filled from third-party user claims. |
| **Tool exposure** | Making the server's tools callable by attaching the MCP server tool to an [agent](./agents.md). |

## Related reading

- [Tools](./tools.md) — how the MCP server tool fits among the agent's other capabilities.
- [Skills](./skills.md) — assigning skills to endpoints and progressive disclosure over MCP.
- [Agents](./agents.md) — agents are what's exposed through, and what consumes, MCP.
- [Third-party authentication](./third-party-auth.md) — passing user claims as headers to MCP servers.
- [Getting started: Automate with agents](../start-here/getting-started-automation.mdx) — publishing endpoints as part of a workflow setup.
