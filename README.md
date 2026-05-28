# ReadyIntelligence Documentation

The documentation site for **ReadyIntelligence** — the AI assistants, knowledge base, agents,
tools, and MCP capabilities of the platform. Built with [Astro](https://astro.build) and
[Starlight](https://starlight.astro.build) using the
[Rapide](https://github.com/HiDeoo/starlight-theme-rapide) theme.

## Requirements

- **Node.js ≥ 22.12** (Astro 6 requirement). Run `nvm use 24` (or any ≥ 22.12) before the commands below.

## Local development

```sh
npm install
npm run dev      # start the dev server at http://localhost:4321
npm run build    # build the production site to ./dist
npm run preview  # preview the built site locally
```

## Project structure

```
src/
  content/docs/
    index.mdx                  # landing page (splash)
    start-here/                # What is ReadyIntelligence? + Getting started
    guides/                    # Knowledge Sources, Agents (+ Tools, Automation), Assistants, MCP
    reference/web-components/   # Web component reference (overview + one page per component)
  components/                  # Starlight component overrides (e.g. dark-by-default ThemeProvider)
  styles/custom.css            # brand theming (fonts, accent colour, greys, buttons)
  assets/                      # logo + hero images
astro.config.mjs               # site config: theme, sidebar, component overrides
```

## Editing content

- Pages are Markdown (`.md`) or MDX (`.mdx`). Use `.mdx` when a page needs components
  (`<Steps>`, `<Card>`, `<LinkButton>`, …) or `import` statements — plain `.md` renders those as text.
- The sidebar is defined manually in the `sidebar` option of `astro.config.mjs`.

## Theming

Brand styling lives in `src/styles/custom.css`. The Rapide theme builds colours from OKLCH hue
angles; the accent is retargeted to the brand pink (`#cd499b`) and the greys are tinted toward
the `#171123` background. The site defaults to dark mode via a `ThemeProvider` override in
`src/components/`.
