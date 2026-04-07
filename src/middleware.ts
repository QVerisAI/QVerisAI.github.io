import type { MiddlewareHandler } from 'astro';
import { isLocale, regionLocales, regionDefaultLocale } from './i18n/config';
import { isRegion } from './i18n/config';
import { getLocaleFromPath, switchLocaleInPath } from './i18n/utils';

/**
 * Query parameters handled:
 * - `?lang=en|cn`    — switch locale (iframe parent passes this)
 * - `?region=cn|global` — set region context
 * - `?embed=true`    — enable compact embed mode
 *
 * Examples:
 * - `/` + `?lang=cn`          → `/blog/cn/`
 * - `/blog/en/...` + `?lang=cn` → `/blog/cn/...`
 * - `/blog/en/?region=cn`     → stores region, redirects to `/blog/cn/`
 */
export const onRequest: MiddlewareHandler = async (context, next) => {
	const url = new URL(context.url);

	// ---- Region detection (store in locals for layouts) ----
	const regionParam = url.searchParams.get('region');
	if (regionParam && isRegion(regionParam)) {
		context.locals.region = regionParam;

		// Redirect to the region's default locale if current locale is unsupported
		const currentLocale = getLocaleFromPath(url.pathname);
		const availableLocales = regionLocales[regionParam];
		if (!availableLocales.includes(currentLocale)) {
			const newLocale = regionDefaultLocale[regionParam];
			url.pathname = switchLocaleInPath(url.pathname, newLocale);
			return context.redirect(url.toString());
		}
	}

	// ---- Embed mode detection ----
	const embedParam = url.searchParams.get('embed');
	if (embedParam === 'true') {
		context.locals.embed = true;
	}

	// ---- Locale redirect ----
	const langParam = url.searchParams.get('lang');
	if (!langParam || !isLocale(langParam)) {
		return next();
	}

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
