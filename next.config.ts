import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: every route in this site is statically prerenderable, so the
  // build emits plain HTML/CSS/JS into out/ and is served by nginx on the VPS.
  // No Node process to supervise, ~50MB image instead of a Next.js runtime —
  // which matters because that box already runs nine other production stacks.
  output: "export",

  // next/image optimisation needs a server. Under static export it must be
  // disabled. Safe here: every image is a hand-optimised local asset
  // (hero-image.webp is 70KB, the logo PNGs are 40–100KB).
  images: { unoptimized: true },

  // Directory-style URLs (/about/index.html) so a plain static server resolves
  // routes without rewrite rules.
  trailingSlash: true,
};

export default nextConfig;
