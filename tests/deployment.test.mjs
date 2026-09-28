import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, mkdir, rm, readdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { test } from 'node:test';
import { checkSite } from '../scripts/check-site.mjs';
import { buildSite } from '../scripts/build.mjs';
import { publicFiles } from '../scripts/public-files.mjs';

async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'gtreoch-test-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

test('published build exposes its commit and excludes private files', async t => {
  const root = await fixture(t);
  for (const file of publicFiles) {
    await mkdir(dirname(join(root, file)), { recursive: true });
    await writeFile(join(root, file), file.endsWith('.js') ? '// Fixture\n' : 'Fixture\n');
  }
  for (const file of ['.env', 'netlify.toml', '_redirects', 'assets/Author Interview.docx']) {
    await writeFile(join(root, file), 'Must not publish\n');
  }
  const commit = '1234567890abcdef1234567890abcdef12345678';
  const output = join(root, 'dist');
  await mkdir(output);
  await writeFile(join(output, 'stale-secret.txt'), 'Must not survive a rebuild');
  await buildSite(root, output, { VERCEL_GIT_COMMIT_SHA: commit });
  const version = JSON.parse(await readFile(join(output, 'version.json'), 'utf8'));
  assert.equal(version.commit, commit);
  assert.equal(version.status, 'ok');
  assert.ok(Number.isFinite(Date.parse(version.builtAt)));
  assert.deepEqual(JSON.parse(await readFile(join(output, 'health.json'), 'utf8')), version);
  const outputFiles = (await readdir(output, { recursive: true, withFileTypes: true }))
    .filter(entry => entry.isFile())
    .map(entry => join(entry.parentPath, entry.name).slice(output.length + 1));
  assert.deepEqual(outputFiles.sort(), [...publicFiles, 'health.json', 'version.json'].sort());
});

test('asset and cross-page anchor checks accept valid references and reject broken ones', async t => {
  const root = await fixture(t);
  const files = ['index.html', 'other.html', 'book.jpg'];
  await writeFile(join(root, 'index.html'), '<a href="other.html#chapter">Read</a><img src="book.jpg?v=2">');
  await writeFile(join(root, 'other.html'), '<section id="chapter">Chapter</section>');
  await writeFile(join(root, 'book.jpg'), 'Image fixture');
  await checkSite(root, files);
  await writeFile(join(root, 'index.html'), '<a href="other.html#missing">Read</a><img src="Book.jpg">');
  await assert.rejects(checkSite(root, files), error => {
    assert.match(error.message, /missing anchor other.html#missing/);
    assert.match(error.message, /unpublished local target Book.jpg/);
    return true;
  });
});

test('inline and standalone JavaScript syntax errors fail the site check', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'index.html'), '<script>const = ;</script>');
  await writeFile(join(root, 'script.js'), 'function (');
  await assert.rejects(checkSite(root, ['index.html', 'script.js']), /JavaScript syntax/);
});

test('HTML parsing validates scripts with attributed closing tags and quoted angle brackets', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'index.html'), '<script data-label=">">const = ;</script\t\n bar>');
  await assert.rejects(checkSite(root, ['index.html']), /JavaScript syntax/);
});

test('HTML comments stay inert and script text is not rewritten before validation', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'index.html'), '<!-- <img src=missing.jpg><script>const = ;</script> --!><script>const marker = "<!--"; const = ;</script>');
  await assert.rejects(checkSite(root, ['index.html']), error => {
    assert.match(error.message, /JavaScript syntax/);
    assert.doesNotMatch(error.message, /missing.jpg/);
    return true;
  });
  await writeFile(join(root, 'index.html'), '<!-- <script>const = ;</script> --!><script>const marker = "<!-- -->";</script><script type="application/ld+json">{"@context":"https://schema.org"}</script>');
  await checkSite(root, ['index.html']);
});

test('HTML parsing resolves unquoted attributes and decoded entity anchors', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'index.html'), '<a href=other.html#chap&#116;er>Read</a><img src=book.jpg>');
  await writeFile(join(root, 'other.html'), '<section id=chapt&#101;r>Chapter</section><!-- <div id=missing></div> -->');
  await writeFile(join(root, 'book.jpg'), 'Image fixture');
  await checkSite(root, ['index.html', 'other.html', 'book.jpg']);
  await writeFile(join(root, 'index.html'), '<a href=other.html#missing>Read</a>');
  await assert.rejects(checkSite(root, ['index.html', 'other.html', 'book.jpg']), /missing anchor/);
});

test('Vercel preserves old page URLs, redirects launch and uses isolated output', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  assert.equal(config.outputDirectory, 'dist');
  assert.equal(config.cleanUrls, false);
  assert.ok(config.redirects.some(rule => rule.source === '/launch.html' && rule.destination === '/' && rule.permanent));
  assert.ok(config.rewrites.some(rule => rule.source === '/behind-the-scenes' && rule.destination === '/behind-the-scenes.html'));
  for (const endpoint of ['health', 'version']) {
    assert.ok(config.rewrites.some(rule => rule.source === `/${endpoint}` && rule.destination === `/${endpoint}.json`));
  }
  assert.ok(!config.rewrites.some(rule => ['/(.*)', '/:path*'].includes(rule.source)), 'Unknown paths must remain 404s.');
});

test('legacy trailer links redirect to published streaming replacements', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  for (const source of ['/assets/scripted-in-al-qaeda-ink.mp4', '/assets/Albatross.mp4']) {
    const redirect = config.redirects.find(rule => rule.source === source);
    assert.ok(redirect?.permanent, `${source} must retain a permanent redirect`);
    assert.ok(publicFiles.includes(redirect.destination.slice(1)), 'Replacement must be published');
  }
});
