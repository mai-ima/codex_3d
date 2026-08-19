import { defineConfig } from 'vite';
export default defineConfig({ server: { host: '0.0.0.0' }, build: { target: 'safari16', sourcemap: true } });
