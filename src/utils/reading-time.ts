/**
 * Estimate reading time from markdown/text content.
 * ~200 words per minute for English, ~300 characters per minute for Chinese.
 */
export function getReadingTime(text: string): number {
	// Strip markdown syntax
	const stripped = text
		.replace(/```[\s\S]*?```/g, '') // code blocks
		.replace(/`[^`]*`/g, '') // inline code
		.replace(/!\[.*?\]\(.*?\)/g, '') // images
		.replace(/\[([^\]]*)\]\(.*?\)/g, '$1') // links → text
		.replace(/[#*_~>|-]/g, '') // markdown chars
		.replace(/\n{2,}/g, '\n') // collapse newlines
		.trim();

	// Count Chinese characters
	const chineseChars = (stripped.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;

	// Count English words (non-CJK)
	const withoutChinese = stripped.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, '');
	const englishWords = withoutChinese.split(/\s+/).filter((w) => w.length > 0).length;

	const minutes = englishWords / 200 + chineseChars / 300;
	return Math.max(1, Math.ceil(minutes));
}
