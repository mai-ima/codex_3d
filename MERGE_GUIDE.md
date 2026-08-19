# マージできない場合のコンフリクト回避ガイド

## 結論
このブランチは初期追加ファイルが多いため、既存プロジェクトへ直接マージすると `index.html`、`package.json`、`src/`、`tools/`、`vercel.json` で衝突しやすいです。安全に進めるには、まず相手ブランチを取り込み、生成物を除外し、衝突しやすいファイルを小さな単位で移植してください。

## 推奨フロー

```bash
git fetch origin
git switch <作業ブランチ>
git rebase origin/main
```

rebase中に衝突したら、対象ファイルを確認します。

```bash
git status
git diff --name-only --diff-filter=U
```

衝突を解消したら、次を実行します。

```bash
git add <解決したファイル>
git rebase --continue
```

rebaseが難しい場合は、いったん中止します。

```bash
git rebase --abort
```

## 衝突を起こしやすいファイル別の方針

### `package.json`
既存アプリの scripts/dependencies を優先し、必要なものだけ追加します。
- `three`
- `vite`
- `typescript`
- `test`, `build`, `dev`, `preview` scripts

### `index.html`
既存のHTMLがある場合は丸ごと置換せず、`<div id="app"></div>` と `/src/main.ts` の読み込みだけを統合します。

### `src/`
既存コードがある場合は、ショールームを `src/showroom/` などの隔離ディレクトリへ移動してから統合すると安全です。

### `public/screenshots/`
これは視覚QAの生成物に近いため、必要なら `.gitignore` 対象にしてCIで生成してください。

### `dist/`
`dist/` はビルド生成物なのでコミットしません。`.gitignore` で除外します。

## コンフリクトを避けるための分割PR

1. `.gitignore`、`package.json`、`vite.config.ts`、`vercel.json` の基盤PR
2. `src/data/` と `src/visualTests/` のデータPR
3. `src/main.ts` と `src/styles.css` のアプリPR
4. `README.md` と `MERGE_GUIDE.md` のドキュメントPR

この順に分けると、レビューとマージが容易になります。

## 最終確認

```bash
npm install
npm test
npm run build
git status --short
```

`git status --short` が空で、テストとビルドが通ればマージ準備完了です。

## どうしても自分で解決できない場合
このPRでは衝突範囲を小さくするため、アプリ本体を `showroom/` に隔離しています。既存プロジェクトへマージするときは、まず `.gitignore`、`vercel.json`、`README.md`、`MERGE_GUIDE.md`、`showroom/` だけを受け入れてください。既存のルート `package.json` や `src/` を触らないため、通常のアプリ衝突を回避できます。

もしGitHub上で競合解消する場合は、`showroom/` 配下は「Accept incoming」、既存アプリ側のファイルは「Keep current」を選ぶのが安全です。
