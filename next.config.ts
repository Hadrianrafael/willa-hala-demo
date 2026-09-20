import type { NextConfig } from "next";

// Em produção (GitHub Pages) o workflow define NEXT_PUBLIC_BASE_PATH=/willa-hala-demo.
// Em desenvolvimento local fica vazio e o site abre na raiz.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
