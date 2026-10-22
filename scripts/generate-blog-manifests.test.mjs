import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { copyFile, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const timezones = ['UTC', 'Asia/Shanghai', 'America/Los_Angeles'];

function generate(directory, mode, timezone) {
  return spawnSync(process.execPath, [join(directory, 'scripts/generate-blog-manifests.mjs'), mode], {
    cwd: directory,
    env: { ...process.env, TZ: timezone },
    encoding: 'utf8',
  });
}

function succeeds(result) {
  assert.equal(result.status, 0, result.stderr || result.stdout);
}

test('committed manifests match article metadata in every supported timezone', () => {
  for (const timezone of timezones) succeeds(generate(root, '--check', timezone));
});

test('calendar dates remain stable and stale metadata is rejected', async (t) => {
  const fixture = await mkdtemp(join(tmpdir(), 'blog-manifest-'));
  t.after(() => rm(fixture, { recursive: true, force: true }));
  await mkdir(join(fixture, 'scripts'));
  await copyFile(join(root, 'scripts/generate-blog-manifests.mjs'), join(fixture, 'scripts/generate-blog-manifests.mjs'));
  await symlink(join(root, 'node_modules'), join(fixture, 'node_modules'), 'dir');
  const article = `---
title: Calendar date fixture
description: A timezone regression fixture
pubDate: Aug 9 2026
updatedDate: 'Apr 07 2026'
---
Fixture body.
`;
  for (const locale of ['en', 'cn']) {
    const directory = join(fixture, 'src/content/blog', locale);
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'calendar.md'), article);
    await writeFile(join(directory, 'iso.md'), article.replace('Aug 9 2026', '2026-08-09').replace("'Apr 07 2026'", "'2026-04-07'"));
    await writeFile(join(directory, 'draft.md'), article.replace('title:', 'draft: true\ntitle:'));
  }
  succeeds(generate(fixture, '--write', 'Asia/Shanghai'));
  for (const timezone of timezones) succeeds(generate(fixture, '--check', timezone));
  for (const locale of ['en', 'cn']) {
    const manifest = JSON.parse(await readFile(join(fixture, 'src/content/blog', locale, 'posts.json'), 'utf8'));
    assert.equal(manifest.posts.length, 2, 'drafts must stay excluded');
    for (const post of manifest.posts) {
      assert.equal(post.pubDate, '2026-08-09');
      assert.equal(post.updatedAt, '2026-04-07');
    }
  }
  await writeFile(join(fixture, 'src/content/blog/en/calendar.md'), article.replace('Calendar date fixture', 'Updated title'));
  const stale = generate(fixture, '--check', 'UTC');
  assert.equal(stale.status, 1);
  assert.match(stale.stderr, /en\/posts\.json is stale/);
});
