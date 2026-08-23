import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fixed-width images round up to the nearest entry here. 320 covers the 2x
    // render of the header logo (146px); 256 covers the footer (128px).
    imageSizes: [16, 32, 48, 64, 96, 128, 176, 224, 256, 320, 384],
  },
};

export default nextConfig;
