---
title: Automation & scheduling
description: Run agents automatically in the background — on a recurring schedule, or triggered by an incoming webhook.
sidebar:
  order: 2
---

[Agents](/guides/agents/) don't only respond to people chatting in an
[assistant](/guides/assistants/). They can also run **in the background**, doing work on a
schedule or in response to an external event.

## Scheduled agent calls

A **scheduled agent call** runs an agent automatically at a recurring time — for example "every
morning at 8:46am" — with a fixed prompt. The agent runs in the background and does the work for
you, using whatever [tools](/guides/tools/) it has, then records the result of each run.

| Setting | Description |
|---------|-------------|
| **Agent** | The agent to run. |
| **Internal label** | A reference name, e.g. "Daily seismic activity report". |
| **Prompt** | The detailed instruction the agent follows on each run. |
| **Schedule** | When the call runs. You can describe the schedule in plain language (e.g. "Every morning at 8:46am") and it's interpreted into a precise recurring schedule. |
| **Paused** | Temporarily suspend the schedule without deleting it. |
| **Owner** | The user the scheduled call belongs to and runs as. |

Each scheduled call keeps a history of its **runs** and a **next run date**. Agents can also be
given the *scheduled agent management* [tool](/guides/tools/), letting users create and adjust
their own scheduled calls conversationally.

## Webhook triggers

A **webhook trigger** lets an external system start a background conversation with an agent by
calling a URL. Each incoming request is combined with a fixed instruction and run through the
agent.

| Setting | Description |
|---------|-------------|
| **Name** | A label for the trigger. |
| **Agent** | The agent to run when the webhook fires. |
| **Run as user** | The user identity the run executes under (so permissions apply correctly). |
| **Instruction** | Fixed instructions combined with each incoming webhook payload before the agent runs. |
| **Webhook URL** | The URL external systems call to start the run. This URL acts as a secret — anyone who has it can invoke the trigger, so treat it carefully. |

Like scheduled calls, each trigger keeps a record of its **runs**.

## Related reading

- [Agents](/guides/agents/) — scheduled calls and webhook triggers are configured against an agent.
