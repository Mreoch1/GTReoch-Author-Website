import { readFile, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { checkSite } from './check-site.mjs';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
await checkSite(root);
const newFiles = ['package.json', 'vercel.json', 'docs/VERCEL.md'];
for (const directory of ['scripts', 'tests', '.github/workflows']) {
  for (const entry of await readdir(join(root, directory))) newFiles.push(`${directory}/${entry}`);
}
for (const file of newFiles) {
  const content = await readFile(join(root, file), 'utf8');
  if (!content.endsWith('\n') || /[\t ]+$/m.test(content) || content.includes('\r')) {
    throw new Error(`${file}: use LF endings, a final newline, and no trailing whitespace.`);
  }
  if (file.endsWith('.json')) JSON.parse(content);
  if (file.endsWith('.mjs')) execFileSync(process.execPath, ['--check', join(root, file)], { stdio: 'inherit' });
}
console.log('Local files, cross-page anchors, JavaScript syntax and tooling formatting passed.');
