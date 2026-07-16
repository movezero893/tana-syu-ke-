# 棚卸集計ツール（Windows EXE版）

現場でエクスポートしたCSVを読み込んで、Excel（.xlsx）の実施棚卸表を出力するツール。
このリポジトリは、集計ツール本体（`shukei-tool.html`）を Tauri で Windows用の .exe に変換する。

## ファイル構成

```
リポジトリ/
├── shukei-tool.html                     ← 集計ツール本体（これを編集すれば修正完了）
├── .gitignore
├── windows-tool/                        ← Tauri（exe化）の設定一式
│   ├── package.json
│   ├── copy-html.js                     ← ビルド時に本体を dist/index.html へコピー
│   └── src-tauri/
│       ├── Cargo.toml
│       ├── build.rs
│       ├── tauri.conf.json
│       ├── src/main.rs
│       └── icons/                       ← アプリアイコン（icon.ico を差し替え可）
└── .github/workflows/
    └── build-windows-tauri.yml          ← push すると自動でexeをビルド
```

※ ファイル名の文字化けトラブルを避けるため、リポジトリ内はすべてASCIIファイル名。
　 本体は旧「棚卸集計.html」→「shukei-tool.html」に改名済み。

## exeの作り方（GitHubサイトだけで完結）

1. `shukei-tool.html` または `windows-tool/` 配下を変更してコミット
2. GitHub の **Actions** タブで `Build Windows EXE` が自動実行される
3. 完了したら実行結果を開き、下部の **Artifacts** からダウンロード
   - **tanaoroshi-shukei-portable** … インストール不要。exeを事務所PCに置いてダブルクリックで起動（通常はこちら）
   - **tanaoroshi-shukei-installer** … NSISインストーラー版。インストールして使いたい場合
4. Artifacts は zip で落ちてくるので、解凍して中の exe を使う

手動で実行したい場合は、Actions タブ → `Build Windows EXE` → `Run workflow`。

初回ビルドは Rust のコンパイルが入るため 15〜25分程度かかる。
2回目以降はキャッシュが効いて短縮される。

## ツールの修正方法

`shukei-tool.html` を編集するだけ。ロジックはこのファイル1つに収まっている。
push すれば新しいexeが自動でビルドされる。

## 注意

- 署名なしのため、初回起動時に Windows SmartScreen の警告が出る
  → 「詳細情報」→「実行」で許可（社内利用のみなので許容範囲）
- Windows 10/11 なら WebView2 が標準搭載のため追加インストール不要
- exe名は文字化け防止のため英字（TanaoroshiShukeiTool.exe）。
  起動後のウィンドウタイトルは「棚卸集計ツール」と日本語で表示される
