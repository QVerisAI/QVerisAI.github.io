import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const enPosts = posts
		.filter((p) => p.id.startsWith('en/'))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: enPosts.map((post) => {
			const slug = post.id.replace(/^en\//, '');
			return {
				...post.data,
				link: `/blog/en/${slug}/`,
			};
		}),
	});
}
