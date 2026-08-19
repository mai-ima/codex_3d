# 超高精細 3D分解ショールーム

## 1. 概要
iPhone Safariから直接操作することを主対象にした、SUV・大型トラック・乗用車・ハイエンドゲーミングPCのインタラクティブ3Dショールームです。現段階では権利保護CADや写真テクスチャを使わず、Three.jsで自作手続き型の部品階層、PBR材質、分解モード、視覚QA導線を実装しています。

## 2. 必要環境
- Node.js 20+
- npm 11+
- Git
- TypeScript
- Vite
- Three.js

## 3. インストール
```bash
npm install
```

## 4. 開発サーバー
```bash
npm run dev
```
LAN内のiPhoneで確認する場合も `vite --host 0.0.0.0` が既定です。明示する場合:
```bash
npm run dev -- --host 0.0.0.0
```

## 5. ビルド
```bash
npm run build
```

## 6. 本番確認
```bash
npm run preview
```

## 7. iPhoneでの確認
同一LANでMac/PCのIPアドレスへアクセスし、縦横回転、1本指回転、2本指ズーム、2本指パン、タップ選択、ダブルタップフォーカス、分解/再組立、RGB切替、スクリーンショット保存を確認します。

## 8. 3Dモデル構造
`src/data/partCatalog.ts` に全パーツが `id/name/category/description/specification/material/parent/removable/selectable/movable/animation/children` を持つデータとして定義されています。PCは Case, Motherboard, CPU, CPU Cooler, RAM, GPU, SSD, PSU, Fans, Cables, Boxes を親子階層化しています。

## 9. 分解システム
UIは「通常表示」「詳細表示」「分解表示」「完全分解」「Exploded View」の5段階です。各Object3Dは `home` と `explode` を保持し、組み立て時は正確にhomeへ戻ります。

## 10. パーツ追加
新しい部品は `Part` として `partCatalog.ts` に追加し、`src/main.ts` のモデル生成関数へ対応する立体形状を追加してください。公式ロゴ、公式CAD、無断転載テクスチャは使用禁止です。

## 11. テクスチャ管理
現段階は手続き型PBR名と材質パラメータで Base Color / Roughness / Metallic / Normal / AO / Detail / Emissive / Transmission を管理しています。将来は `public/textures` に自作KTX2/Basis圧縮テクスチャを配置します。

## 12. LOD
0〜1m Ultra、1〜3m High、3〜10m Medium、10m以上 Low を目標に、将来GLB/meshopt/Draco化する前提です。現在はiPhone向けにpixel ratio制限とモデル単位lazy load/disposeを実装しています。

## 13. パフォーマンス
4モデルを同時ロードせず、切替時にGeometryをdisposeします。iPhone/iPadではshadowを抑制し、draw call削減のため反復部品を小型形状で生成します。将来はInstancing、Texture Atlas、Web Workers、RenderTarget破棄を追加します。

## 14. トラブルシューティング
WebGPUが使えない環境ではWebGL2/Three.jsで描画します。画面が真っ黒な場合はブラウザのWebGL設定、メモリ不足、ネットワーク、アセット欠落を確認してください。UIのエラーメッセージは日本語で表示する方針です。

## 15. 視覚検証方法
`npm test` で `tools/generate-visual-qa.mjs` が `public/screenshots/` 配下に視覚QA用SVGを生成します。固定カメラは `src/visualTests/cameraPresets.ts` に定義し、Front/Rear/Left/Right/Top/Bottom/Interior/Engine/GPU/CPU/RAM/Motherboard/PSU/Full Exploded を継続検証します。実機ではUIの「スクリーンショット」ボタンで、初期、正面、背面、近距離、パーツ選択、分解、Exploded View、RGB ON/OFF、ドア/ボンネット/ケース開放、PC完全分解を保存し、シルエット、比率、パネルライン、反射、ガラス、金属、ゴム、配線、コネクタ、ネジ、ラベル、刻印、影、接地を確認します。

## 品質自己評価
現状は手続き型プロトタイプのため、採点は `src/data/qualityChecklist.ts` で管理し、SUV 79/100、大型トラック 78/100、乗用車 77/100、ゲーミングPC 87/100です。90点未満なので最終品質ではありません。次工程でBlender等による実メッシュ、GLB/GLTF、4K/2K自作テクスチャ、実機iPhone Safariスクリーンショット検証が必要です。

## 16. Vercelデプロイ
Vercelでは `vercel.json` により framework を Vite、buildCommand を `npm run build`、outputDirectory を `dist` に固定しています。`/assets`、`/models`、`/textures` は immutable cache、`/screenshots` は短期cache、SPA用rewriteとセキュリティヘッダーを設定しています。

推奨手順:
```bash
npm install
npm run build
vercel deploy --prebuilt
```
本番昇格時は:
```bash
vercel deploy --prebuilt --prod
```

## 17. レビュー対応メモ
前回指摘の「生成済みdistの混入」「視覚QAが曖昧」「固定カメラ不足」に対応し、`dist/` は `.gitignore` 対象、固定カメラプリセットと品質チェックリストをソース管理対象にしました。
