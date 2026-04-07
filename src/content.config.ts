import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogSchema = ({ image }: { image: () => z.ZodType }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		category: z.string().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).optional(),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
		translationKey: z.string().optional(),
	});

const docSchema = ({ image }: { image: () => z.ZodType }) =>
	z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.optional(image()),
		draft: z.boolean().default(false),
		translationKey: z.string().optional(),
	});

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: blogSchema,
});

const doc = defineCollection({
	loader: glob({ base: './src/content/doc', pattern: '**/*.{md,mdx}' }),
	schema: docSchema,
});

export const collections = { blog, doc };
