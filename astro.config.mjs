// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'
import starlightOpenAPI, { createOpenAPISidebarGroup } from 'starlight-openapi'
import rehypeRelativeMarkdownLinks from 'astro-rehype-relative-markdown-links';

const riApiSidebarGroup = createOpenAPISidebarGroup()

// https://astro.build/config
export default defineConfig({
	site: 'https://readyintelligence.github.io',
	base: '/readyintelligence-docs',
	markdown: {
		rehypePlugins: [
			[rehypeRelativeMarkdownLinks, {
				base: '/readyintelligence-docs',
				collections: { docs: { base: false } },
				trailingSlash: 'always',
			}],
		],
	},
	integrations: [
		starlight({
			plugins: [
				starlightThemeRapide(),
				starlightOpenAPI([
					{
						base: 'api/ri',
						schema: './openapi/ri-api.openapi.json',
						sidebar: {
							label: 'REST API',
							collapsed: true,
							group: riApiSidebarGroup,
							operations: {
								badges: true,
							},
						},
					},
				]),
			],
			components: {
				// Default to dark mode (visitors can still toggle).
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			customCss: [
        './src/styles/custom.css',
      ],
			title: 'ReadyIntelligence Documentation',
			logo: {
				light: './src/assets/logo.svg',
				dark: './src/assets/logo-dark.svg',
				replacesTitle: true,
      },
			sidebar: [
				{
					label: 'Start Here',
					items: [
						{ label: 'What Is ReadyIntelligence?', slug: 'start-here/what-is-readyintelligence' },
						{ label: 'Getting Started: Embed an Assistant', slug: 'start-here/getting-started' },
						{ label: 'Getting Started: Automate with Agents', slug: 'start-here/getting-started-automation' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Knowledge Sources', slug: 'guides/knowledge-base' },
						{
							label: 'Agents',
							items: [
								{ label: 'Overview', slug: 'guides/agents' },
								{ label: 'Tools', slug: 'guides/tools' },
								{ label: 'Skills', slug: 'guides/skills' },
								{ label: 'Automation & Scheduling', slug: 'guides/automation' },
							],
						},
						{
							label: 'Assistants',
							items: [
								{ label: 'Overview', slug: 'guides/assistants' },
								{ label: 'Embedding', slug: 'guides/embedding' },
								{ label: 'Third-party Authentication', slug: 'guides/third-party-auth' },
							],
						},
						{ label: 'MCP', slug: 'guides/mcp' },
						{ label: 'API Users', slug: 'guides/api-users' },
					],
				},
				{
					label: 'Reference',
					items: [
						{
							label: 'Web Components',
							items: [
								{ label: 'Overview', slug: 'reference/web-components/overview' },
								{ label: 'Assistant Button', slug: 'reference/web-components/assistant-button' },
								{ label: 'Assistant Input', slug: 'reference/web-components/assistant-input' },
								{ label: 'Assistant Prompts', slug: 'reference/web-components/assistant-prompts' },
							],
						},
						riApiSidebarGroup,
					],
				},
			],
		}),
	],
});
