// Generates public/og.png (1200x630), public/favicon.svg and PNG icons.
// Run with: npm run og
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const serif = await readFile('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff');
const serifItalic = await readFile('node_modules/@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff');
const sans = await readFile('node_modules/@fontsource/geist-sans/files/geist-sans-latin-500-normal.woff');

const fonts = [
  { name: 'Instrument Serif', data: serif, weight: 400, style: 'normal' },
  { name: 'Instrument Serif', data: serifItalic, weight: 400, style: 'italic' },
  { name: 'Geist', data: sans, weight: 500, style: 'normal' },
];

const paper = '#f6f3ee';
const ink = '#1c1a17';
const soft = '#5a554e';
const rule = '#b9b1a4';
const accent = '#8a1538';

const h = (type, props, ...children) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

// ---- OG image ----
// Note: satori ignores letter-spacing when measuring text, so rows are positioned absolutely
// and the tracked labels are given generous room.
const row = (top, bottom, children) =>
  h('div', { style: { position: 'absolute', left: 80, right: 80, top, bottom, display: 'flex', justifyContent: 'space-between' } }, ...children);

const og = h(
  'div',
  { style: { width: 1200, height: 630, display: 'flex', position: 'relative', background: paper, color: ink, fontFamily: 'Geist' } },
  row(60, undefined, [
    h('span', { style: { fontSize: 20, letterSpacing: 2, color: soft } }, 'PORTFOLIO · SINGAPORE, FROM QATAR'),
    h('span', { style: { fontSize: 20, color: soft } }, 'kenil-gandhi.vercel.app'),
  ]),
  h(
    'div',
    { style: { position: 'absolute', left: 80, top: 172, display: 'flex', flexDirection: 'column', width: 1040 } },
    h('div', { style: { fontFamily: 'Instrument Serif', fontSize: 150, lineHeight: 0.9, letterSpacing: -3 } }, 'Kenil Gandhi'),
    h(
      'div',
      { style: { display: 'flex', alignItems: 'center', marginTop: 26 } },
      h('div', { style: { width: 64, height: 2, background: accent } }),
      h('div', { style: { width: 976, height: 2, background: rule } }),
    ),
    h(
      'div',
      { style: { fontFamily: 'Instrument Serif', fontSize: 42, lineHeight: 1.15, marginTop: 24, width: 1000 } },
      'I build full-stack and applied-AI products that show their working.',
    ),
  ),
  row(undefined, 56, [
    h('span', { style: { fontSize: 22, color: soft } }, 'Year 2 Computer Science, National University of Singapore'),
    h('span', { style: { fontSize: 22, color: soft } }, 'Founder of MediGraph'),
  ]),
);

const ogSvg = await satori(og, { width: 1200, height: 630, fonts });
const ogPng = new Resvg(ogSvg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
await writeFile('public/og.png', ogPng);

// ---- Icons ----
const icon = (size, radius) =>
  h(
    'div',
    {
      style: {
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: accent,
        color: paper,
        borderRadius: radius,
        fontFamily: 'Instrument Serif',
        fontSize: size * 0.72,
        lineHeight: 1,
        paddingBottom: size * 0.06,
      },
    },
    'K',
  );

const faviconSvg = await satori(icon(64, 14), { width: 64, height: 64, fonts });
await writeFile('public/favicon.svg', faviconSvg);

for (const [file, size] of [
  ['favicon-32.png', 32],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  const svg = await satori(icon(size, size === 32 ? 7 : size * 0.2), { width: size, height: size, fonts });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng();
  await writeFile(`public/${file}`, png);
}

console.log('Generated og.png, favicon.svg and PNG icons.');
