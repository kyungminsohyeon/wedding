import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 어떤 서브패스(예: /wedding/ 등)에서도 에셋 경로가 깨지지 않도록 상대경로 설정
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
