/**
 * Otimiza as fotos oficiais da hospedagem para a web.
 *
 * Uso:
 *   npm run photos -- <pasta-com-as-fotos-originais>
 *
 * Cada arquivo de entrada deve ter o nome do "slot" (ex.: hero.jpg, gal-03.png,
 * quarto-duplo.heic...). Veja a lista completa em docs/FOTOS.md.
 * Saída: public/photos/<slot>.jpg (progressivo, sem metadados/GPS, largura máx. limitada).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const input = process.argv[2];
if (!input || !fs.existsSync(input)) {
  console.error("Informe a pasta com as fotos originais:  npm run photos -- ./minhas-fotos");
  process.exit(1);
}

const out = path.join(process.cwd(), "public", "photos");
fs.mkdirSync(out, { recursive: true });

const MAX_WIDTH = { hero: 2200 };
const DEFAULT_WIDTH = 1800;
const exts = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff", ".heic"]);

let done = 0;
for (const file of fs.readdirSync(input)) {
  const ext = path.extname(file).toLowerCase();
  if (!exts.has(ext)) continue;
  const slot = path.basename(file, path.extname(file)).toLowerCase();
  const width = MAX_WIDTH[slot] ?? DEFAULT_WIDTH;
  const target = path.join(out, `${slot}.jpg`);

  // .rotate() aplica a orientação EXIF e, ao re-encodar, os metadados (inclusive GPS) são descartados.
  await sharp(path.join(input, file))
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true })
    .toFile(target);

  const kb = Math.round(fs.statSync(target).size / 1024);
  console.log(`✓ ${file} → public/photos/${slot}.jpg (${kb} KB)`);
  done++;
}
console.log(done ? `\n${done} foto(s) prontas. Rode "npm run build" para publicar.` : "Nenhuma imagem encontrada.");
