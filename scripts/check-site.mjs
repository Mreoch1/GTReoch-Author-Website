import { readFile, lstat, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Script } from 'node:vm';
import { publicFiles } from './public-files.mjs';

const aliases = new Map([
  ['/', 'index.html'],
  ['/behind-the-scenes', 'behind-the-scenes.html'],
]);

export async function checkSite(root, files = publicFiles) {
  const errors = [];
  const allowed = new Set(files);
  const documents = new Map();
  for (const file of files) {
    try {
      const info = await lstat(join(root, file));
      const names = await readdir(join(root, dirname(file)));
      if (!info.isFile() || !names.includes(file.split('/').at(-1))) {
        errors.push(`${file}: must be a regular file with exact filename casing`);
      }
      if (/\.(?:html|css|js)$/.test(file)) {
        documents.set(file, await readFile(join(root, file), 'utf8'));
      }
    } catch (error) {
      errors.push(`${file}: ${error.code || error.message}`);
    }
  }

  for (const [file, original] of documents) {
    const content = original.replace(/<!--[\s\S]*?-->/g, '');
    const references = [...content.matchAll(/\b(?:href|src|poster)\s*=\s*(["'])(.*?)\1/g)].map(match => match[2]);
    if (file.endsWith('.css')) {
      references.push(...[...content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)].map(match => match[1]));
    }
    for (const reference of references) {
      if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
      try {
        const url = new URL(reference.replace(/&amp;/g, '&'), `https://site.invalid/${file}`);
        const pathname = decodeURIComponent(url.pathname);
        const target = aliases.get(pathname) || pathname.slice(1);
        if (!allowed.has(target)) {
          errors.push(`${file}: missing or unpublished local target ${reference}`);
          continue;
        }
        if (url.hash && target.endsWith('.html')) {
          const anchors = new Set([...String(documents.get(target)).matchAll(/\b(?:id|name)\s*=\s*(["'])(.*?)\1/g)].map(match => match[2]));
          if (!anchors.has(decodeURIComponent(url.hash.slice(1)))) {
            errors.push(`${file}: missing anchor ${reference}`);
          }
        }
      } catch (error) {
        errors.push(`${file}: invalid local reference ${reference}: ${error.message}`);
      }
    }

    const scripts = file.endsWith('.js') ? [content] : [...content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
      .filter(match => !/\btype\s*=\s*["']application\/ld\+json["']/i.test(match[1]))
      .map(match => match[2]);
    for (const script of scripts) {
      try {
        new Script(script, { filename: file });
      } catch (error) {
        errors.push(`${file}: JavaScript syntax: ${error.message}`);
      }
    }
  }
  if (errors.length) throw new Error(errors.join('\n'));
}
