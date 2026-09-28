import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ImageResponse } from '@vercel/og';

const root = new URL('../', import.meta.url);
const cover = async name => `data:image/jpeg;base64,${(await readFile(new URL(`assets/${name}`, root))).toString('base64')}`;
const element = (type, style, children, extra = {}) => ({ type, props: { style, children, ...extra } });
const text = (content, style) => element('div', { display: 'flex', ...style }, content);
const book = (src, left, top, rotation, height = 351) => element('img', {
  position: 'absolute', left, top, width: 220, height,
  transform: `rotate(${rotation}deg)`, borderRadius: 3,
  boxShadow: '0 22px 48px rgba(0,0,0,0.55)',
}, undefined, { src, width: 220, height });

const image = new ImageResponse(element('div', {
  display: 'flex', width: '100%', height: '100%', position: 'relative',
  background: 'linear-gradient(115deg, #06120d 0%, #102e20 68%, #23452d 100%)',
  color: '#f3efe4', fontFamily: 'sans-serif', overflow: 'hidden',
}, [
  element('div', { position: 'absolute', left: 0, top: 0, width: 1200, height: 6, background: '#c8a64e' }),
  element('div', { position: 'absolute', left: 28, top: 28, right: 28, bottom: 28, border: '1px solid rgba(200,166,78,0.35)' }),
  text('OFFICIAL AUTHOR WEBSITE', { position: 'absolute', left: 66, top: 92, fontSize: 17, letterSpacing: 4, color: '#d6bf7e' }),
  text('G.T. REOCH', { position: 'absolute', left: 62, top: 159, fontSize: 75, fontWeight: 700, letterSpacing: -2, color: '#e0c477' }),
  element('div', { position: 'absolute', left: 66, top: 276, width: 86, height: 3, background: '#c8a64e' }),
  text('Crafting stories', { position: 'absolute', left: 66, top: 315, fontSize: 38 }),
  text('that entertain.', { position: 'absolute', left: 66, top: 366, fontSize: 38 }),
  text('BOOKS  ·  TRAILERS  ·  AUDIO', { position: 'absolute', left: 66, bottom: 88, fontSize: 16, letterSpacing: 2, color: '#c6cebf' }),
  book(await cover('scripted-in-al-qaeda-ink-cover.jpg'), 646, 171, -7, 220 * 1500 / 998),
  book(await cover('By G.T. Reoch.jpg'), 894, 100, 7),
]), { width: 1200, height: 630 });

const destination = new URL('assets/social-preview.png', root);
await writeFile(destination, Buffer.from(await image.arrayBuffer()));
console.log(`Created ${fileURLToPath(destination)} (1200 × 630).`);

const icon = new ImageResponse(element('div', {
  display: 'flex', width: '100%', height: '100%',
  alignItems: 'center', justifyContent: 'center',
  background: '#102e20', color: '#e0c477', border: '5px solid #c8a64e',
  fontSize: 68, fontWeight: 700, letterSpacing: -5, paddingRight: 5,
}, 'GT'), { width: 128, height: 128 });
await writeFile(new URL('assets/favicon.png', root), Buffer.from(await icon.arrayBuffer()));
console.log('Created assets/favicon.png (128 × 128).');
