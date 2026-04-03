// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://qveris.ai',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/blog': '/blog/en/',
		'/about': '/blog/en/',
		'/en': '/blog/en/',
		'/zh': '/blog/cn/',
		'/en/blog': '/blog/en/',
		'/zh/blog': '/blog/cn/',
		'/en/doc': '/doc/en/',
		'/zh/doc': '/doc/cn/',
	},
});
