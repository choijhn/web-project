// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  root: 'front',
  plugins: [react()],
  build: {
    outDir: '../dist', // 최종 빌드는 프로젝트 루트에 dist 폴더 생성
  },
});