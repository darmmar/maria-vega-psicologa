import sharp from "sharp";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function isBackground(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  if (max > 235 && sat < 25) return true;
  if (max > 170 && max < 230 && sat < 20) return true;
  return false;
}

async function removeBackground(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isBackground(r, g, b)) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(outputPath);

  const out = readFileSync(outputPath);
  console.log(outputPath, "colorType", out[25], "hasAlpha", out[25] === 6);
}

const monogramIn = join(root, "public/images/mv-monogram.png");
const monogramOut = join(root, "public/images/mv-monogram.png");
await removeBackground(monogramIn, monogramOut);

await sharp(monogramOut)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(join(root, "public/favicon.png"));

console.log("Done: mv-monogram.png and favicon.png");
