---
title: Connect an assistant to an API
description: Connect an assistant to an external system your organisation already uses, either with the signed-in user's login or with a key you hold.
sidebar:
  order: 12
---

## Introduction

An assistant can call an external system — a membership database, a CRM, a ticketing tool —
when you describe that system as an [API collection](./http-collections.md) and attach the
**HTTP API** tool.

There are two ways to sign those calls in:

- **The API uses the same login as the assistant.** Each call sends the signed-in user's access token, so the API sees that person.
- **The API uses a key your organisation holds.** Every call uses the same [secret](./secrets.md), whoever is chatting.

The example below is a system people already ask about in plain language ("what are my open
tickets?"). Use your own API's address, paths, and permission names in place of the samples.

## The API uses the same login as the assistant

Use this when the external API trusts the same identity provider that signs users into the
assistant. The assistant's [identity provider](./third-party-auth.md) needs to use **OpenID
Connect**. The JWT method sends the token your website supplied. An external API that expects
the identity provider's access token may reject that token.

1. Under **Configuration & setup → Third Party Identity Providers**, add a provider with
   **OpenID Connect**. Copy the redirect URI shown on the form into the application you
   register with that provider, along with the client ID and client secret.
2. Under **Additional OIDC scopes**, add the extra permissions the API documents. Sign-in
   already requests openid, email, and profile. Someone who has already signed in receives new
   scopes the next time they sign in.
3. On the assistant, set **embed mode** to **External**, choose this identity provider, and set
   **authentication mode** to **Authentication required** (or **Mixed mode** if guests may chat,
   and only signed-in users should reach the API). See
   [Assistants](./assistants.md#who-can-use-it).
4. Under **Configuration & setup → HTTP Collections (APIs)**, add an API collection. Set
   **Base URL** to the API's address, for example `https://api.example.com`. In
   **Description**, say what the system is — for example, "The membership system. Use it when
   someone asks about their own tickets or profile."
5. Set **Authentication method** to **Bearer token**. In **Token**, choose **Insert → User →
   OAuth access token**.
6. On the **Requests** tab, add the operations the assistant should be able to call. For a
   "list my open tickets" request: **Label** "List my open tickets", **Identifier**
   `list_open_tickets`, **Method** GET, **Path** `/tickets`, and a **Description** such as
   "Call this when the signed-in user asks about their open tickets." If a path or query needs
   a value the assistant should fill in, add an input and insert it — for example a path
   `/tickets/${input.ticket_id}` with an input named `ticket_id`.
7. On the assistant's agent (or on a [skill](./skills.md), if the API should only be available
   after that skill is loaded), add the **HTTP API** tool. Choose the collection. Leave
   **Requests** empty to include every request, or pick the ones this tool should offer. Set
   **Description** to when the assistant should use it, and **Usage description** to the short
   text shown while it runs, such as `Checking your tickets`.
8. Open the assistant as a user who signs in through the identity provider, and ask something
   the new request describes.

The admin assistant has no signed-in website user, so it cannot send this token. Try the call
from the embedded assistant after signing in.

### If the call does not go through

- **Nobody is signed in through the identity provider.** Anonymous visitors, and chats in the
  admin assistant, have no access token. The call does not go out.
- **The token cannot be refreshed.** The user needs to sign in again so a new access token can
  be issued.
- **The API rejects the call.** A required permission was often left out of **Additional OIDC
  scopes**. Add the scope the API documents, then sign in again so the new permission is
  requested.

## The API uses a key your organisation holds

Use this when every call should authenticate as your organisation, with one API key, a username
and password, or a fixed bearer token.

1. Under **Configuration & setup → Secrets**, add a secret. Set **Label** to something you will
   recognise, **Field key** to a name such as `crm_api_key`, and **Value** to the key. The
   field key cannot be changed later, and the value is never shown in full again.
2. Add an API collection with the API's **Base URL** and a **Description** of when to use it.
3. Set **Authentication method** to match the API:
   - **API key** — set **Placement** to header or query parameter, set **Name** to the name the
     API expects (for example `X-Api-Key`), and insert the secret as **Value**.
   - **Basic authentication** — insert secrets for **Username** and **Password**. Create one
     secret for each.
   - **Bearer token** — insert the secret as **Token** when the API expects a fixed token
     rather than the signed-in user's login.
4. Add requests, with a description of when each one should be called, the same way as in the
   previous section.
5. Attach the **HTTP API** tool to the agent or skill, choose the collection, and describe when
   to use it.

If a call needs a secret that does not exist, the call does not go out, and the missing field
key is reported without the secret's value.

## Starting from an OpenAPI document

If the API provider gives you an OpenAPI document as JSON, you can create the requests from it
instead of typing each one. On the collection, paste the document or give its URL under
**OpenAPI JSON** or **OpenAPI URL**, or use **Import OpenAPI** on a collection that already
exists. YAML has to be converted to JSON first.

Read the imported requests before you rely on them:

- Where the document uses bearer or OAuth sign-in, each request gets an `Authorization` header
  that sends the signed-in user's **OAuth access token**. The collection's **Authentication
  method** stays as you set it. You still need the identity provider, scopes, and a signed-in
  user from the first section.
- Where the document uses API keys, the requests refer to secrets. Create a secret for each
  field key they use, and set the real key as its value.
- A username and password in the document are left out. Set **Basic authentication** on the
  collection yourself.
- If the document lists more than one way to sign the call, only the first is used.

Importing again updates requests that share the same identifier. Descriptions are filled from
the document; rewrite them in plain language when the assistant needs a clearer cue. Then
attach the HTTP API tool. The descriptions on the collection, each request, and the tool are
what the assistant uses to decide when to call.

## Related reading

- [HTTP collections](./http-collections.md) — every collection, request, and tool setting.
- [Secrets](./secrets.md) — field keys and inserting a stored value.
- [Third-party authentication](./third-party-auth.md) — identity providers, scopes, and the user's access token.
- [Tools](./tools.md) — attaching HTTP API alongside the agent's other tools.
- [Assistants](./assistants.md) — embed mode, authentication mode, and the identity provider on an assistant.
