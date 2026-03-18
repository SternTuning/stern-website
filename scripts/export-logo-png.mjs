/**
 * Export STERN logo SVGs to PNG (for favicon, social, etc.).
 * Run: npm run export-logo
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');

const sizes = [
  { name: '32', w: 32, h: 32 },
  { name: '180', w: 180, h: 180 },
  { name: '512', w: 512, h: 512 },
];

async function exportPng(inputBuf, outputPrefix) {
  for (const { name, w, h } of sizes) {
    const out = path.join(publicDir, `${outputPrefix}-${name}.png`);
    await sharp(inputBuf).resize(w, h).png().toFile(out);
    console.log('Written', out);
  }
}

async function main() {
  // Black mark (explicit #000 so sharp renders it)
  const blackSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <g fill="#000" stroke="#000" stroke-width="0.5" stroke-linejoin="miter">
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" />
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(120 20 20)" />
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(240 20 20)" />
  </g>
</svg>`;
  await exportPng(Buffer.from(blackSvg), 'stern-icon');

  // White mark (off-white on transparent)
  const whiteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none">
  <g fill="#F5F5F0" stroke="#F5F5F0" stroke-width="0.5" stroke-linejoin="miter">
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" />
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(120 20 20)" />
    <path d="M20 22 L17 30 L18 33 L20 36 L22 33 L23 30 Z" transform="rotate(240 20 20)" />
  </g>
</svg>`;
  await exportPng(Buffer.from(whiteSvg), 'stern-icon-white');

  console.log('Done. PNGs in public/: stern-icon-32.png, stern-icon-180.png, stern-icon-512.png, stern-icon-white-*.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
