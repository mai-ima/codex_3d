export type CameraPreset = {
  id: string;
  label: string;
  model: 'suv' | 'truck' | 'sedan' | 'gaming-pc' | 'all';
  position: [number, number, number];
  target: [number, number, number];
  requiredChecks: string[];
};

export const cameraPresets: CameraPreset[] = [
  { id: 'front', label: '正面', model: 'all', position: [0, 1.4, 6], target: [0, 1, 0], requiredChecks: ['シルエット', 'ライト', 'グリル', '接地'] },
  { id: 'rear', label: '背面', model: 'all', position: [0, 1.4, -6], target: [0, 1, 0], requiredChecks: ['テールライト', 'パネルライン', '排気'] },
  { id: 'left', label: '左側面', model: 'all', position: [-6, 1.8, 0], target: [0, 1, 0], requiredChecks: ['ドア隙間', 'ホイール', 'ガラス反射'] },
  { id: 'right', label: '右側面', model: 'all', position: [6, 1.8, 0], target: [0, 1, 0], requiredChecks: ['ドア隙間', 'ケーブル側', 'パネル厚'] },
  { id: 'top', label: '上面', model: 'all', position: [0, 7, 0.01], target: [0, 0.7, 0], requiredChecks: ['ルーフ', 'トップパネル', 'ファン配置'] },
  { id: 'bottom', label: '底面', model: 'all', position: [0, -3.2, 0.01], target: [0, 0.6, 0], requiredChecks: ['下回り', 'シャーシ', 'PSU吸気'] },
  { id: 'interior', label: '内装', model: 'all', position: [1.2, 1.55, 1.5], target: [0, 1.2, 0], requiredChecks: ['シート', 'ダッシュボード', 'ステッチ'] },
  { id: 'engine', label: 'エンジン', model: 'all', position: [-2.2, 1.35, 1.2], target: [-1.2, 0.85, 0], requiredChecks: ['エンジン補機', 'ホース', 'ラベル'] },
  { id: 'gpu', label: 'GPU', model: 'gaming-pc', position: [1.7, 1.25, 1.3], target: [0, 1.1, 0.5], requiredChecks: ['GPU Die', 'VRAM', 'VRM', 'ヒートパイプ'] },
  { id: 'cpu', label: 'CPU', model: 'gaming-pc', position: [0.6, 1.95, 1.2], target: [-0.2, 1.7, 0.2], requiredChecks: ['IHS', '接点', 'ソケット', 'リテンション'] },
  { id: 'ram', label: 'RAM', model: 'gaming-pc', position: [1.0, 1.95, 1.1], target: [0.4, 1.75, 0.2], requiredChecks: ['RGBディフューザー', 'DRAM', 'PMIC', '接点'] },
  { id: 'motherboard', label: 'マザーボード', model: 'gaming-pc', position: [1.4, 1.7, 1.6], target: [0, 1.45, 0.2], requiredChecks: ['CPU Socket', 'PCIe', 'M.2', '背面I/O'] },
  { id: 'psu', label: 'PSU', model: 'gaming-pc', position: [1.7, 0.8, 1.2], target: [0.6, 0.55, 0], requiredChecks: ['ファン', 'コンデンサ', 'コイル', '配線'] },
  { id: 'full-exploded', label: 'Full Exploded', model: 'all', position: [4.5, 3.5, 5.5], target: [0, 1.2, 0], requiredChecks: ['パーツ欠落なし', 'Z-fightingなし', '再組立位置'] }
];
