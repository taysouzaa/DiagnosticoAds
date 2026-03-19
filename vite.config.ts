/**
 * Configuração do Vite para a landing page DiagnósticoAds.
 * Define entrada de build (ads.html), alias e plugins.
 */
import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Base relativa para facilitar deploy em subpastas.
  base: './',
  plugins: [
    // Os plugins de React e Tailwind são necessários para o pipeline atual.
    // Não remova, mesmo que o Tailwind não esteja sendo usado ativamente.
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ para o diretório src.
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    // Organiza assets de build em uma pasta específica.
    assetsDir: 'ads-assets',
    rollupOptions: {
      input: {
        // Entrada explícita para gerar a landing page a partir de ads.html.
        ads: path.resolve(__dirname, 'ads.html'),
      },
    },
  },

  // Tipos de arquivo permitidos para importação bruta.
  // Nunca inclua .css, .tsx ou .ts aqui.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
