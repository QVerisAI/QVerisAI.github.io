import type { Locale, Region } from './config';
import { defaultLocale, isLocale, locales, regionLocales } from './config';

/**
 * Build a path: section first, then language, then optional slugs.
 * e.g. `localizedPath('en', '/blog')` → `/blog/en/`, `localizedPath('cn', '/doc/foo')` → `/doc/cn/foo/`
 */
export function localizedPath(locale: Locale, pathWithoutLocale: string): string {
	const raw = pathWithoutLocale.startsWith('/') ? pathWithoutLocale : `/${pathWithoutLocale}`;
	const parts = raw.split('/').filter(Boolean);
	if (parts.length === 0) return `/blog/${locale}/`;
	const section = parts[0];
	if (section !== 'blog' && section !== 'doc') {
		return `/blog/${locale}/${parts.join('/')}/`;
	}
	const rest = parts.slice(1);
	return `/${[section, locale, ...rest].join('/')}/`;
}

/** Swap the language segment after `blog` or `doc`. */
export function switchLocaleInPath(pathname: string, newLocale: Locale): string {
	const segments = pathname.split('/').filter(Boolean);
	if (
		segments.length >= 2 &&
		(segments[0] === 'blog' || segments[0] === 'doc') &&
		isLocale(segments[1])
	) {
		segments[1] = newLocale;
		const trailing = pathname.endsWith('/') ? '/' : '';
		return '/' + segments.join('/') + trailing;
	}
	return `/blog/${newLocale}/`;
}

export function getLocaleFromPath(pathname: string): Locale {
	const segments = pathname.split('/').filter(Boolean);
	if (
		segments.length >= 2 &&
		(segments[0] === 'blog' || segments[0] === 'doc') &&
		isLocale(segments[1])
	) {
		return segments[1];
	}
	return defaultLocale;
}

export function getStaticLocalePaths() {
	return locales.map((lang) => ({ params: { lang } }));
}

/* ------------------------------------------------------------------ */
/*  Multi-Region Utilities                                             */
/* ------------------------------------------------------------------ */

/** Get available locales for the current region */
export function getAvailableLocales(region: Region): readonly Locale[] {
	return regionLocales[region];
}

/** Check if language switcher should be shown */
export function showLanguageSwitcher(region: Region): boolean {
	return regionLocales[region].length > 1;
}

/** Get html lang attribute value from locale */
export function getHtmlLang(locale: Locale): string {
	switch (locale) {
		case 'cn':
			return 'zh-CN';
		case 'en':
		default:
			return 'en';
	}
}
