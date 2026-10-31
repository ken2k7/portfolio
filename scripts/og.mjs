// OG image and icons in the site's look: heavy type on near-black with a lime mark.
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import sharp from 'sharp';

const heavy = await readFile('node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-800-normal.woff');
const regular = await readFile('node_modules/@fontsource/schibsted-grotesk/files/schibsted-grotesk-latin-400-normal.woff');
const fonts = [
  { name: 'Schibsted Grotesk', data: heavy, weight: 800, style: 'normal' },
  { name: 'Schibsted Grotesk', data: regular, weight: 400, style: 'normal' },
];
const bg = '#0b0d12', ink = '#eef1f6', muted = '#9aa3b5', lime = '#b8f03a';
const h = (type, props, ...children) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

// Two real interface chips, embedded as data URIs.
const chip = async (file) => 'data:image/png;base64,' + (await readFile(file)).toString('base64');
const chips = await Promise.all(['src/assets/cut/mg-metformin.png', 'src/assets/cut/is-savings.png', 'src/assets/cut/mg-diabetes.png'].map(chip));

const og = h(
  'div',
  { style: { width: 1200, height: 630, display: 'flex', position: 'relative', background: bg, color: ink, fontFamily: 'Schibsted Grotesk' } },
  h('div', { style: { position: 'absolute', left: 72, top: 64, fontSize: 22, color: muted } }, 'Computer science at NUS, from Qatar'),
  h('div', { style: { position: 'absolute', left: 64, top: 150, fontSize: 164, fontWeight: 800, letterSpacing: -9, lineHeight: 0.85, display: 'flex', flexDirection: 'column' } }, h('span', {}, 'Kenil'), h('span', {}, 'Gandhi')),
  h('div', { style: { position: 'absolute', left: 72, bottom: 64, fontSize: 26, color: ink, display: 'flex' } }, 'Software that shows its working.'),
  h('img', { src: chips[0], style: { position: 'absolute', right: 72, top: 110, width: 406, height: 114 } }),
  h('img', { src: chips[2], style: { position: 'absolute', right: 150, top: 250, width: 396, height: 82 } }),
  h('img', { src: chips[1], style: { position: 'absolute', right: 72, top: 360, width: 428, height: 80 } }),
  h('div', { style: { position: 'absolute', right: 72, bottom: 64, width: 18, height: 18, background: lime, display: 'flex' } }),
);
const ogSvg = await satori(og, { width: 1200, height: 630, fonts });
await writeFile('public/og.png', new Resvg(ogSvg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());

const icon = (size) =>
  h('div', { style: { width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color: lime, fontFamily: 'Schibsted Grotesk', fontWeight: 800, fontSize: size * 0.62, letterSpacing: -size * 0.04 } }, 'K');
await writeFile('public/favicon.svg', await satori(icon(64), { width: 64, height: 64, fonts }));
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  const svg = await satori(icon(size), { width: size, height: size, fonts });
  await writeFile(`public/${file}`, new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng());
}
console.log('Generated og.png, favicon.svg and PNG icons.');
