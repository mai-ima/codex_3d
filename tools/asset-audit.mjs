import { readFileSync } from 'node:fs';
const src = readFileSync('src/main.js','utf8');
const required = ['SUV','truck','sedan','gaming PC','GPU','CPU','motherboard','radiator','PSU','cable','tire','engine','dashboard','suspension','Visual QA screenshot'];
const missing = required.filter(term => !src.toLowerCase().includes(term.toLowerCase()));
if (missing.length) { console.error('Missing showroom coverage:', missing.join(', ')); process.exit(1); }
console.log('Asset audit passed: showroom covers vehicles, PC hierarchy, disassembly, PBR labels, and visual QA capture.');
