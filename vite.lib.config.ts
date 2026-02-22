import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      fileName: 'index',
      formats: ['es'],
      name: 'ComponentsLibrary',
    },
    outDir: 'dist-lib',
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'simplebar-react'],
    },
  },
});
