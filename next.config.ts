import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ CRITIQUE : Configuration pour servir les assets statiques
  async headers() {
    return [
      {
        source: '/img/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // ✅ Rewrites pour servir les assets depuis public/
  async rewrites() {
    return [
      {
        source: '/img/:path*',
        destination: '/img/:path*',
      },
      {
        source: '/:lang/img/:path*',
        destination: '/img/:path*',
      }
    ];
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;