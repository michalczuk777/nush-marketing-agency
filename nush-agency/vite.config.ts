import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'vite';

const rootDir = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      allowedHosts: ['nush-marketing-agency-production.up.railway.app'],
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(rootDir, 'index.html'),
          blog: path.resolve(rootDir, 'blog/index.html'),
          seo: path.resolve(rootDir, 'blog/techniczne-seo-w-e-commerce/index.html'),
          automation: path.resolve(rootDir, 'blog/automatyzacja-sprzedazy-b2b/index.html'),
          analytics: path.resolve(rootDir, 'blog/analityka-marketingowa-bez-chaosu/index.html'),
          glossary: path.resolve(rootDir, 'slownik/index.html'),
        },
      },
    },
  };
});
