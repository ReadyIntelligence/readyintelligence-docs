# OpenAPI specifications

Place OpenAPI / Swagger JSON (or YAML) files here. The ReadyIntelligence REST API reference
is generated from:

```text
ri-api.openapi.json
```

configured in `astro.config.mjs` via `starlight-openapi`.

## Refresh after API changes

1. Export the OpenAPI document from a ReadyIntelligence site
   (`/api/ri/v1/docs/swagger/` — download the raw OpenAPI JSON).
2. Overwrite `ri-api.openapi.json` with that export.
3. Run `npm run build` (or `npm run dev`) — operation pages under **Reference → REST API**
   regenerate automatically.

See the project [README](../README.md#updating-the-rest-api-reference) for more detail.
