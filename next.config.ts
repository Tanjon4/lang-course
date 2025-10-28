// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     domains: [
//       'localhost',
//       'e-learning-eta-ten.vercel.app'
//     ],
//   },
//   env: {
//     API_BASE_URL: process.env.API_BASE_URL,
//   },
//   reactStrictMode: true,
//   // Configuration pour résoudre le problème des lockfiles
//   turbopack: {
//     root: process.cwd(),
//   },

//   // ✅ Ajout du proxy pour contourner CORS
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*', // toutes les requêtes vers /api/*
//         destination: `${process.env.API_BASE_URL}/:path*`, // vers ton API
//       },
//     ];
//   },
// };

// /** @type {import('next').NextConfig} */

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// if (!apiUrl) {
//   throw new Error(
//     "❌ ERREUR : NEXT_PUBLIC_API_URL n'est pas définie dans .env.local"
//   );
// }

// const nextConfig = {
//   reactStrictMode: true,

//   async rewrites() {
//     return [
//       {
//         source: "/api/:path*",         // frontend appelle /api/...
//         destination: `${apiUrl}/:path*` // proxy vers le vrai backend
//       },
//     ];
//   },

//   env: {
//     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
//   },
// };

// export default nextConfig;

// next.config.ts
import type { NextConfig } from "next";

// ✅ Vérifie la variable d’environnement dès le démarrage
const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL;

if (!apiUrl) {
  throw new Error(
    "❌ ERREUR : la variable d'environnement NEXT_PUBLIC_API_URL ou API_BASE_URL n'est pas définie dans .env.local"
  );
}

const nextConfig: NextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    domains: [
      "localhost",
      "e-learning-eta-ten.vercel.app",
    ],
  },

  env: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },

  turbopack: {
    root: process.cwd(),
  },

  // ✅ Proxy /api vers ton backend pour éviter les erreurs CORS
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
