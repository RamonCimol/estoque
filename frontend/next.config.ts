import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Pega tudo que começa com /api...
        // ...e redireciona para o seu backend Express
        destination: 'http://localhost:3200/api/:path*', 
      },
    ]
  },
};

export default nextConfig;