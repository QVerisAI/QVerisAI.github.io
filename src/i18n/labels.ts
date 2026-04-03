import type { Locale } from './config';

/** UI strings for embed toolbar — extend per locale when adding languages. */
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
	},
} as const satisfies Record<Locale, Record<string, string>>;

export function t(locale: Locale): (typeof labels)['en'] {
	return labels[locale];
}
