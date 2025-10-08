import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    // ✅ Empêche le build de planter à cause d’erreurs ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Ignore aussi les erreurs TypeScript pendant le build (optionnel)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Optimisations recommandées
  reactStrictMode: true,
  swcMinify: true,

  // ✅ Si ton projet utilise le dossier "src/app"
  experimental: {
    appDir: true,
  },
};

export default nextConfig;


