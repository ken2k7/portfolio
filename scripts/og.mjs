// Generates public/og.png (1200x630), public/favicon.svg and PNG icons in the site's own look:
// a sand folder with a tab on a cobalt ground. Run with: npm run og
import { readFile, writeFile } from 'node:fs/promises';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const bebas = await readFile('node_modules/@fontsource/bebas-neue/files/bebas-neue-latin-400-normal.woff');
const garamond = await readFile('node_modules/@fontsource/eb-garamond/files/eb-garamond-latin-400-normal.woff');
const fonts = [
  { name: 'Bebas Neue', data: bebas, weight: 400, style: 'normal' },
  { name: 'EB Garamond', data: garamond, weight: 400, style: 'normal' },
];

const cobalt = '#062b8a';
const sand = '#e6dbc7';
const sand2 = '#ddd0b9';

const h = (type, props, ...children) => ({ type, props: { ...props, children: children.length === 1 ? children[0] : children } });

// Folder: tab (trapezoid via clip-path) above a filled sheet.
const tab = (label, left, width, fontSize) =>
  h(
    'div',
    {
      style: {
        position: 'absolute',
        left,
        top: 0,
        width,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: cobalt,
        color: sand,
        fontFamily: 'Bebas Neue',
        fontSize,
        clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)',
      },
    },
    label,
  );

const og = h(
  'div',
  { style: { width: 1200, height: 630, display: 'flex', position: 'relative', background: cobalt, color: sand, fontFamily: 'EB Garamond' } },
  h('div', { style: { position: 'absolute', left: 84, top: 56, fontFamily: 'Bebas Neue', fontSize: 168, lineHeight: 0.85, letterSpacing: -4 } }, 'KENIL GANDHI'),
  h(
    'div',
    { style: { position: 'absolute', left: 84, top: 230, width: 760, fontSize: 30, lineHeight: 1.3 } },
    'Computer science at NUS, from Qatar. Software that keeps every fact tied to the document it came from.',
  ),
  // back folder strip
  h('div', { style: { position: 'absolute', left: 84, right: 84, top: 404, height: 56, background: sand2, display: 'flex' } }),
  tab('ABOUT', 320, 220, 34),
  // front folder
  h('div', { style: { position: 'absolute', left: 84, right: 84, top: 460, height: 200, background: sand, display: 'flex' } }),
  h(
    'div',
    { style: { position: 'absolute', left: 84, top: 404, width: 1032, height: 260, display: 'flex' } },
    h('div', { style: { position: 'absolute', left: 0, top: 0, width: 260, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: cobalt, color: sand, fontFamily: 'Bebas Neue', fontSize: 34, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)' } }, 'WORK'),
    h('div', { style: { position: 'absolute', left: 300, top: 0, width: 260, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: cobalt, color: sand, fontFamily: 'Bebas Neue', fontSize: 34, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)' } }, 'ABOUT'),
    h('div', { style: { position: 'absolute', left: 600, top: 0, width: 260, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'center', background: cobalt, color: sand, fontFamily: 'Bebas Neue', fontSize: 34, clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 100%, 0 100%)' } }, 'SKILLS'),
    h('div', { style: { position: 'absolute', left: 40, top: 92, color: cobalt, fontSize: 28 } }, 'MediGraph, InfraSync, KGiSL, Kenbot'),
    h('div', { style: { position: 'absolute', right: 40, top: 92, color: cobalt, fontSize: 28 } }, 'kenil-gandhi.vercel.app'),
  ),
);

const ogSvg = await satori(og, { width: 1200, height: 630, fonts });
await writeFile('public/og.png', new Resvg(ogSvg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng());

// Icons: a sand folder tab on cobalt.
const icon = (size) =>
  h(
    'div',
    { style: { width: size, height: size, display: 'flex', position: 'relative', background: cobalt } },
    h('div', { style: { position: 'absolute', left: size * 0.12, top: size * 0.2, width: size * 0.42, height: size * 0.16, background: sand, clipPath: 'polygon(14% 0, 86% 0, 100% 100%, 0 100%)', display: 'flex' } }),
    h('div', { style: { position: 'absolute', left: size * 0.12, right: size * 0.12, top: size * 0.36, bottom: size * 0.16, background: sand, display: 'flex', alignItems: 'center', justifyContent: 'center', color: cobalt, fontFamily: 'Bebas Neue', fontSize: size * 0.34 } }, 'KG'),
  );

await writeFile('public/favicon.svg', await satori(icon(64), { width: 64, height: 64, fonts }));
for (const [file, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  const svg = await satori(icon(size), { width: size, height: size, fonts });
  await writeFile(`public/${file}`, new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng());
}
console.log('Generated og.png, favicon.svg and PNG icons.');
