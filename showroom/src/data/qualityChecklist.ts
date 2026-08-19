export type QualityScore = {
  model: 'SUV' | '大型トラック' | '乗用車' | 'ゲーミングPC';
  exterior: number;
  internalStructure: number;
  microDetail: number;
  materialTexture: number;
  motionDisassembly: number;
  iphoneInteraction: number;
  blockingIssues: string[];
};

export const qualityScores: QualityScore[] = [
  { model: 'SUV', exterior: 18, internalStructure: 16, microDetail: 15, materialTexture: 12, motionDisassembly: 9, iphoneInteraction: 9, blockingIssues: ['実車相当CAD曲面と実機iPhone Safari撮影が未完了'] },
  { model: '大型トラック', exterior: 18, internalStructure: 15, microDetail: 15, materialTexture: 12, motionDisassembly: 9, iphoneInteraction: 9, blockingIssues: ['キャビンチルト機構は概念実装で実機構検証が未完了'] },
  { model: '乗用車', exterior: 17, internalStructure: 15, microDetail: 15, materialTexture: 12, motionDisassembly: 9, iphoneInteraction: 9, blockingIssues: ['セダン固有内装/下回りメッシュの高密度化が未完了'] },
  { model: 'ゲーミングPC', exterior: 20, internalStructure: 18, microDetail: 17, materialTexture: 13, motionDisassembly: 10, iphoneInteraction: 9, blockingIssues: ['内部部品の実メッシュ/4K自作テクスチャ化が未完了'] }
];

export const visualAcceptanceChecks = [
  'モデルが欠けていない', 'テクスチャ欠落がない', '真っ黒になっていない', '透明化していない',
  'Z-fightingが目立たない', 'パーツ位置が破綻していない', '可動部が正しい', 'ライティングが自然',
  'マテリアルが適切', 'カメラが内部へ不自然に侵入していない'
];
