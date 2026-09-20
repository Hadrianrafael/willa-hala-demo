import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["jpg", "jpeg", "webp", "avif", "png"];
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Procura public/photos/<slot>.<ext> em tempo de build (só roda no servidor/build).
 * Se o arquivo existir, devolve a URL pública já com basePath; senão devolve null
 * e o componente <Media> mostra o espaço reservado.
 */
export function photoSrc(slot: string): string | null {
  const dir = path.join(process.cwd(), "public", "photos");
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${slot}.${ext}`))) {
      return `${BASE_PATH}/photos/${slot}.${ext}`;
    }
  }
  return null;
}

export const assetUrl = (p: string) => `${BASE_PATH}${p}`;
