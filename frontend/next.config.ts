/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esta função "rewrites" redireciona chamadas de API
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Pega tudo que começa com /api...
        // ...e envia para o seu backend Express na porta 3001
        destination: "http://localhost:3001/api/:path*",
      },
    ];
  },
};

export default nextConfig;
