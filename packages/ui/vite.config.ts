import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { createViteEntries } from './scripts/public-exports.mjs';

const srcRoot = path.resolve(import.meta.dirname, 'src');
const publicEntries = createViteEntries({
  resolveSource: (sourcePath) => path.resolve(srcRoot, sourcePath),
});

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: {
        index: path.resolve(srcRoot, 'index.ts'),
        ...publicEntries,
      },
      fileName: (_format, entryName) => `${entryName}.js`,
      formats: ['es'],
      name: 'AdanftUi',
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        '@floating-ui/react',
        'lucide-react',
        'react',
        'react-dom',
        'react/jsx-runtime',
        'simplebar-react',
        'tailwind-merge',
      ],
    },
  },
});
