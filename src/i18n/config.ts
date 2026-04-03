/** Supported UI locales — add new codes here to extend i18n. */
export const locales = ['en', 'cn'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
	en: 'English',
	cn: '中文',
};

export function isLocale(value: string): value is Locale {
	return (locales as readonly string[]).includes(value);
}
