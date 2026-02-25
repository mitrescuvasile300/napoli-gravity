import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimized for Vercel by default
  // Vercel handles Image Optimization, SSR, and API routes automatically
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'apps.appy.ro',
      },
    ],
  },
};

export default nextConfig;
