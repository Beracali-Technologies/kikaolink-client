import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.webp'],

  build: {
   commonjsOptions: {

     // older 'require' syntax with newer 'import' syntax.
     transformMixedEsModules: true,

     // This ensures it correctly processes all dependencies.
     include: /node_modules/,
   },
 },
})
