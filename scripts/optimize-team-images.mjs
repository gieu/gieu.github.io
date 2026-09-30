import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const imageRoot = path.join(root, 'src', 'assets', 'img');

for (const [group, resize] of [
  ['leaders', { height: 800 }],
  ['members', { width: 512 }],
]) {
  const sourceDir = path.join(imageRoot, group);
  const outputDir = path.join(imageRoot, 'optimized', group);
  await mkdir(outputDir, { recursive: true });

  for (const name of (await readdir(sourceDir)).filter((name) => name.endsWith('.png')).sort()) {
    const input = path.join(sourceDir, name);
    const output = path.join(outputDir, `${path.parse(name).name}.webp`);
    await sharp(input)
      .resize({ ...resize, withoutEnlargement: true })
      .webp({ quality: 82, alphaQuality: 90, effort: 6 })
      .toFile(output);
  }
}
