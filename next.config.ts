import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore aussi les erreurs TypeScript (optionnel)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'your-domain.com'],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },


  // ✅ Optimisations recommandées
  reactStrictMode: true,
  swcMinify: true,
};


export default nextConfig;

// next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   images: {
//     domains: ['localhost', 'your-domain.com'],
//   },
//   env: {
//     API_BASE_URL: process.env.API_BASE_URL,
//   },
// }

// module.exports = nextConfig


