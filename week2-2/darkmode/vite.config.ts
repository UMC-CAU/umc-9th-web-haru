import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // global.d.ts로 TS 에러 해결

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
