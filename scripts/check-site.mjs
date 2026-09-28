import { readFile, lstat, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { Script } from 'node:vm';
import { parse } from 'parse5';
import { publicFiles } from './public-files.mjs';

const aliases = new Map([
  ['/', 'index.html'],
  ['/behind-the-scenes', 'behind-the-scenes.html'],
]);

function inspectHtml(source) {
  const references = [];
  const anchors = new Set();
  const scripts = [];
  const pending = [parse(source)];
  const scriptTypes = new Set(['', 'module', 'text/javascript', 'application/javascript', 'text/ecmascript', 'application/ecmascript']);
  while (pending.length) {
    const node = pending.pop();
    const attributes = new Map((node.attrs || []).map(attribute => [attribute.name, attribute.value]));
    for (const name of ['href', 'src', 'poster']) {
      if (attributes.has(name)) references.push(attributes.get(name));
    }
    for (const name of ['id', 'name']) {
      if (attributes.has(name)) anchors.add(attributes.get(name));
    }
    const type = (attributes.get('type') || '').split(';')[0].trim().toLowerCase();
    if (node.tagName === 'script' && !attributes.has('src') && scriptTypes.has(type)) {
      scripts.push((node.childNodes || []).map(child => child.value || '').join(''));
    }
    pending.push(...(node.childNodes || []));
    if (node.content) pending.push(node.content);
  }
  return { references, anchors, scripts };
}

export async function checkSite(root, files = publicFiles) {
  const errors = [];
  const allowed = new Set(files);
  const documents = new Map();
  const html = new Map();
  for (const file of files) {
    try {
      const info = await lstat(join(root, file));
      const names = await readdir(join(root, dirname(file)));
      if (!info.isFile() || !names.includes(file.split('/').at(-1))) {
        errors.push(`${file}: must be a regular file with exact filename casing`);
      }
      if (/\.(?:html|css|js)$/.test(file)) {
        const source = await readFile(join(root, file), 'utf8');
        documents.set(file, source);
        if (file.endsWith('.html')) html.set(file, inspectHtml(source));
      }
    } catch (error) {
      errors.push(`${file}: ${error.code || error.message}`);
    }
  }

  for (const [file, content] of documents) {
    const references = html.get(file)?.references || [];
    if (file.endsWith('.css')) {
      references.push(...[...content.matchAll(/url\(\s*["']?([^)'"\s]+)["']?\s*\)/g)].map(match => match[1]));
    }
    for (const reference of references) {
      if (!reference || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
      try {
        const url = new URL(reference, `https://site.invalid/${file}`);
        const pathname = decodeURIComponent(url.pathname);
        const target = aliases.get(pathname) || pathname.slice(1);
        if (!allowed.has(target)) {
          errors.push(`${file}: missing or unpublished local target ${reference}`);
          continue;
        }
        if (url.hash && target.endsWith('.html')) {
          if (!html.get(target)?.anchors.has(decodeURIComponent(url.hash.slice(1)))) {
            errors.push(`${file}: missing anchor ${reference}`);
          }
        }
      } catch (error) {
        errors.push(`${file}: invalid local reference ${reference}: ${error.message}`);
      }
    }

    const scripts = file.endsWith('.js') ? [content] : html.get(file)?.scripts || [];
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
