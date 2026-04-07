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

/* ------------------------------------------------------------------ */
/*  Multi-Region                                                       */
/* ------------------------------------------------------------------ */
export type Region = 'cn' | 'global';
export const defaultRegion: Region = 'global';

export const regions = ['cn', 'global'] as const;

/** Language availability per region */
export const regionLocales: Record<Region, readonly Locale[]> = {
	global: ['en', 'cn'], // English default, Chinese available
	cn: ['cn'], // Chinese only
};

/** Default locale for each region */
export const regionDefaultLocale: Record<Region, Locale> = {
	global: 'en',
	cn: 'cn',
};

export function isRegion(value: string): value is Region {
	return (regions as readonly string[]).includes(value);
}
