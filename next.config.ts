import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Fixed-width images round up to the nearest entry here. 320 covers the 2x
    // render of the header logo (146px); 256 covers the footer (128px).
    imageSizes: [16, 32, 48, 64, 96, 128, 176, 224, 256, 320, 384],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
