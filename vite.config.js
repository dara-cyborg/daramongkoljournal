import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: ['bonanza-blaspheme-prong.ngrok-free.dev', 'daramongkol.tech'],
  },
  plugins: [react()],
});
