// Cuts interface elements out of the 2x product screenshots as transparent PNGs with rounded corners.
// Coordinates are 1x CSS pixels measured in the running apps at a 1600x1000 viewport.
import sharp from 'sharp';

const jobs = [
  { src: 'src/assets/ui/medgraph-timeline.png', scale: 2, out: 'mg', radius: 10, items: [
    ['diabetes', 358, 214, 198, 41],
    ['metformin', 572, 207, 203, 57],
    ['hba1c', 835, 647, 148, 57],
    ['review', 955, 207, 196, 57],
    ['visit', 158, 207, 184, 57],
    ['allergy', 358, 647, 213, 57],
    ['osteoarthritis', 625, 487, 207, 41],
    ['paracetamol', 848, 479, 194, 57],
    ['rightnow-metformin', 1247, 282, 335, 56],
    ['haemoglobin', 815, 827, 148, 57],
  ]},
  { src: 'src/assets/ui/infrasync-overview.png', scale: 2, out: 'is', radius: 8, items: [
    ['savings', 962, 14, 214, 40],
    ['packages', 801, 14, 150, 40],
    ['segments', 682, 14, 107, 40],
    ['live', 1380, 15, 110, 38],
    ['bar-water', 353, 847, 60, 28],
    ['pill-water', 412, 832, 64, 58],
    ['bar-fiber', 353, 928, 36, 28],
    ['legend', 794, 398, 180, 179],
    ['diagnose', 1067, 445, 466, 38],
    ['map', 50, 171, 938, 420],
  ]},
];

for (const job of jobs) {
  const meta = await sharp(job.src).metadata();
  for (const [name, x, y, w, h] of job.items) {
    const s = job.scale;
    const left = Math.max(0, Math.round(x * s)), top = Math.max(0, Math.round(y * s));
    const width = Math.min(meta.width - left, Math.round(w * s)), height = Math.min(meta.height - top, Math.round(h * s));
    const r = job.radius * s;
    const mask = Buffer.from(`<svg width="${width}" height="${height}"><rect width="${width}" height="${height}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
    await sharp(job.src).extract({ left, top, width, height }).ensureAlpha().composite([{ input: mask, blend: 'dest-in' }]).png({ compressionLevel: 9 }).toFile(`src/assets/cut/${job.out}-${name}.png`);
  }
  console.log(job.out, job.items.length, 'cut-outs');
}
