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
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
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
      },
      {
        source: '/api/:path*',
        destination: 'https://lang-courses-api.onrender.com/api/:path*',
      }
    ];
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;