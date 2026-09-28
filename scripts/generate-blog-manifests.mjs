import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load as parseYaml } from 'js-yaml';

const BLOG_LOCALES = ['en', 'cn'];
const CONTENT_FILE_PATTERN = /\.mdx?$/i;
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;
const SCRIPT_DIRECTORY = dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = dirname(SCRIPT_DIRECTORY);
const BLOG_ROOT = join(REPOSITORY_ROOT, 'src', 'content', 'blog');

function usage() {
  return 'Usage: node scripts/generate-blog-manifests.mjs (--write | --check)';
}

function parseMode(argv) {
  const modes = argv.filter((argument) => argument === '--write' || argument === '--check');
  if (modes.length !== 1 || argv.length !== 1) throw new Error(usage());
  return modes[0];
}

function requiredString(value, field, sourceFile) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${sourceFile}: frontmatter field ${field} must be a non-empty string`);
  }
  return value.trim();
}

function optionalString(value, field, sourceFile) {
  if (value === undefined || value === null || value === '') return undefined;
  if (typeof value !== 'string') {
    throw new Error(`${sourceFile}: frontmatter field ${field} must be a string`);
  }
  return value.trim() || undefined;
}

function optionalBoolean(value, field, sourceFile, fallback = false) {
  if (value === undefined || value === null) return fallback;
  if (typeof value !== 'boolean') {
    throw new Error(`${sourceFile}: frontmatter field ${field} must be a boolean`);
  }
  return value;
}

function stringArray(value, field, sourceFile) {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${sourceFile}: frontmatter field ${field} must be an array of strings`);
  }
  return value.map((item) => item.trim()).filter(Boolean);
}

function canonicalDate(value, field, sourceFile) {
  if (typeof value !== 'string' && !(value instanceof Date)) {
    throw new Error(`${sourceFile}: frontmatter field ${field} must be a date string`);
  }
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${sourceFile}: frontmatter field ${field} is not a valid date`);
  }
  return date.toISOString().slice(0, 10);
}

function slugFromFilename(filename) {
  return basename(filename, extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseFrontmatter(raw, sourceFile) {
  const match = raw.match(FRONTMATTER_PATTERN);
  if (!match) throw new Error(`${sourceFile}: missing YAML frontmatter`);
  const parsed = parseYaml(match[1]);
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${sourceFile}: frontmatter must be a YAML object`);
  }
  return parsed;
}

function manifestPost(filename, frontmatter, sourceFile) {
  const slug = slugFromFilename(filename);
  if (!slug) throw new Error(`${sourceFile}: filename does not produce a route-compatible slug`);

  const updatedDate = frontmatter.updatedDate ?? frontmatter.updatedAt;
  return {
    slug,
    sourceFile: filename,
    title: requiredString(frontmatter.title, 'title', sourceFile),
    description: requiredString(frontmatter.description, 'description', sourceFile),
    pubDate: canonicalDate(frontmatter.pubDate, 'pubDate', sourceFile),
    ...(updatedDate !== undefined
      ? { updatedAt: canonicalDate(updatedDate, 'updatedDate', sourceFile) }
      : {}),
    heroImage: optionalString(frontmatter.heroImage, 'heroImage', sourceFile) ?? null,
    category: optionalString(frontmatter.category, 'category', sourceFile) ?? '',
    author: optionalString(frontmatter.author, 'author', sourceFile) ?? 'QVeris Team',
    tags: stringArray(frontmatter.tags, 'tags', sourceFile),
    featured: optionalBoolean(frontmatter.featured, 'featured', sourceFile),
    preview: optionalBoolean(frontmatter.preview, 'preview', sourceFile),
  };
}

async function buildLocaleManifest(locale) {
  const localeDirectory = join(BLOG_ROOT, locale);
  const filenames = (await readdir(localeDirectory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && CONTENT_FILE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  const posts = [];
  const sourceBySlug = new Map();
  for (const filename of filenames) {
    const sourceFile = `src/content/blog/${locale}/${filename}`;
    const raw = await readFile(join(localeDirectory, filename), 'utf8');
    const frontmatter = parseFrontmatter(raw, sourceFile);
    if (optionalBoolean(frontmatter.draft, 'draft', sourceFile)) continue;

    const post = manifestPost(filename, frontmatter, sourceFile);
    const previousSource = sourceBySlug.get(post.slug);
    if (previousSource) {
      throw new Error(`${sourceFile}: slug ${post.slug} duplicates ${previousSource}`);
    }
    sourceBySlug.set(post.slug, sourceFile);
    posts.push(post);
  }

  posts.sort((left, right) => {
    const byDate = right.pubDate.localeCompare(left.pubDate);
    return byDate || left.slug.localeCompare(right.slug);
  });
  return `${JSON.stringify({ posts }, null, 2)}\n`;
}

async function updateManifest(locale, mode) {
  const manifestPath = join(BLOG_ROOT, locale, 'posts.json');
  const expected = await buildLocaleManifest(locale);
  const postCount = JSON.parse(expected).posts.length;

  if (mode === '--write') {
    let current = null;
    try {
      current = await readFile(manifestPath, 'utf8');
    } catch (error) {
      if (error?.code !== 'ENOENT') throw error;
    }
    if (current !== expected) await writeFile(manifestPath, expected, 'utf8');
    return { locale, changed: current !== expected, posts: postCount };
  }

  let current;
  try {
    current = await readFile(manifestPath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(`${manifestPath} is missing; run pnpm blog:manifest`);
    }
    throw error;
  }
  if (current !== expected) {
    throw new Error(`${manifestPath} is stale; run pnpm blog:manifest and commit the result`);
  }
  return { locale, changed: false, posts: postCount };
}

async function main() {
  const mode = parseMode(process.argv.slice(2));
  const results = [];
  for (const locale of BLOG_LOCALES) results.push(await updateManifest(locale, mode));
  for (const result of results) {
    const action = mode === '--check' ? 'verified' : result.changed ? 'wrote' : 'unchanged';
    console.log(`[blog-manifest] ${action} ${result.locale}/posts.json (${result.posts} published posts)`);
  }
}

main().catch((error) => {
  console.error(`[blog-manifest] ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
});
