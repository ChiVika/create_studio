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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loaderOptions: {
          additionalData: `
            @import "@/styles/variables.scss";
          `,
        },
      }
    }
  }
})
