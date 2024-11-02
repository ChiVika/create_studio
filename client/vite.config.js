import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    resolve: {
      alias: {
        '@': './src',
      },
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loaderOptions: {
          additionalData: `
            @import "./src/styles/variables.scss";
          `,
        },
      }
    }
  }
})
