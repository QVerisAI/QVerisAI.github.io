import type { Locale } from './config';

/** UI strings — extend per locale when adding languages. */
export const labels = {
	en: {
		blog: 'Blog',
		doc: 'Docs',
		home: 'Home',
		language: 'Language',
		lastUpdatedOn: 'Last updated on',
		prevArticle: 'Previous',
		nextArticle: 'Next',
		backToBlog: 'All posts',
		postNavigation: 'Article navigation',
		// New labels
		featuredPost: 'Featured',
		readingTime: '{min} min read',
		tableOfContents: 'On this page',
		allPosts: 'All Posts',
		category: 'Category',
		readInOtherLang: '阅读中文版',
		sharePost: 'Share',
		blogEyebrow: 'QVeris Blog',
		blogTitle: 'Engineering & Research',
		blogDescription: 'Insights on AI agents, infrastructure, and the future of agentic computing.',
		noPosts: 'No posts yet.',
		copyLink: 'Copy link',
		copied: 'Copied!',
	},
	cn: {
		blog: '博客',
		doc: '文档',
		home: '首页',
		language: '语言',
		lastUpdatedOn: '更新于',
		prevArticle: '上一篇',
		nextArticle: '下一篇',
		backToBlog: '全部文章',
		postNavigation: '文章导航',
		// New labels
		featuredPost: '推荐',
		readingTime: '{min} 分钟阅读',
		tableOfContents: '本页目录',
		allPosts: '所有文章',
		category: '分类',
		readInOtherLang: 'Read in English',
		sharePost: '分享',
		blogEyebrow: 'QVeris 博客',
		blogTitle: '技术与研究',
		blogDescription: '关于智能体、基础设施与智能体计算未来的深度洞察。',
		noPosts: '暂无文章。',
		copyLink: '复制链接',
		copied: '已复制！',
	},
} as const satisfies Record<Locale, Record<string, string>>;

export type LabelKey = keyof (typeof labels)['en'];

export function t(locale: Locale): (typeof labels)['en'] {
	return labels[locale];
}
