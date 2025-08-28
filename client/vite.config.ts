import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
