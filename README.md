# ReadyIntelligence Documentation

The documentation site for **ReadyIntelligence** — embed assistants, build agents and skills,
index knowledge, automate workflows, and connect through MCP. Built with
[Astro](https://astro.build) and [Starlight](https://starlight.astro.build) using the
[Rapide](https://github.com/HiDeoo/starlight-theme-rapide) theme. The REST API reference is
generated from OpenAPI via [starlight-openapi](https://github.com/HiDeoo/starlight-openapi).

## Requirements

- **Node.js ≥ 22.12** (Astro 6 requirement). Run `nvm use 24` (or any ≥ 22.12) before the commands below.

## Local development

```sh
npm install
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the production site to ./dist
npm run preview  # preview the built site locally
```

Defaults target production at **https://docs.readyintelligence.com** (`site` + `base: /`).
Override at build time when needed:

```sh
# GitHub Pages (project site)
DOCS_SITE=https://readyintelligence.github.io DOCS_BASE=/readyintelligence-docs npm run build
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `DOCS_SITE` | `https://docs.readyintelligence.com` | Canonical site URL (sitemap, OG URLs) |
| `DOCS_BASE` | `/` | Path prefix for assets and routes |

`import.meta.env.BASE_URL` in MDX follows `DOCS_BASE`, so LinkCards stay correct across environments.
Hero links on the landing page use paths without a hardcoded `/readyintelligence-docs` prefix so they
resolve under whatever base you build with.

## Project structure

```
openapi/
  ri-api.openapi.json          # OpenAPI 3 spec → generates Reference → REST API pages
src/
  content/docs/
    index.mdx                  # landing page (splash)
    start-here/                # What is RI? + embed / automate getting-started journeys
    guides/                    # Knowledge, Agents, Assistants, MCP, API users, …
    reference/web-components/  # Web component reference
  components/                  # Starlight component overrides (e.g. dark-by-default ThemeProvider)
  styles/custom.css            # brand theming (fonts, accent colour, greys, buttons)
  assets/                      # logo + hero images
astro.config.mjs               # site config: theme, sidebar, OpenAPI plugin
```

## Editing content

- Pages are Markdown (`.md`) or MDX (`.mdx`). Use `.mdx` when a page needs components
  (`<Steps>`, `<Card>`, `<LinkButton>`, …) or `import` statements — plain `.md` renders those as text.
- The sidebar is defined manually in the `sidebar` option of `astro.config.mjs` (plus the
  generated OpenAPI group).

## Updating the REST API reference

The API reference under **Reference → REST API** is built at `npm run dev` / `npm run build`
from the OpenAPI file:

```text
openapi/ri-api.openapi.json
```

To refresh it after API changes:

1. Export or copy the current OpenAPI JSON from your ReadyIntelligence deployment
   (Swagger UI at `/api/ri/v1/docs/swagger/` — use the raw OpenAPI/JSON download from that UI,
   or whatever export your team uses).
2. Replace `openapi/ri-api.openapi.json` with that file (keep the same filename, or update the
   `schema` path in `astro.config.mjs` if you rename it).
3. Rebuild:

   ```sh
   npm run build
   # or, while iterating locally:
   npm run dev
   ```

No hand-written operation pages are required — [starlight-openapi](https://github.com/HiDeoo/starlight-openapi)
regenerates them from the spec. The [API users](src/content/docs/guides/api-users.mdx) guide
explains how integrators create tokens to call the API.

The checked-in file may be a trimmed stub until you supply a full export; replace it whenever
the live API changes.

## Theming

Brand styling lives in `src/styles/custom.css`. The Rapide theme builds colours from OKLCH hue
angles; the accent is retargeted to the brand pink (`#cd499b`) and the greys are tinted toward
the `#171123` background. The site defaults to dark mode via a `ThemeProvider` override in
`src/components/`.
