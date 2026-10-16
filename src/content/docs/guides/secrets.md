---
title: Secrets
description: Store named values for external API calls, and insert them into HTTP collections by field key without pasting the value into the API setup.
sidebar:
  order: 10
---

## Introduction

A **secret** is a named value your organisation holds for an external API — an API key, a
password, or a fixed bearer token. ReadyIntelligence keeps the value and lets an
[API collection](./http-collections.md) refer to it by a **field key**. After you save, the
value is never shown in full again.

Create secrets under **Configuration & setup → Secrets**.

Secrets are the values your site holds. A signed-in user's own login is separate: that access
token comes from a [third-party identity provider](./third-party-auth.md) and is inserted as
**OAuth access token**. Language-model provider keys live under **Model Credentials**. Tokens
for the ReadyIntelligence REST API live under **API Users**.

## Settings

| Setting | Description |
|---------|-------------|
| **Label** | The name shown in the admin. Any wording is fine, and it must be unique. |
| **Field key** | The name other screens use to insert this secret, written as `${secret.field_key}`. Lowercase letters, numbers, and underscores only, and unique — for example `crm_api_key`. Set it when you create the secret. It cannot be changed later. |
| **Value** | The key, password, or token. On edit, leave this blank to keep the current value. |

## Using a secret in an API call

On an API collection or API request, fields for tokens, passwords, headers, and query parameters
have an **Insert** menu. Choose **Secrets**, then the secret. That inserts
`${secret.field_key}` — for example `${secret.crm_api_key}` — in place of the real value.

The call is filled in when it runs. The assistant never sees the value, and a missing secret is
reported by name only. If a call needs a secret that does not exist, or whose value is empty,
the call does not go out.

## Related reading

- [HTTP collections](./http-collections.md) — where secrets are inserted into an external API.
- [Connect an assistant to an API](./connect-an-api.md) — the path that uses an organisation-held key.
- [API users](./api-users.mdx) — bearer tokens for the ReadyIntelligence REST API.
