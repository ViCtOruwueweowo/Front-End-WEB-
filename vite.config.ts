import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api2': {
        target: 'http://137.184.14.186:8001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, ''), // quita /api2 antes de enviarlo al backend
      },
    },
  },
  plugins: [react()],
});
