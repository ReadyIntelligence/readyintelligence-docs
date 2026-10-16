---
title: HTTP collections
description: Describe an external API as a collection of requests, then let an assistant call them with a secret or the signed-in user's access token.
sidebar:
  order: 11
---

## Introduction

An **API collection** is one external API: the shared address, how calls sign in, and any
headers or query parameters that every request should send. An **API request** is one operation
on that API, such as listing a user's open tickets or updating a contact.

Collections live under **Configuration & setup → HTTP Collections (APIs)**. Once a collection
exists, attach the **HTTP API** tool to an [agent](./agents.md), a [skill](./skills.md), or an
[MCP endpoint](./mcp.md) so an assistant can call it. A walkthrough of the two common setups is
in [Connect an assistant to an API](./connect-an-api.md).

The text you write on the collection, on each request, and on the tool is what the assistant
uses to decide when to call. Describe the API and each request in plain language.

## API collection settings

| Setting | Description |
|---------|-------------|
| **Label** | The name of this API in the admin. |
| **Base URL** | The shared address requests are added to, for example `https://api.example.com`. Each request's path is appended to it. |
| **Description** | What this API provides. This helps the assistant understand the collection and its requests. |

### Common inputs

**Common inputs** are values the assistant may supply, shared by every request in the
collection. Each input has a **name**, a **type**, whether it is **required**, and a
**description for the agent** (when and how the value should be supplied).

Types are **Text**, **Whole number**, **Number**, **Yes/no**, **Object**, and **List**. Names
may contain letters, numbers, hyphens, and underscores.

An input is offered to the assistant only when a request actually uses it — in the path, a
header, a query parameter, or the body. A request can define an input with the same name; that
definition replaces the shared one for that request.

### Authentication method

Authentication on the collection applies to every request.

| Method | What is sent |
|--------|----------------|
| **No authentication** | No sign-in is added. |
| **Bearer token** | The token is sent in the `Authorization` header as `Bearer`. |
| **Basic authentication** | A username and password. |
| **API key** | A named key, placed in a **header** or a **query parameter**. |

Use **Insert** for the token, username, password, or key value. Insert a
[secret](./secrets.md) when your organisation holds the credential. Insert **OAuth access
token** when the API should receive the signed-in user's login. Leave the real key out of
these fields.

### Default headers and query parameters

**Default headers** and **default query parameters** are name/value pairs sent with every
request. A request header or query parameter with the same name replaces the collection value.
Values can use the same inserted placeholders as authentication. Leave credential values out of
these fields; insert a secret or the user's access token instead.

## Inserted values

The **Insert** menu on a path, header, query parameter, body, or authentication field offers
four groups.

| Insert | What it becomes |
|--------|-----------------|
| **OAuth access token** (`${user.auth_token}`), under **User** | The signed-in user's access token from the assistant's [identity provider](./third-party-auth.md). It is refreshed automatically when the provider allows it. It is available only when that user is signed in through the identity provider. Anonymous visitors and the admin assistant have no token to send. If there is no usable token, the call does not go out. |
| **User** | Fields from the signed-in user, such as **Email**, **Name**, **Given name**, **Family name**, **Username**, and **Locale**, plus any [custom fields](./third-party-auth.md#custom-claims) on the identity provider. Written as `${user.email}` and similar. |
| **Secrets** | A [secret](./secrets.md) by field key, written as `${secret.field_key}`. |
| **Inputs** | A value the assistant supplies, written as `${input.name}`. The input must be defined on the collection or the request. |

A missing user value, secret, or input stops the call. The error names the placeholder and does
not include secret or token values.

## API request settings

Add requests on the collection's **Requests** tab.

| Setting | Description |
|---------|-------------|
| **Identifier** | The stable name the assistant uses to choose this request. Letters, numbers, hyphens, and underscores; it is stored in lowercase and must be unique in the collection. |
| **Label** | A human-readable name, shown in the admin. |
| **Description** | What the request does and when it should be called. The assistant sees this when it chooses an operation. |
| **Request inputs** | Inputs for this request. Shared inputs are inherited; a definition with the same name replaces the shared one. Define every `${input.name}` the path, headers, query parameters, or body uses. |
| **Method** | **GET**, **POST**, **PUT**, **PATCH**, **DELETE**, or **HEAD**. |
| **Path** | Appended to the base URL, normally starting with `/`. For example `/contacts/${input.id}`. |
| **Headers** / **Query parameters** | Extra name/value pairs for this request. A name that matches a collection default replaces that default. |
| **Body template** | The JSON body. Insert a placeholder without quotes when it stands for a complete value, for example `{"name":${input.name},"limit":${input.limit}}`. A placeholder inside quotes is sent as text. **GET** sends no body; a body entered for GET is cleared. |

## Importing an OpenAPI document

If the API provider gives you an OpenAPI document, you can create the requests from it instead
of entering each one. On a new collection, use **OpenAPI URL** or **OpenAPI JSON** in **Spec
import**. On an existing collection, use **Import OpenAPI**.

The document must be JSON. If you only have YAML, paste the JSON form instead. When both the
URL and the JSON are filled in, the JSON is used. A document that includes a server URL can
fill in **Base URL** for you. Importing again updates requests that already exist with the
same identifier.

How sign-in in the document is translated:

- Bearer and OAuth security are written onto each imported request as an `Authorization` header that sends the signed-in user's access token (`Bearer ${user.auth_token}`). The collection's **Authentication method** is left as you set it.
- API keys become secret placeholders on the imported requests. Create a [secret](./secrets.md) whose field key matches each placeholder, and set the real key as its value.
- Basic authentication is left out. Set **Basic authentication** on the collection yourself if the API uses a username and password.
- When the document lists more than one way to sign the call, only the first is used.

Descriptions are filled from the document. Rewrite them in plain language when they are too technical for the assistant to act on, and attach the HTTP API tool.

## Letting an assistant call the API

Add the **HTTP API** tool where the capability should live:

| Attach it to | When |
|--------------|------|
| An **agent** | The assistant should be able to call the API throughout the conversation. |
| A **skill** | The API only makes sense after the assistant loads that skill. |
| An **MCP endpoint** | An external AI app using your endpoint should be able to call the API. |

| Setting | Description |
|---------|-------------|
| **API collection** | The collection to call. Required. |
| **Requests** | Which requests this tool includes. Leave this empty to include every request in the collection. |
| **Description** | When and how the assistant should use this tool. |
| **Usage description** | Short text shown while the call runs, for example `Calling the CRM API`. |

One tool that includes several requests lets the assistant choose which request to call. A tool
that includes a single request only asks the assistant for that request's inputs. You can attach
**HTTP API** more than once with different requests, so a large API can be split into smaller
tools.

## Good to know

- Redirects are not followed. Use the final address of the API as the base URL or path.
- A very long response is shortened before it is handed back to the assistant.
- The assistant only sees inputs that a request's path, headers, query parameters, or body
  actually reference.

## Related reading

- [Secrets](./secrets.md) — organisation-held keys inserted into a collection.
- [Connect an assistant to an API](./connect-an-api.md) — same-login and organisation-key setups.
- [Third-party authentication](./third-party-auth.md) — the identity provider that issues the user's access token.
- [Tools](./tools.md) — how the HTTP API tool sits alongside other agent tools.
- [Skills](./skills.md) — tools that appear only after a skill is loaded.
