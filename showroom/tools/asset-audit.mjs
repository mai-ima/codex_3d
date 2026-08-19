import { readFileSync } from 'node:fs';
const files=['src/main.ts','src/data/partCatalog.ts','../README.md','src/visualTests/cameraPresets.ts','src/data/qualityChecklist.ts'];
const text=files.map(f=>readFileSync(f,'utf8')).join('\n');
const required=['WebGL2','WebGPU','iPhone','SUV','大型トラック','乗用車','ゲーミングPC','GPU shroud','gpu-backplate','gpu-die','VRAM','CPU Socket','IHS','RAM','SSD','PSU','製品箱','完全分解','Exploded View','スクリーンショット','品質自己評価','dispose','LOD','Full Exploded','visualAcceptanceChecks','.gitignore'];
const missing=required.filter(t=>!text.toLowerCase().includes(t.toLowerCase()));
if(missing.length){console.error('Missing required coverage:',missing);process.exit(1)}
console.log('Asset audit passed: hierarchy, Japanese UI, disassembly modes, visual QA, iPhone/WebGL fallback, LOD/dispose documentation covered.');
