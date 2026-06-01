---
title: What is ReadyIntelligence?
description: ReadyIntelligence brings AI assistants, knowledge, and agents to your platform. Here's what it is and how its building blocks fit together.
sidebar:
  order: 1
---

**ReadyIntelligence** is the AI layer of your membership and content platform. It lets you put
conversational **assistants** in front of your members and staff, ground their answers in your
own content through a **knowledge base**, and run **agents** that can take actions and work in
the background.

It's made up of a small number of building blocks that work together. This page explains each
one in plain language and shows how they relate; the dedicated guide for each block then goes
deeper, including the configuration options available to developers. When you're ready to set it
up, head to [Getting started](/start-here/getting-started/).

## The building blocks at a glance

| Block | In one sentence |
|-------|-----------------|
| **Knowledge source** | A place your content lives — uploaded files, website pages, a resource library, cloud storage, a crawled site, and so on. |
| **Knowledge base** | The searchable store that all your knowledge sources feed into, so AI can find relevant content. |
| **Document** | A single indexed item (an article, a file, a video) inside the knowledge base, with optional structured metadata. |
| **Agent** | The configurable AI "brain": which language model to use, how to behave, what it's allowed to do. |
| **Tool** | A specific capability an agent can call mid-conversation — searching the knowledge base, querying data, and more. |
| **Assistant** | The chat experience members or staff actually use, backed by an agent. |
| **MCP** | A standard way to connect external AI apps to your tools, or your agents to external tools. |

## How a question gets answered

1. A user opens an **assistant** and asks a question.
2. The assistant passes the conversation to its **agent**, along with the agent's instructions, personality, and the list of **tools** it may use.
3. The agent sends everything to a **language model**, which decides whether to answer directly or call a tool.
4. If the model calls the **knowledge base search** tool, ReadyIntelligence searches **documents** drawn from your **knowledge sources** and returns the most relevant passages, with their sources.
5. The model uses those passages to compose a grounded answer, which streams back into the assistant.

## Knowledge: sources, the base, and documents

A **knowledge source** is an admin-configured connection to somewhere your content lives. Each
source is of a particular **type** — for example uploaded documents, asset-manager files,
website pages, a resource library, a crawled website, or cloud storage like Google Drive,
Dropbox, and SharePoint.

Every source feeds **documents** into the shared **knowledge base**, where their text is
indexed so it can be searched. Documents can carry **structured metadata** (such as title,
author, topics, or keywords), some of which AI can fill in automatically and even write back
to the original record. See [Knowledge sources](/guides/knowledge-base/).

## Agents, assistants, and tools

An **agent** is a saved configuration that decides how the AI behaves: which language model
and credentials to use, its instructions and personality, whether it remembers past
conversations, and which **tools** it can call. Each agent has a **type** (for example a
public-facing agent or an admin/automation agent) that controls which tools are appropriate
for it.

An **assistant** is the actual chat experience a user interacts with. It points at a default
agent and adds presentation and access settings — welcome message, suggested prompts,
theming, where it's embedded, and who's allowed to use it.

**Tools** are the capabilities an agent can invoke during a conversation. The built-in
knowledge base search tool is the most common, but tools can also query structured data,
look up membership information, fetch metrics, call another agent, or reach an external
system. See [Agents](/guides/agents/), [Assistants](/guides/assistants/), and
[Tools](/guides/tools/).

## MCP

**MCP** (Model Context Protocol) is an open standard for connecting AI apps to tools and data.
ReadyIntelligence works in both directions: it can **expose** your own tools to external AI
apps through MCP endpoints, and your agents can **consume** tools from external MCP servers.
See [MCP](/guides/mcp/).
