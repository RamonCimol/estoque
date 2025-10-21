import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Configuração do Proxy
    proxy: {
      // Sempre que o React fizer um pedido que comece por '/api',
      // o Vite irá reencaminhar esse pedido para o teu back-end na porta 3000.
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false, // Pode ser 'true' se usares HTTPS
      }
    }
  }
});
