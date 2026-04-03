import type { MiddlewareHandler } from 'astro';
import { isLocale } from './i18n/config';

/**
 * iframe 父页面可用 `?lang=en|cn`：
 * - `/` + `?lang=cn` → `/blog/cn/`
 * - `/blog/en/...` + `?lang=cn` → `/blog/cn/...`
 * - `/doc/en/...` + `?lang=cn` → `/doc/cn/...`
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
	const langParam = context.url.searchParams.get('lang');
	if (!langParam || !isLocale(langParam)) {
		return next();
	}

	const url = new URL(context.url);
	const pathname = url.pathname;
	const segments = pathname.split('/').filter(Boolean);

	url.searchParams.delete('lang');

	if (
		segments.length >= 2 &&
		(segments[0] === 'blog' || segments[0] === 'doc') &&
		isLocale(segments[1])
	) {
		if (segments[1] !== langParam) {
			segments[1] = langParam;
			url.pathname = '/' + segments.join('/') + (pathname.endsWith('/') ? '/' : '');
			return context.redirect(url.toString());
		}
		if (context.url.searchParams.has('lang')) {
			return context.redirect(url.pathname + url.search + url.hash);
		}
		return next();
	}

	if (pathname === '/' || pathname === '') {
		url.pathname = `/blog/${langParam}/`;
	} else {
		url.pathname = `/blog/${langParam}${pathname}`;
	}
	return context.redirect(url.toString());
};
