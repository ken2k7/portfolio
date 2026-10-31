# kenil-gandhi.vercel.app

Personal portfolio of Kenil Gandhi. Fully static: Astro 5, Tailwind CSS 4, self-hosted fonts (Instrument Serif and Geist), no client-side framework.

## Develop

```bash
npm install
npm run dev
```

## Build and preview

```bash
npm run build
npm run preview
```

## Regenerate the Open Graph image and favicons

```bash
npm run og
```

## Where things live

- `src/data/content.ts`: every fact on the site. Edit copy here.
- `src/components/`: one component per section.
- `src/layouts/Base.astro`: head tags, SEO, theme script, scroll-reveal.
- `src/styles/global.css`: colour tokens for light and dark, type, buttons, motion.
- `public/Kenil_Gandhi_Resume.pdf`: the resume linked from the site. Replace the file to update it.
- `scripts/og.mjs`: generates `public/og.png` and the icons.

Deployed on Vercel. Every push to `main` deploys to production.
