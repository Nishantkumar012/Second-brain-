import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
//@ts-ignore
import tailwindcss from 'vite-plugin-tailwindcss'
//@ts-ignore
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
   plugins: [
    react(),
    tailwindcss(),
  ],
})
