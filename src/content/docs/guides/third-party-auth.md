---
title: Third-party authentication
description: Register identity providers so embedded assistants authenticate users from your own systems — OIDC, JWT, custom claims, and claim passthrough to MCP servers.
sidebar:
  order: 6
---

## Introduction

When you embed an [assistant](./assistants.md) on an external website, you often already have a
user system of your own. **Third-party authentication** lets ReadyIntelligence recognise those
users through an **identity provider** you register — so conversations run as a known user, with
permissions and personalisation that match your organisation.

This feature may need to be enabled for your site. If you don't see identity providers in the
admin, contact your ReadyIntelligence contact.

## Authentication methods

Each identity provider uses one method:

| Method | How it works |
|--------|--------------|
| **OpenID Connect (OIDC)** | Users sign in through your identity provider in the browser. ReadyIntelligence uses your discovery document, client ID, and client secret. |
| **JWT (token from host page)** | Your host page supplies a signed JWT representing the current user. ReadyIntelligence verifies issuer, audience, and signature using the key and algorithm you configure. |

### OpenID Connect settings

| Setting | Description |
|---------|-------------|
| **Discovery document URL** | Your IdP's OpenID configuration URL (endpoints are read from it). |
| **Client ID / Client secret** | Credentials from registering the ReadyIntelligence application with your IdP. |
| **Additional OIDC claims** | Optional extra claim names to request beyond the standard openid / email / profile set. |

Use the redirect URI shown in the admin when you register the application with your identity
provider.

### JWT settings

| Setting | Description |
|---------|-------------|
| **Issuer** | Expected `iss` claim (for example `https://crm.example.com`). |
| **Audience** | Expected `aud` claim. |
| **Signing algorithm** | How the token is signed. |
| **Verification key** | Shared secret (HS) or public key (RS / ES) used to verify the token. |

Your third-party application must supply a JWT for the current user to the embedded assistant;
ReadyIntelligence only verifies it.

## Connecting a provider to an assistant

1. Create an identity provider with the method and settings above.
2. On the assistant, set **embed mode** to **External** (typical for a site you host yourself).
3. Choose the **identity provider** on the assistant.
4. Set an **authentication mode** that requires or optionally prompts for sign-in — see
   [Assistants](./assistants.md#who-can-use-it).

Anonymous mode does not use the identity provider. Required or mixed modes work with the
provider so logged-in users are recognised.

As users authenticate, they appear under the provider's user list in the admin.

## Custom claims

Identity providers can define **custom fields** (claims) — for example `groups` or a
membership tier. For OIDC you can request additional claim names from the IdP; for JWT, claims
arrive in the token your host page supplies.

Custom claims can be used for access rules and integrations. You can also define lookup values
so raw claim values map to clearer labels in the admin.

## Passing claims to third-party MCP servers

When an authenticated third-party user chats with an assistant whose agent uses a remote
[MCP server](./mcp.md), you can forward user claims as HTTP headers on outbound MCP calls.

On the MCP server registration, add **custom HTTP headers**. As well as fixed headers, you can
use placeholders such as `${user.email}` or `${user.groups}`. ReadyIntelligence substitutes
matching claim fields from the current third-party user, or sends a blank value if the claim is
missing.

This supports advanced integrations where the external tool needs to know who is asking.

## Related reading

- [Assistants](./assistants.md) — embed modes, auth modes, and linking an identity provider.
- [MCP](./mcp.md) — registering remote MCP servers that can receive claim headers.
- [Getting started: Embed an assistant](../start-here/getting-started.mdx) — end-to-end embed path.
