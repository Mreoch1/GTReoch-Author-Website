import { copyFile, mkdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { checkSite } from './check-site.mjs';
import { publicFiles } from './public-files.mjs';

export async function buildSite(root, output, env = process.env) {
  await checkSite(root);
  const commit = env.VERCEL_GIT_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
  if (!/^[a-f\d]{40}$/i.test(commit)) throw new Error('Build requires a full Git commit SHA.');
  await rm(output, { recursive: true, force: true });
  for (const file of publicFiles) {
    const destination = join(output, file);
    await mkdir(dirname(destination), { recursive: true });
    await copyFile(join(root, file), destination);
  }
  const version = JSON.stringify({ status: 'ok', commit, builtAt: new Date().toISOString() }, null, 2) + '\n';
  await writeFile(join(output, 'version.json'), version);
  await writeFile(join(output, 'health.json'), version);
  return { commit, files: publicFiles.length + 2 };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const result = await buildSite(root, join(root, 'dist'));
  console.log(`Built ${result.files} public files for commit ${result.commit}.`);
}
