declare module '*.css';
declare module 'vite' { export function defineConfig(config:any):any; }
declare module 'three' { const THREE:any; export default THREE; }
declare module 'three/examples/jsm/controls/OrbitControls.js' { export const OrbitControls:any; }
