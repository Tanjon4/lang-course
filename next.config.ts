import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  experimental: {
    appDir: true,
  },
=======
  /* config options here */
  // ✅ Ignore les erreurs ESLint pendant le build
>>>>>>> main
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
<<<<<<< HEAD
  swcMinify: true,
=======
>>>>>>> main
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


