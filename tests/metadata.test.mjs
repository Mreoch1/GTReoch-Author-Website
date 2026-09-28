import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parse } from 'parse5';
import { publicFiles } from '../scripts/public-files.mjs';

const origin = 'https://gtreoch-author-website.vercel.app';
const imagePath = 'assets/social-preview.png';

function elements(source) {
  const result = [];
  const pending = [parse(source)];
  while (pending.length) {
    const node = pending.pop();
    if (node.tagName) result.push({ ...node, attributes: Object.fromEntries(node.attrs.map(attribute => [attribute.name, attribute.value])) });
    pending.push(...(node.childNodes || []));
  }
  return result;
}

test('share previews use a published 1200 by 630 PNG at the active HTTPS origin', async () => {
  assert.ok(publicFiles.includes(imagePath), 'The preview image must be published.');
  const image = await readFile(new URL(`../${imagePath}`, import.meta.url));
  assert.deepEqual([...image.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(image.toString('ascii', 12, 16), 'IHDR');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  for (const file of ['index.html', 'behind-the-scenes.html']) {
    const nodes = elements(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
    const metadata = new Map(nodes.filter(node => node.tagName === 'meta').map(node => [node.attributes.property || node.attributes.name, node.attributes.content]));
    assert.equal(metadata.get('og:image'), `${origin}/${imagePath}`);
    assert.equal(metadata.get('twitter:image'), `${origin}/${imagePath}`);
    assert.equal(metadata.get('og:image:type'), 'image/png');
    assert.equal(metadata.get('og:image:width'), '1200');
    assert.equal(metadata.get('og:image:height'), '630');
    assert.equal(metadata.get('twitter:card'), 'summary_large_image');
    assert.ok(metadata.get('og:image:alt')?.includes('G.T. Reoch'));
    assert.ok(metadata.get('twitter:image:alt')?.includes('G.T. Reoch'));
    const pageUrl = `${origin}/${file === 'index.html' ? '' : file}`;
    assert.equal(metadata.get('og:url'), pageUrl);
    assert.equal(metadata.get('twitter:url'), pageUrl);
    if (file === 'index.html') {
      assert.match(metadata.get('og:description'), /Scripted in Al Qaeda Ink/);
      assert.match(metadata.get('og:description'), /Albatross/);
    } else {
      assert.match(metadata.get('og:description'), /interview/);
    }
  }
});

test('canonical, structured data and crawler URLs all use the active origin', async () => {
  for (const file of ['index.html', 'behind-the-scenes.html', 'privacy-policy.html', 'terms-conditions.html', 'cookie-policy.html', 'launch.html']) {
    const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
    const nodes = elements(source);
    const canonical = nodes.find(node => node.tagName === 'link' && node.attributes.rel === 'canonical');
    assert.equal(canonical.attributes.href, `${origin}/${['index.html', 'launch.html'].includes(file) ? '' : file}`);
    if (file === 'index.html') {
      const script = nodes.find(node => node.tagName === 'script' && node.attributes.type === 'application/ld+json');
      const schema = JSON.parse(script.childNodes.map(node => node.value || '').join(''));
      assert.equal(schema.url, `${origin}/`);
      assert.equal(schema.mainEntityOfPage['@id'], `${origin}/`);
    }
  }
  const sitemap = await readFile(new URL('../sitemap.xml', import.meta.url), 'utf8');
  const locations = elements(sitemap).filter(node => node.tagName === 'loc');
  assert.ok(locations.length >= 5);
  for (const location of locations) {
    const url = location.childNodes.map(node => node.value || '').join('');
    assert.equal(new URL(url).origin, origin);
  }
  const robots = await readFile(new URL('../robots.txt', import.meta.url), 'utf8');
  assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
});

test('all main pages use the published 128 by 128 branded favicon', async () => {
  const iconPath = 'assets/favicon.png';
  assert.ok(publicFiles.includes(iconPath));
  const icon = await readFile(new URL(`../${iconPath}`, import.meta.url));
  assert.deepEqual([...icon.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(icon.readUInt32BE(16), 128);
  assert.equal(icon.readUInt32BE(20), 128);
  for (const file of ['index.html', 'behind-the-scenes.html', 'privacy-policy.html', 'terms-conditions.html', 'cookie-policy.html']) {
    const nodes = elements(await readFile(new URL(`../${file}`, import.meta.url), 'utf8'));
    const link = nodes.find(node => node.tagName === 'link' && node.attributes.rel === 'icon');
    assert.equal(link.attributes.href, iconPath);
    assert.equal(link.attributes.type, 'image/png');
    assert.equal(link.attributes.sizes, '128x128');
  }
});
