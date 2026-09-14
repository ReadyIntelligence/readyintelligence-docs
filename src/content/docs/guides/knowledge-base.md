---
title: Knowledge Sources
description: Where ReadyIntelligence's content comes from, how documents are indexed, how agents search them, and the metadata you can attach to documents.
sidebar:
  order: 2
---

## Introduction

The **knowledge base** is the searchable vector store of your organisation's content that AI
uses to answer questions accurately. Rather than relying only on what a language model already
knows, an agent can search the knowledge base and ground its answers in *your* documents —
returning sources alongside the answer.

Content gets into the knowledge base through **knowledge sources**. A knowledge source is a
connection to somewhere your content already lives. ReadyIntelligence reads from that source,
turns each item into a **document**, and indexes the document's text for **semantic (vector)
search** — by meaning, not just keywords.

Indexing uses [credits](./credits.md). A large crawl or many file uploads will show up on the
credit usage screen as document indexing.

The typical lifecycle of a knowledge source is:

1. **Discover** — ReadyIntelligence works out which documents exist in the source.
2. **Index** — it reads each document's content (text, a file, or a web page) and adds it to the knowledge base.
3. **Enrich** — optional [metadata](#document-metadata) is attached to each document, some of it filled in automatically by AI.
4. **Search** — agents query the knowledge base through the knowledge base search [tool](./tools.md). Indexed documents can also be attached as resources on a [skill](./skills.md).
5. **Refresh** — sources can be re-indexed on demand or on a schedule to pick up changes.

## Source types

When you add a knowledge source you choose its **type**, which determines where its content
comes from. Each type behaves a little differently:

| Type | What it indexes |
|------|-----------------|
| **Manual documents** | Documents you add and manage by hand, for content that isn't held anywhere else. |
| **Web crawler** | Content discovered by crawling an external website. |
| **Google Drive** | Documents and files from a connected Google Drive. |
| **Dropbox** | Documents and files from a connected Dropbox. |
| **SharePoint** | Documents from SharePoint document libraries (Microsoft 365). |
| **Vimeo** | Videos from a connected Vimeo account. |

Cloud storage and Vimeo sources appear when those connections are set up for your account.

Each indexed document is classified by **type** — *article*, *document*, *video*, or *audio* —
which influences how its content is read and presented.

## Per-source settings

When you create a knowledge source, the settings available depend on its type, but most types
support some combination of:

- **Indexing** — whether the source's documents are added to the knowledge base.
- **Processing quality** — how thoroughly each document is read (see [below](#processing-quality)).
- **Manual upload** — whether documents can be added to the source by hand.
- **Editing** — whether indexed documents can be edited in place.
- **Scheduling** — whether the source re-indexes automatically on a schedule, so changes in the underlying system are picked up without manual re-runs.
- **Custom fields** — the [metadata](#document-metadata) fields that apply to documents from this source.

Source types that connect to external systems (Google Drive, Dropbox, SharePoint, Vimeo, the
web crawler) add their own connection and scoping settings — for example which folder, library,
account, or starting URL to read from.

### Processing quality

Every source has a **processing quality** setting that controls how documents are read when
they are indexed:

| Quality | Best for |
|---------|----------|
| **Standard** | Everyday documents that are primarily text. |
| **Advanced** | Documents that contain images and diagrams. Highly complex layouts may still vary. |
| **Ultimate** | Maximum accuracy for complex layouts, multi-page tables, images, and diagrams. |

Higher quality uses more [credits](./credits.md) per document. Stick with Standard unless a
source routinely includes scans, figures, or difficult tables.

You can also choose a quality when uploading an individual document, or keep the source default.

## Manual documents

For a **manual documents** source you add content yourself:

- **Upload files** — drop several files at once. Each file becomes its own document. A file
  that is already in the source is skipped as a duplicate.
- **From a URL** — ReadyIntelligence downloads the file at that address.
- **Pasted text** — paste HTML, Markdown, or other text when you do not have a file.

Once uploaded, documents are queued for processing. You can upload more at any time.

## Web crawler

A **web crawler** source indexes pages from a website you do not host in ReadyIntelligence.
You choose where the crawl starts and how far it is allowed to go:

| Setting | Purpose |
|---------|---------|
| **Root URL** | The page the crawl starts from, e.g. `https://www.example.com`. |
| **Max depth** | How many link-hops from the root the crawl may follow. |
| **Custom sitemap URL** | Optional. Use this when the site's sitemap is not at the default `/sitemap.xml`. |
| **Additional allowed domains** | Optional extra hosts the crawl may follow (for example a docs or static-file domain). One host per line. |
| **Include patterns** | Optional path rules: only index URLs that match. One rule per line. |
| **Exclude patterns** | Optional path rules: skip URLs that match. One rule per line. |

After you save the source, use **Crawl site** to start. The crawl status tab shows progress
(pages completed vs total), and you can **stop** a running crawl or **trigger a re-crawl**
later. Schedule the source if the site should be refreshed automatically.

## Searching the knowledge base

Agents don't query the knowledge base directly; they use the **knowledge base search tool**.
When you attach this tool to an agent (or to a [skill](./skills.md)) you can scope it to
particular sources and add editorial guidance describing what's in them, which helps the model
decide when to search and how to phrase its query.

You can also turn on **Metadata only** so a public assistant receives titles, summaries, and
URLs from those sources without the document body — useful when the assistant should know
private content exists and can signpost access. See [Tools](./tools.md#knowledge-base-search-metadata-only).

You can also point a skill at a specific indexed document as a **knowledge base document**
resource, so the model can load that document on demand without a full search.

## Document metadata

Every document in the knowledge base can carry **structured metadata** — named fields such as
*title*, *author*, *date created*, *topics*, or *keywords*. This metadata:

- Shows up in the admin so people can understand and manage documents.
- Can be **inferred by AI** during indexing — for example, reading a document and deciding which topics it covers.
- Helps agents **search and filter** the knowledge base more precisely.
- Can optionally be **written back** to the original record in the source, so the document and its source stay in sync.

A few standard fields (such as title, author, and dates) exist by default. Beyond those, you
can create your own **custom fields** to capture whatever matters for your content.

### Configuring a custom field

When you add a custom field, the available options include:

| Option | Purpose |
|--------|---------|
| **Label** | The display name for the field. |
| **Data type** | Text, pick-list, true/false, date, date-time, integer, decimal, or a reference to another record. |
| **Multi-value** | Whether the field holds one value or several. |
| **Lookup values / related record** | For pick-lists and record references, the allowed values or the linked record type. |
| **Allow inference** | Whether AI may fill this field in during indexing. |
| **Inference hint** | Guidance text telling the model what the field means and how to fill it. |
| **Existing-value behaviour** | When a value is already present, whether to keep it, extend it, or recalculate it. |
| **Write inferred value back to source** | For sources that support it, push the inferred value back to the original record. |

### AI inference and write-back

When a document is indexed, AI can fill in the values of any fields that have **inference**
enabled, guided by each field's hint and existing-value behaviour. This is how a document can
arrive already tagged with topics, a summary, keywords, and so on — without anyone filling them
in by hand.

For sources that support it, you can also turn on **write-back** for a field, so the inferred
value is pushed back to the original record after indexing. For example, topics inferred from a
SharePoint or Google Drive document can be written back onto that file, keeping the source
system and the knowledge base aligned.

## Related reading

- [Tools](./tools.md) — how agents search the knowledge base, including metadata-only search.
- [Skills](./skills.md) — attaching knowledge base documents as skill resources.
- [Agents](./agents.md) — agents are what use the knowledge base during a conversation.
- [Credit usage](./credits.md) — indexing consumes credits against your period allowance.
- [Admin assistant](./admin-assistant.md) — ask staff chat to help add or inspect sources.
- [MCP](./mcp.md) — exposing knowledge search tools through MCP endpoints.
