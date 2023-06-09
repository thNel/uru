import {defineConfig, loadEnv, splitVendorChunkPlugin} from 'vite';
import react from '@vitejs/plugin-react';
import {resolve} from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';

const ENV_PREFIX = ['VITE_'];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, 'config', ENV_PREFIX);

  return {
    envDir:'config',
    plugins: [
      react(),
      tsconfigPaths(),
      splitVendorChunkPlugin(),
    ],
    resolve: {
      alias: {
        '@': `${resolve(__dirname, 'src')}`,
      },
    },
    build: {
      emptyOutDir: true,
      cssCodeSplit: true,
      assetsDir: 'assets',
    },
    server: {
      port: 3000,
      open: true,
    },
  };
});
