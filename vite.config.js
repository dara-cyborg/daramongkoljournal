import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: ['bonanza-blaspheme-prong.ngrok-free.dev', 'daramongkol.tech'],
  },
  plugins: [
    react(),
    {
      name: 'admin-route-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/admin') {
            res.statusCode = 301;
            res.setHeader('Location', '/admin/');
            res.end();
            return;
          }

          next();
        });
      },
    },
  ],
});
