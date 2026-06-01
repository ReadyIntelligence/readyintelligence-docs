// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeRapide from 'starlight-theme-rapide'

// https://astro.build/config
export default defineConfig({
	site: 'https://readyintelligence.github.io',
	base: '/readyintelligence-docs',
	integrations: [
		starlight({
			plugins: [starlightThemeRapide()],
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
						{ label: 'Getting Started', slug: 'start-here/getting-started' },
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
								{ label: 'Automation & Scheduling', slug: 'guides/automation' },
							],
						},
						{ label: 'Assistants', slug: 'guides/assistants' },
						{ label: 'MCP', slug: 'guides/mcp' },
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
					],
				},
			],
		}),
	],
});
