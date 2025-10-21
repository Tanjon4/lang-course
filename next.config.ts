// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'localhost',
      'e-learning-eta-ten.vercel.app'
      ],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
  },
  reactStrictMode: true,
  // Configuration pour résoudre le problème des lockfiles
  turbopack: {
    root: process.cwd(),
  },

};

export default nextConfig;
