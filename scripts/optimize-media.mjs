import { execFileSync } from 'node:child_process';
import { closeSync, openSync } from 'node:fs';
import { copyFile, mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Original trailers are preserved here, without shipping duplicate source media.
const sourceCommit = '436596b13358a6c65c6743e2eb176d9644303983';
const root = fileURLToPath(new URL('../', import.meta.url));
const temporary = await mkdtemp(join(tmpdir(), 'gtreoch-media-'));
const trailers = [
  { original: 'scripted-in-al-qaeda-ink.mp4', name: 'scripted-in-al-qaeda-ink', posterTime: '54' },
  { original: 'Albatross.mp4', name: 'albatross', posterTime: '52' },
];

try {
  for (const trailer of trailers) {
    const source = join(temporary, trailer.original);
    const descriptor = openSync(source, 'w');
    try {
      execFileSync('git', ['show', `${sourceCommit}:assets/${trailer.original}`], {
        cwd: root,
        stdio: ['ignore', descriptor, 'inherit'],
      });
    } finally {
      closeSync(descriptor);
    }
    const videoName = `${trailer.name}-trailer.mp4`;
    const posterName = `${trailer.name}-poster.jpg`;
    const video = join(temporary, videoName);
    const poster = join(temporary, posterName);
    execFileSync('ffmpeg', [
      '-hide_banner', '-loglevel', 'warning', '-i', source,
      '-map', '0:v:0', '-map', '0:a:0',
      '-vf', 'scale=1280:720:flags=lanczos:out_range=tv,format=yuv420p',
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '22',
      '-profile:v', 'high', '-level:v', '3.1', '-color_range', 'tv',
      '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
      '-map_metadata', '-1', '-y', video,
    ], { stdio: 'inherit' });
    execFileSync('ffmpeg', [
      '-hide_banner', '-loglevel', 'error', '-ss', trailer.posterTime,
      '-i', source, '-frames:v', '1',
      '-vf', 'scale=1280:720:flags=lanczos', '-q:v', '2', '-y', poster,
    ], { stdio: 'inherit' });
    // Decode the complete output before replacing the committed public assets.
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-i', video, '-f', 'null', '-'], { stdio: 'inherit' });
    await copyFile(video, join(root, 'assets', videoName));
    await copyFile(poster, join(root, 'assets', posterName));
    console.log(`Created ${videoName} and ${posterName}.`);
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}
