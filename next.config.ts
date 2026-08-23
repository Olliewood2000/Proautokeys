import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fixed-width images round up to the nearest entry here. 224 covers the 2x
    // renders of the header (110px) and footer (91px) logos; without it both
    // round all the way up to 256 and put on weight for nothing.
    imageSizes: [16, 32, 48, 64, 96, 128, 176, 224, 256, 384],
  },
};

export default nextConfig;
