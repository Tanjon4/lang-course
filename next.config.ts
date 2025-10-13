import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ✅ Ignore les erreurs ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore aussi les erreurs TypeScript (optionnel)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Optimisations recommandées
  reactStrictMode: true,
};

export default nextConfig;
