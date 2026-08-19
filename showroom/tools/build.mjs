import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, copyFileSync, cpSync, rmSync } from 'node:fs';
const viteBin = process.platform === 'win32' ? 'node_modules/.bin/vite.cmd' : 'node_modules/.bin/vite';
if (existsSync(viteBin)) {
  const result = spawnSync(viteBin, ['build'], { stdio: 'inherit' });
  process.exit(result.status ?? 1);
}
rmSync('dist', { recursive: true, force: true });
mkdirSync('dist/src', { recursive: true });
copyFileSync('index.html', 'dist/index.html');
cpSync('src', 'dist/src', { recursive: true });
if (existsSync('public')) cpSync('public', 'dist', { recursive: true });
console.log('Vite is not installed in this restricted environment; wrote a static dist fallback. Vercel will use vite build after npm install.');
