import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const basePath =
  process.env.VITE_BASE_PATH || (repositoryName ? `/${repositoryName}/` : '/');

export default defineConfig({
  base: basePath,
  plugins: [svgr(), react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@simulators': path.resolve(__dirname, './src/simulators'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
    },
  },
});
